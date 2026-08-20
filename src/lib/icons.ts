import {
  Heart, Users, Lightbulb, Target, GraduationCap, Stethoscope,
  Accessibility, Home, Briefcase, Apple, CreditCard, Building2, Smartphone,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Users, Lightbulb, Target,
  GraduationCap, Stethoscope, Accessibility, Home, Briefcase, Apple,
  CreditCard, Building2, Smartphone,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Heart;
}
