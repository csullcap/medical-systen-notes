import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"

// Rutas públicas
import PublicLayout from "./layouts/PublicLayout"
import Home from "./pages/public/Home"
import ConsultaNotas from "./pages/public/ConsultaNotas"

// Rutas privadas
import PrivateLayout from "./layouts/PrivateLayout"
import Dashboard from "./pages/private/Dashboard"
import RegistroNotas from "./pages/private/RegistroNotas"
import Residentes from "./pages/private/Residentes"
import Administradores from "./pages/private/Administradores"
import Login from "./pages/auth/Login"
import Sedes from "./pages/private/Sedes"
import Especialidades from "./pages/private/Especialidades"
import Docentes from "./pages/private/Docentes"

// Protección de rutas
import ProtectedRoute from "./components/ProtectedRoute"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "consulta",
        element: <ConsultaNotas />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "registro-notas",
        element: <RegistroNotas />,
      },
      {
        path: "residentes",
        element: <Residentes />,
      },
      {
        path: "administradores",
        element: <Administradores />,
      },
      {
        path: "sedes",
        element: <Sedes />,
      },
      {
        path: "especialidades",
        element: <Especialidades />,
      },
      {
        path: "docentes",
        element: <Docentes />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
