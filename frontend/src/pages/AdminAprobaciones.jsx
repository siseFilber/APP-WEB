import { useEffect, useState } from 'react';
import { getAllUsersRequest, updateStatusRequest } from '../api/users';

const AdminAprobaciones = () => {
  const [pendingTechs, setPendingTechs] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarPendientes = async () => {
    try {
      setLoading(true);
      const res = await getAllUsersRequest();
      // Filtramos solo los técnicos que esperan aprobación
      const waiting = res.data.filter(user => user.status === 'WAITING_ADMIN');
      setPendingTechs(waiting);
    } catch (error) {
      console.error("Error al cargar pendientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPendientes();
  }, []);

  const aprobarTecnico = async (id) => {
    if (!window.confirm("¿Confirmar alta de este técnico en SupportComputer?")) return;
    try {
      await updateStatusRequest(id, 'ACTIVE');
      alert("Técnico activado correctamente");
      cargarPendientes(); // Recargar lista
    } catch (error) {
      alert("Error al aprobar técnico");
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-[#376996]">Verificando Credenciales...</div>;

  return (
    <div className="min-h-screen bg-white py-20 px-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <span className="text-[#C2A385] font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Control de Calidad Staff</span>
          <h2 className="text-4xl font-light text-[#333]">Aprobaciones <span className="font-black text-[#376996]">Pendientes</span></h2>
        </header>

        <div className="grid gap-6">
          {pendingTechs.length > 0 ? (
            pendingTechs.map(tech => (
              <div key={tech.id} className="border border-gray-100 p-8 rounded-[2rem] flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">DNI: {tech.dni}</p>
                  <h3 className="text-xl font-bold text-[#333]">{tech.name}</h3>
                  <p className="text-sm text-slate-500">{tech.email}</p>
                </div>
                <button 
                  onClick={() => aprobarTecnico(tech.id)}
                  className="bg-[#A7D7C5] hover:bg-[#376996] hover:text-white text-[#0D3B66] font-black uppercase text-[10px] tracking-widest py-4 px-8 rounded-2xl transition-all"
                >
                  Aprobar Registro
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-slate-400 uppercase text-xs font-black tracking-widest">No hay técnicos por validar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAprobaciones;