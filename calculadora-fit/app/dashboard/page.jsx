import Calculadora from "../components/calculadora/Calculadora";
import Resultado from "../components/calculadora/Resultado";
import Navbar from "../components/layout/NavBar";
import ProtectedRoute from "../components/layout/ProtectedRoute";



const Dashboard = () => {
  return (
    <ProtectedRoute>

    <div>
    <h1>Dashboard</h1>
    <Navbar/>
    <Calculadora />
    <Resultado />
</div>
    </ProtectedRoute>
  )
}

export default Dashboard