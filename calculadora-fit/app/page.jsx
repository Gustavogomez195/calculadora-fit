"use client";

import { useAuth } from "./components/context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./components/layout/NavBar";
import Calculadora from "./components/calculadora/Calculadora";
import Footer from "./components/layout/Footer";

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
    <>
    <main className="w-full ">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-20 gap-2">

      <h1 className="text-5xl font-bold ">Calculadora de Harris-Benedict</h1>
      <p className="text-lg">
        Calcula tus necesidades calóricas diarias y guarda tus resultados.
        
      </p>
      
      <Calculadora/>
      </div>
    </main>
    <footer>
      <Footer/>
    </footer>
    </>
  );
};

export default Home;

