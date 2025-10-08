import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PoroductCard from '../components/conts/ProductCard';
import { products } from '@/data/comics';
import { useNavigate } from 'react-router-dom';

const categories = ["Todos", "Shueisha", "Kodansha", "Otros"];

const filterMangas = (products, searchTerm, activeCategory, sortBy) => {
  let result = products
    .filter((item) => item.category === "manga")
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" ||
        (activeCategory === "Shueisha" && item.publisher === "Shueisha") ||
        (activeCategory === "Kodansha" && item.publisher === "Kodansha") ||
        (activeCategory === "Otros" &&
          item.publisher !== "Shueisha" &&
          item.publisher !== "Kodansha");
      return matchesSearch && matchesCategory;
    });

  if (sortBy === 'price') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
};

const Manga = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const itemsPerPage = isMobile ? 6 : 12;

  const handleCardClick = (id: number) => {
    navigate(`/manga/${id}`);
  };
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setPage(1); // Reset to first page on resize
    };
    checkMobile();
    const handleResize = () => {
      checkMobile();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredMangas = useMemo(() => {
    setIsLoading(true);
    try {
      if (!products) throw new Error('No se pudieron cargar los mangas');
      const result = filterMangas(products, debouncedSearchTerm, activeCategory, sortBy);
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      return [];
    }
  }, [debouncedSearchTerm, activeCategory, sortBy]);

  const visibleMangas = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredMangas.slice(start, start + itemsPerPage);
  }, [filteredMangas, page, itemsPerPage]);

  return (
    <>
      <Navbar />
      <div className="py-16 min-h-screen bg-gradient-to-b from-white to-general-blueCream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-comic text-kakao-lightBlue mb-2">Catálogo de Mangas</h2>
            <p className="text-kakao-darkBlue/70 text-sm sm:text-base max-w-xl mx-auto">
              Descubrí nuestra selección de mangas por autor, editorial o título
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <Input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 bg-white/80 border border-kakao-lightBlue placeholder:text-kakao-darkBlue/50"
              aria-label="Buscar mangas por título o autor"
            />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="p-2 border border-kakao-lightBlue rounded text-sm"
              aria-label="Ordenar mangas"
            >
              <option value="title">Ordenar por Título</option>
              <option value="price">Ordenar por Precio</option>
            </select>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  aria-label={`Filtrar por categoría ${cat}`}
                  aria-selected={activeCategory === cat}
                  className={`px-3 py-1 rounded-full text-sm font-comic ${
                    activeCategory === cat
                      ? "bg-manga-blue text-manga-cream"
                      : "border border-manga-blue text-manga-darkBlue hover:bg-manga-blue/10"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {error ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-red-300">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Cargando mangas...</p>
            </div>
          ) : visibleMangas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {visibleMangas.map((manga) => (
                <PoroductCard key={manga.id} manga={manga}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No se encontraron mangas con esos criterios</p>
            </div>
          )}

          {filteredMangas.length > itemsPerPage && (
            <div className="mt-10 flex justify-center gap-2">
              <Button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="bg-kakao-lightBlue text-white disabled:opacity-50"
                aria-label="Página anterior"
              >
                Anterior
              </Button>
              <span className="self-center text-kakao-darkBlue">Página {page}</span>
              <Button
                disabled={page * itemsPerPage >= filteredMangas.length}
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-kakao-lightBlue text-white disabled:opacity-50"
                aria-label="Página siguiente"
              >
                Siguiente
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Manga;