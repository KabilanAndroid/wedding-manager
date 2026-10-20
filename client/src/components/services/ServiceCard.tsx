import { useState } from 'react';
import { Check, Heart, Star } from 'lucide-react';
import type { PopularService } from '../../constants/popularServices';
import { useCart } from '../../context/CartContext';
import { formatRupees } from '../../utils/format';
import { Link } from '../common/Link';
import { CategoryIcons } from './categoryIcons';

interface ServiceCardProps {
  service: PopularService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const cart = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const inCart = cart.has(service.id);
  const Icon = CategoryIcons[service.category];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-gold-50">
        {imageFailed ? (
          <div className="grid size-full place-items-center bg-linear-to-br from-gold-50 via-gold-300/40 to-marigold-600/30 text-marigold-700">
            <Icon size={48} strokeWidth={1.25} aria-hidden="true" />
          </div>
        ) : (
          <img
            src={service.image}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        {service.tag && (
          <span className="absolute top-3 left-3 rounded-md bg-maroon-900/90 px-2 py-1 text-[9px] font-bold text-white">
            {service.tag}
          </span>
        )}

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${service.title} from wishlist` : `Save ${service.title} to wishlist`}
          className="absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-white/95 text-maroon-900 shadow-sm transition hover:scale-110"
        >
          <Heart size={15} className={saved ? 'fill-red-600 text-red-600' : ''} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-4 pb-3.5">
        <p className="text-[9px] font-bold tracking-wider text-muted uppercase">{service.vendor}</p>
        <h3 className="mt-1 text-[15px] leading-snug text-maroon-900">
          {/* Stretched link: the whole card is clickable, buttons sit above it with z-10. */}
          <Link
            to="serviceDetail"
            params={{ category: service.category, serviceId: service.id }}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-gold-400"
          >
            {service.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <span className="inline-flex items-center gap-0.5 rounded bg-green-700 px-1.5 py-0.5 text-[9px] font-bold text-white">
            {service.rating.toFixed(1)}
            <Star size={8} className="fill-current" aria-hidden="true" />
            <span className="sr-only">out of 5</span>
          </span>
          <span className="text-[9px] text-muted">{service.reviews} reviews</span>
        </div>

        <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
          <p className="leading-tight">
            <span className="block text-base font-bold text-ink">{formatRupees(service.price)}</span>
            <span className="text-[9px] text-muted">{service.priceUnit}</span>
          </p>
          <button
            type="button"
            onClick={() => cart.toggle(service.id)}
            aria-pressed={inCart}
            aria-label={inCart ? `Remove ${service.title} from cart` : `Add ${service.title} to cart`}
            className={`relative z-10 inline-flex h-7.5 cursor-pointer items-center gap-1 rounded-lg border px-3.5 text-[10px] font-bold transition ${
              inCart
                ? 'border-marigold-600 bg-marigold-600 text-white hover:bg-marigold-700'
                : 'border-marigold-600 bg-gold-50 text-marigold-700 hover:bg-gold-300/40'
            }`}
          >
            {inCart && <Check size={12} aria-hidden="true" />}
            {inCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
