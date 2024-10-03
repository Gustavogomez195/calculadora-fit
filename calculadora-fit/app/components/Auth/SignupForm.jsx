"use client";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Guardar información adicional en Firestore
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        email: userCredential.user.email,
        creadoEn: new Date(),
      });
      router.push("/dashboard");
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={manejarRegistro} className="formulario">
      <h2>Registrar</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </div>
      <button type="submit" className="button">
        Registrar
      </button>
    </form>
  );
};

export default SignupForm;
