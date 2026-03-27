import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceRequest } from '../api/service.api';
import { createTicketRequest } from '../api/ticket.api';

const SolicitarTicket = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [servicio, setServicio] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await getServiceRequest(serviceId);
        setServicio(res.data);
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSending(true);
    try {
      const ticketData = {
        title: `SOPORTE: ${servicio.name.toUpperCase()}`,
        description: description,
        priority: "NORMAL",
        serviceId: Number(serviceId)
      };

      await createTicketRequest(ticketData);
      navigate('/mis-tickets');
      
    } catch (error) {
      console.error("Error del servidor:", error.response?.data);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
        <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Abriendo Canal Seguro...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#333] font-sans py-20 px-6">
      <div className="container mx-auto max-w-2xl">
        
        {/* Cabecera Estilo NOC */}
        <header className="mb-12 text-center">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">DAY Tech NOC / Support</span>
          <h1 className="text-5xl font-light tracking-tighter leading-none mb-4">
            Generar <span className="font-extrabold text-[#376996]">Ticket</span>
          </h1>
          <div className="w-16 h-1 bg-[#376996] mx-auto rounded-full"></div>
        </header>

        {/* Contenedor del Formulario (Estilo Orgánico) */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
        >
          {/* Mancha orgánica decorativa superior (image_14.png) */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A8D0E6] opacity-20 rounded-full blur-2xl"></div>

          <div className="mb-10 relative z-10">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4 ml-2">
              Servicio Seleccionado
            </label>
            <div className="bg-[#F2E8CF] p-6 rounded-3xl border border-[#C2A385]/20 flex justify-between items-center group">
              <div>
                <span className="text-xs font-black text-[#333] uppercase block mb-1">Concepto</span>
                <span className="text-lg font-bold text-[#376996] tracking-tight">{servicio?.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-[#C2A385] block mb-1">Inversión</span>
                <span className="text-xl font-black text-[#333]">S/ {servicio?.price?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-10 relative z-10">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4 ml-2">
              Detalles de la Incidencia Técnica
            </label>
            <textarea 
              className="w-full bg-gray-50 border border-slate-100 p-6 rounded-[2rem] text-sm text-[#333] outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all min-h-[180px] resize-none font-medium placeholder:text-slate-300 shadow-inner"
              placeholder="Ej: El nodo de fibra presenta intermitencia en la zona de Chosica Alta..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <p className="text-[9px] text-[#C2A385] mt-4 uppercase font-black italic tracking-widest text-center">
              * La precisión técnica agiliza la resolución del caso.
            </p>
          </div>

          <button 
            type="submit"
            disabled={sending}
            className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl relative z-10 active:scale-95
              ${sending 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-[#376996] text-white hover:bg-[#333] shadow-blue-900/10'}`}
          >
            {sending ? 'TRANSMITIENDO REQUERIMIENTO...' : 'CONFIRMAR Y SOLICITAR SOPORTE'}
          </button>
        </form>
        
        {/* Botón Volver */}
        <div className="text-center">
          <button 
            onClick={() => navigate(-1)}
            className="mt-10 text-slate-300 hover:text-[#376996] text-[10px] font-black uppercase tracking-[0.4em] transition-all inline-block border-b border-transparent hover:border-[#376996] pb-1"
          >
            ← Cancelar y volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitarTicket;