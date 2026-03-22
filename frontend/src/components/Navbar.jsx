import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Obtenemos los datos del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="bg-[#1a1a1a] text-white py-4 px-6 shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo de Forward Vision / SupportComputer */}
        <Link to="/" className="text-2xl font-black tracking-tighter italic group">
          SUPPORT<span className="text-cyan-500 group-hover:text-white transition-colors">COMPUTER</span>
        </Link>

        {/* Links Dinámicos */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest italic">
          <Link to="/" className="hover:text-cyan-500 transition">Inicio</Link>
          <Link to="/nosotros" className="hover:text-cyan-500 transition">Nosotros</Link>
          <Link to="/tecnicos" className="hover:text-cyan-500 transition">Staff</Link>
          <Link to="/servicios" className="hover:text-cyan-500 transition">Servicios</Link>
          
          {/* 1. LÓGICA PARA CLIENTE */}
          {user?.role === 'CLIENT' && (
            <>
              <Link to="/mis-tickets" className="text-cyan-500 border border-cyan-500/30 px-3 py-1 hover:bg-cyan-500 hover:text-black transition-all">
                Mis Pedidos
              </Link>
            </>
          )}

          {/* 2. LÓGICA PARA TÉCNICO */}
          {user?.role === 'TECH' && (
            <>
              <Link to="/panel-tecnico" className="text-cyan-500 border border-cyan-500/30 px-3 py-1 hover:bg-cyan-500 hover:text-black transition-all">
                Gestión Tickets
              </Link>
              <Link to="/mis-servicios" className="hover:text-cyan-500 transition">
                Mis Servicios
              </Link>
            </>
          )}

          {/* 3. LÓGICA PARA ADMIN */}
          {user?.role === 'ADMIN' && (
            <>
              <Link to="/panel-tecnico" className="text-red-500 border border-red-500/30 px-3 py-1 hover:bg-red-500 hover:text-white transition-all">
                Admin Panel
              </Link>
            </>
          )}

          <Link to="/contacto" className="hover:text-cyan-500 transition">Contacto</Link>
        </div>

        {/* Botón Login / Logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-800 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-gray-500 uppercase font-black leading-none">Usuario</p>
                <p className="text-[11px] font-bold text-cyan-400 italic uppercase">{user.name}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 text-[10px] font-black uppercase transition-all italic shadow-lg shadow-red-600/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-cyan-500 hover:bg-white text-black px-6 py-2 text-[10px] font-black uppercase transition-all italic shadow-lg shadow-cyan-500/20"
            >
              Acceso Sistema
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;