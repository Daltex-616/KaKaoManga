
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from "/img/killing_joker.jpg";
import img2 from "/img/mhavol1.png";
import img3 from "/img/watchmen.png";
import img4 from "/img/deathnote.png";
import img5 from "/img/frierenvol1.png";
import img6 from "/img/jjkvol0.png"; 

// Sample featured products
const featuredProducts = [
  {
    id: 1,
    title: "Batman: Killing Joke",
    image: img1,
    price: 29.99,
    category: "Comic"
  },
  {
    id: 2,
    title: "My Hero Academia Vol. 1",
    image: img2,
    price: 9.99,
    category: "Manga"
  },
  {
    id: 3,
    title: "Watchmen",
    image: img3,
    price: 24.99,
    category: "Comic"
  },
  {
    id: 4,
    title: "Death Note Complete Box Set",
    image: img4,
    price: 59.99,
    category: "Manga"
  },
  {
    id: 5,
    title: "Frieren Vol. 1",
    image: img5,
    price: 14.99,
    category: "Manga"
  },
  {
    id: 6,
    title: "Jujutsu Kaisen Vol. 0",
    image: img6,
    price: 12.99,
    category: "Manga"
  },
];

const FeaturedProducts = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      
      // Check on window resize
      window.addEventListener('resize', checkScrollButtons);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-comic text-comic-purple">Productos Destacados</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-comic-yellow text-comic-purple px-3 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-comic-purple font-bold">${product.price.toFixed(2)}</p>
                    <Button size="sm" className="bg-comic-purple hover:bg-comic-purple/90 text-white">
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
