// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  // Datos de ejemplo basados en tu imagen
  const servicios = [
    { title: "Servicio Técnico Oficial", desc: "Técnicos profesionales con más de 10 años de experiencia.", icon: "🛠️" },
    { title: "Distribución de Equipos", desc: "Venta y distribución de componentes de alta gama.", icon: "📦" },
    { title: "Garantía y Mantenimiento", desc: "Contratos de mantenimiento preventivo para empresas.", icon: "📅" },
    { title: "Equipos de Ocasión", desc: "Equipos reacondicionados con garantía total.", icon: "🔄" },
    { title: "Repuestos y Accesorios", desc: "Piezas originales para todas las marcas.", icon: "⚙️" },
    { title: "Alquiler de Equipos", desc: "Disponibilidad inmediata para necesidades puntuales.", icon: "📑" },
  ];

  return (
    <div className="bg-white">
      {/* --- SECCIÓN HERO --- */}
      <section 
        className="relative h-[450px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">Servicio Técnico Oficial</h2>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Soporte Especializado <br />
            <span className="text-cyan-400">Forward Vision</span>
          </h1>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded transition uppercase text-sm">
            Leer Más
          </button>
        </div>

        {/* Cuadro de contacto flotante (Azul) */}
        <div className="absolute bottom-0 right-10 bg-cyan-500 p-6 hidden md:flex items-center gap-4 text-white transform translate-y-1/2 shadow-xl">
          <span className="text-3xl">📧</span>
          <div>
            <p className="text-[10px] uppercase font-bold opacity-80">Ayuda en consultas</p>
            <p className="font-bold text-lg leading-tight text-white">CONTACTO</p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN SERVICIOS --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 border-l-4 border-cyan-500 pl-4">
          <p className="text-gray-400 text-xs uppercase font-bold">Servicio Oficial | SupportComputer</p>
          <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-tighter">Servicios y Productos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((s, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-48 bg-gray-200 mb-4 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1591405351990-4726e33df58d?q=80&w=400&auto=format&fit=crop`} 
                  alt={s.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-gray-800 p-3 text-white text-xl">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-2 uppercase flex justify-between items-center">
                {s.title} <span className="text-cyan-500">+</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;