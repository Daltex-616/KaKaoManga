import { useState, useMemo, useEffect } from 'react';
import CafeCard from '../components/conts/CafeCard';
import { products } from '../data/cafe';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const categories = ['Todos', 'Café', 'Té', 'Comida'];

const filterItems = (products, searchTerm, activeCategory, sortBy) => {
  let result = products
    .filter((item) => item.type === 'cafe')
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'Todos' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

  if (sortBy === 'price') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
};

const Cafe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 11;

  const filteredItems = useMemo(() => {
    setIsLoading(true);
    const result = filterItems(products, debouncedSearchTerm, activeCategory, sortBy);
    setIsLoading(false);
    return result;
  }, [debouncedSearchTerm, activeCategory, sortBy]);

  const visibleItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, page, itemsPerPage]);

  return (
    <>
      <Navbar />

      <section className="py-16 min-h-screen bg-gradient-to-b from-white to-general-blueCream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-comic text-manga-blue mb-2">Café, Té y mucho más!!</h1>
            <p className="text-manga-darkBlue/70 text-sm sm:text-base max-w-2xl mx-auto">
              Explora nuestra selección de cafés, tés y delicias culinarias
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 p-2 bg-white/80 border border-manga-blue rounded-md placeholder:text-manga-darkBlue/50 focus:outline-none focus:ring-2 focus:ring-manga-blue"
              aria-label="Buscar productos de café y comida"
            />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="p-2 border border-manga-blue rounded-md text-sm bg-white"
              aria-label="Ordenar productos"
            >
              <option value="name">Ordenar por Nombre</option>
              <option value="price">Ordenar por Precio</option>
            </select>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-comic ${
                    activeCategory === cat
                      ? 'bg-manga-blue text-manga-cream'
                      : 'border border-manga-blue text-manga-darkBlue hover:bg-manga-blue/10'
                  }`}
                  aria-label={`Filtrar por categoría ${cat}`}
                  aria-selected={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="space-y-12">
              {/* Fila 1: 4 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleItems.slice(0, 4).map((item) => (
                  <CafeCard key={item.id} item={item} />
                ))}
              </div>

              {/* Fila 2: 3 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleItems.slice(4, 7).map((item) => (
                  <CafeCard key={item.id} item={item} />
                ))}
              </div>

              {/* Fila 3: 4 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleItems.slice(7, 11).map((item) => (
                  <CafeCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No se encontraron productos con esos criterios</p>
            </div>
          )}

          {filteredItems.length > itemsPerPage && (
            <div className="mt-8 flex justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-manga-blue text-white rounded-md disabled:opacity-50"
                aria-label="Página anterior"
              >
                Anterior
              </button>
              <span className="self-center text-manga-darkBlue">Página {page}</span>
              <button
                disabled={page * itemsPerPage >= filteredItems.length}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-manga-blue text-white rounded-md disabled:opacity-50"
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cafe;