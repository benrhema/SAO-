import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from './api';

interface Content {
  settings: Record<string, string>;
  team: any[];
  partners: any[];
  testimonials: any[];
  partner_testimonials: any[];
  programs: any[];
  impact_stats: any[];
  success_stories: any[];
  volunteer_opportunities: any[];
  volunteer_requirements: any[];
  volunteer_benefits: any[];
  upcoming_events: any[];
  past_events: any[];
  news: any[];
  media: { all: any[]; impact: any[]; programs: any[]; events: any[] };
  photo_galleries: any[];
  resources: { reports: any[]; brochures: any[]; media: any[]; forms: any[] };
  about_values: any[];
  about_stats: any[];
  contact_info: Record<string, any>;
  donate_stats: any[];
  donate_suggested_amounts: number[];
  donate_impact_examples: any[];
  donate_payment_methods: any[];
  donate_bank: Record<string, any>;
}

const EMPTY: Content = {
  settings: {},
  team: [],
  partners: [],
  testimonials: [],
  partner_testimonials: [],
  programs: [],
  impact_stats: [],
  success_stories: [],
  volunteer_opportunities: [],
  volunteer_requirements: [],
  volunteer_benefits: [],
  upcoming_events: [],
  past_events: [],
  news: [],
  media: { all: [], impact: [], programs: [], events: [] },
  photo_galleries: [],
  resources: { reports: [], brochures: [], media: [], forms: [] },
  about_values: [],
  about_stats: [],
  contact_info: {},
  donate_stats: [],
  donate_suggested_amounts: [],
  donate_impact_examples: [],
  donate_payment_methods: [],
  donate_bank: {},
};

const ContentContext = createContext<Content>(EMPTY);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(EMPTY);

  useEffect(() => {
    let active = true;
    api
      .getContent()
      .then((data) => {
        if (active) setContent({ ...EMPTY, ...data });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
