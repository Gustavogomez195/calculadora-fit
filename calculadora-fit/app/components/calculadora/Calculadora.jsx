"use client";

import { useState } from "react";

const Calculadora = () => {

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
   
  };

  return (
    <div className="text-lg border-2 border-black rounded-lg p-8 font-bold ">
      
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio} className="space-y-5">
        <div className="flex flex-col">
          <label>Sexo</label>
          <select name="sexo" value={form.sexo} onChange={manejarCambio} className="font-light outline-none  ">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={form.peso}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu peso"
            
          />
        </div>
        <div className="flex flex-col">
          <label>Altura (cm)</label>
          <input
            type="number"
            name="altura"
            value={form.altura}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu altura"
          />
        </div>
        <div className="flex flex-col">
          <label >Edad</label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu edad"
          />
        </div>
        <div className="flex flex-col">
          <label>Nivel de Actividad:</label>
          <select name="actividad" value={form.actividad}  onChange={manejarCambio} className="font-light outline-none border p-2 rounded">
            <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
            <option value="ligero">Ligero (ejercicio ligero 1-3 días/semana)</option>
            <option value="moderado">Moderado (ejercicio moderado 3-5 días/semana)</option>
            <option value="activo">Activo (ejercicio fuerte 6-7 días/semana)</option>
            <option value="muy_activo">Muy Activo (ejercicio muy fuerte diario)</option>
          </select>
        </div >
        <button type="submit" className="w-full border bg-black rounded-lg text-white p-2 hover:bg-[#252525] transition-all duration-200">
          Calcular
        </button>
      </form>
      {resultado && (
        <div >
          <h3>Calorías Diarias Necesarias: {resultado} kcal</h3>
        </div>
      )}
    </div>
  );
};

export default Calculadora;
