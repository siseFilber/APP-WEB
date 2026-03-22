import React, { useEffect, useState } from 'react';
import { getTechUsersRequest, getUserServicesRequest } from '../api/users';

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  // 1. Cargar lista de técnicos al montar el componente
  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await getTechUsersRequest();
        setTecnicos(res.data);
      } catch (error) {
        console.error("Error en SupportComputer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  // 2. Cargar servicios específicos cuando se selecciona un técnico
  const handleTechClick = async (tech) => {
    setSelectedTech(tech);
    setLoadingServices(true);
    setServicios([]); // Limpiar lista anterior
    try {
      const res = await getUserServicesRequest(tech.id);
      setServicios(res.data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    } finally {
      setLoadingServices(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-cyan-500 font-black italic uppercase animate-pulse tracking-tighter">
        Sincronizando Staff de Forward Vision...
      </div>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white p-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Estilo Industrial */}
        <header className="mb-16 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
            Nuestro <span className="text-cyan-500 text-shadow-neon">Staff</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">
            Técnicos Certificados | SupportComputer
          </p>
        </header>

        {/* Rejilla de Técnicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tecnicos.length > 0 ? (
            tecnicos.map((t) => (
              <div 
                key={t.id} 
                onClick={() => handleTechClick(t)}
                className="group relative bg-[#111] border border-gray-900 p-8 cursor-pointer hover:border-cyan-500 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <span className="text-cyan-500 font-black italic text-4xl italic">0{t.id}</span>
                </div>
                
                <div className="w-20 h-20 bg-gray-800 rounded-sm flex items-center justify-center text-4xl font-black text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  {t.name[0]}
                </div>
                
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1 group-hover:text-cyan-400">
                  {t.name}
                </h3>
                <p className="text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-6">
                  Especialista de Redes
                </p>
                
                <div className="pt-6 border-t border-gray-800">
                  <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-white transition-colors">
                    Ver Perfil Completo ▹
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border border-dashed border-gray-800">
              <p className="text-gray-600 uppercase italic tracking-widest">No hay técnicos disponibles en este momento.</p>
            </div>
          )}
        </div>

        {/* --- MODAL DETALLE DINÁMICO --- */}
        {selectedTech && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#0a0a0a] border border-cyan-500/30 w-full max-w-4xl p-10 relative shadow-[0_0_80px_rgba(6,182,212,0.15)] animate-in fade-in zoom-in duration-300">
              
              <button 
                onClick={() => setSelectedTech(null)}
                className="absolute top-6 right-6 text-gray-600 hover:text-white font-black text-xs transition-colors"
              >
                [ CERRAR / ESC ]
              </button>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div className="mb-8">
                    <span className="text-cyan-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block italic">Forward Vision Certified</span>
                    <h2 className="text-6xl font-black italic uppercase text-white leading-none tracking-tighter">
                      {selectedTech.name}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-widest border-b border-gray-900 pb-2 italic">
                        Servicios y Especialidades
                      </h4>
                      
                      {loadingServices ? (
                        <div className="flex items-center gap-2 text-cyan-500 text-xs animate-pulse font-bold uppercase italic">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Consultando Catálogo...
                        </div>
                      ) : servicios.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {servicios.map((s) => (
                            <div key={s.id} className="flex items-start gap-4 group/item">
                              <span className="text-cyan-500 font-black mt-1 text-lg">›</span>
                              <div>
                                <p className="text-sm font-black uppercase text-gray-200 group-hover/item:text-cyan-400 transition-colors tracking-tight">
                                  {s.name}
                                </p>
                                <p className="text-[11px] text-gray-500 leading-snug font-medium max-w-md italic">
                                  {s.description || "Sin descripción detallada disponible."}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-700 text-xs italic font-bold uppercase">
                          No hay servicios registrados para este perfil.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar del Modal */}
                <div className="bg-[#111] p-8 border border-gray-900 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Email</p>
                      <p className="text-xs font-mono text-cyan-500 break-words font-bold">{selectedTech.email}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Status</p>
                      <p className="text-[10px] text-green-500 font-black flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> 
                        ACTIVO / ONLINE
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-cyan-500 text-black font-black uppercase text-[10px] py-4 tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(6,182,212,0.2)] transform hover:-translate-y-1 italic mt-8">
                    Solicitar Soporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tecnicos;