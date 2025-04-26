
import React from 'react';
import { AuthHero } from './AuthHero';

interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthHero />
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};
