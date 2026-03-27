// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-black">
      <Navbar />
      {/* Añadimos pt-24 (96px) para que el contenido empiece 
          justo debajo del Navbar transparente. 
      */}
      <main className="flex-grow pt-24"> 
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;