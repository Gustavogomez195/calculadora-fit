// components/Layout/ProtectedRoute.jsx
"use client";

import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !usuario) {
      router.push("/login");
    }
  }, [usuario, cargando, router]);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return usuario ? children : null;
};

export default ProtectedRoute;
