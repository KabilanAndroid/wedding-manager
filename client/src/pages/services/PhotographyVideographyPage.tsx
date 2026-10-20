import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/photography-videography */
export function PhotographyVideographyPage() {
  return (
    <ServiceCategoryLayout
      category="photography-videography"
      intro="Candid and traditional photographers, videographers and album designers for every function from nichayathartham to reception."
      highlights={['Candid + traditional teams', 'Drone and live streaming', 'Album delivered in 30 days']}
    />
  );
}
