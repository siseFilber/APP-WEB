import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth.api';
import logo from '../assets/logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginRequest({ email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'CLIENT') {
        navigate('/tecnicos');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error de credenciales.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 font-sans">
      <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl border border-gray-100">
        
        <div className="p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#A8D0E6] opacity-20 rounded-full blur-3xl"></div>
          
          <header className="mb-12 relative z-10">
            <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">SupportComputer </span>
            <h2 className="text-5xl font-light text-[#333] tracking-tighter leading-none mb-4">
              Iniciar <span className="font-extrabold text-[#376996]">Sesión</span>
            </h2>
            <div className="w-12 h-1 bg-[#376996] rounded-full"></div>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Credencial de Usuario</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@daytech.com" 
                required
                className="w-full p-5 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-[#333]"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Código de Acceso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                required
                className="w-full p-5 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-[#333]"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#376996] hover:bg-[#333] text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em] transition-all duration-500 shadow-xl shadow-blue-900/10 active:scale-95 mt-4"
            >
              Acceder al Laboratorio
            </button>
          </form>
        </div>

        <div className="bg-[#F2E8CF] p-12 md:p-20 text-center flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#A7D7C5] opacity-40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Logo con resalte oscuro focalizado */}
            <div className="relative mb-10 group cursor-pointer">
              <div className="absolute inset-0 bg-black/90 blur-2xl rounded-full scale-110 opacity-100 group-hover:scale-125 transition-transform duration-700"></div>
              <img src={logo} alt="DAY Tech" className="h-20 w-auto relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
            </div>

            <h3 className="text-4xl font-light text-[#333] mb-6 tracking-tighter leading-tight">
              ¿Eres nuevo <br /> <span className="font-extrabold text-[#376996]">en SupportComputer?</span>
            </h3>
            <p className="text-[#333] opacity-60 text-sm leading-relaxed max-w-xs mx-auto mb-12 font-medium italic">
              Crea tu perfil para agendar diagnósticos, seguir el estado de tus reparaciones y contactar con nuestros especialistas.
            </p>
          </div>

          <Link 
            to="/register" 
            className="relative z-10 inline-block bg-white text-[#333] hover:bg-[#333] hover:text-white font-black py-5 px-14 rounded-full uppercase transition-all duration-500 shadow-2xl tracking-[0.2em] text-[10px] active:scale-95"
          >
            Registrar Nuevo Cliente
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;