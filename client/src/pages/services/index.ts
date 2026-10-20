import type { ComponentType } from 'react';
import type { ServiceCategoryKey } from '../../constants/services';
import { CateringPage } from './CateringPage';
import { DecorationPage } from './DecorationPage';
import { LogisticsPage } from './LogisticsPage';
import { MandapamPage } from './MandapamPage';
import { MusicPage } from './MusicPage';
import { PhotographyPage } from './PhotographyPage';
import { TravelPage } from './TravelPage';

export { AllServicesPage } from './AllServicesPage';

/** The page shown at /services/:category, one per category. */
export const CategoryPages: Record<ServiceCategoryKey, ComponentType> = {
  catering: CateringPage,
  mandapam: MandapamPage,
  decoration: DecorationPage,
  photography: PhotographyPage,
  music: MusicPage,
  logistics: LogisticsPage,
  travel: TravelPage,
};
