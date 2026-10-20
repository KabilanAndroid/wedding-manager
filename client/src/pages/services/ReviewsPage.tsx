import { ServiceCategoryLayout } from '../../components/services/ServiceCategoryLayout';

/** /services/reviews */
export function ReviewsPage() {
  return (
    <ServiceCategoryLayout
      category="reviews"
      intro="Honest reviews and ratings from families who booked vendors through Kalyana Manager."
      highlights={['Verified bookings only', 'Ratings for every vendor', 'Photos from real weddings']}
    />
  );
}
