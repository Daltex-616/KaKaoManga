
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-kakao-darkBlue text-kakao-cream">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/072250b3-344f-4ab2-bacd-335e109edcd5.png" 
                alt="Kakao Manga Logo" 
                className="h-10 object-contain"
              />
            </Link>
            <p className="text-sm text-kakao-cream/80">
              Tu tienda de comics y mangas con un café acogedor donde puedes leer y relajarte.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-kakao-cream/70 hover:text-kakao-pink transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-kakao-cream/70 hover:text-kakao-pink transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-kakao-cream/70 hover:text-kakao-pink transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-kakao-gold tracking-wider uppercase mb-4">
              Tienda
            </h3>
            <ul className="space-y-2">
              <li><Link to="/comics" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Comics</Link></li>
              <li><Link to="/manga" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Manga</Link></li>
              <li><Link to="/novedades" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Novedades</Link></li>
              <li><Link to="/ofertas" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Ofertas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-kakao-gold tracking-wider uppercase mb-4">
              Café
            </h3>
            <ul className="space-y-2">
              <li><Link to="/cafe/menu" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Menú</Link></li>
              <li><Link to="/cafe/eventos" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Eventos</Link></li>
              <li><Link to="/cafe/reservas" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Reservas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-kakao-gold tracking-wider uppercase mb-4">
              Información
            </h3>
            <ul className="space-y-2">
              <li><Link to="/nosotros" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/contacto" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Contacto</Link></li>
              <li><Link to="/politica-privacidad" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Política de privacidad</Link></li>
              <li><Link to="/terminos" className="text-kakao-cream/80 hover:text-kakao-pink transition-colors">Términos de servicio</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-kakao-purple/30 pt-8 mt-8">
          <p className="text-sm text-kakao-cream/70 text-center">
            &copy; {new Date().getFullYear()} Kakao Manga. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
