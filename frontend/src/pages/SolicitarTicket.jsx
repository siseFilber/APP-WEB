import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTicketRequest } from '../api/ticket.api';
import { getAllServicesRequest } from '../api/service.api';

const SolicitarTicket = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Buscamos los detalles del servicio seleccionado
  useEffect(() => {
    const getServiceDetail = async () => {
      const res = await getAllServicesRequest();
      const found = res.data.find(s => s.id === parseInt(serviceId));
      setServicio(found);
    };
    getServiceDetail();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTicketRequest({
        serviceId: parseInt(serviceId),
        description: description
      });
      alert("✅ Ticket creado con éxito. Un técnico revisará tu caso.");
      navigate('/servicios'); // O a una página de "Mis Tickets"
    } catch (error) {
      console.error("Error al crear ticket:", error);
      alert("❌ Hubo un problema al enviar tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#111] border border-gray-800 p-8 rounded-sm shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
          SOLICITAR <span className="text-cyan-500">SOPORTE</span>
        </h2>
        
        {servicio && (
          <div className="mb-6 p-3 bg-cyan-500/10 border-l-4 border-cyan-500">
            <p className="text-[10px] uppercase font-bold text-gray-400">Servicio seleccionado:</p>
            <p className="font-bold text-cyan-400 uppercase italic">{servicio.name}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">
              Describe tu problema técnico:
            </label>
            <textarea
              required
              rows="4"
              className="w-full bg-[#0a0a0a] border border-gray-800 p-3 text-sm focus:border-cyan-500 outline-none transition-all resize-none"
              placeholder="Ej: Mi computadora no enciende después de una subida de tensión..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-white text-black font-black uppercase py-3 rounded-sm text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            {loading ? 'PROCESANDO...' : 'ENVIAR SOLICITUD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarTicket;