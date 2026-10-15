import { Link } from '../components/common/Link';

interface PlaceholderPageProps {
  title: string;
}

/** Stand-in for pages that aren't built yet. */
export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="container-page grid justify-items-start gap-4 py-20">
      <p className="eyebrow text-saffron">Coming soon</p>
      <h1 className="font-serif text-4xl font-medium">{title}</h1>
      <Link to="home" className="btn-primary">
        Back to home
      </Link>
    </main>
  );
}
