
import * as React from "react";

interface MobileWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileWindow({ title, onClose, children }: MobileWindowProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <h2 className="text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
