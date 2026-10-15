import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string;
  name: string;
  /** Short glyph shown inside the input, e.g. '@'. */
  prefix?: string;
}

export function TextField({ label, prefix, className = '', ...input }: TextFieldProps) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-ink">
        {label}
      </label>
      <div className="flex h-12.5 items-center rounded-xl border border-line bg-white/70 transition focus-within:border-gold-400 focus-within:bg-white focus-within:ring-3 focus-within:ring-gold-400/25">
        {prefix && (
          <span className="w-11 shrink-0 text-center text-xs font-semibold text-muted" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={`size-full min-w-0 bg-transparent pr-4 text-[15px] text-ink placeholder:text-muted/80 focus:outline-none ${prefix ? '' : 'pl-4'} ${className}`}
          {...input}
        />
      </div>
    </div>
  );
}
