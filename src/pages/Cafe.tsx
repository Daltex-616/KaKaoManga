import { useState, useMemo, useEffect } from "react";
import CafeCard from "../components/conts/CafeCard";
import { products } from "../data/cafe";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const categories = ["Todos", "Café", "Té", "Comida"];

const filterItems = (
  products: typeof products,
  searchTerm: string,
  activeCategory: string,
  sortBy: string
) => {
  let result = products
    .filter((item) => item.type === "cafe")
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

  if (sortBy === "price") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
};

const Cafe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 11;

  const filteredItems = useMemo(() => {
    setIsLoading(true);
    const result = filterItems(
      products,
      debouncedSearchTerm,
      activeCategory,
      sortBy
    );
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
        <div className="max-w-7xl mx-auto px-4">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-comic text-manga-blue mb-2 tracking-wide drop-shadow-sm">
              Café, Té y mucho más!!
            </h1>
            <p className="text-manga-darkBlue/80 text-sm sm:text-base italic max-w-2xl mx-auto">
              Explora nuestra selección de cafés, tés y delicias culinarias
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
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
                      ? "bg-manga-blue text-manga-cream"
                      : "border border-manga-blue text-manga-darkBlue hover:bg-manga-blue/10"
                  }`}
                  aria-label={`Filtrar por categoría ${cat}`}
                  aria-selected={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Productos */}
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {visibleItems.map((item) => (
                <CafeCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">
                No se encontraron productos con esos criterios
              </p>
            </div>
          )}

          {/* Paginación */}
          {filteredItems.length > itemsPerPage && (
            <div className="mt-12 flex justify-center">
              <div className="bg-[#FFFAEF] border border-[#FEE8C3] rounded-xl shadow-md px-6 py-4 flex items-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-4 py-2 rounded-md font-semibold text-[#FFFFFF] bg-[#0077B6] hover:bg-[#1A1F2C] transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Página anterior"
                >
                  ← Anterior
                </button>

                <span className="text-[#1A1F2C] font-comic text-base">
                  Página{" "}
                  <span className="font-bold text-[#000000]">{page}</span>
                </span>

                <button
                  disabled={page * itemsPerPage >= filteredItems.length}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 rounded-md font-semibold text-[#FFFFFF] bg-[#0077B6] hover:bg-[#1A1F2C] transition disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Página siguiente"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cafe;
