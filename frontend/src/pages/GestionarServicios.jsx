import { useEffect, useState } from 'react';
import { getMyServicesRequest, createServiceRequest, deleteServiceRequest } from '../api/service.api';

const GestionarServicios = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', description: '' });

  // 1. Definimos la función de carga primero
  const loadServices = async () => {
    try {
      const res = await getMyServicesRequest();
      setServices(res.data);
    } catch (error) {
      console.error("Error al cargar tus servicios", error);
    }
  };

  // 2. Ejecutamos el efecto de carga al montar el componente
  useEffect(() => {
    loadServices();
  }, []);

  // 3. Manejador para crear nuevos servicios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createServiceRequest(newService);
      setShowModal(false); // Cerrar modal
      setNewService({ name: '', price: '', description: '' }); // Limpiar formulario
      await loadServices(); // Recargar la lista automáticamente
      alert("Servicio creado con éxito");
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      alert("Error al crear el servicio. Revisa la consola.");
    }
  };

  // 4. Manejador para eliminar servicios
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este servicio?")) {
      try {
        await deleteServiceRequest(id);
        await loadServices();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el servicio");
      }
    }
  };

  return (
    <div className="py-10 px-6">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Mis <span className="text-cyan-500">Servicios</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">
            Catálogo de Soporte Técnico
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-black py-3 px-6 uppercase text-xs transition shadow-lg shadow-cyan-500/20 active:scale-95"
        >
          + Agregar Servicio
        </button>
      </div>

      {/* Tabla de Servicios */}
      <div className="overflow-x-auto bg-[#111] border border-gray-800 rounded-lg shadow-2xl">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#1a1a1a] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 tracking-widest">Servicio</th>
              <th className="px-6 py-4 tracking-widest">Descripción</th>
              <th className="px-6 py-4 tracking-widest">Precio</th>
              <th className="px-6 py-4 text-center tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {services.length > 0 ? (
              services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-900/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-white uppercase">{s.name}</td>
                  <td className="px-6 py-4 text-xs italic text-gray-500">{s.description || 'Sin descripción'}</td>
                  <td className="px-6 py-4 text-cyan-500 font-black">S/ {s.price}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(s.id)} 
                      className="text-red-500 hover:text-red-400 font-black uppercase text-[10px] tracking-tighter transition"
                    >
                      [ Eliminar ]
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-600 italic">
                  No tienes servicios registrados. ¡Agrega el primero!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Registro */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#1a1a1a] p-8 border-t-4 border-cyan-500 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">
              Nuevo <span className="text-cyan-500">Servicio</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nombre del Servicio</label>
                <input 
                  type="text" 
                  placeholder="Ej: Formateo de PC" 
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="w-full p-3 bg-[#0a0a0a] border border-gray-800 text-white focus:border-cyan-500 outline-none transition" 
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Precio (Soles)</label>
                <input 
                  type="number" 
                  placeholder="50.00" 
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  className="w-full p-3 bg-[#0a0a0a] border border-gray-800 text-white focus:border-cyan-500 outline-none transition" 
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Descripción</label>
                <textarea 
                  placeholder="Detalla lo que incluye el servicio..." 
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="w-full p-3 bg-[#0a0a0a] border border-gray-800 text-white focus:border-cyan-500 outline-none h-24 resize-none transition"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 text-white font-black uppercase text-xs transition">
                  Guardar
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 text-white font-black uppercase text-xs transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarServicios;