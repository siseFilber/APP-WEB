import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="py-16 px-8 bg-gray-50 min-h-screen font-sans text-[#333]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- BIENVENIDA ESTILO CLEAN --- */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">
            Sesión Activa / Forward Vision
          </span>
          <h1 className="text-6xl font-light text-[#333] tracking-tighter leading-none">
            Bienvenido, <span className="font-extrabold text-[#376996]">{user?.name || 'Usuario'}</span>
          </h1>
          <p className="text-slate-500 text-xs mt-4 uppercase tracking-[0.3em] font-bold">
            {user?.role === 'TECH' ? 'Panel de Control Técnico' : 'Portal de Gestión de Cliente'}
          </p>
        </div>

        {/* --- TARJETAS DE RESUMEN (PALETA ORGÁNICA) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Estado de Cuenta - Color Crema */}
          <div className="bg-[#F2E8CF] rounded-[2.5rem] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <h3 className="text-[#333] text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Suscripción de Red</h3>
            <p className="text-3xl font-black text-[#333] tracking-tighter uppercase italic">Activo</p>
          </div>
          
          {user?.role === 'TECH' ? (
            <>
              {/* Servicios Activos - Color Azul Pálido */}
              <div className="bg-[#A8D0E6] rounded-[2.5rem] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-[#0D3B66] text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Operaciones NOC</h3>
                <p className="text-3xl font-black text-[#0D3B66] tracking-tighter uppercase italic">Gestionar</p>
              </div>
              {/* Reputación - Color Verde Menta */}
              <div className="bg-[#A7D7C5] rounded-[2.5rem] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-[#0D3B66] text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Score de Calidad</h3>
                <p className="text-3xl font-black text-[#0D3B66] tracking-tighter">★★★★★</p>
              </div>
            </>
          ) : (
            <>
              {/* Mis Solicitudes - Color Azul Suave */}
              <div className="bg-[#A8D0E6] rounded-[2.5rem] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-[#0D3B66] text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Servicios en Curso</h3>
                <p className="text-3xl font-black text-[#0D3B66] tracking-tighter uppercase">0 Pendientes</p>
              </div>
              {/* Técnicos Favoritos - Color Beige Suave */}
              <div className="bg-[#C2A385] rounded-[2.5rem] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-[#333] text-[9px] font-black uppercase tracking-widest mb-4 opacity-60">Staff de Confianza</h3>
                <p className="text-3xl font-black text-[#333] tracking-tighter uppercase italic">Explorar</p>
              </div>
            </>
          )}
        </div>

        {/* --- ACCIONES RÁPIDAS (DISEÑO FLUIDO) --- */}
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
          {/* Forma orgánica decorativa de fondo */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F2E8CF] opacity-30 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          
          <h2 className="text-[#333] font-black uppercase text-xs mb-10 tracking-[0.4em] flex items-center gap-4 relative z-10">
            Módulo de Acción <div className="h-px bg-gray-100 flex-grow"></div>
          </h2>
          
          <div className="flex flex-wrap gap-6 relative z-10">
            {user?.role === 'TECH' ? (
              <Link 
                to="/mis-servicios" 
                className="bg-[#376996] hover:bg-[#333] text-white font-black py-5 px-10 rounded-2xl uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95 italic"
              >
                Gestionar Mis Misiones
              </Link>
            ) : (
              <Link 
                to="/tecnicos" 
                className="bg-[#376996] hover:bg-[#333] text-white font-black py-5 px-10 rounded-2xl uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95 italic"
              >
                Solicitar Soporte Técnico
              </Link>
            )}
            
            <button className="bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-200 text-[#333] font-black py-5 px-10 rounded-2xl uppercase text-[10px] tracking-widest transition-all active:scale-95">
              Configuración de Perfil
            </button>
          </div>
        </div>

        {/* --- FOOTER DEL PANEL --- */}
        <p className="mt-12 text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.5em]">
          Forward Vision ISP System v2.6 / 2026
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;