import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceRequest } from '../api/services'; // Asegúrate de tener esta función
import { createTicketRequest } from '../api/ticket.api';

const SolicitarTicket = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [servicio, setServicio] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // 1. Cargamos los datos del servicio seleccionado
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

  // 2. Función para enviar el Ticket (Aquí corregimos el Error 400)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) return alert("Por favor, describe el problema.");

    setSending(true);
    try {
      // CONSTRUCCIÓN DEL OBJETO SEGÚN TU PRISMA SCHEMA
      const ticketData = {
        title: `SOPORTE: ${servicio.name.toUpperCase()}`, // <--- REQUERIDO POR EL BACKEND
        description: description,
        priority: "NORMAL",
        // El backend usará el serviceId para vincularlo si es necesario
        serviceId: Number(serviceId) 
      };

      await createTicketRequest(ticketData);
      
      alert("✅ Ticket generado correctamente en SupportComputer");
      navigate('/mis-tickets'); // Redirigimos a la lista
    } catch (error) {
      console.error("Error detallado:", error.response?.data);
      alert(error.response?.data?.error || "Error al crear el ticket");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-cyan-500 font-black animate-pulse uppercase">Cargando datos del servicio...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="container mx-auto max-w-2xl">
        <header className="mb-10 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Generar <span className="text-cyan-500">Ticket</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Soporte Técnico Especializado - Forward Vision</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 p-8 shadow-2xl">
          <div className="mb-6">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Servicio Seleccionado</label>
            <div className="bg-gray-900 p-4 border border-gray-800 text-cyan-500 font-bold uppercase italic">
              {servicio?.name} - S/ {servicio?.price.toFixed(2)}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Detalles del problema / Requerimiento</label>
            <textarea 
              className="w-full bg-black border border-gray-800 p-4 text-sm text-gray-300 outline-none focus:border-cyan-500 transition-all min-h-[150px]"
              placeholder="Ej: Mi computadora no enciende después de un apagón..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={sending}
            className={`w-full py-4 font-black uppercase italic tracking-widest text-sm transition-all shadow-lg
              ${sending 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-cyan-500 text-black hover:bg-white shadow-cyan-500/20'}`}
          >
            {sending ? 'PROCESANDO ENVÍO...' : 'CONFIRMAR SOLICITUD'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarTicket;