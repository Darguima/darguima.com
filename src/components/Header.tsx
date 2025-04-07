import Image from "next/image";
import Link from "next/link";

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
    <a
      href={href}
      className={`
        px-3 py-2 font-bold transition-colors border-b-2
        ${selected
          ? "text-primary border-primary "
          : "border-transparent hover:text-primary hover:border-primary-hover"}
        `}
    >
      {children}
    </a>
  );
};

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex flex-row gap-4 p-2">
        <NavigationItem href="#about" selected>
          About
        </NavigationItem>

        <NavigationItem href="#projects">
          Projects
        </NavigationItem>
      </div>

      <Link href="/">
        <Image src={"/logo.svg"} alt="Logo" width={48} height={48} className="m-2" />
      </Link>
    </header>
  );
}
