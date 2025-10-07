import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useCartStore } from '@/store/useCartStore';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setShowAuthButtons(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (totalItems > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  return (
    <>
      <nav className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${isScrolled ? 'bg-kakao-lightBlue/80 backdrop-blur-md' : 'bg-kakao-lightBlue'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative h-10">
                  <img
                    src="/showa-logo.jpg"
                    alt="Kakao Manga Logo"
                    className="h-10 object-cover rounded-full"
                  />
                </div>
                <div className="ml-2 hidden sm:flex flex-col items-start">
                  <span className="flex items-center">
                    <span className="font-comic text-kakao-gold text-lg leading-none">Showa</span>
                    <span className="font-comic text-kakao-pink text-lg leading-none ml-1">Manga-Café</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {['Comics', 'Manga', 'Cafe', 'Contacto'].map((label, i) => (
                <Link
                  key={i}
                  to={`/${label.toLowerCase()}`}
                  className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors"
                >
                  {label}
                </Link>
              ))}

              {/* Carrito Desktop */}
              <Link to="/cart" className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className={`ml-2 rounded-full bg-kakao-gold text-kakao-darkBlue hover:bg-kakao-pink hover:text-kakao-darkBlue transition-transform ${bounce ? 'animate-bounce' : ''}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Carrito de compras</span>
                </Button>

                {totalItems > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full transition-transform duration-300 ${bounce ? 'animate-bounce' : ''}`}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center bg-kakao-white text-kakao-darkBlue hover:bg-kakao-lightBlue hover:text-kakao-white transition-colors duration-300 rounded-full shadow-md"
              >
                {isOpen ? <X className="h-6 w-6 text-kakao-white" /> : <Menu className="h-6 w-6 text-kakao-darkBlue" />}
                <span className="sr-only">Abrir menú</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-kakao-lightBlue shadow-lg">
              {['Inicio', 'Comics', 'Manga', 'Cafe', 'Contacto'].map((label, i) => (
                <Link
                  key={i}
                  to={`/${label.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Kakao Manga + Carrito Mobile */}
              <div className="px-3 py-3 flex items-center justify-between relative">
                <span className="font-comic">
                  <span className="text-kakao-gold">Kakao</span>
                  <span className="text-kakao-pink ml-1">Manga</span>
                </span>

                <Link to="/cart" className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full bg-kakao-gold text-kakao-darkBlue hover:bg-kakao-pink hover:text-kakao-darkBlue transition-transform ${bounce ? 'animate-bounce' : ''}`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Carrito de compras</span>
                  </Button>
                </Link>

                {totalItems > 0 && (
                  <span
                    className={`absolute top-1 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full transition-transform duration-300 ${bounce ? 'animate-bounce' : ''}`}
                  >
                    {totalItems}
                  </span>
                )}
              </div>

              {/* Auth Links Mobile */}
              <Link
                to="/crear-cuenta"
                className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
                onClick={() => setIsOpen(false)}
              >
                Crear cuenta
              </Link>
              <Link
                to="/ingresar"
                className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
                onClick={() => setIsOpen(false)}
              >
                Ingresar
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Botones fijos en la parte inferior (solo desktop) */}
      {!isMobile && (
        <div className={`fixed bottom-0 left-0 w-full py-2 px-4 flex justify-end space-x-4 transition-opacity duration-300 z-[9999] ${showAuthButtons ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/crear-cuenta">
            <Button variant="secondary" className="bg-kakao-lightBlue text-white hover:bg-kakao-darkBlue">
              Crear cuenta
            </Button>
          </Link>
          <Link to="/ingresar">
            <Button variant="outline" className="text-kakao-darkBlue border-kakao-darkBlue hover:bg-kakao-darkBlue hover:text-white">
              Ingresar
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;