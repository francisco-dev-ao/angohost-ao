
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  imageSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, company, imageSrc }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        {imageSrc && (
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={imageSrc} alt={author} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{quote}"</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "A ANGOHOST superou nossas expectativas. A migração do nosso site foi perfeita e o suporte técnico é excelente.",
      author: "Carlos Mendes",
      company: "TechAngola",
      imageSrc: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Desde que mudamos para a hospedagem da ANGOHOST, nosso site nunca mais ficou fora do ar. Recomendo fortemente.",
      author: "Maria Fernanda",
      company: "Revista Digital Angola",
      imageSrc: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "O serviço de email profissional da ANGOHOST melhorou significativamente nossa comunicação corporativa.",
      author: "Paulo Joaquim",
      company: "Construções JP",
      imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "O suporte técnico responde rapidamente e sempre resolve nossos problemas. Estamos muito satisfeitos.",
      author: "Ana Sofia",
      company: "Boutique Elegance",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Registro de domínio simplificado e rápido. Todo o processo foi concluído em menos de 24 horas.",
      author: "João Miguel",
      company: "Startup Inovação",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nossos serviços
          </p>
        </div>

        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Testimonial
                      quote={testimonial.quote}
                      author={testimonial.author}
                      company={testimonial.company}
                      imageSrc={testimonial.imageSrc}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static mx-2 transform-none" />
              <CarouselNext className="static mx-2 transform-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
