
import { Button } from '@/components/ui/button';

const CafeSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-comic-brown font-medium">Nuestro Café</span>
            <h2 className="text-4xl font-comic text-comic-purple mt-2 mb-6">Un lugar para los amantes de comics y café</h2>
            <p className="text-gray-700 mb-6">
              Disfruta de tu lectura favorita acompañada de las mejores bebidas artesanales. Nuestro café 
              está diseñado para que los amantes de los comics y manga tengan un espacio acogedor donde 
              compartir su pasión.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-comic-cream flex items-center justify-center">
                    <span className="text-comic-brown text-xl font-bold">☕</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Café Premium</h3>
                  <p className="text-gray-600 text-sm">Bebidas de especialidad preparadas por baristas expertos</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-comic-cream flex items-center justify-center">
                    <span className="text-comic-brown text-xl font-bold">📚</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Biblioteca</h3>
                  <p className="text-gray-600 text-sm">Miles de títulos disponibles para leer mientras disfrutas de tu bebida</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-comic-cream flex items-center justify-center">
                    <span className="text-comic-brown text-xl font-bold">🎮</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Área de juegos</h3>
                  <p className="text-gray-600 text-sm">Juegos de mesa temáticos para compartir con amigos</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-comic-cream flex items-center justify-center">
                    <span className="text-comic-brown text-xl font-bold">🎭</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Eventos</h3>
                  <p className="text-gray-600 text-sm">Presentaciones de libros, cosplay y más actividades</p>
                </div>
              </div>
            </div>
            <Button className="bg-comic-brown hover:bg-comic-brown/90 text-white px-8">
              Ver Menú
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixid=M3wxMTE3fDB8MXxzZWFyY2h8MTB8fGNhZmV8ZW58MHx8fHwxNzE1MTI0MTMwfDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=600"
              alt="Comic Café Interior"
              className="rounded-xl shadow-xl z-10 relative"
            />
            <div className="absolute -bottom-5 -right-5 h-60 w-60 bg-comic-cream rounded-full -z-10"></div>
            <div className="absolute -top-5 -left-5 h-40 w-40 bg-comic-purple rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeSection;
