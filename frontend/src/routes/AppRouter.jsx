import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthCheck } from "../hooks/useAuthCheck";

// Layouts y Protecciones
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Páginas
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import VerifyOTP from "../components/VerifyOTP";
import GestionarServicios from "../pages/GestionarServicios";
import Servicios from "../pages/Servicios";
import SolicitarTicket from "../pages/SolicitarTicket";
import MisTickets from "../pages/MisTickets";
import PanelTecnico from "../pages/PanelTecnico";
import Nosotros from "../pages/Nosotros";
import Contacto from "../pages/Contacto";
import Tecnicos from "../pages/Tecnicos";
// Importamos la página que faltaba
import AdminAprobaciones from "../pages/AdminAprobaciones"; 

const AppRouter = () => {
  useAuthCheck();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Públicas */}
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="tecnicos" element={<Tecnicos />} />
        <Route path="servicios" element={<Servicios/>}/>

        {/* Auth */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-otp" element={<VerifyOTP />} />

        {/* Privadas Generales (Clientes, Techs, Admin) */}
        <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'TECH', 'ADMIN']} />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="solicitar/:serviceId" element={<SolicitarTicket />} />
          <Route path="mis-tickets" element={<MisTickets />} />
        </Route>

        {/* Rutas para Staff Operativo (TECH y ADMIN) */}
        <Route element={<ProtectedRoute allowedRoles={['TECH', 'ADMIN']} />}>
          <Route path="mis-servicios" element={<GestionarServicios />} />
          <Route path="panel-tecnico" element={<PanelTecnico />} />
        </Route>

        {/* --- NUEVA: Rutas exclusivas de ADMINISTRACIÓN --- */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="admin-aprobaciones" element={<AdminAprobaciones />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;