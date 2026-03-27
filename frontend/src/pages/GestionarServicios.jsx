import { useEffect, useState } from 'react';
import { getMyServicesRequest, createServiceRequest, deleteServiceRequest } from '../api/service.api';

const GestionarServicios = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', description: '' });

  const loadServices = async () => {
    try {
      const res = await getMyServicesRequest();
      setServices(res.data);
    } catch (error) {
      console.error("Error al cargar tus servicios", error);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createServiceRequest(newService);
      setShowModal(false);
      setNewService({ name: '', price: '', description: '' });
      await loadServices();
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este servicio del catálogo?")) {
      try {
        await deleteServiceRequest(id);
        await loadServices();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="py-16 px-8 bg-gray-50 min-h-screen font-sans text-[#333]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- CABECERA ADMINISTRATIVA --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8 gap-6">
          <div>
            <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Admin Panel / NOC</span>
            <h2 className="text-5xl font-light text-[#333] tracking-tighter leading-none">
              Gestión de <span className="font-extrabold text-[#376996]">Servicios</span>
            </h2>
            <p className="text-slate-500 text-xs mt-4 uppercase tracking-[0.3em] font-bold">
              Configuración del Catálogo Técnico
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#376996] hover:bg-[#333] text-white font-black py-4 px-10 rounded-2xl uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center gap-2"
          >
            <span className="text-lg">+</span> Registrar Nuevo Servicio
          </button>
        </div>

        {/* --- TABLA DE SERVICIOS (ESTILO MINIMALISTA) --- */}
        <div className="overflow-hidden bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Servicio</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descripción Técnica</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Costo Base</th>
                <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.length > 0 ? (
                services.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#333] uppercase tracking-tight group-hover:text-[#376996] transition-colors">{s.name}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs italic text-slate-400 max-w-xs truncate font-medium">{s.description || 'Sin especificaciones técnicas'}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-2 bg-[#A8D0E6]/30 text-[#0D3B66] rounded-xl font-black text-sm">S/ {s.price}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={() => handleDelete(s.id)} 
                        className="text-rose-400 hover:text-rose-600 font-black uppercase text-[9px] tracking-widest transition-all p-2 hover:bg-rose-50 rounded-lg"
                      >
                        [ Dar de Baja ]
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs italic">
                    El inventario de servicios está vacío.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- MODAL DE REGISTRO (ESTILO ORGÁNICO) --- */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 relative">
              {/* Forma decorativa superior */}
              <div className="h-4 bg-gradient-to-r from-[#A8D0E6] via-[#A7D7C5] to-[#F2E8CF]"></div>
              
              <div className="p-10">
                <h3 className="text-3xl font-black text-[#333] mb-8 tracking-tighter">
                  Nuevo <span className="text-[#376996]">Item</span>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nombre del Servicio</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Mantenimiento OLT" 
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium" 
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Tarifa en Soles</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium" 
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Descripción Operativa</label>
                    <textarea 
                      placeholder="Detalles del alcance del servicio..." 
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 h-28 resize-none transition-all font-medium"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-[2] bg-[#376996] hover:bg-[#333] py-4 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                      Confirmar
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowModal(false)} 
                      className="flex-1 bg-gray-100 hover:bg-gray-200 py-4 text-[#333] font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all"
                    >
                      X
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionarServicios;