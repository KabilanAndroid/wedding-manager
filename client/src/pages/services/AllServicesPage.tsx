import { ChevronRight } from 'lucide-react';
import { Link } from '../../components/common/Link';
import { SectionHeader } from '../../components/common/SectionHeader';
import { CategoryIcons } from '../../components/services/categoryIcons';
import { ServiceCard } from '../../components/services/ServiceCard';
import { ServiceListings } from '../../constants/serviceListings';
import { ServiceCategories } from '../../constants/services';

/** /services: every category, then every service. */
export function AllServicesPage() {
  const services = [...ServiceListings].sort((a, b) => b.reviews - a.reviews);

  return (
    <main>
      <section className="bg-maroon-800 text-white">
        <div className="container-page py-10 sm:py-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-[11px] text-white/70">
              <li>
                <Link to="home" className="hover:text-gold-300">
                  Home
                </Link>
              </li>
              <li aria-current="page" className="inline-flex items-center gap-1 text-white">
                <ChevronRight size={12} aria-hidden="true" />
                All Services
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-[clamp(28px,4vw,40px)] leading-tight font-medium tracking-tight">All Services</h1>
          <p className="mt-3 max-w-150 text-sm text-white/85">
            Everything for the wedding in one place — pick a category to compare vendors, prices and reviews.
          </p>
        </div>
      </section>

      <section className="container-page pt-10" aria-labelledby="all-categories-title">
        <SectionHeader id="all-categories-title" eyebrow="Browse by category" title="Categories" />
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {ServiceCategories.map((c) => {
            const Icon = CategoryIcons[c.key];
            return (
              <li key={c.key}>
                <Link
                  to="serviceCategory"
                  params={{ category: c.key }}
                  className="flex h-full flex-col items-center gap-1.5 rounded-2xl border border-line bg-white px-3 pt-5 pb-4.5 text-center transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card"
                >
                  <span
                    className="mb-3 grid size-10.5 place-items-center rounded-[10px] bg-gold-50 text-saffron"
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-bold text-maroon-900">{c.navLabel}</span>
                  <span className="text-[9px] text-muted">{c.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-page pt-12 pb-16" aria-labelledby="all-services-title">
        <SectionHeader id="all-services-title" eyebrow="Most booked first" title="Every service" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
