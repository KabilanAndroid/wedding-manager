import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/mandapam */
export function MandapamPage() {
  return (
    <ServiceCategoryLayout
      category="mandapam"
      intro="Kalyana mandapams, AC halls and garden lawns for the muhurtham and the reception, with dining halls and parking checked for you."
      highlights={['Capacity from 200 to 2,000 guests', 'Dining hall & bridal rooms', 'Parking & generator backup']}
    />
  );
}
