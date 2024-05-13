/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PiBell, PiGear, PiList } from "react-icons/pi";

export default function Navbar() {
  return (
    <nav className="flex w-full gap-x-5 items-center justify-between py-7 pb-5">
      <Link href="/">
        <img src="/logo.png" className="max-h-[30px]" alt="logo" />
      </Link>

      <div className="flex gap-x-5">
        <PiBell className="text-3xl text-black" />
        <Link href={"/detento/administrar"}>
          <PiGear className="text-3xl text-black" />
        </Link>
      </div>
    </nav>
  );
}
