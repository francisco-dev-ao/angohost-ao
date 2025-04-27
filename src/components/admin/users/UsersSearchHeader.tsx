
import React from 'react';
import { Search, RefreshCcw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsersSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

export const UsersSearchHeader = ({ searchQuery, onSearchChange, onRefresh }: UsersSearchHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Buscar usuário..." 
          className="pl-8 w-[250px]" 
          value={searchQuery} 
          onChange={onSearchChange}
        />
      </div>
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRefresh}
        title="Atualizar lista"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
