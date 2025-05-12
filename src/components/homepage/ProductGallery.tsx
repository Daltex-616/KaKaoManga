
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, LayoutList } from 'lucide-react';
import img1 from "/gallery/batmanreturns.jpg"
import img2 from "/gallery/onepiecev98.png"
import img3 from "/gallery/milesmorales.png"
import img4 from "/gallery/demonslayervol10.png"
import img5 from "/gallery/sandman.png"
import img6 from "/gallery/snkvol34.png"
import img7 from "/gallery/wonderwomanhistoria.png"
import img8 from "/gallery/borutovol1.png"
// Sample product data
const products = [
  {
    id: 1,
    title: "Batman: The Dark Knight Returns",
    author: "Frank Miller",
    image: img1,
    price: 19.99,
    category: "comic",
    isNew: true,
  },
  {
    id: 2,
    title: "One Piece Vol. 98",
    author: "Eiichiro Oda",
    image: img2,
    price: 9.99,
    category: "manga",
    isNew: false,
  },
  {
    id: 3,
    title: "Spider-Man: Miles Morales",
    author: "Saladin Ahmed",
    image: img3,
    price: 14.99,
    category: "comic",
    isNew: true,
  },
  {
    id: 4,
    title: "Demon Slayer Vol. 10",
    author: "Koyoharu Gotouge",
    image: img4,
    price: 9.99,
    category: "manga",
    isNew: false,
  },
  {
    id: 5,
    title: "The Sandman",
    author: "Neil Gaiman",
    image: img5,
    price: 24.99,
    category: "comic",
    isNew: false,
  },
  {
    id: 6,
    title: "Attack on Titan Vol. 34",
    author: "Hajime Isayama",
    image: img6,
    price: 10.99,
    category: "manga",
    isNew: true,
  },
  {
    id: 7,
    title: "Wonder Woman: Historia",
    author: "Kelly Sue DeConnick",
    image: img7,
    price: 29.99,
    category: "comic",
    isNew: true,
  },
  {
    id: 8,
    title: "Boruto Vol. 34",
    author: "Masashi Kishimoto",
    image: img8,
    price: 129.99,
    category: "manga",
    isNew: false,
  },
];

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="py-12 bg-comic-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-comic text-comic-purple">Nuestra Colección</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg p-1 border">
              <button 
                onClick={() => setActiveCategory("all")} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === "all" 
                    ? "bg-comic-purple text-white" 
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveCategory("comic")} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === "comic" 
                    ? "bg-comic-purple text-white" 
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                Comics
              </button>
              <button 
                onClick={() => setActiveCategory("manga")} 
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeCategory === "manga" 
                    ? "bg-comic-purple text-white" 
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                Manga
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        <div className={`
          ${viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"}
        `}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className={`overflow-hidden group ${
              viewMode === "list" ? "flex flex-row items-center" : ""
            } hover:shadow-lg transition-shadow duration-300`}>
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
                  <Button variant="outline" className="w-full border-comic-purple text-comic-purple hover:bg-comic-purple hover:text-white transition-colors">
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
