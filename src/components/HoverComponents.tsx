import Link from 'next/link';

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
  const isExternalCalculated = isExternal !== undefined ? isExternal : href?.startsWith('http') || false;

  // Merge the external link attributes with any provided by the user
  const externalAttributes = isExternalCalculated ? {
    target: target || '_blank',
    rel: rel || 'noopener noreferrer'
  } : {};

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