
import * as React from "react";

interface MobileIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function MobileIcon({ icon, label, onClick }: MobileIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full p-4 space-x-4 text-left bg-gray-100 rounded-lg shadow-md"
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
