import React from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ClientLogosSection = () => {
  // Logos placeholder - Replace with actual client logos
  const clientLogos = [
  {
    name: "Aldeia Nova",
    logo: "/aldeianova.jpg"
  },
  {
    name: "Aeroporto Internacional Dr. António Agostinho Neto",
    logo: "/areportointernacional.png"
  },
  {
    name: "Clínica General Katondo",
    logo: "/clinicacatondo.png"
  },
  {
    name: "Clínica Girassol",
    logo: "/clinicagiralsol.png"
  },
  {
    name: "Farmácias Coimbra",
    logo: "/farmaciasdecoimbra.png"
  },
  {
    name: "GIPSA",
    logo: "/gipsa.png"
  },
  {
    name: "Grupo Zahara",
    logo: "/grupozahara.png"
  },
  {
    name: "ISPTEC",
    logo: "/isptec.png"
  },
  {
    name: "Kero",
    logo: "/kero.png"
  },
  {
    name: "Sonangol Distribuidora",
    logo: "/Sonangol_Distribuidora.png"
  },
  {
    name: "Sonangol",
    logo: "/Sonangol_Logo_Horizontal_Preto4_Footer-2.png"
  },
  {
    name: "Tech Look",
    logo: "/techkllook.png"
  },
  {
    name: "Somiluana",
    logo: "/somil.png"
  },
  {
    name: "Rede Girassol",
    logo: "/redegirassol.jpeg"
  },
  {
    name: "Centro Cultural Paz Flor",
    logo: "/pazflor.png"
  },
  {
    name: "Nespecred",
    logo: "/nespecred.jpeg"
  },
  {
    name: "NewCare Saúde",
    logo: "/newcare.jpeg"
  },
  {
    name: "SonAir",
    logo: "/sonair.png"
  }
];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Clientes Satisfeitos</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">4.8/5</span>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg" 
                alt="TrustPilot" 
                className="h-6 invert"
              />
              <span className="text-gray-600">
                Mais de 1000 avaliações verificadas
              </span>
            </div>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {clientLogos.map((client, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="h-24 flex items-center justify-center p-4 mx-auto grayscale hover:grayscale-0 transition-all">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientLogosSection;
