import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="min-h-[10vh] px-16 py-4 w-full bg-white flex items-center shadow-sm">
      <Link href={"/"}>
        <Image
          src={"/pokemon--logo.png"}
          width={120}
          height={90}
          alt={"Pokemon"}
        />
      </Link>
      
    </header>
  );
};

export default Header;
