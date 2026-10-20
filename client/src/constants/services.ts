/** URL-safe: used as /services/<key>. Put display text with spaces or '&' in navLabel/title. */
export type ServiceCategoryKey =
  | 'food'
  | 'decoration'
  | 'photography-videography'
  | 'makeup-mehendi'
  | 'snacks'
  | 'reviews';

export interface ServiceCategory {
  key: ServiceCategoryKey;
  /** Label in the header nav. */
  navLabel: string;
  /** Label on the home page category card. */
  title: string;
  /** Two-letter badge on the category card. */
  badge: string;
  /** e.g. '42 vendors' */
  count: string;
  /** Shown in the header nav. */
  inNav: boolean;
  /** Shown as a card on the home page. */
  featured: boolean;
}

export const ServiceCategories: readonly ServiceCategory[] = [
  { key: 'food', navLabel: 'Food', title: 'Food', badge: 'FD', count: '42 vendors', inNav: true, featured: true },
  { key: 'decoration', navLabel: 'Decoration', title: 'Decoration', badge: 'DC', count: '35 teams', inNav: true, featured: true },
  { key: 'photography-videography', navLabel: 'Photography & Videography', title: 'Photography & Videography', badge: 'PV', count: '27 studios', inNav: true, featured: true },
  { key: 'makeup-mehendi', navLabel: 'Makeup & Mehendi', title: 'Makeup & Mehendi', badge: 'MM', count: '21 studios', inNav: true, featured: true },
  { key: 'snacks', navLabel: 'Snacks', title: 'Snacks', badge: 'SN', count: '18 vendors', inNav: true, featured: true },
  { key: 'reviews', navLabel: 'Reviews', title: 'Reviews', badge: 'RV', count: '12 partners', inNav: true, featured: false },
];
