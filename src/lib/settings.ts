import { useEffect, useState, useCallback } from 'react';
import { supabase, type Settings, DEFAULT_SETTINGS } from './supabase';

const SETTINGS_STORAGE_KEY = 'rehema_website_settings_v1';
export const SETTINGS_EVENT = 'rehema_settings_updated';

export function getCachedSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && !parsed.hero_title_line1?.includes('Dressed in Africa')) {
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS;
}

export async function saveWebsiteSettings(newSettings: Settings): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Save to local storage for instant dynamic response
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));

    // 2. Broadcast event across components in the current window
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: newSettings }));

    // 3. Upsert to Supabase
    const { error } = await supabase.from('settings').upsert({ id: 1, data: newSettings });
    if (error) {
      console.warn('Supabase settings upsert warning:', error.message);
    }
    return { success: true };
  } catch (err: any) {
    console.error('Error saving settings:', err);
    return { success: false, error: err?.message || 'Failed to save' };
  }
}

export function useWebsiteSettings() {
  const [settings, setSettings] = useState<Settings>(getCachedSettings);

  useEffect(() => {
    async function syncFromSupabase() {
      try {
        const { data } = await supabase.from('settings').select('data').eq('id', 1).maybeSingle();
        if (data?.data) {
          const merged = { ...DEFAULT_SETTINGS, ...data.data };
          setSettings(merged);
          try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
          } catch {
            /* ignore */
          }
        }
      } catch {
        /* ignore */
      }
    }

    syncFromSupabase();

    // Listen for local changes from admin panel
    const handleLocalUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Settings>;
      if (customEvent.detail) {
        setSettings({ ...DEFAULT_SETTINGS, ...customEvent.detail });
      } else {
        setSettings(getCachedSettings());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === SETTINGS_STORAGE_KEY) {
        setSettings(getCachedSettings());
      }
    };

    window.addEventListener(SETTINGS_EVENT, handleLocalUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, handleLocalUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return settings;
}
