import { useEffect, useState } from 'react';
import { getAllServicesRequest } from '../api/service.api'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        // Usamos la función de tu API que consulta a Hostinger
        const res = await getAllServicesRequest();
        setServicios(res.data);
      } catch (err) {
        console.error("Error al conectar con Forward Vision:", err);
        setError("No se pudieron cargar los servicios. Revisa la conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  // Pantalla de Carga
  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-cyan-500 font-black italic uppercase tracking-tighter text-2xl animate-pulse">
        Cargando Soluciones...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="container mx-auto">
        
        {/* Cabecera Estilo SupportComputer */}
        <header className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">
            Nuestros <span className="text-cyan-500">Servicios</span>
          </h1>
          <p className="text-gray-400 mt-2 uppercase text-xs tracking-[0.2em] font-bold">
            Tecnología y Soporte de Alto Rendimiento
          </p>
        </header>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 mb-8 rounded-sm uppercase text-xs font-bold">
            {error}
          </div>
        )}

        {/* Grilla de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <div 
                key={servicio.id} 
                className="bg-[#111] border border-gray-800 p-6 rounded-sm hover:border-cyan-500 transition-all group relative overflow-hidden"
              >
                {/* Efecto Glow de fondo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
                
                <h3 className="text-xl font-black italic uppercase mb-2 group-hover:text-cyan-400 transition-colors">
                  {servicio.name}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6 leading-relaxed h-12 overflow-hidden">
                  {servicio.description || "Mantenimiento técnico especializado para la infraestructura de Forward Vision."}
                </p>

                <div className="flex justify-between items-end border-t border-gray-800 pt-4">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase font-bold block mb-1">Costo Estimado</span>
                    <span className="text-2xl font-black text-white italic">
                      S/ {servicio.price ? servicio.price.toFixed(2) : "0.00"}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/solicitar/${servicio.id}`}
                    className="bg-cyan-500 hover:bg-white text-black px-6 py-2 rounded-sm text-xs font-black uppercase transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    Solicitar
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-800">
              <p className="text-gray-600 italic uppercase tracking-widest">No se encontraron servicios activos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicios;