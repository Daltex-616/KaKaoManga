
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro boletín.",
        duration: 3000,
      });
      setEmail('');
    } else {
      toast({
        title: "Error",
        description: "Por favor ingrese un correo electrónico válido.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-kakao-purple py-10 sm:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-comic text-kakao-cream mb-3 sm:mb-4">Mantente Informado</h2>
        <p className="text-kakao-cream/90 max-w-lg mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2">
          Suscríbete a nuestro boletín para recibir noticias sobre nuevos lanzamientos, 
          eventos especiales y promociones exclusivas.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 text-kakao-cream placeholder:text-kakao-cream/70 border-white/30 focus:border-white"
          />
          <Button type="submit" className="bg-kakao-gold hover:bg-kakao-gold/90 text-kakao-darkBlue">
            Suscribirse
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
