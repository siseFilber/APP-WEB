import { useEffect, useState } from 'react';
import { getTicketsRequest, assignTechRequest, updateTicketStatusRequest } from '../api/ticket.api';

const PanelTecnico = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarTickets = async () => {
    try {
      setLoading(true);
      const res = await getTicketsRequest();
      setTickets(res.data);
    } catch (error) {
      console.error("Error en el servidor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  const asignarATecnico = async (ticketId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return alert("Sesión expirada.");

      await assignTechRequest(ticketId, user.id);
      cargarTickets(); 
    } catch (error) {
      console.error("Error al asignar:", error);
    }
  };

  // NUEVA FUNCIÓN: Finalizar Misión
  const finalizarMision = async (ticketId) => {
    try {
      if (!window.confirm("¿Confirmas que el servicio técnico ha sido completado?")) return;
      
      // Enviamos el nuevo estado al backend
      await updateTicketStatusRequest(ticketId, 'READY_FOR_REVIEW');
      alert("Misión marcada como completada. Esperando cierre del cliente.");
      cargarTickets();
    } catch (error) {
      console.error("Error al finalizar:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-[#F2E8CF] text-[#333] border-[#C2A385]';
      case 'IN_PROGRESS': return 'bg-[#A8D0E6] text-[#0D3B66] border-[#376996]';
      case 'READY_FOR_REVIEW': return 'bg-[#A7D7C5] text-[#0D3B66] border-[#376996]'; // Menta para "Por revisar"
      case 'COMPLETED': return 'bg-gray-200 text-gray-500 border-gray-300'; // Gris para finalizado total
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
      <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Consola NOC...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] font-sans py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-10">
          <div>
            <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Centro de Control de Red</span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tighter leading-none">
              Panel de <span className="font-extrabold text-[#376996]">Operaciones</span>
            </h1>
          </div>
          <button 
            onClick={cargarTickets}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-[#376996] hover:bg-[#376996] hover:text-white border-2 border-[#376996] px-6 py-3 rounded-full transition-all"
          >
            Actualizar Nodo
          </button>
        </header>

        <div className="grid gap-8">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="bg-white rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm border border-gray-100 group hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`text-[9px] font-black px-4 py-1.5 border rounded-full uppercase tracking-widest ${getStatusStyle(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                  <span className="text-slate-300 text-[10px] font-black uppercase tracking-tighter">
                    REF: FTTH-0{ticket.id} / {ticket.user?.name || 'Usuario Externo'}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-[#333] group-hover:text-[#376996] transition-colors tracking-tighter mb-3">
                  {ticket.service?.name || "Diagnóstico de Red"}
                </h3>
                
                <p className="text-slate-500 text-sm italic font-medium max-w-2xl">
                  "{ticket.description}"
                </p>
              </div>

              <div className="flex flex-col items-end gap-4 min-w-[220px] w-full md:w-auto">
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Registro de Incidencia</p>
                  <p className="text-xs font-bold text-slate-600">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>

                {/* LÓGICA DE BOTONES PARA EL TÉCNICO */}
                {!ticket.techId ? (
                  <button 
                    onClick={() => asignarATecnico(ticket.id)}
                    className="bg-[#376996] hover:bg-[#333] text-white font-black uppercase py-4 px-10 rounded-2xl text-[10px] tracking-widest transition-all w-full"
                  >
                    Tomar Misión
                  </button>
                ) : (
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                      <div className="w-2 h-2 bg-[#376996] rounded-full animate-pulse"></div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Estado Actual</span>
                        <span className="text-xs text-[#376996] font-extrabold uppercase italic">
                          {ticket.status === 'IN_PROGRESS' ? 'Operativo en Campo' : 'En Revisión'}
                        </span>
                      </div>
                    </div>

                    {/* Botón para culminar trabajo: Solo aparece si está IN_PROGRESS */}
                    {ticket.status === 'IN_PROGRESS' && (
                      <button 
                        onClick={() => finalizarMision(ticket.id)}
                        className="bg-[#A7D7C5] hover:bg-[#376996] text-[#0D3B66] hover:text-white font-black uppercase py-3 px-6 rounded-xl text-[9px] tracking-widest transition-all shadow-sm active:scale-95"
                      >
                        ✓ Culminar Trabajo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelTecnico;