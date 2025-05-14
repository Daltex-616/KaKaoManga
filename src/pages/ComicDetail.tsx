import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products } from '@/data/comics';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


const ComicDetail = () => {
  const { comicId } = useParams();
  const comic = products.find(p => p.id === Number(comicId));

  if (!comic) {
    return <div className="text-center py-8">Cómic no encontrado</div>;
  }

  return (
    <>
    <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img 
              src={comic.image} 
              alt={comic.title}
              className="max-h-[600px] rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{comic.title}</h1>
            <p className="text-lg mb-1">Por {comic.author}</p>
            {comic.publisher && <p className="text-gray-600 mb-4">{comic.publisher}</p>}
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-2xl font-bold text-comic-purple">${comic.price.toFixed(2)}</p>
              {comic.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{comic.rating}/5</span>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{comic.description}</p>
            </div>
            
            {comic.pages && (
              <p className="mb-2"><strong>Páginas:</strong> {comic.pages}</p>
            )}
            
            {comic.releaseDate && (
              <p className="mb-4">
                <strong>Fecha de lanzamiento:</strong> {new Date(comic.releaseDate).toLocaleDateString()}
              </p>
            )}
            
            <Button className="bg-comic-purple hover:bg-comic-purple/90 text-white">
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComicDetail;