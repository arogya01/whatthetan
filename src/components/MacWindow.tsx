import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MacWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  width?: string;
  height?: string;
  onClose?: () => void;
}

export const MacWindow = ({ 
  title, 
  children, 
  className,
  width = "w-96",
  height = "h-64",
  onClose
}: MacWindowProps) => {
  return (
    <div className={cn(
      "window crt-flicker fixed inset-0 z-50 flex items-center justify-center p-4 md:relative md:inset-auto md:z-auto md:p-0",
      width, 
      height, 
      className
    )}>
      <div className="w-full max-w-md md:max-w-none md:w-auto bg-card border-2 border-t-secondary border-l-secondary border-r-border border-b-border rounded-none md:rounded-none shadow-lg md:shadow-none">
      <div className="window-title-bar flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button 
            className="w-3 h-3 bg-destructive rounded-full border border-destructive/60 hover:bg-destructive/80 transition-colors"
            onClick={onClose}
            title="Close"
          ></button>
          <div className="w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full border border-green-600"></div>
        </div>
        <div className="text-xs font-bold text-foreground flex-1 text-center">
          {title}
        </div>
        <div className="w-16"></div>
      </div>
        <div className="p-4 bg-card flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};