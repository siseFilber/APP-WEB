import React, { useEffect, useState } from 'react';
import { getTechUsersRequest, getUserServicesRequest } from '../api/users';

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  const paletaColores = [
    { bg: 'bg-[#F2E8CF]', text: 'text-[#333]' }, // Crema
    { bg: 'bg-[#A8D0E6]', text: 'text-[#0D3B66]' }, // Azul pálido
    { bg: 'bg-[#376996]', text: 'text-white' }, // Azul oscuro
    { bg: 'bg-[#C2A385]', text: 'text-[#333]' }, // Beige suave
    { bg: 'bg-[#E76F51]', text: 'text-white' }, // Terracota
    { bg: 'bg-[#A7D7C5]', text: 'text-[#0D3B66]' }, // Verde menta
  ];

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await getTechUsersRequest();
        setTecnicos(res.data);
      } catch (error) {
        console.error("Error en DAY Tech Staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  const handleTechClick = async (tech, colorPair) => {
    setSelectedTech({ ...tech, colorPair });
    setLoadingServices(true);
    setServicios([]);
    try {
      const res = await getUserServicesRequest(tech.id);
      setServicios(res.data);
    } catch (error) {
      console.error("Error al obtener servicios técnicos:", error);
    } finally {
      setLoadingServices(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#376996] border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Laboratorio...</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-[#333] font-sans">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        
        {/* Header Especializado */}
        <header className="mb-20 text-center border-b border-slate-100 pb-12">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Staff de Laboratorio</span>
          <h1 className="text-6xl md:text-7xl font-light text-[#333] tracking-tighter leading-none mb-6">
            Nuestros <span className="font-extrabold text-[#376996]">Técnicos</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
            Expertos certificados en micro-soldadura, diagnóstico de hardware y optimización de alto rendimiento para tu computadora.
          </p>
        </header>

        {/* Rejilla de Perfiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {tecnicos.length > 0 ? (
            tecnicos.map((t, index) => {
              const colorPair = paletaColores[index % paletaColores.length];
              return (
                <div 
                  key={t.id} 
                  onClick={() => handleTechClick(t, colorPair)}
                  className={`group relative ${colorPair.bg} rounded-[2.5rem] p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-slate-100`}
                >
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full fill-white/80 opacity-60 group-hover:opacity-100 transition-opacity">
                        <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87.1,14.6,81.6,29.1,73.1,41.5C64.6,53.8,53.2,63.9,40.1,71.3C27.1,78.8,13.5,83.6,-0.1,83.8C-13.8,84,-27.6,79.6,-39.8,72.1C-52,64.6,-62.7,54.1,-71.2,41.7C-79.7,29.3,-86.1,14.6,-86.3,-0.1C-86.4,-14.9,-80.4,-29.8,-71.7,-42.1C-63,-54.5,-51.7,-64.3,-38.7,-72.1C-25.7,-79.9,-12.9,-85.7,0.8,-87.1C14.6,-88.5,29.2,-85.5,44.7,-76.4Z" transform="translate(100 100)" />
                      </svg>
                      <div className={`absolute inset-0 flex items-center justify-center text-5xl font-black ${colorPair.text}`}>
                        {t.name[0]}
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl font-black ${colorPair.text} tracking-tight mb-2 group-hover:text-[#376996]`}>
                      {t.name}
                    </h3>
                    <p className={`${colorPair.text} opacity-70 text-[11px] font-bold uppercase tracking-widest mb-10 italic`}>
                      Especialista Hardware
                    </p>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <div className={`flex-grow h-px ${colorPair.text} opacity-10 group-hover:opacity-30`}></div>
                      <span className={`${colorPair.text} text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0`}>
                        Ver Experiencia ▹
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">No hay técnicos disponibles en este turno</p>
            </div>
          )}
        </div>

        {/* --- MODAL DETALLE TÉCNICO --- */}
        {selectedTech && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-5xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500 border border-gray-100">
              <div className="grid md:grid-cols-12 h-full">
                
                <div className="md:col-span-8 p-12 md:p-16">
                  <div className="flex justify-between items-start mb-16 pb-8 border-b border-gray-100">
                    <div>
                      <span className="text-[#376996] text-[10px] font-black tracking-[0.4em] uppercase mb-2 block italic">Especialista en Sistemas</span>
                      <h2 className="text-6xl md:text-7xl font-light text-[#333] tracking-tighter leading-none mb-4">
                        <span className="font-extrabold">{selectedTech.name.split(' ')[0]}</span> {selectedTech.name.split(' ').slice(1).join(' ')}
                      </h2>
                    </div>
                    <button 
                      onClick={() => setSelectedTech(null)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-rose-500 hover:text-white rounded-full transition-all duration-300 text-3xl font-light"
                    >
                      &times;
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#C2A385] mb-8 tracking-[0.2em] flex items-center gap-4">
                      Capacidades Técnicas
                      <div className="flex-grow h-px bg-gray-100"></div>
                    </h4>
                    
                    {loadingServices ? (
                      <div className="flex flex-col gap-4">
                        <div className="h-16 bg-gray-50 animate-pulse rounded-2xl"></div>
                        <div className="h-16 bg-gray-50 animate-pulse rounded-2xl"></div>
                      </div>
                    ) : servicios.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {servicios.map((s) => (
                          <div key={s.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group/item hover:bg-white hover:border-[#A8D0E6] hover:shadow-lg transition-all duration-300">
                            <p className="text-sm font-black text-[#333] uppercase tracking-tight mb-2 group-hover/item:text-[#376996]">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                              {s.description || "Mantenimiento integral y reparación a nivel componente."}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 font-bold italic uppercase text-[10px]">Sin servicios específicos asignados.</p>
                    )}
                  </div>
                </div>

                <div className={`${selectedTech.colorPair.bg} p-12 md:p-16 flex flex-col justify-between ${selectedTech.colorPair.text}`}>
                  <div className="space-y-12">
                    <div className="w-28 h-28 relative mx-auto md:mx-0">
                       <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full fill-white/90">
                        <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87.1,14.6,81.6,29.1,73.1,41.5C64.6,53.8,53.2,63.9,40.1,71.3C27.1,78.8,13.5,83.6,-0.1,83.8C-13.8,84,-27.6,79.6,-39.8,72.1C-52,64.6,-62.7,54.1,-71.2,41.7C-79.7,29.3,-86.1,14.6,-86.3,-0.1C-86.4,-14.9,-80.4,-29.8,-71.7,-42.1C-63,-54.5,-51.7,-64.3,-38.7,-72.1C-25.7,-79.9,-12.9,-85.7,0.8,-87.1C14.6,-88.5,29.2,-85.5,44.7,-76.4Z" transform="translate(100 100)" />
                      </svg>
                      <div className={`absolute inset-0 flex items-center justify-center text-6xl font-black ${selectedTech.colorPair.text}`}>
                        {selectedTech.name[0]}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-3">Enlace Directo</p>
                      <p className="text-sm font-bold border-b border-current pb-4 break-all">{selectedTech.email}</p>
                    </div>

                    <div>
                      <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-3">Disponibilidad</p>
                      <div className="bg-white/90 px-4 py-3 rounded-2xl inline-flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                        <span className="text-[9px] text-green-700 font-black uppercase tracking-widest">En Laboratorio</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className={`w-full bg-white ${selectedTech.colorPair.text} font-black uppercase text-[10px] py-5 rounded-full tracking-[0.2em] hover:bg-[#333] hover:text-white transition-all duration-500 shadow-xl active:scale-95 italic`}>
                    Agendar Diagnóstico
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