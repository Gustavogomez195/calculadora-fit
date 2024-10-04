"use client";

import { useAuth } from "../context/AuthContext";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import Button from "../ui/Button";



const Navbar = () => {
  const { usuario } = useAuth();
  const router = useRouter();

  const manejarLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

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
      <ul className="flex gap-2 ">
        {usuario ? (
          <>
            <li>
              <Button href="/dashboard">
                Dashboard
              </Button>
            </li>
            <li>
              <Button onClick={manejarLogout} >
                Cerrar Sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button href="/signup">
                Registrarte
              </Button>
            </li>
            <li >
              <Button href="/login" >
                Iniciar Sesión 
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
