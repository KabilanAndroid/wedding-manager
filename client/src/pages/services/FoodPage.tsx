import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/food */
export function FoodPage() {
  return (
    <ServiceCategoryLayout
      category="food"
      intro="Traditional elai saapadu, morning tiffin counters and reception buffets from caterers who cook for big Tamil weddings every week."
      highlights={['Veg & non-veg menus', 'Tasting session before booking', 'Serving staff included']}
    />
  );
}
