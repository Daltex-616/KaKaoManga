import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/comics';

const categories = ["Todos", "DC", "Marvel", "Otros"];

const Comic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 6 : 12);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredComics = useMemo(() => {
    return products
      .filter((comic) => comic.category === "comic")
      .filter((comic) => {
        const matchesSearch =
          comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comic.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          activeCategory === "Todos" ||
          (activeCategory === "DC" && comic.publisher === "DC Comics") ||
          (activeCategory === "Marvel" && comic.publisher === "Marvel") ||
          (activeCategory === "Otros" &&
            comic.publisher !== "DC Comics" &&
            comic.publisher !== "Marvel");

        return matchesSearch && matchesCategory;
      });
  }, [searchTerm, activeCategory]);

  const visibleComics = filteredComics.slice(0, visibleCount);

  const handleLoadMore = () => {
    const increment = isMobile ? 6 : 12;
    setVisibleCount((prev) => prev + increment);
  };

  return (
    <>
      <Navbar />

      <div className="py-16 min-h-screen bg-gradient-to-b from-white to-general-blueCream">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-comic text-kakao-lightBlue mb-2">Catálogo de Cómics</h2>
            <p className="text-kakao-darkBlue/70 text-sm sm:text-base max-w-xl mx-auto">
              Explora nuestra colección de cómics por autor, editorial o título
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <Input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 bg-white/80 border border-kakao-lightBlue placeholder:text-kakao-darkBlue/50"
            />

            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(isMobile ? 6 : 12);
                  }}
                  className={`text-sm px-4 py-2 rounded-full ${
                    activeCategory === cat
                      ? 'bg-kakao-lightBlue text-white'
                      : 'border-kakao-lightBlue text-kakao-darkBlue hover:bg-kakao-lightBlue/10'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {visibleComics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleComics.map((comic) => (
                <Card
                  key={comic.id}
                  className="overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg cursor-pointer"
                >
                  <div className="aspect-[3/4] relative">
                    <img
                      src={comic.image}
                      alt={comic.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-kakao-gold text-kakao-darkBlue px-3 py-1 rounded-full text-xs font-medium">
                      {comic.category}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{comic.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-1">{comic.author}</p>
                    <p className="text-kakao-lightBlue font-bold mt-2">${comic.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full border-kakao-lightBlue text-kakao-lightBlue hover:bg-kakao-lightBlue hover:text-white transition-colors"
                    >
                      Añadir al carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No se encontraron cómics con esos criterios</p>
            </div>
          )}

          {/* Ver más */}
          {visibleCount < filteredComics.length && (
            <div className="mt-10 text-center">
              <Button
                onClick={handleLoadMore}
                className="bg-kakao-lightBlue hover:bg-kakao-darkBlue text-white px-8 transition-colors animate-pulse"
              >
                Ver más
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Comic;