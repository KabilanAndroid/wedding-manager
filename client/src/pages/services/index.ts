import type { ComponentType } from 'react';
import type { ServiceCategoryKey } from '../../constants/services';
import { DecorationPage } from './DecorationPage';
import { FoodPage } from './FoodPage';
import { MakeupMehendiPage } from './MakeupMehendiPage';
import { PhotographyVideographyPage } from './PhotographyVideographyPage';
import { ReviewsPage } from './ReviewsPage';
import { SnacksPage } from './SnacksPage';

export { AllServicesPage } from './AllServicesPage';

/** The page shown at /services/:category, one per category. */
export const CategoryPages: Record<ServiceCategoryKey, ComponentType> = {
  food: FoodPage,
  decoration: DecorationPage,
  'photography-videography': PhotographyVideographyPage,
  'makeup-mehendi': MakeupMehendiPage,
  snacks: SnacksPage,
  reviews: ReviewsPage,
};
