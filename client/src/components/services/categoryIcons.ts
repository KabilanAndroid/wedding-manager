import { BedDouble, Bus, Camera, Flower2, Landmark, Music, UtensilsCrossed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceCategoryKey } from '../../constants/services';

export const CategoryIcons: Record<ServiceCategoryKey, LucideIcon> = {
  catering: UtensilsCrossed,
  mandapam: Landmark,
  decoration: Flower2,
  photography: Camera,
  music: Music,
  logistics: Bus,
  travel: BedDouble,
};
