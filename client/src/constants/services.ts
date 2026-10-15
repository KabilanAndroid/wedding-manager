export type ServiceCategoryKey =
  | 'catering'
  | 'mandapam'
  | 'decoration'
  | 'photography'
  | 'music'
  | 'logistics'
  | 'travel';

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
  { key: 'catering', navLabel: 'Catering', title: 'Catering', badge: 'CT', count: '42 vendors', inNav: true, featured: true },
  { key: 'mandapam', navLabel: 'Mandapam', title: 'Mandapams', badge: 'MH', count: '18 venues', inNav: true, featured: true },
  { key: 'decoration', navLabel: 'Decoration', title: 'Decoration', badge: 'DC', count: '35 teams', inNav: true, featured: true },
  { key: 'photography', navLabel: 'Photography', title: 'Photography', badge: 'PH', count: '27 studios', inNav: true, featured: true },
  { key: 'music', navLabel: 'Nadaswaram & DJ', title: 'Music & Sound', badge: 'MS', count: '21 vendors', inNav: true, featured: true },
  { key: 'logistics', navLabel: 'Guest Logistics', title: 'Guest Logistics', badge: 'GL', count: '12 partners', inNav: true, featured: false },
  { key: 'travel', navLabel: 'Travel & Stay', title: 'Travel & Stay', badge: 'TR', count: '16 partners', inNav: false, featured: true },
];
