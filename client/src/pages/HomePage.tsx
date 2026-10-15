import { ArrowRight, Check, Headset, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '../components/common/Link';
import { SectionHeader } from '../components/common/SectionHeader';
import { ServiceCard } from '../components/services/ServiceCard';
import { PopularServices } from '../constants/popularServices';
import { ServiceCategories } from '../constants/services';

interface TrustPoint {
  icon: LucideIcon;
  label: string;
}

const TrustPoints: readonly TrustPoint[] = [
  { icon: Check, label: 'Verified vendors' },
  { icon: IndianRupee, label: 'Transparent pricing' },
  { icon: Headset, label: '24/7 Family support' },
];

export function HomePage() {
  const featured = ServiceCategories.filter((c) => c.featured);

  return (
    <main>
      {/* Swap in a real photo: replace bg-hero with bg-[url('./assets/hero.jpg')] bg-cover and keep the shade. */}
      <section className="bg-hero relative isolate flex min-h-115 flex-col overflow-hidden text-white sm:min-h-125">
        <div
          className="bg-garlands absolute inset-0 -z-10 opacity-45 sm:left-[30%] sm:opacity-90"
          aria-hidden="true"
        />

        <div className="container-page flex flex-1 flex-col items-start justify-center pt-18 pb-26">
          <p className="eyebrow mb-4 text-saffron">wedding season offers</p>
          <h1 className="max-w-190 text-[clamp(40px,6vw,64px)] leading-[1.05] font-medium tracking-[-0.04em]">
            Everything for the big day,
            <em className="mt-1 block font-serif font-normal tracking-[-0.02em] text-gold-400">all in one place.</em>
          </h1>
          <p className="mt-5 mb-7 max-w-130 text-sm text-white/85">
            Book trusted local vendors, track every delivery and celebrate stress-free.
          </p>
          <Link to="services" className="btn-primary">
            Explore Services
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <ul className="absolute bottom-0 left-1/2 grid w-[min(720px,calc(100%-32px))] -translate-x-1/2 grid-cols-3 rounded-t-2xl bg-maroon-900/88 py-4 backdrop-blur-sm sm:px-2">
          {TrustPoints.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center justify-center gap-1 text-center text-[10px] font-bold not-first:border-l not-first:border-white/15 sm:flex-row sm:gap-2 sm:text-[11px]"
            >
              <Icon size={14} className="shrink-0 text-gold-400" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-12" aria-labelledby="categories-title">
        <div className="container-page">
          <SectionHeader
            id="categories-title"
            eyebrow="Plan by category"
            title="What are you looking for?"
            linkTo="services"
            linkLabel="View all categories"
          />

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {featured.map((c) => (
              <li key={c.key}>
                <Link
                  to="serviceCategory"
                  params={{ category: c.key }}
                  className="flex h-full flex-col items-center gap-1.5 rounded-2xl border border-line bg-white px-3 pt-5 pb-4.5 text-center transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card"
                >
                  <span
                    className="mb-3 grid size-10.5 place-items-center rounded-[10px] bg-gold-50 text-[10px] font-bold tracking-wider text-saffron"
                    aria-hidden="true"
                  >
                    {c.badge}
                  </span>
                  <span className="text-xs font-bold text-maroon-900">{c.title}</span>
                  <span className="text-[9px] text-muted">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-12 pb-16" aria-labelledby="popular-title">
        <div className="container-page">
          <SectionHeader
            id="popular-title"
            eyebrow="Handpicked for your function"
            title="Popular services near"
            linkTo="services"
            linkLabel="See all services"
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PopularServices.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
