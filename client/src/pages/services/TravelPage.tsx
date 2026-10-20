import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/travel */
export function TravelPage() {
  return (
    <ServiceCategoryLayout
      category="travel"
      intro="Hotel room blocks and cab packages near the venue for families travelling in for the wedding."
      highlights={['Rooms near the venue', 'Group booking rates', 'Airport & station cabs']}
    />
  );
}
