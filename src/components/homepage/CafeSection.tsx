import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CafeSection = () => {
  const features = [
    {
      icon: '☕',
      title: "Café Premium",
      description: "Bebidas de especialidad preparadas por baristas expertos"
    },
    {
      icon: '📚',
      title: "Biblioteca",
      description: "Miles de títulos disponibles para leer mientras disfrutas"
    },
    {
      icon: 'ඞ',
      title: "Zona sus",
      description: "pasan cosas"
    },
    {
      icon: '🍰',
      title: "Dulces y Snacks",
      description: "Deliciosos postres y snacks para acompañar tu café"
    }
  ];

  return (
    <div className="py-16 bg-general-blueCream">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12"
        >
          {/* Columna izquierda - Contenido */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-comic-brown font-medium inline-block mb-2"
              >
                Nuestro Café
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-comic text-comic-purple"
              >
                Un lugar para los amantes de comics y café
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700"
            >
              Disfruta de tu lectura favorita acompañada de las mejores bebidas artesanales. 
              Nuestro café está diseñado para que los amantes de los comics y manga tengan 
              un espacio acogedor donde compartir su pasión.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-comic-cream/20 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón mejorado con hover destacado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button 
                className="relative overflow-hidden group
                          bg-gradient-to-r from-comic-brown to-comic-brown-dark
                          text-white font-bold px-8 py-4 text-lg
                          border-2 border-comic-yellow
                          shadow-lg hover:shadow-xl shadow-comic-brown/40 hover:shadow-comic-brown/60
                          transition-all duration-300
                          hover:scale-105 active:scale-100"
              >
                <span className="relative z-10">Ver Menú Completo</span>
                
                {/* Efecto de brillo al hover */}
                <span className="absolute inset-0 bg-comic-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                
                {/* Efecto de borde animado */}
                <span className="absolute inset-0 border-2 border-transparent group-hover:border-comic-yellow transition-all duration-500 group-hover:scale-[1.02]"></span>
              </Button>
            </motion.div>
          </div>

          {/* Columna derecha - Imagen */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-full min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixid=M3wxMTE3fDB8MXxzZWFyY2h8MTB8fGNhZmV8ZW58MHx8fHwxNzE1MTI0MTMwfDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200"
                alt="Comic Café Interior"
                className="rounded-2xl shadow-2xl object-cover h-full w-full absolute inset-0 z-10"
              />
              <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-comic-cream rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 h-48 w-48 bg-comic-purple rounded-full -z-10"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-comic-yellow"
        >
          <div className="h-[400px] w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132579!2d-73.987844924525!3d40.74844047138839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTQuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0"
              title="Ubicación del Comic Café"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
          </div>
          <div className="bg-comic-purple p-4 text-center">
            <h3 className="text-white font-bold text-xl">¡Visítanos!</h3>
            <p className="text-comic-cream">Av. Comic 1234, Ciudad Geek</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CafeSection;