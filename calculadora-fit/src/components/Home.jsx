import Navbar from "./layout/NavBar"
import Footer from "./layout/Footer"
import Calculadora from "./calculadora/Calculadora"

const Home = () => {
  return (
    <div className="w-full  ">
      <Navbar/>
    
    <div className="flex flex-col justify-center items-center pt-10 pb-20 gap-2">

    <h1 className="lg:text-5xl text-3xl font-bold text-center">Calculadora de Harris-Benedict</h1>
    <p className="text-lg text-center">
      Calcula tus necesidades calóricas diarias y guarda tus resultados.
    </p>
      <Calculadora/>
    </div>
    <Footer/>
</div>
  )
}

export default Home