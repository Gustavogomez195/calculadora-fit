// app/page.jsx
"use client";

import { useAuth } from "./components/context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && usuario) {
      router.push("/dashboard");
    }
  }, [usuario, cargando, router]);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full justify-center items-center ">
      <h1 className="text-4xl font-bold text-cyan-50">Calculadora de Harris-Benedict</h1>
      <p>
        Calcula tus necesidades calóricas diarias y guarda tus resultados.{" "}
        <a href="/signup" className="link">Regístrate</a> o <a href="/login" className="link">Inicia Sesión</a> para comenzar.
      </p>
    </div>
  );
};

export default Home;

