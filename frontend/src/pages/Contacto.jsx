import React from 'react';

const Contacto = () => {
  return (
    <div className="bg-white min-h-screen text-[#333] flex items-center font-sans">
      <div className="container mx-auto px-6 py-20">
        
        {/* Cabecera Estilizada */}
        <header className="mb-16 text-center">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block italic">DAY Tech Center</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-6">
            ¿Tienes una <span className="font-extrabold text-[#376996]">Urgencia?</span>
          </h1>
          <div className="w-20 h-1 bg-[#A8D0E6] mx-auto rounded-full"></div>
        </header>

        <div className="max-w-6xl mx-auto bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-16 relative overflow-hidden">
          
          {/* Decoración orgánica de fondo (Basada en image_14.png) */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F2E8CF] opacity-40 rounded-full blur-3xl"></div>
          
          {/* --- INFORMACIÓN DE CONTACTO --- */}
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-bold text-[#333] tracking-tight mb-6">
              Soporte <span className="text-[#376996]">Directo</span>
            </h2>
            <p className="text-slate-500 mb-10 font-medium leading-relaxed">
              Contáctanos para soporte técnico inmediato en la red de Chosica o consultas sobre nuevas instalaciones de fibra óptica.
            </p>
            
            <div className="space-y-8">
              {/* Email Card */}
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-[#A8D0E6] rounded-2xl flex items-center justify-center text-[#0D3B66] text-xl font-black group-hover:scale-110 transition-transform duration-300">
                  @
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#C2A385] font-black tracking-widest">Email oficial</p>
                  <p className="text-base font-bold text-[#333]">contacto@SupportComputer.cloud</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 bg-[#A7D7C5] rounded-2xl flex items-center justify-center text-[#0D3B66] text-xl font-black group-hover:scale-110 transition-transform duration-300">
                  W
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#C2A385] font-black tracking-widest">WhatsApp Soporte</p>
                  <p className="text-base font-bold text-[#333]">+51 900 000 000</p>
                </div>
              </div>
            </div>

            {/* Ilustración o Frase de Confianza */}
            <div className="mt-16 p-8 bg-[#F2E8CF] rounded-[2rem] border border-[#E76F51]/10">
               <p className="text-[10px] font-black uppercase text-[#E76F51] tracking-[0.2em] mb-2">Compromiso Forward Vision</p>
               <p className="text-sm font-medium italic text-[#4B3B40]">"Garantizamos respuesta técnica en menos de 2 horas para incidencias críticas."</p>
            </div>
          </div>
          
          {/* --- FORMULARIO ORGÁNICO --- */}
          <div className="flex-1 bg-gray-50 rounded-[2.5rem] p-10 border border-slate-100 relative z-10 shadow-inner">
            <h3 className="text-[11px] uppercase font-black tracking-[0.4em] text-[#376996] mb-8 text-center italic">Formulario de Enlace</h3>
            <form className="space-y-5">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Identificación</label>
                <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Punto de Contacto</label>
                <input type="email" placeholder="CORREO ELECTRÓNICO" className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium" />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-widest">Descripción del Requerimiento</label>
                <textarea placeholder="¿EN QUÉ PODEMOS AYUDARTE?" rows="4" className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs outline-none focus:border-[#376996] focus:ring-4 focus:ring-blue-50 transition-all font-medium resize-none"></textarea>
              </div>

              <button className="w-full bg-[#376996] text-white font-black uppercase text-xs py-5 rounded-2xl hover:bg-[#333] transition-all duration-500 shadow-xl shadow-blue-900/10 active:scale-95 tracking-[0.2em] mt-4">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;