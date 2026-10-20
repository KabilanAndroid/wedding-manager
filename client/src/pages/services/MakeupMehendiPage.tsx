import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/makeup-mehendi */
export function MakeupMehendiPage() {
  return (
    <ServiceCategoryLayout
      category="makeup-mehendi"
      intro="Bridal makeup artists, hairstylists and mehendi artists who come to your home or the mandapam on the day."
      highlights={['Trial session before the wedding', 'Bridal & family packages', 'Home and venue visits']}
    />
  );
}
