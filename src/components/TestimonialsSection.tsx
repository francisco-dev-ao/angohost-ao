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
      quote: "A Angohost foi essencial para o crescimento do meu negócio digital. Atendimento rápido e eficiente!",
      author: "Paulo Domingos",
      company: "Empreendedor Digital",
      imageSrc: "/user.png"
    },
    {
      quote: "O suporte da Angohost é excelente, sempre me ajudaram quando precisei. Recomendo para todos empreendedores.",
      author: "Carla Mavungo",
      company: "Loja Online Luanda",
      imageSrc: "/user1.png"
    },
    {
      quote: "Hospedo todos os meus projetos na Angohost. Segurança e estabilidade para startups angolanas.",
      author: "Miguel António",
      company: "Startup Luanda",
      imageSrc: "/user.png"
    },
    {
      quote: "A plataforma é fácil de usar e o serviço de email profissional melhorou minha comunicação com clientes.",
      author: "Tatiana Silva",
      company: "Consultora Independente",
      imageSrc: "/user1.png"
    },
    {
      quote: "Registro de domínio foi rápido e sem complicações. Recomendo para quem quer empreender em Angola.",
      author: "Joaquim Manuel",
      company: "Empreendedor",
      imageSrc: "/user.png"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que empreendedores angolanos têm a dizer sobre nossos serviços
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
