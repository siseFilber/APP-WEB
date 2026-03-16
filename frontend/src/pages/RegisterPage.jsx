import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/auth.api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('CLIENT'); // Coincide con tu Enum de Prisma

  // Estado alineado con tu registerService del Backend
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    password: '',
    codigoAprobacion: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mapeamos los datos exactamente como los espera el backend
      const dataToSend = { 
        ...formData, 
        role: role === 'tecnico' ? 'TECH' : 'CLIENT' 
      };
      
      const res = await registerRequest(dataToSend);
      
      if (res.status === 200 || res.status === 201) {
        alert("Registro exitoso. Revisa tu correo para el código de verificación.");
        // Pasamos el email a la siguiente pantalla para facilitar la validación
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error al registrar usuario. Revisa el DNI (8 dígitos).");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl border border-gray-800">
        
        {/* COLUMNA IZQUIERDA: MENSAJE */}
        <div className="bg-[#111] p-10 md:p-14 text-center flex flex-col justify-center items-center order-2 md:order-1 border-t border-gray-800 md:border-t-0 md:border-r">
          <div className="mb-6">
            <div className="w-16 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">¿Ya eres parte de <br/><span className="text-cyan-500">Forward Vision?</span></h3>
            <p className="text-gray-500 text-sm mb-10">Inicia sesión para gestionar tus equipos y servicios técnicos.</p>
            <Link to="/login" className="inline-block border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-black py-3 px-12 uppercase transition-all duration-300 shadow-xl tracking-widest text-sm">
              Ir al Login
            </Link>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="p-10 md:p-14 flex flex-col justify-center order-1 md:order-2 border-t-4 md:border-t-0 md:border-r-4 border-cyan-500">
          <header className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Crear <span className="text-cyan-500">Cuenta</span></h2>
            <p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-widest">Soporte Técnico Especializado</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" type="text" placeholder="Nombre Completo" onChange={handleChange} required className="w-full p-3 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all" />
              <input name="dni" type="text" placeholder="DNI (8 dígitos)" onChange={handleChange} required className="w-full p-3 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all" />
            </div>

            <input name="email" type="email" placeholder="Correo Electrónico" onChange={handleChange} required className="w-full p-3 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all" />

            {/* SELECCIÓN DE ROL */}
            <div className="py-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Tipo de Perfil</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setRole('cliente')} className={`flex-1 py-2 text-xs font-bold uppercase border transition-all ${role === 'cliente' ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>Cliente</button>
                <button type="button" onClick={() => setRole('tecnico')} className={`flex-1 py-2 text-xs font-bold uppercase border transition-all ${role === 'tecnico' ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>Técnico</button>
              </div>
            </div>

            {/* CÓDIGO DE VALIDACIÓN */}
            <div className="bg-[#151515] p-3 border border-dashed border-gray-800">
              <label className="block text-[10px] font-bold text-cyan-500 uppercase mb-2 tracking-widest">
                {role === 'tecnico' ? 'Código Validación Admin (Obligatorio)' : 'Código de Invitación (Si tienes)'}
              </label>
              <input name="codigoAprobacion" type="text" placeholder="••••••" onChange={handleChange} className="w-full p-2 bg-[#111] border border-gray-800 text-cyan-400 placeholder-gray-800 focus:border-cyan-500 outline-none transition-all font-mono text-center tracking-widest" />
            </div>

            <input name="password" type="password" placeholder="Contraseña Segura" onChange={handleChange} required className="w-full p-3 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all" />

            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 uppercase transition-all shadow-xl shadow-cyan-500/10 mt-4 tracking-tighter">
              Finalizar Registro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;