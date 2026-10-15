import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import type { BuildPathArgs, BuildPathOptions, RouteKey } from '../../constants/routes';
import { useNavigation } from '../../hooks/useNavigation';
import type { NavigateArgs } from '../../hooks/useNavigation';
import { buildPath } from '../../utils/routing';

export type LinkProps<K extends RouteKey> = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  BuildPathOptions<K> & {
    to: K;
    replace?: boolean;
  };

/**
 * Anchor that navigates client-side. Params are type-checked like `navigate`.
 *
 * @example
 * <Link to="serviceCategory" params={{ category: 'catering' }}>Catering</Link>
 */
export function Link<K extends RouteKey>({ to, params, query, replace, onClick, ...rest }: LinkProps<K>) {
  const { navigate } = useNavigation();
  const options = { params, query, replace } as BuildPathOptions<K> & { replace?: boolean };
  const href = buildPath(to, ...([options] as BuildPathArgs<K>));

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    // Let the browser handle new-tab / modified clicks.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    navigate(to, ...([options] as NavigateArgs<K>));
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
