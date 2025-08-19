import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isFolder?: boolean;
  soundEffect?: string;
}

export const DesktopIcon = ({ 
  icon, 
  label, 
  onClick, 
  className,
  isFolder = false,
  soundEffect
}: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    
    if (soundEffect) {
      setIsPlaying(true);
      const audio = new Audio(soundEffect);
      audio.volume = 0.5;
      audio.play().catch(console.error);
      
      setTimeout(() => setIsPlaying(false), 300);
    }
    
    onClick?.();
  };

  const iconClass = isFolder ? 'sound-folder group' : 'desktop-icon';

  return (
    <div
      className={cn(
        iconClass,
        isSelected && 'selected',
        isPlaying && 'animate-pulse',
        className
      )}
      onClick={handleClick}
    >
      <div className="w-12 h-12 mb-1 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <span className="text-xs text-center max-w-16 break-words leading-tight">
        {label}
      </span>
    </div>
  );
};