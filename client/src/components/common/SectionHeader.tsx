import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { RouteKey } from '../../constants/routes';
import type { HasParams } from '../../constants/routes';
import { Link } from './Link';

/** Only routes without params can be the "see all" target. */
type ParamlessRoute = { [K in RouteKey]: HasParams<K> extends true ? never : K }[RouteKey];

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  linkTo?: ParamlessRoute;
  linkLabel?: string;
}

export function SectionHeader({ id, eyebrow, title, linkTo, linkLabel }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2 text-[10px] text-marigold-700">{eyebrow}</p>
        <h2 id={id} className="text-2xl font-medium tracking-tight text-maroon-900">
          {title}
        </h2>
      </div>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-marigold-700 hover:text-maroon-700"
        >
          {linkLabel} <ArrowRight size={14} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
