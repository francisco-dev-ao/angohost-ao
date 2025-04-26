
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DomainSearchInputProps {
  domainName: string;
  extension: string;
  onDomainNameChange: (value: string) => void;
  onExtensionChange: (value: string) => void;
  variant?: 'default' | 'hero' | 'sidebar';
}

const extensionOptions = [
  { value: '.co.ao', label: '.co.ao', price: 35000 },
  { value: '.ao', label: '.ao', price: 25000 },
  { value: '.it.ao', label: '.it.ao', price: 35000 },
  { value: '.edu.ao', label: '.edu.ao', price: 35000 },
  { value: '.com', label: '.com', price: 15000 },
];

export const DomainSearchInput: React.FC<DomainSearchInputProps> = ({
  domainName,
  extension,
  onDomainNameChange,
  onExtensionChange,
  variant = 'default'
}) => {
  return (
    <div className={`flex flex-1 ${variant === 'hero' ? 'flex-col md:flex-row w-full' : ''} relative rounded-lg shadow-lg bg-white/40 backdrop-blur-[2px] border border-gray-100/30`}>
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Digite o nome do domínio"
          value={domainName}
          onChange={(e) => onDomainNameChange(e.target.value)}
          className={`${
            variant === 'hero' ? 'md:rounded-r-none text-lg' : 'text-base'
          } bg-transparent border-0 shadow-none focus:ring-0 pl-10 h-14 text-gray-800 w-full ${
            variant === 'hero' ? 'md:w-96' : 'w-full'
          }`}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      
      <Select value={extension} onValueChange={onExtensionChange}>
        <SelectTrigger 
          className={`${
            variant === 'hero' ? 'md:w-24 md:rounded-l-none' : 'w-32'
          } bg-transparent text-gray-800 text-base border-0 border-l border-gray-100/50 focus:ring-0 h-14`}
        >
          <SelectValue placeholder=".co.ao" />
        </SelectTrigger>
        <SelectContent>
          {extensionOptions.map((ext) => (
            <SelectItem key={ext.value} value={ext.value}>{ext.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
