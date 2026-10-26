import { useEffect, useState } from 'react';
import { Plus, Trash2, Check, Sparkles, Layout, Info, Phone, HelpCircle } from 'lucide-react';
import { type Settings } from '@/lib/supabase';
import { getCachedSettings, saveWebsiteSettings, useWebsiteSettings } from '@/lib/settings';

export default function AdminSettings() {
  const currentSettings = useWebsiteSettings();
  const [settings, setSettings] = useState<Settings>(currentSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'announcement' | 'about' | 'contact' | 'faq'>('hero');

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    const result = await saveWebsiteSettings(settings);
    setSaving(false);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    }
  };

  const updateFaq = (i: number, field: 'q' | 'a', value: string) => {
    const faq = [...(settings.faq || [])];
    faq[i] = { ...faq[i], [field]: value };
    setSettings({ ...settings, faq });
  };

  const addFaq = () => {
    setSettings({ ...settings, faq: [...(settings.faq || []), { q: '', a: '' }] });
  };

  const removeFaq = (i: number) => {
    setSettings({ ...settings, faq: (settings.faq || []).filter((_, idx) => idx !== i) });
  };

  return (
    <div className="page-enter max-w-4xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light text-ink-900">Website Content & Settings</h1>
          <p className="text-xs tracking-wider uppercase text-ink-400 mt-1">
            Dynamic live editor · Changes appear instantly across the whole website
          </p>
        </div>
        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="btn-primary inline-flex items-center gap-2 py-3 px-8 shadow-md hover:shadow-lg transition-all"
        >
          {saving ? 'Saving...' : 'Save & Publish Live'}
        </button>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-sage-100 border border-sage-300 text-sage-800 text-sm flex items-center gap-2 animate-fade-up">
          <Check className="w-5 h-5 text-sage-600" />
          <span>Settings saved successfully! Website content is updated live.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-ink-200 pb-3 mb-8">
        {[
          { id: 'hero', label: 'Homepage & Hero', icon: Layout },
          { id: 'announcement', label: 'Announcement Bar', icon: Sparkles },
          { id: 'about', label: 'About & Brand Story', icon: Info },
          { id: 'contact', label: 'Contact & Social', icon: Phone },
          { id: 'faq', label: 'FAQ Editor', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase transition-all duration-200 ${
                isActive
                  ? 'bg-ink-900 text-champagne-50 shadow'
                  : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave}>
        {/* Tab 1: Hero & Homepage */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-white border border-ink-100 p-6 md:p-8">
              <h2 className="font-serif text-xl font-light text-ink-900 mb-6">Hero Section Headline</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Hero Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title_line1 || ''}
                    onChange={(e) => setSettings({ ...settings, hero_title_line1: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Dressed in Africa,"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Hero Headline Line 2 (Italic Accent)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title_line2 || ''}
                    onChange={(e) => setSettings({ ...settings, hero_title_line2: e.target.value })}
                    className="input-field"
                    placeholder="e.g. worn by the world"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Hero Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.hero_subtitle || ''}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Bespoke Haute Couture Gowns & Veils"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_primary || ''}
                    onChange={(e) => setSettings({ ...settings, hero_cta_primary: e.target.value })}
                    className="input-field"
                    placeholder="Explore Collection"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_secondary || ''}
                    onChange={(e) => setSettings({ ...settings, hero_cta_secondary: e.target.value })}
                    className="input-field"
                    placeholder="Book Consultation"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-ink-100 p-6 md:p-8">
              <h2 className="font-serif text-xl font-light text-ink-900 mb-6">Homepage Bottom CTA Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    CTA Section Title
                  </label>
                  <input
                    type="text"
                    value={settings.cta_title || ''}
                    onChange={(e) => setSettings({ ...settings, cta_title: e.target.value })}
                    className="input-field"
                    placeholder="Begin Your Bridal Journey"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    CTA Description Text
                  </label>
                  <textarea
                    rows={3}
                    value={settings.cta_subtitle || ''}
                    onChange={(e) => setSettings({ ...settings, cta_subtitle: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Schedule a private consultation in our Kigali atelier..."
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={settings.cta_button || ''}
                    onChange={(e) => setSettings({ ...settings, cta_button: e.target.value })}
                    className="input-field"
                    placeholder="Book a Consultation"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Announcement Bar */}
        {activeTab === 'announcement' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-white border border-ink-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-xl font-light text-ink-900">Top Announcement Banner</h2>
                  <p className="text-xs text-ink-400 mt-0.5">Displays as the luxury animated ticker ribbon on the homepage</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcement_enabled ?? true}
                    onChange={(e) => setSettings({ ...settings, announcement_enabled: e.target.checked })}
                    className="w-4 h-4 text-gold-500 rounded focus:ring-gold-400"
                  />
                  <span className="text-xs uppercase tracking-wider text-ink-700 font-medium">Show Banner</span>
                </label>
              </div>

              <div>
                <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                  Announcement Message
                </label>
                <textarea
                  rows={3}
                  value={settings.announcement_message || ''}
                  onChange={(e) => setSettings({ ...settings, announcement_message: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Grace & Elegance: Enjoy 15% off all Signature Gowns this season. Use code BRENDA15 at checkout."
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: About Us & Brand Story */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-white border border-ink-100 p-6 md:p-8">
              <h2 className="font-serif text-xl font-light text-ink-900 mb-6">Brand Story & Philosophy</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Section Subtitle / Eyebrow
                  </label>
                  <input
                    type="text"
                    value={settings.about_subtitle || ''}
                    onChange={(e) => setSettings({ ...settings, about_subtitle: e.target.value })}
                    className="input-field"
                    placeholder="The Brenda's Bridal Philosophy"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Section Main Headline
                  </label>
                  <input
                    type="text"
                    value={settings.about_headline || ''}
                    onChange={(e) => setSettings({ ...settings, about_headline: e.target.value })}
                    className="input-field"
                    placeholder="A Legacy of Elegance"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Story Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={settings.about_story_p1 || ''}
                    onChange={(e) => setSettings({ ...settings, about_story_p1: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Story Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={settings.about_story_p2 || ''}
                    onChange={(e) => setSettings({ ...settings, about_story_p2: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">
                    Story Paragraph 3
                  </label>
                  <textarea
                    rows={3}
                    value={settings.about_story_p3 || ''}
                    onChange={(e) => setSettings({ ...settings, about_story_p3: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contact & Social Media */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fade-up">
            <div className="bg-white border border-ink-100 p-6 md:p-8">
              <h2 className="font-serif text-xl font-light text-ink-900 mb-6">Contact & Social Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Instagram Handle</label>
                  <input
                    type="text"
                    value={settings.instagram_handle || ''}
                    onChange={(e) => setSettings({ ...settings, instagram_handle: e.target.value })}
                    className="input-field"
                    placeholder="@brendas_bridal"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Instagram URL</label>
                  <input
                    type="text"
                    value={settings.instagram_url || ''}
                    onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                    className="input-field"
                    placeholder="https://www.instagram.com/brendas_bridal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Physical Address</label>
                  <input
                    type="text"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="input-field"
                    placeholder="KN 5 Avenue, Kimihurura, Kigali, Rwanda"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Location Badge Label</label>
                  <input
                    type="text"
                    value={settings.location_name || ''}
                    onChange={(e) => setSettings({ ...settings, location_name: e.target.value })}
                    className="input-field"
                    placeholder="Gishushu · Kigali, Rwanda"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-ink-400 mb-1.5">Local Shipping Fee (RWF)</label>
                  <input
                    type="number"
                    value={settings.shipping_fee || 0}
                    onChange={(e) => setSettings({ ...settings, shipping_fee: parseFloat(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="15000"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: FAQ Editor */}
        {activeTab === 'faq' && (
          <div className="bg-white border border-ink-100 p-6 md:p-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-xl font-light text-ink-900">Frequently Asked Questions</h2>
                <p className="text-xs text-ink-400 mt-0.5">Shown on the Contact page</p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="flex items-center gap-1.5 text-xs tracking-wide uppercase text-champagne-600 hover:text-champagne-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
            <div className="space-y-4">
              {(settings.faq || []).map((item, i) => (
                <div key={i} className="border border-ink-100 p-4 rounded bg-champagne-50/20">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Question"
                        value={item.q}
                        onChange={(e) => updateFaq(i, 'q', e.target.value)}
                        className="input-field"
                      />
                      <textarea
                        placeholder="Answer"
                        rows={2}
                        value={item.a}
                        onChange={(e) => updateFaq(i, 'a', e.target.value)}
                        className="input-field resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="p-2 text-ink-300 hover:text-rose-500 transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {(!settings.faq || settings.faq.length === 0) && (
                <p className="text-sm text-ink-400 text-center py-6">No FAQ items yet. Click "Add Question" above.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary py-3.5 px-10 shadow-lg hover:shadow-xl transition-all"
          >
            {saving ? 'Saving...' : 'Save & Publish Live'}
          </button>
        </div>
      </form>
    </div>
  );
}
