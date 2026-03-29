import { useEffect, useState } from 'react';
import { getAllServicesRequest } from '../api/service.api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const paletaHome = [
    { bg: 'bg-[#F2E8CF]', text: 'text-[#333]', btn: 'bg-[#376996]' },
    { bg: 'bg-[#A8D0E6]', text: 'text-[#0D3B66]', btn: 'bg-[#0D3B66]' },
    { bg: 'bg-[#A7D7C5]', text: 'text-[#0D3B66]', btn: 'bg-[#0D3B66]' },
  ];

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await getAllServicesRequest();
        setServicios(res.data.slice(0, 3)); 
      } catch (error) {
        console.error("Error cargando servicios en Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  return (
    <div className="bg-white font-sans text-[#333]">
      
      {/* --- HERO: ENFOQUE EN REPARACIÓN --- */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-gray-50">
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#A8D0E6] opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#F2E8CF] opacity-30 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
            <span className="text-[#C2A385] font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Expertos en Hardware y Software</span>
            <h1 className="text-7xl md:text-9xl font-light tracking-tighter leading-[0.85] mb-8 text-[#333]">
              Support <br />
              <span className="font-extrabold text-[#376996]">Computer</span>
            </h1>
            <p className="text-slate-500 text-lg mb-10 max-w-md font-medium leading-relaxed">
              Le devolvemos la vida a tu computadora. Especialistas en reparación, repotenciación y soporte técnico garantizado.
            </p>
            <Link to="/servicios" className="bg-[#376996] hover:bg-[#333] text-white font-black py-5 px-12 rounded-full transition-all uppercase text-[10px] tracking-[0.2em] inline-block shadow-2xl shadow-blue-900/10 active:scale-95">
              Nuestros Servicios
            </Link>
          </div>

          <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000">
            <div className="absolute inset-0 bg-[#A7D7C5] rounded-[4rem] rotate-6 scale-95 opacity-20"></div>
            <img 
              src="https://img.freepik.com/fotos-premium/tech-repara-placa-base-centro-servicio_87646-3939.jpg" 
              alt="Reparación de Computadoras" 
              className="relative z-10 rounded-[4rem] shadow-2xl border-8 border-white object-cover h-[550px] w-full"
            />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN SERVICIOS TÉCNICOS --- */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="border-l-4 border-[#376996] pl-8">
            <p className="text-[#C2A385] text-[10px] uppercase font-black tracking-[0.4em] mb-3 italic">Taller Especializado | Chosica</p>
            <h2 className="text-5xl font-black text-[#333] tracking-tighter uppercase leading-none">Nuestras <span className="text-[#376996]">Soluciones</span></h2>
          </div>
          <Link to="/servicios" className="text-[#376996] font-black text-[10px] uppercase tracking-widest hover:text-[#333] transition-colors border-b-2 border-[#376996] pb-2 text-right">Ver catálogo completo ▹</Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#376996] rounded-full animate-spin"></div>
            <p className="text-[#376996] font-black uppercase tracking-widest text-[9px] animate-pulse">Cargando Taller...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {servicios.map((s, index) => {
              const color = paletaHome[index % paletaHome.length];
              return (
                <div key={s.id} className="group relative">
                  <div className={`relative h-[400px] ${color.bg} rounded-[3rem] mb-8 overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-4 border border-slate-100`}>
                    <img 
                      src={s.imageUrl || `https://img.freepik.com/fotos-premium/tech-repara-placa-base-centro-servicio_87646-3939.jpg`} 
                      alt={s.name}
                      className="w-full h-full object-cover mix-blend-multiply opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 right-6 bg-white rounded-2xl px-5 py-3 shadow-xl transform group-hover:rotate-6 transition-transform">
                      <span className="text-[8px] font-black uppercase text-slate-400 block mb-1">Mano de Obra</span>
                      <span className="text-lg font-black text-[#333] italic">S/ {s.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="px-4">
                    <h3 className="text-[#333] font-black text-2xl mb-3 uppercase flex justify-between items-center tracking-tighter group-hover:text-[#376996] transition-colors">
                      {s.name} <span className="text-[#376996] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">→</span>
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium italic">
                      {s.description || "Diagnóstico preciso y reparación con repuestos de alta calidad para tu equipo."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- CTA: SOLICITAR SOPORTE --- */}
      <section className="container mx-auto px-6 pb-32">
        <div className="bg-[#376996] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#A7D7C5] opacity-20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
          
          <h2 className="text-white text-4xl md:text-6xl font-black mb-8 tracking-tighter relative z-10">
            ¿TU PC <br /> <span className="italic font-light">TIENE FALLAS?</span>
          </h2>
          <p className="text-blue-100 mb-12 max-w-lg mx-auto font-medium text-lg relative z-10">
            No pierdas tiempo. Trae tu equipo al laboratorio de DAY Tech y obtén un diagnóstico profesional hoy mismo.
          </p>
          <Link to="/contacto" className="bg-white text-[#376996] font-black py-6 px-14 rounded-full uppercase text-[10px] tracking-[0.3em] inline-block shadow-2xl hover:bg-[#333] hover:text-white transition-all duration-500 relative z-10 active:scale-95">
            Agendar Reparación
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;