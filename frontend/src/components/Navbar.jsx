import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 
                    bg-black/80 backdrop-blur-md border-b border-gray-100 
                    shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center relative">

        {/* --- LOGO CON RESALTE OSCURO --- */}
        <Link to="/" className="flex items-center group relative">
          {/* Círculo de brillo oscuro detrás del logo para que resalte el blanco */}
          <div className="absolute top-[-15px] left-[-20px] w-32 h-32 bg-black/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <img
            src={logo}
            alt="DAY tech"
            /* Invertimos un poco el brillo con drop-shadow oscuro para dar profundidad
               y usamos un filtro de brillo para que el blanco sea más puro.
            */
            className="h-24 w-auto absolute top-[-15px] z-10 
                       transition-all duration-500 group-hover:scale-110 
                       drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]
                       brightness-110" 
          />
          {/* Espaciador invisible */}
          <div className="h-14 w-28"></div>
        </Link>

        {/* --- NAVEGACIÓN --- */}
        <div className="hidden md:flex items-center gap-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <Link to="/" className="hover:text-[#376996] transition-colors">Inicio</Link>
          <Link to="/nosotros" className="hover:text-[#376996] transition-colors">Nosotros</Link>
          <Link to="/tecnicos" className="hover:text-[#376996] transition-colors">Staff</Link>
          <Link to="/servicios" className="hover:text-[#376996] transition-colors">Servicios</Link>
          <Link to="/contacto" className="hover:text-[#376996] transition-colors">Contacto</Link>

          {/* Gestión de Roles */}
          {user?.role === 'CLIENT' && (
            <Link to="/mis-tickets" className="px-5 py-2 bg-[#A8D0E6] text-[#0D3B66] rounded-full hover:bg-[#376996] hover:text-white transition-all">
              Mis Pedidos
            </Link>
          )}

          {user?.role === 'TECH' && (
            <Link to="/panel-tecnico" className="px-5 py-2 bg-[#A7D7C5] text-[#0D3B66] rounded-full hover:bg-[#376996] hover:text-white transition-all">
              NOC Operaciones
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link to="/panel-tecnico" className="px-5 py-2 bg-[#F2E8CF] text-[#333] rounded-full hover:bg-[#376996] hover:text-white transition-all">
              Consola Admin
            </Link>
          )}
        </div>

        {/* --- SECCIÓN USUARIO --- */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
              <div className="hidden sm:block text-right">
                <p className="text-[8px] text-slate-400 tracking-[0.3em] font-black uppercase">Online</p>
                <p className="text-sm font-bold text-slate-700">{user.name}</p>
              </div>
              <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center bg-gray-100 text-slate-400 hover:bg-rose-500 hover:text-white rounded-full transition-all">
                ×
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-8 py-2.5 bg-[#376996] hover:bg-[#333] text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-900/10 transition-all active:scale-95">
              Acceso NOC
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;