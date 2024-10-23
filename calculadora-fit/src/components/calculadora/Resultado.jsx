

import { useEffect, useState } from "react";

const Resultado = () => {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerResultados = () => {
      const datos = JSON.parse(localStorage.getItem("resultados")) || [];
      setResultados(datos);
      setCargando(false);
    };

    obtenerResultados();
  }, []);

  const eliminarResultado = (index) => {
    if (confirm("¿Estás seguro de que deseas eliminar este resultado?")) {
      const nuevosResultados = [...resultados];
      nuevosResultados.splice(index, 1);
      setResultados(nuevosResultados);
      localStorage.setItem("resultados", JSON.stringify(nuevosResultados));
    }
  };

  const eliminarTodos = () => {
    if (confirm("¿Estás seguro de que deseas eliminar todos los resultados?")) {
      setResultados([]);
      localStorage.removeItem("resultados");
    }
  };

  if (cargando) {
    return <p>Cargando resultados...</p>;
  }

  return (
    <div className=" text-lg pt-12 font-bold">
      <h2 className="text-2xl font-bold mb-4">Mis Resultados Guardados</h2>
      {resultados.length === 0 ? (
        <p>No tienes resultados guardados.</p>
      ) : (
        <>
         
         <div className="overflow-x-auto">
  <table className="min-w-full border-collapse">
    <thead className="hidden md:table-header-group">
      <tr>
        <th className="border p-2">Fecha</th>
        <th className="border p-2">Mantenimiento</th>
        <th className="border p-2">Ajustes</th>
        <th className="border p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {resultados.map((resultado, index) => (
        <tr key={index} className="font-light block md:table-row">
          {/* Fecha */}
          <td className="border p-2 block md:table-cell">
            <span className="block md:hidden font-bold">Fecha:</span>
            {new Date(resultado.fecha).toLocaleString()}
          </td>
          
          {/* Mantenimiento */}
          <td className="border p-2 block md:table-cell">
            <span className="block md:hidden font-bold">Mantenimiento:</span>
            {resultado.mantenimiento} kcal
          </td>
          
          {/* Ajustes */}
          <td className="border p-2 block md:table-cell">
            <span className="block md:hidden font-bold">Ajustes:</span>
            {resultado.aumentar || resultado.bajar ? (
              <ul className="list-disc list-inside">
                {resultado.aumentar && (
                  <>
                    <li>Aumento Lento: {resultado.aumentar.lento} kcal</li>
                    <li>Aumento Rápido: {resultado.aumentar.rapido} kcal</li>
                    <li>Aumento Muy Rápido: {resultado.aumentar.muy_rapido} kcal</li>
                  </>
                )}
                {resultado.bajar && (
                  <>
                    <li>Pérdida Lenta: {resultado.bajar.lento} kcal</li>
                    <li>Pérdida Rápida: {resultado.bajar.rapido} kcal</li>
                    <li>Pérdida Muy Rápida: {resultado.bajar.muy_rapido} kcal</li>
                  </>
                )}
              </ul>
            ) : (
              "N/A"
            )}
          </td>
          
          
          <td className="border p-2 text-center block md:table-cell">
            <span className="block md:hidden font-bold">Acciones:</span>
            <button
              onClick={() => eliminarResultado(index)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
  
  <button
    onClick={eliminarTodos}
    className="mt-4 text-white border rounded-lg py-2 px-4 text-md bg-black hover:bg-[#252525] transition-all duration-200"
  >
    Eliminar Todos los Resultados
  </button>
</div>
        </>
      )}
    </div>
  );
};

export default Resultado;
