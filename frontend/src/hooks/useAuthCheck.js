import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp < Date.now() / 1000) {
            handleLogout();
          }
        } catch {
          handleLogout();
        }
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      window.location.reload();
    };

    const interval = setInterval(checkToken, 60000); // Chequeo cada minuto
    return () => clearInterval(interval);
  }, [navigate]);
};