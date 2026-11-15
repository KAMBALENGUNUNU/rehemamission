import { useEffect } from 'react';
import { useStore } from '@/store/StoreContext';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  schema?: Record<string, any>;
}

const DEFAULT_ORIGIN = 'https://rehemamission.org';

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SEOHead({
  title,
  description,
  canonicalPath = '',
  keywords,
  ogImage = '/og-image.png',
  ogType = 'website',
  schema,
}: SEOHeadProps) {
  const { language } = useStore();

  useEffect(() => {
    // 1. Dynamic Page Title
    document.title = title;

    // 2. Set HTML Lang attribute
    document.documentElement.lang = language || 'en';

    // 3. Meta Description & Keywords
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Canonical URL
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : DEFAULT_ORIGIN;
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullUrl = `${origin}${cleanPath === '/' ? '' : cleanPath}`;
    setCanonical(fullUrl);

    // 5. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', ogType);

    const imageUrl = ogImage.startsWith('http') ? ogImage : `${origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    setMetaTag('property', 'og:image', imageUrl);

    // 6. Twitter Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // 7. Inject Page-Specific Schema if provided
    let scriptEl: HTMLScriptElement | null = null;
    if (schema) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-page-schema', 'true');
      scriptEl.text = JSON.stringify(schema);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, canonicalPath, keywords, ogImage, ogType, schema, language]);

  return null;
}
