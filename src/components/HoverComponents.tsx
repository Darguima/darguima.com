import Link from 'next/link';

import getLinkAttributes from '@/utils/getLinkAttributes';

const hoverClassName = 'flex justify-center items-center rounded-2xl p-2 cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out';

interface HoverAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
}

export function HoverAnchor({
  children,
  href,
  className = '',
  target,
  rel,
  isExternal,
  ...rest
}: HoverAnchorProps) {
  const externalAttributes = getLinkAttributes(href, target, rel, isExternal);

  return (
    <Link
      href={href}
      {...externalAttributes}
      className={`${hoverClassName} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

type HoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function HoverButton({
  children,
  className = '',
  ...rest
}: HoverButtonProps) {
  return (
    <button
      className={`${hoverClassName} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}