
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  title,
  description,
  buttonText,
  buttonLink
}) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <Button
          asChild
          className="bg-white hover:bg-gray-100 text-blue-800 px-6 py-3 text-lg font-medium"
          size="lg"
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;
