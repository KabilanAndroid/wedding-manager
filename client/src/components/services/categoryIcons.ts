import { Camera, Cookie, Flower2, Sparkles, Star, UtensilsCrossed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceCategoryKey } from '../../constants/services';

export const CategoryIcons: Record<ServiceCategoryKey, LucideIcon> = {
  food: UtensilsCrossed,
  decoration: Flower2,
  'photography-videography': Camera,
  'makeup-mehendi': Sparkles,
  snacks: Cookie,
  reviews: Star,
};
