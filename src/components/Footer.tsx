import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/ANGOHOST-01.png"
                alt="Logo ANGOHOST"
                className="h-10"
              />
            </Link>
            <p className="text-gray-600 mb-6">
              Soluções completas em hospedagem e domínios para o mercado angolano.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm text-gray-600">+244 942 090 108</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm text-gray-600">support@angohost.ao</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">Luanda, Angola</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hospedagem</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/hospedagem/cpanel" className="text-gray-600 hover:text-primary transition-colors">
                  Hospedagem cPanel
                </Link>
              </li>
              <li>
                <Link to="/hospedagem/wordpress" className="text-gray-600 hover:text-primary transition-colors">
                  Hospedagem WordPress
                </Link>
              </li>
              <li>
                <Link to="/servidores-dedicados" className="text-gray-600 hover:text-primary transition-colors">
                  Servidores Dedicados
                </Link>
              </li>
              <li>
                <Link to="/servidores-vps" className="text-gray-600 hover:text-primary transition-colors">
                  Servidores VPS
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Domínios</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dominios/registrar" className="text-gray-600 hover:text-primary transition-colors">
                  Registrar Domínio
                </Link>
              </li>
              <li>
                <Link to="/dominios/transferir" className="text-gray-600 hover:text-primary transition-colors">
                  Transferir Domínio
                </Link>
              </li>
            </ul>
            
            <h3 className="font-semibold text-gray-900 mt-6 mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contato" className="text-gray-600 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/suporte" className="text-gray-600 hover:text-primary transition-colors">
                  Centro de Ajuda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Email Corporativo</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/email/profissional" className="text-gray-600 hover:text-primary transition-colors">
                  Email Profissional
                </Link>
              </li>
              <li>
                <Link to="/email-office-365" className="text-gray-600 hover:text-primary transition-colors">
                  Microsoft 365
                </Link>
              </li>
              <li>
                <Link to="/email/google-workspace" className="text-gray-600 hover:text-primary transition-colors">
                  Google Workspace
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} ANGOHOST. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/termos" className="text-gray-500 hover:text-gray-900 transition-colors">
              Termos de Serviço
            </Link>
            <Link to="/privacidade" className="text-gray-500 hover:text-gray-900 transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
