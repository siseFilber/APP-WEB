import { Link } from 'react-router-dom';

const Footer = () => {
  // Obtenemos el usuario para saber qué enlaces mostrar
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <footer className="bg-[#111] text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-tighter">Support<span className="text-cyan-500">Computer</span></h3>
          <p className="text-xs leading-relaxed">
            Especialistas en infraestructura de red y soporte técnico avanzado en Lurigancho-Chosica, Lima.
          </p>
        </div>

        {/* --- COLUMNA DE NAVEGACIÓN --- */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Navegación</h3>
          <ul className="text-xs space-y-2 uppercase font-bold">
            <li><Link to="/" className="hover:text-cyan-500 transition">Inicio</Link></li>
            
            {/* Solo si es técnico ve este enlace */}
            {user?.role === 'TECH' && (
              <li><Link to="/mis-servicios" className="text-cyan-500 hover:text-white transition">● Mis Servicios</Link></li>
            )}
            
            {/* Solo si es cliente ve este enlace */}
            {user?.role === 'CLIENT' && (
              <li><Link to="/tecnicos" className="hover:text-cyan-500 transition">Ver Técnicos</Link></li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Contacto</h3>
          <p className="text-xs">📍 Lurigancho-Chosica, Lima</p>
          <p className="text-xs">📧 soporte@tecnico.com</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Horario</h3>
          <p className="text-xs">Lun - Vie: 8:00 AM - 6:00 PM</p>
          <p className="text-xs">Sáb: 9:00 AM - 1:00 PM</p>
        </div>
      </div>
      
      <div className="text-center mt-12 text-[10px] uppercase tracking-widest border-t border-gray-900 pt-6">
        © 2026 SupportComputer - Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;