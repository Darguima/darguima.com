import { HTMLAttributeAnchorTarget } from "react";

export default function getLinkAttributes(
  href: string,
  target: HTMLAttributeAnchorTarget | undefined = '_blank',
  rel: string | undefined = 'noopener noreferrer',
  forceExternal: boolean = false
) {
  const isExternal = forceExternal || href.startsWith('http') || href.startsWith('www') || false;

  return isExternal ? { target, rel } : {};
}