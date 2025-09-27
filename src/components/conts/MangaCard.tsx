import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => (
  <Card
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        window.location.href = `/manga/${manga.id}`; // Navigate to details page
      }
    }}
    className="overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-kakao-lightBlue"
  >
    <Link to={`/manga/${manga.id}`} className="block">
      <div className="aspect-[3/4] relative">
        <img
          src={manga.image}
          alt={`Portada del manga ${manga.title} por ${manga.author}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-kakao-gold text-kakao-darkBlue px-3 py-1 rounded-full text-xs font-medium">
          {manga.publisher}
        </div>
      </div>
    </Link>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg line-clamp-1">{manga.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-1">{manga.author}</p>
      <p className="text-kakao-lightBlue font-bold mt-2">${manga.price.toFixed(2)}</p>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button
        variant="outline"
        aria-label={`Añadir ${manga.title} al carrito`}
        className="w-full border-kakao-lightBlue text-kakao-lightBlue hover:bg-kakao-lightBlue hover:text-white transition-colors"
      >
        Añadir al carrito
      </Button>
    </CardFooter>
  </Card>
);

export default MangaCard;