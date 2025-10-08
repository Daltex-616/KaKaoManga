import { useState } from 'react';

type CafeCardProps = {
  item: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    origin: string;
    details: string;
  };
};

const CafeCard = ({ item }: CafeCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  const getImageSrc = () =>
    item?.image || 'https://picsum.photos/200/300?random=99';

  return (
    <div
      className="aspect-[5/3] cursor-pointer transition-transform duration-300 hover:scale-[1.02] perspective"
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleFlip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg">
          <img
            src={getImageSrc()}
            alt={`Imagen de ${item.name}`}
            className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://picsum.photos/200/300?random=99';
            }}
          />
        </div>

        {/* Reverso */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-manga-cream border border-manga-gold rounded-xl shadow-inner p-6 flex flex-col justify-center items-center text-center pointer-events-none">
          <h3 className="text-xl font-semibold text-manga-darkBlue mb-1">{item.name}</h3>
          <p className="text-sm text-manga-darkBlue/70 italic">{item.origin}</p>
          <p className="text-sm text-manga-darkBlue/60 mt-2">{item.description}</p>
          <p className="text-manga-blue font-medium text-base mt-2">{item.details}</p>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
