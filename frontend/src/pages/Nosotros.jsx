import React from 'react';

const Nosotros = () => {
  const caracteristicas = [
    { title: "Soporte 24/7", desc: "Sistema de tickets activo para atender emergencias en cualquier momento." },
    { title: "Gestión de Servicios", desc: "Catálogo completo de soluciones de hardware, software y redes." },
    { title: "Panel Técnico", desc: "Control total de reparaciones y asignación de especialistas." },
    { title: "Transparencia", desc: "Seguimiento en tiempo real del estado de tus equipos y servicios." },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-cyan-500 font-black uppercase tracking-widest text-xs mb-2">Sobre Forward Vision</h2>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900 mb-6">
              Expertos en <span className="text-cyan-500">Tecnología</span>
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              SupportComputer es la división especializada de <strong>Forward Vision</strong> diseñada para centralizar el soporte técnico de alta calidad. 
              Nuestra plataforma permite conectar a clientes con técnicos expertos, garantizando eficiencia y rapidez en cada solución.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {caracteristicas.map((c, i) => (
                <div key={i} className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="font-black uppercase text-sm text-gray-800">{c.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070" 
              alt="Tech Support" 
              className="rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-cyan-500 p-8 text-white hidden md:block">
              <p className="text-4xl font-black italic tracking-tighter">10+</p>
              <p className="text-[10px] uppercase font-bold">Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;