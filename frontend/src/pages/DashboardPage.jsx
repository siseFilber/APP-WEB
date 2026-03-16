import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="py-10 px-6">
      {/* Bienvenida */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          Bienvenido, <span className="text-cyan-500">{user?.name || 'Usuario'}</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-[0.2em]">
          Panel de Control | {user?.role === 'TECH' ? 'Perfil Técnico' : 'Portal de Cliente'}
        </p>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111] border-l-4 border-cyan-500 p-6 shadow-xl">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-1">Estado de Cuenta</h3>
          <p className="text-2xl font-black text-white">Activo</p>
        </div>
        
        {user?.role === 'TECH' ? (
          <>
            <div className="bg-[#111] border-l-4 border-yellow-500 p-6 shadow-xl">
              <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-1">Servicios Activos</h3>
              <p className="text-2xl font-black text-white italic">Gestionar</p>
            </div>
            <div className="bg-[#111] border-l-4 border-green-500 p-6 shadow-xl">
              <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-1">Reputación</h3>
              <p className="text-2xl font-black text-white italic text-green-500">★★★★★</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#111] border-l-4 border-blue-500 p-6 shadow-xl">
              <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-1">Mis Solicitudes</h3>
              <p className="text-2xl font-black text-white">0 Pendientes</p>
            </div>
            <div className="bg-[#111] border-l-4 border-purple-500 p-6 shadow-xl">
              <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-1">Técnicos Favoritos</h3>
              <p className="text-2xl font-black text-white italic">Explorar</p>
            </div>
          </>
        )}
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-[#1a1a1a] p-8 border border-gray-800 rounded-sm">
        <h2 className="text-white font-bold uppercase text-sm mb-6 tracking-widest border-b border-gray-800 pb-2">
          Acciones Disponibles
        </h2>
        <div className="flex flex-wrap gap-4">
          {user?.role === 'TECH' ? (
            <Link 
              to="/mis-servicios" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 px-8 uppercase text-xs transition shadow-lg shadow-cyan-500/20"
            >
              Gestionar Mis Servicios
            </Link>
          ) : (
            <Link 
              to="/tecnicos" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 px-8 uppercase text-xs transition shadow-lg shadow-cyan-500/20"
            >
              Buscar Soporte Técnico
            </Link>
          )}
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-black py-4 px-8 uppercase text-xs transition">
            Editar Mi Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;