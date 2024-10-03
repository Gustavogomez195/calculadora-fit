import Calculadora from "../components/calculadora/Calculadora";
import Resultado from "../components/calculadora/Resultado";
import ProtectedRoute from "../components/layout/ProtectedRoute";



const Dashboard = () => {
  return (
    <ProtectedRoute>

    <div>
    <h1>Dashboard</h1>
    <Calculadora />
    <Resultado />
</div>
    </ProtectedRoute>
  )
}

export default Dashboard