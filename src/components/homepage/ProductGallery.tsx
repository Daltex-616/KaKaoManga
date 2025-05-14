import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { products } from '@/data/comics';
import clsx from 'clsx';

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const allMangas = products
      .filter(product => product.category === "manga")
      .sort((a, b) => b.id - a.id);

    const allComics = products
      .filter(product => product.category === "comic")
      .sort((a, b) => b.id - a.id);

    if (activeCategory === "manga") return allMangas.slice(0, 10);
    if (activeCategory === "comic") return allComics.slice(0, 10);
    return [...allMangas.slice(0, 6), ...allComics.slice(0, 6)];
  }, [activeCategory]);

  const handleCardClick = (id: number) => {
    navigate(`/comics/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    console.log(`Añadido producto ${productId} al carrito`);
  };

  return (
    <div className="py-12 bg-comic-cream min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sticky top-0 bg-comic-cream py-4 z-10">
          <h2 className="text-5xl font-bold text-comic-purple font-comic">Novedades!</h2>
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full md:w-auto">
            <div className="flex bg-white rounded-lg p-1 border border-comic-purple shadow-sm w-full sm:w-auto">
              {[
                { value: "all", label: "Todos" },
                { value: "comic", label: "Cómics" },
                { value: "manga", label: "Mangas" }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={clsx(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex-1 sm:flex-none",
                    activeCategory === value
                      ? "bg-comic-purple/90 text-comic-yellow font-bold shadow-md"
                      : "bg-transparent text-gray-700 hover:bg-comic-purple/10"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 bg-white p-1 rounded-lg border border-comic-purple shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="hover:bg-comic-purple/10"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="hover:bg-comic-purple/10"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div 
            className={clsx(
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                : "flex flex-col gap-6",
              "transition-all duration-300"
            )}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                {/* Badge posicionado fuera de la tarjeta */}
                {product.isNew && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <Badge className="bg-comic-red hover:bg-comic-red text-white px-3 py-1 shadow-lg transform rotate-12">
                      ¡Nuevo!
                    </Badge>
                  </div>
                )}
                
                <Card 
                  className={clsx(
                    "overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer",
                    viewMode === "list" ? "flex flex-row" : "hover:-translate-y-1"
                  )}
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className={clsx(
                    "relative overflow-hidden",
                    viewMode === "list" ? "w-1/3 min-w-[120px]" : "pt-[100%]"
                  )}>
                    <img 
                      src={product.image}
                      alt={product.title}
                      className={clsx(
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                        viewMode === "list" ? "absolute inset-0 h-full" : "absolute top-0 left-0"
                      )}
                    />
                  </div>
                  
                  <div className={viewMode === "list" ? "flex-1 p-4" : ""}>
                    <CardContent className={clsx("p-4", viewMode === "list" && "p-0")}>
                      <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-1">{product.author}</p>
                      <p className="text-comic-purple font-bold mt-2">${product.price.toFixed(2)}</p>
                    </CardContent>
                    
                    <CardFooter className={clsx("p-4", viewMode === "list" ? "p-0" : "pt-0")}>
                      <Button 
                        variant="outline" 
                        className="w-full border-comic-purple text-comic-purple hover:bg-comic-purple hover:text-white transition-colors"
                        onClick={(e) => handleAddToCart(e, product.id)}
                      >
                        Añadir al carrito
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No hay productos en esta categoría</p>
          </div>
        )}

        {((activeCategory === "all" && products.length > 12) || 
         (activeCategory !== "all" && filteredProducts.length === 10)) && (
          <div className="mt-10 text-center">
            <Button className="bg-comic-purple hover:bg-comic-purple/90 text-white px-8 animate-pulse">
              Ver más productos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;