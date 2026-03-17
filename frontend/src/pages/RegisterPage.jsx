import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/auth.api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('CLIENT');
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { 
        ...formData, 
        role: role === 'tecnico' ? 'TECH' : 'CLIENT' 
      };
      
      const res = await registerRequest(dataToSend);
      
      if (res.status === 200 || res.status === 201) {
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } catch (error) {
      // LOGICA INTELIGENTE: Si ya existe, enviamos a verificar
      if (error.response?.status === 409) {
        alert("Esta cuenta ya existe. Te redirigimos para que verifiques tu código.");
        navigate('/verify-otp', { state: { email: formData.email } });
      } else {
        console.error("Error en el registro:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Error al registrar. Revisa los datos.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a] py-10">
      <div className="relative group w-full max-w-5xl">
        {/* Efecto de resplandor de fondo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[#121212] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/5">
          
          {/* SECCIÓN INFORMATIVA */}
          <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-12 flex flex-col justify-center items-center text-center border-r border-white/5">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter italic">
              UNETE A <br/><span className="text-cyan-500">FORWARD VISION</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mb-10 leading-relaxed">
              La plataforma de soporte técnico más avanzada para la gestión de fibra óptica.
            </p>
            <Link to="/login" className="group relative px-8 py-3 font-bold text-white transition-all">
              <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-cyan-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full border-2 border-white"></span>
              <span className="relative uppercase tracking-widest text-xs">Ya tengo cuenta</span>
            </Link>
          </div>

          {/* FORMULARIO */}
          <div className="p-10 md:p-14 bg-[#161616]">
            <header className="mb-8">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Registro</h2>
              <div className="h-1 w-12 bg-cyan-500 mt-2"></div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Nombre</label>
                    <input name="name" type="text" onChange={handleChange} required className="w-full p-4 bg-[#0f0f0f] border border-white/5 text-white focus:border-cyan-500 outline-none transition-all rounded-lg text-sm" placeholder="Ej. Filber" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">DNI</label>
                    <input name="dni" type="text" onChange={handleChange} required className="w-full p-4 bg-[#0f0f0f] border border-white/5 text-white focus:border-cyan-500 outline-none transition-all rounded-lg text-sm" placeholder="8 dígitos" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Email Corporativo</label>
                  <input name="email" type="email" onChange={handleChange} required className="w-full p-4 bg-[#0f0f0f] border border-white/5 text-white focus:border-cyan-500 outline-none transition-all rounded-lg text-sm" placeholder="nombre@forward.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Password</label>
                  <input name="password" type="password" onChange={handleChange} required className="w-full p-4 bg-[#0f0f0f] border border-white/5 text-white focus:border-cyan-500 outline-none transition-all rounded-lg text-sm" placeholder="••••••••" />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3 block">Seleccionar Rol</label>
                <div className="flex p-1 bg-[#0f0f0f] rounded-xl border border-white/5">
                  <button type="button" onClick={() => setRole('cliente')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${role === 'cliente' ? 'bg-cyan-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Cliente</button>
                  <button type="button" onClick={() => setRole('tecnico')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${role === 'tecnico' ? 'bg-cyan-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Técnico</button>
                </div>
              </div>

              <button type="submit" className="w-full bg-white text-black font-black py-4 uppercase mt-6 hover:bg-cyan-500 hover:text-white transition-all duration-500 rounded-lg tracking-widest text-sm shadow-2xl">
                Crear Cuenta de Soporte
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;