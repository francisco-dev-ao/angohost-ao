
import React from 'react';
import { ClientLogosSection } from '@/components/ClientLogosSection';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Sobre Nós</h1>
      <ClientLogosSection />
    </div>
  );
};

export default About;
