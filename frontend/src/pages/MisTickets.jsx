import { useEffect, useState } from 'react';
import { getMyTicketsRequest } from '../api/ticket.api';

const MisTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getMyTicketsRequest();
        setTickets(res.data);
      } catch (error) {
        console.error("Error cargando tus tickets en SupportComputer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-500 border-yellow-500';
      case 'IN_PROGRESS': return 'text-cyan-500 border-cyan-500';
      case 'COMPLETED': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-cyan-500 font-black italic uppercase">Consultando base de datos...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-10 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Estado de <span className="text-cyan-500">Mis Tickets</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Seguimiento en tiempo real de tus servicios</p>
        </header>

        <div className="space-y-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#111] border border-gray-800 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-gray-600 transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-black px-2 py-1 border rounded-sm uppercase ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className="text-gray-600 text-[10px] font-bold">TICKET #{ticket.id}</span>
                  </div>
                  <h3 className="text-lg font-black italic uppercase text-gray-200 group-hover:text-cyan-400 transition-colors">
                    {ticket.service?.name || 'Servicio Técnico'}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 italic">"{ticket.description}"</p>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Fecha de Registro</p>
                  <p className="text-xs font-mono text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-800">
              <p className="text-gray-600 uppercase tracking-widest italic text-sm">Aún no has solicitado soporte técnico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTickets;