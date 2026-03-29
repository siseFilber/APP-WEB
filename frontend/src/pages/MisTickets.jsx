import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyTicketsRequest } from '../api/ticket.api';

const MisTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Carga de historial de tickets del cliente
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getMyTicketsRequest();
        // Validamos que la respuesta sea un array para evitar errores de .map
        setTickets(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error al obtener el historial de tickets:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Función para determinar el color del badge según el estado
  const getStatusStyle = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'CLOSED': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
      <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Historial...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] font-sans py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Cabecera */}
        <header className="mb-16 flex justify-between items-end border-b border-slate-200 pb-8">
          <div>
            <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Área de Cliente</span>
            <h1 className="text-5xl font-light tracking-tighter leading-none text-[#333]">
              Mis <span className="font-extrabold text-[#376996]">Tickets</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate('/servicios')}
            className="hidden md:block text-[9px] font-black uppercase tracking-widest text-[#376996] border-b-2 border-[#376996] pb-1 hover:text-[#333] hover:border-[#333] transition-all"
          >
            + Nueva Solicitud
          </button>
        </header>

        {/* Listado Orgánico */}
        <div className="space-y-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Indicador lateral de estado */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${ticket.status === 'OPEN' ? 'bg-cyan-400' : 'bg-amber-400'}`}></div>

                <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 font-bold">#TK-{ticket.id.toString().padStart(4, '0')}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-[#333] uppercase tracking-tight mb-3 group-hover:text-[#376996] transition-colors">
                      {ticket.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic mb-4">
                      "{ticket.description}"
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end min-w-[150px]">
                    <div className="text-right">
                      <span className="text-[9px] font-black text-[#C2A385] uppercase block mb-1">Fecha de Registro</span>
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(ticket.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'long' })}
                      </span>
                    </div>
                    
                    <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#376996] group-hover:translate-x-2 transition-transform">
                      Ver Detalles ▹
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[3rem] py-24 text-center border-2 border-dashed border-slate-100">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl opacity-20">📂</span>
              </div>
              <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[10px]">No se encontraron registros activos</p>
              <button 
                onClick={() => navigate('/servicios')}
                className="mt-8 bg-[#376996] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#333] transition-all"
              >
                Solicitar Primer Soporte
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTickets;