import React from 'react';

const Contacto = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-[#111] border border-gray-800 p-10 shadow-2xl flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">
              ¿Tienes una <span className="text-cyan-500">Urgencia?</span>
            </h2>
            <p className="text-gray-400 mb-8 font-medium">Contáctanos directamente para soporte técnico inmediato o consultas sobre servicios de red.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 italic font-black">@</div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-black">Email oficial</p>
                  <p className="text-sm font-bold">contacto@forwardvision.cloud</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-500 italic font-black">W</div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-black">WhatsApp Soporte</p>
                  <p className="text-sm font-bold">+51 900 000 000</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-[#0a0a0a] border border-gray-800 p-8">
            <h3 className="text-xs uppercase font-black tracking-[0.3em] text-cyan-500 mb-6 text-center italic">Formulario Rápido</h3>
            <form className="space-y-4">
              <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-[#111] border border-gray-800 p-3 text-xs outline-none focus:border-cyan-500 transition-all" />
              <input type="email" placeholder="CORREO ELECTRÓNICO" className="w-full bg-[#111] border border-gray-800 p-3 text-xs outline-none focus:border-cyan-500 transition-all" />
              <textarea placeholder="MENSAJE" rows="3" className="w-full bg-[#111] border border-gray-800 p-3 text-xs outline-none focus:border-cyan-500 transition-all"></textarea>
              <button className="w-full bg-cyan-500 text-black font-black uppercase text-xs py-3 hover:bg-white transition-all italic">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;