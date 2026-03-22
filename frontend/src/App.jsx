import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; 
import MainLayout from "./layouts/MainLayout"; 
import Home from "./pages/Home"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import VerifyOTP from "./components/VerifyOTP";
import GestionarServicios from "./pages/GestionarServicios";
import Servicios from "./pages/Servicios";
import SolicitarTicket from "./pages/SolicitarTicket";
import MisTickets from "./pages/MisTickets";
import PanelTecnico from "./pages/PanelTecnico";

// 1. IMPORTA LAS NUEVAS PÁGINAS INFORMATIVAS
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Tecnicos from "./pages/Tecnicos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* --- RUTAS PÚBLICAS E INFORMATIVAS --- */}
          <Route index element={<Home />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="tecnicos" element={<Tecnicos />} />
          <Route path="servicios" element={<Servicios/>}/>

          {/* --- RUTAS DE AUTENTICACIÓN --- */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<VerifyOTP />} />

          {/* --- RUTAS PRIVADAS (CLIENTE / GENERAL) --- */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="solicitar/:serviceId" element={<SolicitarTicket />} />
          <Route path="mis-tickets" element={<MisTickets />} />

          {/* --- RUTAS PROTEGIDAS PARA TÉCNICOS Y ADMIN --- */}
          <Route element={<ProtectedRoute allowedRoles={['TECH', 'ADMIN']} />}>
            <Route path="mis-servicios" element={<GestionarServicios />} />
            <Route path="panel-tecnico" element={<PanelTecnico />} />
          </Route>

          {/* Redirección por si escriben cualquier cosa */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;