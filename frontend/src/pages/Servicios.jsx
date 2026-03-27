import { useEffect, useState } from 'react';
import { getAllServicesRequest } from '../api/service.api';
import { Link } from 'react-router-dom';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Paleta orgánica para los servicios (inspirada en image_14.png)
  const paletaServicios = [
    { bg: 'bg-[#A8D0E6]', accent: 'bg-[#0D3B66]', text: 'text-[#0D3B66]' }, // Azul suave
    { bg: 'bg-[#F2E8CF]', accent: 'bg-[#333]', text: 'text-[#333]' },       // Crema
    { bg: 'bg-[#A7D7C5]', accent: 'bg-[#0D3B66]', text: 'text-[#0D3B66]' }, // Verde menta
    { bg: 'bg-[#E76F51]', accent: 'bg-white', text: 'text-white' },        // Terracota
    { bg: 'bg-[#C2A385]', accent: 'bg-[#333]', text: 'text-[#333]' },       // Beige
    { bg: 'bg-[#D4E157]', accent: 'bg-[#333]', text: 'text-[#333]' },       // Lima
  ];

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const res = await getAllServicesRequest();
        setServicios(res.data);
      } catch (err) {
        console.error("Error al conectar con Forward Vision:", err);
        setError("No se pudieron cargar los servicios en este momento.");
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
      <p className="text-[#376996] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Catálogo</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans">
      <div className="container mx-auto px-6 py-20">
        
        {/* Cabecera Minimalista */}
        <header className="mb-20 text-center border-b border-slate-100 pb-12">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">DAY Tech Solutions</span>
          <h1 className="text-6xl md:text-7xl font-light tracking-tighter leading-none mb-6 text-[#333]">
            Nuestras <span className="font-extrabold text-[#376996]">Soluciones</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Tecnología y Soporte de Fibra Óptica Chosica</p>
        </header>

        {error && (
          <div className="max-w-md mx-auto bg-rose-50 border border-rose-100 text-rose-600 p-4 mb-12 rounded-2xl text-center text-xs font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        {/* Grilla de Servicios Orgánica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicios.length > 0 ? (
            servicios.map((servicio, index) => {
              const color = paletaServicios[index % paletaServicios.length];
              return (
                <div 
                  key={servicio.id} 
                  className={`${color.bg} rounded-[2.5rem] p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group relative overflow-hidden flex flex-col`}
                >
                  {/* Forma fluida decorativa de fondo */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10 flex-grow">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${color.text} opacity-60 mb-2 block`}>
                      Servicio 0{servicio.id}
                    </span>
                    <h3 className={`text-3xl font-black italic uppercase leading-none mb-4 tracking-tighter ${color.text}`}>
                      {servicio.name}
                    </h3>
                    
                    <p className={`${color.text} opacity-80 text-[11px] font-medium leading-relaxed mb-10 h-16 overflow-hidden italic`}>
                      {servicio.description || "Mantenimiento técnico especializado para la infraestructura central de Chosica."}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-between items-center border-t border-black/5 pt-6 mt-4">
                    <div>
                      <span className={`text-[8px] uppercase font-black block mb-1 ${color.text} opacity-50`}>Tarifa Base</span>
                      <span className={`text-3xl font-black tracking-tighter ${color.text}`}>
                        S/ {servicio.price ? servicio.price.toFixed(2) : "0.00"}
                      </span>
                    </div>
                    
                    <Link 
                      to={`/solicitar/${servicio.id}`}
                      className={`${color.accent} ${color.accent === 'bg-white' ? 'text-black' : 'text-white'} px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl hover:scale-110 active:scale-95`}
                    >
                      Solicitar
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Catálogo de servicios actualmente vacío</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicios;