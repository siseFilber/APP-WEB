import React, { useEffect, useState } from 'react';
import { getAllServicesRequest } from '../api/service.api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargamos los servicios reales de Hostinger
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await getAllServicesRequest();
        // Tomamos solo los primeros 6 para que el Home no sea infinito
        setServicios(res.data.slice(0, 6));
      } catch (error) {
        console.error("Error cargando servicios en Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  return (
    <div className="bg-white">
      {/* --- SECCIÓN HERO --- */}
      <section 
        className="relative h-[500px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs mb-3">Soporte Técnico Especializado</h2>
          <h1 className="text-white text-5xl md:text-7xl font-black mb-8 leading-tight italic uppercase tracking-tighter">
            FORWARD <br />
            <span className="text-cyan-400 italic">VISION</span>
          </h1>
          <Link to="/servicios" className="bg-cyan-500 hover:bg-white hover:text-black text-white font-black py-4 px-10 transition-all uppercase text-xs tracking-widest inline-block italic">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* --- SECCIÓN SERVICIOS DINÁMICOS --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-16 border-l-4 border-cyan-500 pl-6 flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest mb-1">Service Oficial | SupportComputer</p>
            <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter">Nuestras Soluciones</h2>
          </div>
          <Link to="/servicios" className="text-cyan-600 font-bold text-xs uppercase hover:underline">Ver todos +</Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-cyan-500 font-bold animate-pulse uppercase">Sincronizando con el servidor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {servicios.map((s) => (
              <div key={s.id} className="group cursor-pointer">
                <div className="relative h-64 bg-gray-100 mb-6 overflow-hidden border-b-4 border-transparent group-hover:border-cyan-500 transition-all">
                  <img 
                    src={s.imageUrl || `https://images.unsplash.com/photo-1591405351990-4726e33df58d?q=80&w=400&auto=format&fit=crop`} 
                    alt={s.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-black font-black italic text-sm shadow-xl">
                    S/ {s.price.toFixed(2)}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-gray-900 p-4 text-white text-xs font-black uppercase tracking-widest">
                    {s.id.toString().padStart(3, '0')}
                  </div>
                </div>
                
                <h3 className="text-gray-900 font-black text-xl mb-3 uppercase flex justify-between items-center italic tracking-tighter">
                  {s.name} <span className="text-cyan-500 text-lg">→</span>
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {s.description || "Mantenimiento y soporte técnico garantizado por el equipo de Forward Vision."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;