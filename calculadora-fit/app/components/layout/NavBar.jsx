// components/Layout/Navbar.jsx
"use client";

import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    <nav className="navbar">
      <Link href="/">
        <a className="logo">Calculadora HB</a>
      </Link>
      <ul>
        {usuario ? (
          <>
            <li>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <button onClick={manejarLogout} className="button">
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <a>Iniciar Sesión</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Registrar</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
