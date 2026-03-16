import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Obtenemos los datos del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); // Borramos la sesión
    localStorage.removeItem('token'); // Borramos el token si lo tienes aparte
    navigate('/'); // Redirigimos a la pantalla principal
    window.location.reload(); // Recargamos para limpiar estados globales
  };

  return (
    <nav className="bg-[#1a1a1a] text-white py-4 px-6 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter italic">
          SUPPORT<span className="text-cyan-500">COMPUTER</span>
        </Link>

        {/* Links Dinámicos */}
        <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest italic">
          <Link to="/" className="hover:text-cyan-500 transition">Inicio</Link>
          
          {/* Si el usuario es CLIENTE, mostramos técnicos */}
          {user?.role === 'CLIENT' && (
            <Link to="/tecnicos" className="text-cyan-500 hover:text-white transition underline decoration-2 underline-offset-4">Ver Técnicos</Link>
          )}

          {/* Si el usuario es TÉCNICO, mostramos sus servicios */}
          {user?.role === 'TECH' && (
            <Link to="/mis-servicios" className="text-cyan-500 hover:text-white transition underline decoration-2 underline-offset-4">Mis Servicios</Link>
          )}

          <Link to="/nosotros" className="hover:text-cyan-500 transition">Nosotros</Link>
          <Link to="/contacto" className="hover:text-cyan-500 transition">Contacto</Link>
          <Link to="/tecnicos" className="hover:text-cyan-500 transition">Tecnicos</Link>
        </div>

        {/* Botón Login / Logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500 hidden sm:inline uppercase">Hola, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-sm text-xs font-bold uppercase transition"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-sm text-xs font-bold uppercase transition"
            >
              Acceso Clientes
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;