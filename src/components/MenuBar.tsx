export const MenuBar = () => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-gradient-to-b from-secondary to-muted border-b border-border px-4 py-1 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-4">
        <span className="font-bold">🍎 RafaHeras</span>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex-1 h-4 bg-muted border border-border rounded-sm overflow-hidden">
          <div className="h-full bg-gradient-to-r from-border to-muted opacity-60"></div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span>rafadelasherasgamero@gmail.com</span>
        <div className="w-4 h-4 bg-muted border border-border rounded-sm flex items-center justify-center">
          🔊
        </div>
        <div className="w-4 h-4 bg-muted border border-border rounded-sm flex items-center justify-center">
          📧
        </div>
        <div className="w-4 h-4 bg-muted border border-border rounded-sm flex items-center justify-center">
          📁
        </div>
        <span className="font-mono">{getCurrentTime()}</span>
      </div>
    </div>
  );
};