import { useMemo, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { ServiceListings } from '../../constants/serviceListings';
import type { PopularService } from '../../constants/popularServices';
import { ServiceCategories } from '../../constants/services';
import type { ServiceCategoryKey } from '../../constants/services';
import { Link } from '../common/Link';
import { CategoryIcons } from './categoryIcons';
import { ServiceCard } from './ServiceCard';

type SortKey = 'popular' | 'rating' | 'priceLow' | 'priceHigh';

const SortOptions: Record<SortKey, { label: string; compare: (a: PopularService, b: PopularService) => number }> = {
  popular: { label: 'Most popular', compare: (a, b) => b.reviews - a.reviews },
  rating: { label: 'Top rated', compare: (a, b) => b.rating - a.rating },
  priceLow: { label: 'Price: low to high', compare: (a, b) => a.price - b.price },
  priceHigh: { label: 'Price: high to low', compare: (a, b) => b.price - a.price },
};

interface ServiceCategoryLayoutProps {
  category: ServiceCategoryKey;
  /** One or two sentences under the title. */
  intro: string;
  /** Short selling points shown as ticks in the banner. */
  highlights: readonly string[];
}

/** Shared page shell for every service category: banner, sort control and vendor grid. */
export function ServiceCategoryLayout({ category, intro, highlights }: ServiceCategoryLayoutProps) {
  const [sort, setSort] = useState<SortKey>('popular');
  const meta = ServiceCategories.find((c) => c.key === category);
  const Icon = CategoryIcons[category];
  const title = meta?.navLabel ?? category;

  const services = useMemo(
    () => ServiceListings.filter((s) => s.category === category).sort(SortOptions[sort].compare),
    [category, sort],
  );

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
              <li className="inline-flex items-center gap-1">
                <ChevronRight size={12} aria-hidden="true" />
                <Link to="services" className="hover:text-gold-300">
                  All Services
                </Link>
              </li>
              <li aria-current="page" className="inline-flex items-center gap-1 text-white">
                <ChevronRight size={12} aria-hidden="true" />
                {title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex items-start gap-4">
            <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-gold-50 text-saffron" aria-hidden="true">
              <Icon size={26} strokeWidth={1.75} />
            </span>
            <div>
              <h1 className="text-[clamp(28px,4vw,40px)] leading-tight font-medium tracking-tight">{title}</h1>
              {meta && <p className="mt-1 text-xs font-bold text-gold-300">{meta.count}</p>}
            </div>
          </div>

          <p className="mt-4 max-w-150 text-sm text-white/85">{intro}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold"
              >
                <Check size={12} className="text-gold-400" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pt-8 pb-16" aria-label={`${title} services`}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <strong className="text-ink">{services.length}</strong> {services.length === 1 ? 'service' : 'services'}
          </p>
          <label className="flex items-center gap-2 text-xs text-muted">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 cursor-pointer rounded-lg border border-line bg-white px-2.5 text-xs font-semibold text-ink focus:border-gold-400 focus:outline-none"
            >
              {(Object.keys(SortOptions) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {SortOptions[key].label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {services.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center text-sm text-muted">
            Vendors for {title} are coming soon.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
