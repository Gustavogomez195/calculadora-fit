// components/Calculator/HarrisBenedictCalculator.jsx
"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Calculadora = () => {
  const { usuario } = useAuth();
  const [form, setForm] = useState({
    sexo: "masculino",
    peso: "",
    altura: "",
    edad: "",
    actividad: "sedentario",
  });
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const actividades = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    activo: 1.725,
    muy_activo: 1.9,
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcularTMB = () => {
    const { sexo, peso, altura, edad, actividad } = form;
    let tmb;

    if (sexo === "masculino") {
      tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
    } else {
      tmb = 447.593 + 9.247 * peso + 3.098 * altura - 4.330 * edad;
    }

    const caloriasDiarias = tmb * actividades[actividad];
    return caloriasDiarias.toFixed(2);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const { peso, altura, edad } = form;

    // Validaciones básicas
    if (!peso || !altura || !edad) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const calorias = calcularTMB();
    setResultado(calorias);

    // Guardar en Firestore
    try {
      await addDoc(collection(db, "resultados"), {
        uid: usuario.uid,
        calorias,
        fecha: Timestamp.fromDate(new Date()),
      });
      setError("");
    } catch (err) {
      setError("Error al guardar los resultados.");
      console.error(err);
    }
  };

  return (
    <div className="calculator">
      <h2>Calculadora de Harris-Benedict</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Sexo:</label>
          <select name="sexo" value={form.sexo} onChange={manejarCambio} className="input">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={form.peso}
            onChange={manejarCambio}
            required
            className="input"
          />
        </div>
        <div>
          <label>Altura (cm):</label>
          <input
            type="number"
            name="altura"
            value={form.altura}
            onChange={manejarCambio}
            required
            className="input"
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={manejarCambio}
            required
            className="input"
          />
        </div>
        <div>
          <label>Nivel de Actividad:</label>
          <select name="actividad" value={form.actividad} onChange={manejarCambio} className="input">
            <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
            <option value="ligero">Ligero (ejercicio ligero 1-3 días/semana)</option>
            <option value="moderado">Moderado (ejercicio moderado 3-5 días/semana)</option>
            <option value="activo">Activo (ejercicio fuerte 6-7 días/semana)</option>
            <option value="muy_activo">Muy Activo (ejercicio muy fuerte diario)</option>
          </select>
        </div>
        <button type="submit" className="button">
          Calcular
        </button>
      </form>
      {resultado && (
        <div className="resultado">
          <h3>Calorías Diarias Necesarias: {resultado} kcal</h3>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
