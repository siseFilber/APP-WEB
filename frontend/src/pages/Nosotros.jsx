import React from 'react';

const Nosotros = () => {
  // Características enfocadas en Reparación de PC con paleta orgánica
  const caracteristicas = [
    { title: "Diagnóstico Avanzado", desc: "Identificación precisa de fallas en placa base, procesadores y periféricos.", color: "bg-[#F2E8CF]", textColor: "text-[#333]" }, // Crema
    { title: "Mantenimiento Preventivo", desc: "Limpieza profunda y cambio de pasta térmica para optimizar el rendimiento.", color: "bg-[#A8D0E6]", textColor: "text-[#0D3B66]" }, // Azul pálido
    { title: "Reparación de Hardware", desc: "Sustitución de componentes, pantallas y soldadura de precisión en laptops.", color: "bg-[#A7D7C5]", textColor: "text-[#0D3B66]" }, // Verde menta
    { title: "Optimización de Software", desc: "Eliminación de virus, instalación de SO y recuperación de datos críticos.", color: "bg-[#E76F51]", textColor: "text-white" }, // Terracota
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-[#333]">
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* --- COLUMNA DE TEXTO (ESTILO MINIMALISTA) --- */}
          <div>
            <header className="mb-12 border-b border-gray-100 pb-8">
              <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">Sobre SupportComputer</span>
              <h1 className="text-6xl font-light text-[#333] tracking-tighter leading-none mb-6">
                Líderes en <span className="font-extrabold text-[#376996]">Soporte Técnico</span>
              </h1>
              <p className="text-slate-500 leading-relaxed text-lg font-medium">
                En **SupportComputer**, nos dedicamos a centralizar las soluciones de hardware y software de alta calidad. 
                Nacimos para conectar a usuarios con la mejor tecnología, garantizando que cada computadora, ya sea de hogar o de oficina, funcione a su máxima capacidad con eficiencia y rapidez.
              </p>
            </header>

            {/* Rejilla de Características Orgánicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {caracteristicas.map((c, i) => (
                <div 
                  key={i} 
                  className={`${c.color} p-6 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden relative`}
                >
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <h4 className={`font-black uppercase text-sm ${c.textColor} tracking-tight relative z-10`}>{c.title}</h4>
                  <p className={`text-[11px] font-medium leading-snug mt-2 relative z-10 opacity-90 ${c.textColor}`}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLUMNA DE IMAGEN (LABORATORIO TÉCNICO) --- */}
          <div className="relative group">
            <div className="absolute inset-0 scale-105 bg-gray-50 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1591405351990-4726e33df58d?q=80&w=2070" 
              alt="Laboratorio DAY Tech" 
              className="rounded-[3rem] relative z-10 grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 shadow-2xl group-hover:shadow-[0_40px_80px_-15px_rgba(55,105,150,0.2)] border-4 border-white"
            />
            
            {/* Bloque de Experiencia */}
            <div className="absolute -bottom-10 -left-10 bg-[#376996] p-10 text-white z-20 hidden md:block rounded-t-[3rem] rounded-bl-[3rem] rounded-br-[1rem] shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-10 -right-10 w-24 h-24 fill-white/10 opacity-30">
                  <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87.1,14.6,81.6,29.1,73.1,41.5C64.6,53.8,53.2,63.9,40.1,71.3C27.1,78.8,13.5,83.6,-0.1,83.8C-13.8,84,-27.6,79.6,-39.8,72.1C-52,64.6,-62.7,54.1,-71.2,41.7C-79.7,29.3,-86.1,14.6,-86.3,-0.1C-86.4,-14.9,-80.4,-29.8,-71.7,-42.1C-63,-54.5,-51.7,-64.3,-38.7,-72.1C-25.7,-79.9,-12.9,-85.7,0.8,-87.1C14.6,-88.5,29.2,-85.5,44.7,-76.4Z" transform="translate(100 100)" />
               </svg>
            
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tighter relative z-10">10+</p>
              <p className="text-[10px] uppercase font-black tracking-widest relative z-10 text-gray-200">Años Reparando PCs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;