import Image from "next/image";
import Link from "next/link";

import getLinkAttributes from "@/utils/getLinkAttributes";

interface NavigationItem {
  label: React.ReactNode;
  href: string;
}

interface HeaderProps {
  navigationItems?: NavigationItem[];
  selectedItemIndex?: number;
}

const NavigationItem = ({
  href,
  selected = false,
  children
}: {
  href: string;
  selected?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 font-bold transition-colors border-b-2
        ${selected
          ? "text-primary border-primary "
          : "border-transparent hover:text-primary hover:border-primary-hover"}
        `}
      {...getLinkAttributes(href)}
    >
      {children}
    </Link>
  );
};

export default function Header({ navigationItems = [], selectedItemIndex = 0 }: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex flex-row gap-4 p-2">
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={`${item.label}-${index}`}
            href={item.href}
            selected={index === selectedItemIndex }
          >
            {item.label}
          </NavigationItem>
        ))}
      </div>

      <Link href="/">
        <Image src={"/logo.svg"} alt="Logo" width={48} height={48} className="m-2" />
      </Link>
    </header>
  );
}
