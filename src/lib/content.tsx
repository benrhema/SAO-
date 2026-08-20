import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from './api';

const EMPTY = {
  settings: {},
  team: [],
  partners: [],
  testimonials: [],
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

type Content = typeof EMPTY;

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
