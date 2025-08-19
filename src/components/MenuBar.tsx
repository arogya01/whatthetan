export const MenuBar = () => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-gradient-to-b from-secondary to-muted border-b border-border px-2 md:px-4 py-1 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-2 md:space-x-4">
        <span className="font-bold text-xs md:text-sm">🍎 What The Tanisha ?</span>
        <div className="hidden md:block w-px h-4 bg-border"></div>
        <div className="hidden md:block flex-1 h-4 bg-muted border border-border rounded-sm overflow-hidden">
          <div className="h-full bg-gradient-to-r from-border to-muted opacity-60"></div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <div className="hidden md:flex w-4 h-4 bg-muted border border-border rounded-sm items-center justify-center">
          🔊
        </div>
        <div className="hidden md:flex w-4 h-4 bg-muted border border-border rounded-sm items-center justify-center">
          📧
        </div>
        <div className="hidden md:flex w-4 h-4 bg-muted border border-border rounded-sm items-center justify-center">
          📁
        </div>
        <span className="font-mono text-xs">{getCurrentTime()}</span>
      </div>
    </div>
  );
};