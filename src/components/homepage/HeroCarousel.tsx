
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannerComic from "/banner_comics.png"
import bannerManga from "/banner_manga.jpg"

// Sample hero items
const heroItems = [
  {
    id: 1,
    title: "Nuevos Comics Marvel",
    description: "Descubre las últimas aventuras de tus superhéroes favoritos",
    image: bannerComic,
    link: "/comics"
  },
  {
    id: 2,
    title: "Manga Japonés",
    description: "Las series más populares directamente desde Japón",
    image: bannerManga,
    link: "/manga"
  },
  {
    id: 3,
    title: "Nuestro Café",
    description: "Un lugar acogedor para disfrutar de buena lectura y café gourmet",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixid=M3wxMTE3fDB8MXxzZWFyY2h8M3x8Y2FmZXxlbnwwfHx8fDE3MTUxMjM0NTR8MA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600",
    link: "/cafe"
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroItems.length) % heroItems.length);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = heroItems[currentIndex];

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform"
        style={{ backgroundImage: `url(${currentItem.image})` }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-comic text-white mb-4 drop-shadow-lg">
            {currentItem.title}
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-lg">
            {currentItem.description}
          </p>
          <Button 
            variant="default" 
            className="bg-comic-red hover:bg-comic-red/90 text-white font-manga rounded-lg px-8 py-3 text-lg"
            asChild
          >
            <a href={currentItem.link}>Explorar</a>
          </Button>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrev}
          className="bg-white/20 border-white text-white hover:bg-white hover:text-comic-purple backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="bg-white/20 border-white text-white hover:bg-white hover:text-comic-purple backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {heroItems.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
