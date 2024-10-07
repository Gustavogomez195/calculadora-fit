"use client";

import Navbar from "./components/layout/NavBar";
import Calculadora from "./components/calculadora/Calculadora";
import Footer from "./components/layout/Footer";

const Home = () => {
 
  

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

