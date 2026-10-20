import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/snacks */
export function SnacksPage() {
  return (
    <ServiceCategoryLayout
      category="snacks"
      intro="Evening snack counters, sweets and return-gift boxes for the reception and every function before it."
      highlights={['Live snack counters', 'Sweet boxes for return gifts', 'Bulk orders for 500+ guests']}
    />
  );
}
