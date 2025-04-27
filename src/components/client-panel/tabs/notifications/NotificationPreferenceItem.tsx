
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface NotificationPreferenceItemProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const NotificationPreferenceItem = ({
  title,
  description,
  checked,
  onCheckedChange
}: NotificationPreferenceItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h4 className="font-medium">{title}</h4>
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
