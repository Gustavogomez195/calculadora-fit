import { useState } from "react";
import Resultado from "../calculadora/Resultado";

const Calculadora = () => {
  const [form, setForm] = useState({
    sexo: "masculino",
    peso: "",
    altura: "",
    edad: "",
    actividad: "sedentario",
    objetivo: "mantener",
    guardar: false,
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

  const ajustesObjetivos = {
    mantener: 0,
    aumentar: {
      lento: 250,
      rapido: 500,
      muy_rapido: 750,
    },
    bajar: {
      lento: -250,
      rapido: -500,
      muy_rapido: -750,
    },
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    return caloriasDiarias;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const { peso, altura, edad, objetivo } = form;

    // Validaciones 
    if (!peso || !altura || !edad) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");

    const tmb = calcularTMB();
    const caloriasMantenimiento = tmb.toFixed(2);

    let resultadosCalculados = {
      mantenimiento: caloriasMantenimiento,
      fecha: new Date().toISOString(),
    };

    if (objetivo === "aumentar" || objetivo === "bajar") {
      const ajustes = ajustesObjetivos[objetivo];
      resultadosCalculados[objetivo] = {};

      Object.keys(ajustes).forEach((categoria) => {
        resultadosCalculados[objetivo][categoria] = (tmb + ajustes[categoria]).toFixed(2);
      });
    }

    setResultado(resultadosCalculados);

    if (form.guardar) {
      guardarResultados(resultadosCalculados);
    }
  };

  const guardarResultados = (datos) => {
    const resultadosGuardados = JSON.parse(localStorage.getItem("resultados")) || [];
    resultadosGuardados.unshift(datos); 
    localStorage.setItem("resultados", JSON.stringify(resultadosGuardados));
  };

  return (
    <div className="text-lg border-2 border-black rounded-lg p-8 font-bold w-[90%] lg:w-[70%]">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={manejarEnvio} className="space-y-5">
        {/* Sexo */}
        <div className="flex flex-col ">
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            name="sexo"
            value={form.sexo}
            onChange={manejarCambio}
            className="font-light outline-none"
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        {/* Peso */}
        <div className="flex flex-col ">
          <label htmlFor="peso">Peso (kg)</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={form.peso}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu peso"
          />
        </div>

        {/* Altura */}
        <div className="flex flex-col ">
          <label htmlFor="altura">Altura (cm)</label>
          <input
            type="number"
            id="altura"
            name="altura"
            value={form.altura}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu altura"
          />
        </div>

        {/* Edad */}
        <div className="flex flex-col ">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={form.edad}
            onChange={manejarCambio}
            required
            className="font-light outline-none border p-2 rounded"
            placeholder="Introduce tu edad"
          />
        </div>

        {/* Nivel de Actividad */}
        <div className="flex flex-col">
          <label htmlFor="actividad">Nivel de Actividad:</label>
          <select
            id="actividad"
            name="actividad"
            value={form.actividad}
            onChange={manejarCambio}
            className="font-light outline-none border p-2 rounded"
          >
            <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
            <option value="ligero">Ligero (ejercicio ligero 1-3 días/semana)</option>
            <option value="moderado">Moderado (ejercicio moderado 3-5 días/semana)</option>
            <option value="activo">Activo (ejercicio fuerte 6-7 días/semana)</option>
            <option value="muy_activo">Muy Activo (ejercicio muy fuerte diario)</option>
          </select>
        </div>

        {/* Objetivo */}
        <div className="flex flex-col ">
          <label htmlFor="objetivo">Objetivo:</label>
          <select
            id="objetivo"
            name="objetivo"
            value={form.objetivo}
            onChange={manejarCambio}
            className="font-light outline-none border p-2 rounded"
          >
            <option value="mantener">Mantener el Peso</option>
            <option value="aumentar">Aumentar el Peso</option>
            <option value="bajar">Bajar el Peso</option>
          </select>
        </div>

        {/* Guardar Resultado */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="guardar"
            name="guardar"
            checked={form.guardar}
            onChange={manejarCambio}
            className="mr-2"
          />
          <label htmlFor="guardar">Guardar Resultado</label>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full border bg-black rounded-lg text-white p-2 hover:bg-[#252525] transition-all duration-200"
        >
          Calcular
        </button>
      </form>

      {/* Resultados */}
      {resultado && (
        <div className="mt-6 ">
          <h3 className="text-xl font-semibold">Calorías Diarias Necesarias:</h3>
          {form.objetivo === "mantener" && (
            <p>Mantenimiento: {resultado.mantenimiento} kcal</p>
          )}

          {(form.objetivo === "aumentar" || form.objetivo === "bajar") && (
            <ul className=" list-disc  lg:list-inside  ">
              {form.objetivo === "aumentar" && resultado.aumentar && (
                <>
                  <li>Aumento Lento: {resultado.aumentar.lento} kcal</li>
                  <li>Aumento Rápido: {resultado.aumentar.rapido} kcal</li>
                  <li>Aumento Muy Rápido: {resultado.aumentar.muy_rapido} kcal</li>
                </>
              )}
              {form.objetivo === "bajar" && resultado.bajar && (
                <>
                  <li>Pérdida Lenta: {resultado.bajar.lento} kcal</li>
                  <li>Pérdida Rápida: {resultado.bajar.rapido} kcal</li>
                  <li>Pérdida Muy Rápida: {resultado.bajar.muy_rapido} kcal</li>
                </>
              )}
            <Resultado/>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculadora;
