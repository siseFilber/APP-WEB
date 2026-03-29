import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTechUsersRequest, getUserServicesRequest } from '../api/users';

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  const paletaColores = [
    { bg: 'bg-[#F2E8CF]', text: 'text-[#333]' }, 
    { bg: 'bg-[#A8D0E6]', text: 'text-[#0D3B66]' },
    { bg: 'bg-[#376996]', text: 'text-white' }, 
    { bg: 'bg-[#C2A385]', text: 'text-[#333]' },
    { bg: 'bg-[#E76F51]', text: 'text-white' },
    { bg: 'bg-[#A7D7C5]', text: 'text-[#0D3B66]' },
  ];

  // 1. LISTAR TÉCNICOS: Al cargar la página
  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await getTechUsersRequest();
        // Filtramos para asegurar que solo lleguen los activos (aunque el backend ya lo haga)
        setTecnicos(res.data);
      } catch (error) {
        console.error("Error en DAY Tech Staff:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTecnicos();
  }, []);

  // 2. DETALLE Y 3. LISTA DE SERVICIOS: Al hacer clic en una tarjeta
  const handleTechClick = async (tech, colorPair) => {
    // Seteamos los detalles básicos inmediatamente (Punto 2)
    setSelectedTech({ ...tech, colorPair });
    setLoadingServices(true);
    setServicios([]);

    try {
      // Llamamos a la lista de servicios del técnico (Punto 3)
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
      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
      <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Staff...</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-[#333] font-sans">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        
        <header className="mb-20 text-center border-b border-slate-100 pb-12">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Staff de Laboratorio</span>
          <h1 className="text-6xl md:text-7xl font-light text-[#333] tracking-tighter leading-none mb-6">
            Nuestros <span className="font-extrabold text-[#376996]">Técnicos</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
            Expertos certificados en micro-soldadura, diagnóstico de hardware y optimización de alto rendimiento.
          </p>
        </header>

        {/* --- NIVEL 1: LISTA DE TÉCNICOS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {tecnicos.length > 0 ? tecnicos.map((t, index) => {
            const colorPair = paletaColores[index % paletaColores.length];
            return (
              <div 
                key={t.id} 
                onClick={() => handleTechClick(t, colorPair)}
                className={`group relative ${colorPair.bg} rounded-[2.5rem] p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100`}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-20 h-20 mb-6 rounded-full bg-white/50 flex items-center justify-center text-4xl font-black ${colorPair.text}`}>
                    {t.name[0].toUpperCase()}
                  </div>
                  <h3 className={`text-2xl font-black ${colorPair.text} tracking-tight mb-2 uppercase`}>{t.name}</h3>
                  <p className={`${colorPair.text} opacity-70 text-[10px] font-bold uppercase tracking-widest`}>Especialista Certificado</p>
                  <div className="mt-8 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    Ver Portafolio <span className="text-lg">▹</span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <p className="col-span-full text-center py-20 text-slate-300 font-black uppercase tracking-widest italic">No hay técnicos activos en el nodo.</p>
          )}
        </div>

        {/* --- NIVEL 2 Y 3: MODAL DE DETALLE Y SERVICIOS --- */}
        {selectedTech && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-[3rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100">
              
              {/* Lado izquierdo: Lista de Servicios (Nivel 3) */}
              <div className="md:w-2/3 p-12 md:p-16 max-h-[80vh] overflow-y-auto bg-white">
                <div className="flex justify-between items-start mb-12">
                  <h2 className="text-5xl font-light text-[#333] tracking-tighter leading-none">
                    Servicios de <span className="font-extrabold text-[#376996]">{selectedTech.name.split(' ')[0]}</span>
                  </h2>
                  <button onClick={() => setSelectedTech(null)} className="text-4xl text-gray-300 hover:text-rose-500 transition-colors">&times;</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {loadingServices ? (
                    <div className="col-span-full py-10 flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultando DB...</span>
                    </div>
                  ) : servicios.length > 0 ? (
                    servicios.map((s) => (
                      <Link 
                        key={s.id} 
                        to={`/solicitar/${s.id}`}
                        className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:border-[#A8D0E6] hover:shadow-xl transition-all block group/item"
                      >
                        <p className="text-xs font-black text-[#333] uppercase tracking-tight mb-2 group-hover/item:text-[#376996]">{s.name}</p>
                        <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{s.description || "Diagnóstico y reparación técnica."}</p>
                        <div className="mt-4 text-[9px] font-black text-[#376996] uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-all">Solicitar ▹</div>
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-full text-slate-300 font-bold uppercase text-[9px] py-10 italic">Este técnico no tiene servicios asignados.</p>
                  )}
                </div>
              </div>

              {/* Lado derecho: Detalle del Técnico (Nivel 2) */}
              <div className={`${selectedTech.colorPair.bg} md:w-1/3 p-12 flex flex-col justify-between ${selectedTech.colorPair.text}`}>
                <div className="space-y-10">
                  <div className="text-7xl font-black opacity-10">{selectedTech.name[0]}</div>
                  <div>
                    <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-2">Contacto Oficial</p>
                    <p className="text-sm font-bold border-b border-current pb-4 break-all">{selectedTech.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-2">Estatus en Nodo</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest">Disponible</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="w-full bg-white text-[#333] font-black uppercase text-[10px] py-5 rounded-full hover:bg-black hover:text-white transition-all shadow-xl italic"
                >
                  Cerrar Ventana
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tecnicos;