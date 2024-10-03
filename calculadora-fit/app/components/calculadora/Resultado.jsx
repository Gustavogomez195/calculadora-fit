// components/Calculator/ResultadosGuardados.jsx
"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Resultado = () => {
  const { usuario } = useAuth();
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerResultados = async () => {
      try {
        const q = query(
          collection(db, "resultados"),
          where("uid", "==", usuario.uid),
          orderBy("fecha", "desc")
        );
        const querySnapshot = await getDocs(q);
        const datos = [];
        querySnapshot.forEach((doc) => {
          datos.push({ id: doc.id, ...doc.data() });
        });
        setResultados(datos);
      } catch (err) {
        console.error("Error al obtener resultados:", err);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) {
      obtenerResultados();
    }
  }, [usuario]);

  if (cargando) {
    return <p>Cargando resultados...</p>;
  }

  return (
    <div className="resultados-guardados">
      <h2>Mis Resultados Guardados</h2>
      {resultados.length === 0 ? (
        <p>No tienes resultados guardados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Calorías Diarias</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado) => (
              <tr key={resultado.id}>
                <td>{resultado.fecha.toDate().toLocaleString()}</td>
                <td>{resultado.calorias} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Resultado;
