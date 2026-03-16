import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtpRequest, resendOtpRequest } from '../api/auth.api';

const VerifyOTP = () => {
  const { state } = useLocation(); // Recibimos el email desde el registro
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const email = state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtpRequest({ email, code });
      alert("¡Cuenta verificada con éxito!");
      navigate('/login');
    } catch (error) {
        error
      alert("Código incorrecto o expirado");
    }
    setLoading(false);
  };

  const handleResend = async () => {
    try {
      await resendOtpRequest(email);
      alert("Se ha enviado un nuevo código a su correo.");
    } catch (error) {
        error
      alert("Error al reenviar el código");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-10 rounded-lg shadow-2xl border-t-4 border-cyan-500 w-full max-w-md text-center">
        <h2 className="text-2xl font-black text-white mb-2 uppercase">Verificar <span className="text-cyan-500">Cuenta</span></h2>
        <p className="text-gray-400 text-sm mb-8">Hemos enviado un código a: <br/><span className="text-white font-bold">{email}</span></p>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <input 
            type="text" 
            maxLength="6"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="0 0 0 0 0 0" 
            className="w-full p-4 bg-[#111] border-2 border-cyan-900 text-cyan-400 text-center text-2xl tracking-[0.5em] focus:border-cyan-500 outline-none transition-all"
          />
          
          <button 
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-black py-4 uppercase transition shadow-lg"
          >
            {loading ? 'Verificando...' : 'Confirmar Código'}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-gray-500 text-xs mb-2 uppercase font-bold">¿No recibiste el código?</p>
          <button 
            onClick={handleResend}
            className="text-cyan-500 hover:text-white transition font-bold text-sm uppercase underline"
          >
            Reenviar nuevo código
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;