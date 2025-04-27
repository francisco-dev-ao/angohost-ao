
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';

interface PanelHeaderProps {
  userData: any;
  notificationsCount: number;
  handleSignOut: () => void;
  setActiveTab: (tab: string) => void;
}

export const PanelHeader = ({ userData, notificationsCount, handleSignOut, setActiveTab }: PanelHeaderProps) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container max-w-7xl mx-auto py-3 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-medium">
              Olá <span className="font-bold">{userData?.user_metadata?.full_name || userData?.email}</span>, Bem-vindo!
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setActiveTab('notifications')} 
              className="relative"
            >
              <Bell className="h-4 w-4 mr-1" />
              <span>Notificações</span>
              {notificationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
