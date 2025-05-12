
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-comic-cream py-12">
        <div className="text-center px-4">
          <h1 className="text-9xl font-comic text-comic-purple mb-4">404</h1>
          <p className="text-2xl text-comic-brown mb-8">¡Ups! Parece que te has perdido en nuestro universo de comics</p>
          <Button asChild className="bg-comic-purple hover:bg-comic-purple/90 text-white">
            <Link to="/">
              Volver a la página principal
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
