
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface NotificationPreferenceItemProps {
  title: string;
  description: string;
  info?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const NotificationPreferenceItem = ({
  title,
  description,
  info,
  checked,
  onCheckedChange
}: NotificationPreferenceItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="space-y-0.5">
        <div className="flex items-center">
          <h4 className="font-medium">{title}</h4>
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch 
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
