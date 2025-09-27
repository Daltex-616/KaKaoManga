import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bannerComic from "/banner_comics.png";
import bannerManga from "/banner_manga.jpg";
import { useNavigate } from 'react-router-dom';

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
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1600&h=600",
    link: "/cafe"
  }
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroItems.length) % heroItems.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(currentItem.link);
  };

  const currentItem = heroItems[currentIndex];

  return (
    <div className="relative">
      <div className="relative h-[500px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${currentItem.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl animate-fade-in text-white">
            <h1 className="text-4xl md:text-6xl font-comic mb-4 drop-shadow-lg">
              {currentItem.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow-lg">
              {currentItem.description}
            </p>
            <Button
              onClick={handleExplore}
              className="bg-kakao-lightBlue hover:bg-white text-white hover:text-kakao-lightBlue font-bold px-6 py-3 rounded-full transition-all duration-300"
            >
              Explorar!
            </Button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-10 right-10 z-20 flex space-x-3">
          <Button
            size="icon"
            onClick={goToPrev}
            className="bg-white/20 text-white hover:bg-kakao-lightBlue hover:text-white rounded-full backdrop-blur-md transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            onClick={goToNext}
            className="bg-white/20 text-white hover:bg-kakao-lightBlue hover:text-white rounded-full backdrop-blur-md transition-all"
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-kakao-lightBlue" : "w-2 bg-white/50"
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;