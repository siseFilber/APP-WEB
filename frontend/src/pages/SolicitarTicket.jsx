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
      try {
        const res = await getAllServicesRequest();
        const found = res.data.find(s => s.id === parseInt(serviceId));
        setServicio(found);
      } catch (error) {
        console.error("Error al obtener detalles del servicio:", error);
      }
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
      alert("✅ Ticket generado con éxito en el sistema NOC.");
      navigate('/mis-tickets'); 
    } catch (error) {
      console.error("Error al crear ticket:", error);
      alert("❌ Error de red. No se pudo procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] p-6 flex items-center justify-center font-sans">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 relative overflow-hidden">
        
        {/* Decoración orgánica de fondo (image_14.png) */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#A8D0E6] opacity-20 rounded-full blur-3xl"></div>
        
        <header className="mb-10 relative z-10">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">DAY Tech NOC / Soporte</span>
          <h2 className="text-5xl font-light text-[#333] tracking-tighter leading-none mb-4">
            Generar <span className="font-extrabold text-[#376996]">Ticket</span>
          </h2>
          <div className="w-12 h-1 bg-[#376996] rounded-full"></div>
        </header>
        
        {servicio && (
          <div className="mb-10 p-6 bg-[#F2E8CF] rounded-3xl border border-[#C2A385]/20 relative z-10 flex justify-between items-center group">
            <div>
              <p className="text-[9px] uppercase font-black text-[#C2A385] tracking-widest mb-1">Servicio de Red:</p>
              <p className="font-bold text-[#376996] uppercase tracking-tight text-lg">{servicio.name}</p>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-[#C2A385] block mb-1">ID TÉCNICO</span>
              <span className="text-xs font-mono text-[#333] opacity-60">#00{servicio.id}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Descripción de la Incidencia
            </label>
            <textarea
              required
              rows="5"
              className="w-full bg-gray-50 border border-slate-100 p-6 rounded-[2rem] text-sm text-[#333] outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all resize-none font-medium placeholder:text-slate-300 shadow-inner"
              placeholder="Ej: El nodo de fibra presenta intermitencia..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="text-[9px] text-[#C2A385] mt-4 uppercase font-black italic tracking-widest text-center">
              * Sea lo más específico posible para agilizar la atención.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl relative z-10 active:scale-95
                ${loading 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#376996] text-white hover:bg-[#333] shadow-blue-900/10'}`}
            >
              {loading ? 'PROCESANDO SOLICITUD...' : 'ENVIAR AL NODO DE SOPORTE'}
            </button>
            
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-6 text-slate-300 hover:text-[#376996] text-[9px] font-black uppercase tracking-[0.4em] transition-all border-b border-transparent hover:border-[#376996] pb-1"
            >
              ← Cancelar y volver al catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitarTicket;