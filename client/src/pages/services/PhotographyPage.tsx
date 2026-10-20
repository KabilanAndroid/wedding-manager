import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/photography */
export function PhotographyPage() {
  return (
    <ServiceCategoryLayout
      category="photography"
      intro="Candid and traditional photographers, videographers and album designers for every function from nichayathartham to reception."
      highlights={['Candid + traditional teams', 'Drone and live streaming', 'Album delivered in 30 days']}
    />
  );
}
