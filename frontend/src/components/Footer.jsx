import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <footer className="bg-black border-t border-gray-100 pt-20 pb-10 font-sans text-slate-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          
          {/* --- COLUMNA BRANDING CON RESALTE OSCURO --- */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group relative">
              {/* Círculo de contraste oscuro focalizado para que brille el blanco */}
              <div className="absolute inset-0 bg-black/90 blur-2xl rounded-full scale-125 opacity-100 group-hover:scale-150 transition-transform duration-700"></div>
              
              <img 
                src={logo}
                alt="DAY tech" 
                className="h-20 w-auto relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110"
              />
            </Link>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Laboratorio: Operativo
                </span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed italic text-slate-400">
                Especialistas en microelectrónica, reparación de hardware y repotenciación de equipos en Chosica.
              </p>
            </div>
          </div>

          {/* --- COLUMNA NAVEGACIÓN --- */}
          <div>
            <h4 className="text-slate-900 font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Explorar</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-[#376996] transition-colors">● Inicio</Link></li>
              <li><Link to="/tecnicos" className="hover:text-[#376996] transition-colors">● Staff Técnico</Link></li>
              <li><Link to="/servicios" className="hover:text-[#376996] transition-colors">● Servicios</Link></li>
              {user?.role === 'CLIENT' && (
                <li><Link to="/contacto" className="hover:text-[#376996] transition-colors">● Solicitar Reparación</Link></li>
              )}
              {(user?.role === 'ADMIN' || user?.role === 'TECH') && (
                <li><Link to="/dashboard" className="text-[#376996] hover:text-slate-900 transition-colors">● Dashboard Interno</Link></li>
              )}
            </ul>
          </div>

          {/* --- COLUMNA CONTACTO --- */}
          <div>
            <h4 className="text-slate-900 font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Contacto Directo</h4>
            <div className="space-y-4 text-[11px] font-bold text-slate-500">
              <p>📍 Jr. Trujillo Central - Chosica</p>
              <p>📧 <a href="mailto:soporte@daytech.com" className="text-[#376996] hover:underline">soporte@SupportComputer.com</a></p>
              <p>📞 +51 956321457</p>
            </div>
          </div>

          {/* --- COLUMNA DISPONIBILIDAD --- */}
          <div>
            <h4 className="text-slate-900 font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Horario de Taller</h4>
            <div className="space-y-3 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
              <p>LUN - VIE: <span className="text-[#376996] ml-2 font-black italic">09:00 - 19:00</span></p>
              <p>SÁB: <span className="text-[#376996] ml-2 font-black italic">09:00 - 14:00</span></p>
            </div>

            <div className="mt-10 p-6 bg-[#A8D0E6]/20 border border-[#A8D0E6]/40 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-[#A8D0E6]/30 rounded-full group-hover:scale-150 transition-transform"></div>
              <p className="text-[9px] text-[#0D3B66] font-black text-center leading-tight uppercase tracking-widest relative z-10">
                Diagnóstico Rápido<br />
                <span className="text-xl font-black text-[#0D3B66] italic">PREVIA CITA</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
          <p>© 2026 <span className="text-slate-400">DAY tech</span> - Centro de Reparaciones Especializado</p>
          <div className="flex gap-10">
            <Link to="/terminos" className="hover:text-[#376996] transition-colors">Términos</Link>
            <Link to="/privacidad" className="hover:text-[#376996] transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;