import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import ProductCard from '@/components/conts/ProductCard';
import { products } from '@/data/comics';

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.isNew)
      .filter((product) => {
        if (activeCategory === 'all') return true;
        return product.category === activeCategory;
      })
      .sort((a, b) => b.id - a.id);
  }, [activeCategory]);

  return (
    <div className="py-12 min-h-screen bg-gradient-to-b from-white to-general-blueCream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sticky top-0 bg-white/80 backdrop-blur-md py-4 z-10 rounded-lg">
          <h2 className="text-5xl font-bold text-comic-purple font-comic">¡Novedades!</h2>

          <div className="flex bg-white rounded-lg p-1 border border-comic-purple shadow-sm w-full sm:w-auto">
            {[
              { value: 'all', label: 'Todos' },
              { value: 'comic', label: 'Cómics' },
              { value: 'manga', label: 'Mangas' },
              { value: 'accesorio', label: 'Accesorios' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex-1 sm:flex-none',
                  activeCategory === value
                    ? 'bg-comic-purple/90 text-comic-yellow font-bold shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-comic-purple/10'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Product list */}
        {filteredProducts.length > 0 ? (
          <div
            className={clsx(
              isMobile
                ? 'flex flex-col gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
              'transition-all duration-300'
            )}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-2 -right-2 z-20">
                  <Badge className="bg-comic-red text-white px-3 py-1 shadow-lg transform rotate-12">
                    ¡Nuevo!
                  </Badge>
                </div>
                <ProductCard manga={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No hay productos nuevos en esta categoría</p>
          </div>
        )}

        {/* Ver más (oculto porque solo mostramos nuevos) */}
      </div>
    </div>
  );
};

export default ProductGallery;