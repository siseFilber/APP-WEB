import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Agrega esta línea
import MainLayout from "./layouts/MainLayout"; // Importamos el Layout
import Home from "./pages/Home";               // Tu nueva página principal
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import VerifyOTP from "./components/VerifyOTP";
import GestionarServicios from "./pages/GestionarServicios";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-otp" element={<VerifyOTP />} />

          <Route path="dashboard" element={<DashboardPage />} />
          {/* --- RUTAS PROTEGIDAS PARA TÉCNICOS --- */}
          <Route element={<ProtectedRoute allowedRoles={['TECH', 'ADMIN']} />}>
            <Route path="mis-servicios" element={<GestionarServicios />} />

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;