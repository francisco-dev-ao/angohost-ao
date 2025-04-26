
import React from 'react';
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
      name: "Company 1",
      logo: "https://via.placeholder.com/150x80?text=Logo+1"
    },
    {
      name: "Company 2",
      logo: "https://via.placeholder.com/150x80?text=Logo+2"
    },
    {
      name: "Company 3",
      logo: "https://via.placeholder.com/150x80?text=Logo+3"
    },
    {
      name: "Company 4",
      logo: "https://via.placeholder.com/150x80?text=Logo+4"
    },
    {
      name: "Company 5",
      logo: "https://via.placeholder.com/150x80?text=Logo+5"
    },
    {
      name: "Company 6",
      logo: "https://via.placeholder.com/150x80?text=Logo+6"
    },
    {
      name: "Company 7",
      logo: "https://via.placeholder.com/150x80?text=Logo+7"
    },
    {
      name: "Company 8",
      logo: "https://via.placeholder.com/150x80?text=Logo+8"
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Nossos Clientes</h2>
          <p className="text-gray-600">
            Empresas que confiam na ANGOHOST para seus serviços online
          </p>
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
