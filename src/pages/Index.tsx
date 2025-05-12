
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/homepage/HeroCarousel";
import ProductGallery from "@/components/homepage/ProductGallery";
import CafeSection from "@/components/homepage/CafeSection";
import Newsletter from "@/components/homepage/Newsletter";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroCarousel />
        <FeaturedProducts />
        <ProductGallery />
        <CafeSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
