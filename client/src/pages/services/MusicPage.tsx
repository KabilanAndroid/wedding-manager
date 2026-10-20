import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/music */
export function MusicPage() {
  return (
    <ServiceCategoryLayout
      category="music"
      intro="Nadaswaram and thavil for the muhurtham, and DJs, sound and lighting for the reception night."
      highlights={['Traditional nadaswaram troupes', 'DJ, sound & lighting', 'Backup equipment on site']}
    />
  );
}
