import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { products } from '@/data/comics';



const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleCardClick = (id: number) => {
    navigate(`/comics/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    // Lógica para añadir al carrito
    console.log(`Añadido producto ${productId} al carrito`);
  };

  return (
    <div className="py-12 bg-comic-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-comic text-comic-purple">Nuestra Colección</h2>
          <div className="flex items-center gap-4">
            {/* Filtros por categoría */}
            <div className="flex bg-white rounded-lg p-1 border">
              {["all", "comic", "manga"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === category
                      ? "bg-comic-purple text-white"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category === "all" ? "Todos" : category === "comic" ? "Comics" : "Manga"}
                </button>
              ))}
            </div>

            {/* Selector de vista */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"}>
          
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`overflow-hidden group ${
                viewMode === "list" ? "flex flex-row items-center" : ""
              } hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1`}
              onClick={() => handleCardClick(product.id)}
            >
              <div className={`${viewMode === "list" ? "w-1/3" : "relative pt-[100%]"} overflow-hidden`}>
                <img 
                  src={product.image}
                  alt={product.title}
                  className={`
                    ${viewMode === "list" 
                      ? "w-full h-40 object-cover" 
                      : "absolute top-0 left-0 w-full h-full object-cover"}
                    group-hover:scale-105 transition-transform duration-300
                  `}
                />
                {product.isNew && (
                  <Badge className="absolute top-2 right-2 bg-comic-red hover:bg-comic-red">
                    ¡Nuevo!
                  </Badge>
                )}
              </div>
              
              <div className={viewMode === "list" ? "flex-1 p-4" : ""}>
                <CardContent className={viewMode === "list" ? "p-0" : "p-4"}>
                  <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.author}</p>
                  <p className="text-comic-purple font-bold mt-2">${product.price.toFixed(2)}</p>
                </CardContent>
                
                <CardFooter className={viewMode === "list" ? "p-0 mt-4" : "pt-0 px-4 pb-4"}>
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
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button className="bg-comic-purple hover:bg-comic-purple/90 text-white px-8">
            Ver más productos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
