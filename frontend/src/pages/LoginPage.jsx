import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth.api'; // Tu archivo de API

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginRequest({ email, password });
      
      // 1. Guardamos el token en localStorage para futuras peticiones
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert(`Bienvenido, ${res.data.user.name}`);

      // 2. Lógica de redirección basada en el ROL
      if (res.data.user.role === 'CLIENT') {
        navigate('/tecnicos'); // <--- A la lista de técnicos
      } else {
        navigate('/dashboard'); // <--- Panel de control para TECH o ADMIN
      }

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales o si tu cuenta está activa.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl border border-gray-800">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO --- */}
        <div className="p-10 md:p-14 flex flex-col justify-center border-t-4 md:border-t-0 md:border-l-4 border-cyan-500">
          <header className="mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
              Iniciar <span className="text-cyan-500">Sesión</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">SupportComputer Filter</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com" 
                required
                className="w-full p-4 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••" 
                required
                className="w-full p-4 bg-[#111] border border-gray-700 text-white focus:border-cyan-500 outline-none transition-all duration-300"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 uppercase transition-all duration-300 shadow-lg shadow-cyan-500/20 mt-4 tracking-widest"
            >
              Ingresar al Sistema
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-xs text-gray-500 hover:text-cyan-500 transition uppercase font-bold">¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        {/* --- COLUMNA DERECHA (Invitación al Registro) --- */}
        <div className="bg-[#111] p-10 md:p-14 text-center flex flex-col justify-center items-center border-t border-gray-800 md:border-t-0 md:border-l">
          <div className="mb-6 text-center">
            <div className="w-16 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter leading-tight">
              ¿Eres nuevo <br /> <span className="text-cyan-500">en la plataforma?</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-10 italic">
              Regístrate para solicitar soporte técnico en tiempo real para tus equipos de cómputo.
            </p>
          </div>

          <Link 
            to="/register" 
            className="inline-block border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-black py-3 px-12 uppercase transition-all duration-300 shadow-xl tracking-widest text-sm"
          >
            Crear una Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;