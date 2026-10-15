import type { ServiceCategoryKey } from './services';

export type ServiceTag = 'Bestseller' | 'Top rated' | 'Popular' | 'Great value';
export type PriceUnit = 'per plate' | 'per set' | 'onwards';

export interface PopularService {
  id: string;
  category: ServiceCategoryKey;
  vendor: string;
  title: string;
  tag?: ServiceTag;
  rating: number;
  reviews: number;
  /** Price in rupees. */
  price: number;
  priceUnit: PriceUnit;
  /** Path under /public. Falls back to a category placeholder if the file is missing. */
  image: string;
}

// Placeholder data until the vendors API exists.
export const PopularServices: readonly PopularService[] = [
  {
    id: 'traditional-elai-saapadu',
    category: 'catering',
    vendor: 'Sri Annapoorani Caterers',
    title: 'Traditional Elai Saapadu',
    tag: 'Bestseller',
    rating: 4.9,
    reviews: 128,
    price: 380,
    priceUnit: 'per plate',
    image: '/images/services/elai-saapadu.jpg',
  },
  {
    id: 'premium-wedding-stage',
    category: 'decoration',
    vendor: 'Vellore Flower Decor',
    title: 'Premium Wedding Stage',
    tag: 'Top rated',
    rating: 4.8,
    reviews: 86,
    price: 42000,
    priceUnit: 'onwards',
    image: '/images/services/wedding-stage.jpg',
  },
  {
    id: 'bridal-floral-collection',
    category: 'decoration',
    vendor: 'Malarvizhi Flowers',
    title: 'Bridal Floral Collection',
    tag: 'Popular',
    rating: 4.7,
    reviews: 64,
    price: 7500,
    priceUnit: 'per set',
    image: '/images/services/bridal-florals.jpg',
  },
  {
    id: 'reception-table-decor',
    category: 'decoration',
    vendor: 'Aura Events & Decor',
    title: 'Reception Table Decor',
    tag: 'Great value',
    rating: 4.6,
    reviews: 52,
    price: 18900,
    priceUnit: 'onwards',
    image: '/images/services/reception-table.jpg',
  },
];
