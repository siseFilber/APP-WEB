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

const AppRouter = () => {
  // Activamos el centinela de seguridad
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

        {/* Privadas Generales */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="solicitar/:serviceId" element={<SolicitarTicket />} />
        <Route path="mis-tickets" element={<MisTickets />} />

        {/* Staff & Admin */}
        <Route element={<ProtectedRoute allowedRoles={['TECH', 'ADMIN']} />}>
          <Route path="mis-servicios" element={<GestionarServicios />} />
          <Route path="panel-tecnico" element={<PanelTecnico />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;