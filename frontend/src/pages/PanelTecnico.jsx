import { useEffect, useState } from 'react';
import { getTicketsRequest, assignTechRequest } from '../api/tickets';

const PanelTecnico = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Función para cargar todos los tickets de la base de datos en Hostinger
  const cargarTickets = async () => {
    try {
      setLoading(true);
      const res = await getTicketsRequest();
      setTickets(res.data);
    } catch (error) {
      console.error("Error en el servidor de Forward Vision:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  // 2. Función para que el técnico se asigne un ticket (Tomar trabajo)
  const asignarATecnico = async (ticketId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return alert("Debes estar logueado como técnico");

      await assignTechRequest(ticketId, user.id);
      alert("✅ Ticket asignado. Ahora está en tu bandeja de trabajo.");
      cargarTickets(); // Refrescamos la lista
    } catch (error) {
      console.error("Error al asignar el técnico:", error);
      alert("❌ No se pudo asignar el ticket. Intenta de nuevo.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-500 border-yellow-500 bg-yellow-500/5';
      case 'IN_PROGRESS': return 'text-cyan-500 border-cyan-500 bg-cyan-500/5';
      case 'COMPLETED': return 'text-green-500 border-green-500 bg-green-500/5';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-cyan-500 font-black italic uppercase tracking-tighter text-2xl animate-pulse">
        Sincronizando Base de Datos...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header estilo Industrial/Neon */}
        <header className="mb-12 border-l-4 border-cyan-500 pl-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">
              Panel de <span className="text-cyan-500">Operaciones</span>
            </h1>
            <p className="text-gray-500 mt-2 uppercase text-[10px] tracking-[0.3em] font-bold">
              Gestión Global de Tickets - SupportComputer
            </p>
          </div>
          <button 
            onClick={cargarTickets}
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-cyan-500 transition-colors"
          >
            [ Actualizar Lista ]
          </button>
        </header>

        {/* Listado de Tickets */}
        <div className="grid gap-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="bg-[#111] border border-gray-800 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-gray-600 transition-all shadow-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`text-[10px] font-black px-2 py-1 border rounded-sm uppercase tracking-widest ${getStatusStyle(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className="text-gray-700 text-[10px] font-bold uppercase tracking-tighter">
                      ID: {ticket.id} | Cliente: {ticket.user?.name || 'Anonimo'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black italic uppercase text-gray-100 group-hover:text-cyan-400 transition-colors">
                    {ticket.service?.name || "Servicio General"}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mt-2 italic font-medium">
                    "{ticket.description}"
                  </p>
                </div>

                <div className="flex flex-col items-end gap-4 min-w-[200px]">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-600 uppercase font-black">Fecha Ingreso</p>
                    <p className="text-xs font-mono text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Lógica de botones según asignación */}
                  {!ticket.techId ? (
                    <button 
                      onClick={() => asignarATecnico(ticket.id)}
                      className="bg-cyan-500 hover:bg-white text-black font-black uppercase py-2 px-6 rounded-sm text-[11px] transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.2)] w-full"
                    >
                      Tomar Trabajo
                    </button>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-cyan-600 font-black uppercase mb-1">Asignado a:</span>
                      <span className="text-xs text-gray-300 font-bold uppercase italic">
                        {ticket.tech?.name || "Técnico en Proceso"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-gray-800">
              <p className="text-gray-600 uppercase tracking-[0.5em] italic text-sm">No hay solicitudes de soporte pendientes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelTecnico;