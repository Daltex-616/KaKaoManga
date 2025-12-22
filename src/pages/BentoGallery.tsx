import React from 'react';
import CafeCard from '../components/conts/CafeCard';
import { products } from '../data/cafe';

const BentoGallery = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-general-blueCream">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-kakao-darkBlue mb-8 text-center font-comic">
          Galería Bento de Cafés
        </h2>

        <div className="grid grid-cols-6 gap-4 [grid-auto-rows:1fr]">
          {/* Café 1: bloque grande */}
          <div className="col-span-4 row-span-3">
            <div className="w-full h-full">
              <CafeCard item={products[0]} />
            </div>
          </div>

          {/* Café 2: bloque mediano */}
          <div className="col-span-2 row-span-2">
            <div className="w-full h-full">
              <CafeCard item={products[1]} />
            </div>
          </div>

          {/* Café 3: bloque horizontal */}
          <div className="col-span-6 row-span-2">
            <div className="w-full h-full">
              <CafeCard item={products[2]} />
            </div>
          </div>

          {/* Bloques decorativos */}
          <div className="col-span-3 row-span-2 bg-kakao-gold rounded-xl shadow-md" />
          <div className="col-span-3 row-span-2 bg-comic-purple rounded-xl shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default BentoGallery;