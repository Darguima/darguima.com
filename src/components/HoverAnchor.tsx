import React from 'react';

interface HoverAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  visible?: boolean;
  isExternal?: boolean;
}

export default function HoverAnchor({
  children,
  href,
  visible = true,
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
    <a
      href={href}
      {...externalAttributes}
      className={`flex justify-center items-center rounded-2xl p-2 cursor-pointer hover:bg-primary-hover ${visible ? '' : 'hidden'} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

