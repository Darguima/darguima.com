import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-end">
      <Image src={"/logo.svg"} alt="Logo" width={48} height={48} className="m-2"/>
    </header>
  );
}

