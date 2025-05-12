
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="bg-kakao-darkBlue shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative h-10">
                <img 
                  src="/lovable-uploads/072250b3-344f-4ab2-bacd-335e109edcd5.png" 
                  alt="Kakao Manga Logo" 
                  className="h-10 object-contain"
                />
              </div>
              <div className="ml-2 hidden sm:flex flex-col items-start">
                <span className="flex items-center">
                  <span className="font-comic text-kakao-gold text-lg leading-none">Kakao</span>
                  <span className="font-comic text-kakao-pink text-lg leading-none ml-1">Manga</span>
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors">
              Inicio
            </Link>
            <Link to="/comics" className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors">
              Comics
            </Link>
            <Link to="/manga" className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors">
              Manga
            </Link>
            <Link to="/cafe" className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors">
              Café
            </Link>
            <Link to="/contacto" className="text-kakao-cream hover:text-kakao-pink font-semibold transition-colors">
              Contacto
            </Link>
            <Button variant="outline" size="icon" className="ml-2 rounded-full bg-kakao-gold text-kakao-darkBlue hover:bg-kakao-pink hover:text-kakao-darkBlue">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito de compras</span>
            </Button>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center text-kakao-cream">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-kakao-darkBlue shadow-lg">
            <Link to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link to="/comics" 
              className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
              onClick={() => setIsOpen(false)}
            >
              Comics
            </Link>
            <Link to="/manga" 
              className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
              onClick={() => setIsOpen(false)}
            >
              Manga
            </Link>
            <Link to="/cafe" 
              className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
              onClick={() => setIsOpen(false)}
            >
              Café
            </Link>
            <Link to="/contacto" 
              className="block px-3 py-2 rounded-md text-base font-medium text-kakao-cream hover:text-kakao-pink hover:bg-kakao-darkBlue/70"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
            <div className="px-3 py-3 flex items-center">
              <Button variant="outline" size="icon" className="rounded-full bg-kakao-gold text-kakao-darkBlue hover:bg-kakao-pink hover:text-kakao-darkBlue">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito de compras</span>
              </Button>
              <span className="ml-3 font-comic">
                <span className="text-kakao-gold">Kakao</span>
                <span className="text-kakao-pink ml-1">Manga</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
