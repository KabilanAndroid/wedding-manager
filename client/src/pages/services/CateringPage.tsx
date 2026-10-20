import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/catering */
export function CateringPage() {
  return (
    <ServiceCategoryLayout
      category="catering"
      intro="Traditional elai saapadu, morning tiffin counters and reception buffets from caterers who cook for big Tamil weddings every week."
      highlights={['Veg & non-veg menus', 'Tasting session before booking', 'Serving staff included']}
    />
  );
}
