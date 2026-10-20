import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/logistics */
export function LogisticsPage() {
  return (
    <ServiceCategoryLayout
      category="logistics"
      intro="Buses, welcome desks and help teams so outstation guests arrive on time and know where to go."
      highlights={['Guest shuttles & pickups', 'Welcome desk staff', 'Live guest tracking']}
    />
  );
}
