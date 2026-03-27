import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../api/auth.api';
import logo from '../assets/logo.svg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('CLIENT');
  const [formData, setFormData] = useState({ name: '', dni: '', email: '', password: '' });
  const [errorPassword, setErrorPassword] = useState('');

  const validatePassword = (pass) => {
    const hasNumber = /\d/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const minLength = pass.length >= 8;

    if (!minLength) return "Mínimo 8 caracteres.";
    if (!hasUpper) return "Falta una mayúscula.";
    if (!hasNumber) return "Falta un número.";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      setErrorPassword(validatePassword(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passError = validatePassword(formData.password);
    if (passError) return setErrorPassword(passError);

    try {
      const dataToSend = { ...formData, role: role === 'tecnico' ? 'TECH' : 'CLIENT' };
      const res = await registerRequest(dataToSend);
      if (res.status === 200 || res.status === 201) {
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al registrar.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 py-12 font-sans">
      <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl border border-gray-100">
        
        {/* Columna Branding (Mismo estilo anterior) */}
        <div className="bg-[#F2E8CF] p-12 md:p-20 flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#A8D0E6] opacity-40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-10 group cursor-pointer">
              <div className="absolute inset-0 bg-black/90 blur-2xl rounded-full scale-110 opacity-100 group-hover:scale-125 transition-transform duration-700"></div>
              <img src={logo} alt="DAY Tech" className="h-20 w-auto relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
            </div>
            <h3 className="text-4xl md:text-5xl font-light text-[#333] mb-6 tracking-tighter leading-tight">
              Únete a <br/><span className="font-extrabold text-[#376996]">SupportComputer</span>
            </h3>
            <Link to="/login" className="inline-block bg-[#376996] text-white hover:bg-[#333] font-black py-4 px-12 rounded-full uppercase transition-all duration-500 shadow-2xl tracking-[0.2em] text-[10px] active:scale-95">
              Ya soy parte del staff
            </Link>
          </div>
        </div>

        {/* Formulario con Validación */}
        <div className="p-10 md:p-20 bg-white relative">
          <header className="mb-12 border-b border-gray-50 pb-8">
            <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Seguridad SupportComputer</span>
            <h2 className="text-5xl font-light text-[#333] tracking-tighter">Crear <span className="font-extrabold text-[#376996]">Perfil</span></h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nombre</label>
                <input name="name" type="text" onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] transition-all font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">DNI</label>
                <input name="dni" type="text" onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email Corporativo</label>
              <input name="email" type="email" onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] transition-all font-medium" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                {errorPassword && <span className="text-[9px] text-rose-500 font-black italic uppercase">{errorPassword}</span>}
              </div>
              <input 
                name="password" 
                type="password" 
                onChange={handleChange} 
                required 
                className={`w-full p-4 bg-gray-50 border ${errorPassword ? 'border-rose-200' : 'border-slate-100'} rounded-2xl text-xs outline-none focus:border-[#376996] transition-all font-medium`}
                placeholder="Mayúscula, número y 8 caracteres" 
              />
            </div>

            <div className="pt-4">
              <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest mb-3 block">Tipo de Usuario</label>
              <div className="flex p-1 bg-gray-50 rounded-2xl border border-slate-100">
                <button type="button" onClick={() => setRole('cliente')} className={`flex-1 py-4 text-[10px] font-black uppercase rounded-xl transition-all ${role === 'cliente' ? 'bg-[#376996] text-white shadow-lg' : 'text-slate-400 hover:text-[#333]'}`}>Cliente</button>
                <button type="button" onClick={() => setRole('tecnico')} className={`flex-1 py-4 text-[10px] font-black uppercase rounded-xl transition-all ${role === 'tecnico' ? 'bg-[#376996] text-white shadow-lg' : 'text-slate-400 hover:text-[#333]'}`}>Técnico Senior</button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#376996] hover:bg-[#333] text-white font-black py-5 rounded-2xl uppercase mt-8 transition-all duration-500 tracking-[0.2em] text-[10px] shadow-xl shadow-blue-900/10 active:scale-95">
              Registrar en SupportComputer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;