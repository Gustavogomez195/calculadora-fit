"use client";


import Link from "next/link";
import Image from "next/image"



const Navbar = () => {
 
  return (
    <nav className="w-full flex items-center justify-between bg-black text-white px-12 py-4">
      <div className="flex justify-center items-center gap-2">


      <Image
      src="/mancuernas.png" 
      width={40}
      height={40}/>
      <Link href="/" className="text-2xl">
        Calculadora HB
      </Link>
      
      </div>
     
    </nav>
  );
};

export default Navbar;
