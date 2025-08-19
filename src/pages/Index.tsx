import { useState } from 'react';
import { DesktopIcon } from '@/components/DesktopIcon';
import { MacWindow } from '@/components/MacWindow';
import { MenuBar } from '@/components/MenuBar';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [folders, setFolders] = useState(['pawsitives', 'negaswiss']);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  // Create audio context for sound effects
  const playSound = (frequency: number, duration: number = 200) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const handlePawsitivesOpen = () => {
    // Play sound fx 1 - cheerful notification sound
    playSound(523.25, 150); // C5
    setTimeout(() => playSound(659.25, 150), 100); // E5
    setTimeout(() => playSound(783.99, 200), 200); // G5
    openWindow('pawsitives');
  };

  const handleNegaswissDelete = () => {
    // Play sound fx 2 - retro computer beep sequence  
    playSound(800, 100);
    setTimeout(() => playSound(600, 100), 120);
    setTimeout(() => playSound(400, 150), 240);
    
    // Remove the folder from the list
    setFolders(folders.filter(folder => folder !== 'negaswiss'));
    
    // Show deletion confirmation
    openWindow('deleteConfirm');
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      <MenuBar />
      
      {/* Desktop */}
      <div className="h-full p-4 relative">
        {/* Desktop Icons */}
        <div className="absolute top-4 right-4 space-y-4">
          <DesktopIcon
            icon="📁"
            label="PROYECTOS"
            onClick={() => openWindow('projects')}
          />
          <DesktopIcon
            icon="🎨"
            label="DISEÑOS"
            onClick={() => openWindow('designs')}
          />
          <DesktopIcon
            icon="💖"
            label="SOCIAL LIFE"
            onClick={() => openWindow('social')}
          />
          <DesktopIcon
            icon="💻"
            label="ABOUT ME"
            onClick={() => openWindow('about')}
          />
        </div>

        {/* Custom Folders */}
        <div className="absolute bottom-4 left-4 space-y-4">
          {folders.includes('pawsitives') && (
            <DesktopIcon
              icon="🐾"
              label="pawsitives"
              onClick={handlePawsitivesOpen}
              isFolder={true}
              className="sound-folder"
            />
          )}
          {folders.includes('negaswiss') && (
            <DesktopIcon
              icon="🗑️"
              label="negaswiss"
              onClick={handleNegaswissDelete}
              isFolder={true}
              className="sound-folder"
            />
          )}
        </div>

        {/* Windows */}
        {openWindows.includes('projects') && (
          <MacWindow 
            title="Proyectos web" 
            width="w-80" 
            height="h-96"
            className="absolute top-20 left-20"
          >
            <div className="space-y-2 text-sm">
              <div className="font-bold mb-3">🚀 Mis Proyectos:</div>
              <div>• Coduck - Innovación en Mantenimiento Web</div>
              <div>• Delirium - Experiencia Digital</div>
              <div>• UCM - Plataforma Universitaria</div>
              <div>• MadMusic - Plataforma Musical</div>
              <div>• Hysteria - Proyecto Creative</div>
              <div>• DQ - Desarrollo Web</div>
              <div>• Ibercésped - E-commerce</div>
              <div>• Cociline - Aplicación Culinaria</div>
              <div>• Zambra - Desarrollo Cultural</div>
              <div>• Deep Data - Análisis de Datos</div>
              <div>• Pragma - Soluciones Tech</div>
              <div>• Súper Express - Logística Digital</div>
            </div>
          </MacWindow>
        )}

        {openWindows.includes('about') && (
          <MacWindow 
            title="About Me" 
            width="w-96" 
            height="h-80"
            className="absolute top-40 left-40"
          >
            <div className="space-y-3 text-sm">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">👨‍💻</div>
                <div className="font-bold">Rafa Heras</div>
                <div className="text-muted-foreground">Full Stack Developer</div>
              </div>
              
              <div className="bg-muted p-3 rounded border">
                <div className="font-mono text-xs">
                  <div>CPU: Intel Comedy i7 500 MHz</div>
                  <div>RAM: 640K System (But who needs more?)</div>
                  <div>Cache: 256K SRAM Passed</div>
                  <div>Status: BIOS Shadowed ✓</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-yellow-200 border border-yellow-400 p-2 rounded text-xs">
                  ⚠️ ¿Estás seguro de lo que vas a hacer?<br/>
                  Yo que tú no lo haría... El que avisa no es traidor
                </div>
              </div>
            </div>
          </MacWindow>
        )}

        {openWindows.includes('pawsitives') && (
          <MacWindow 
            title="🐾 Pawsitives Collection" 
            width="w-80" 
            height="h-72"
            className="absolute top-60 left-60"
          >
            <div className="space-y-3 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🐕🐱</div>
                <div className="font-bold">Positive Vibes Only!</div>
              </div>
              
              <div className="bg-muted p-3 rounded border">
                <div className="text-xs space-y-1">
                  <div>🎵 Happy Paws Melody</div>
                  <div>🎵 Cheerful Tail Wag Sound</div>
                  <div>🎵 Purr-fect Notification</div>
                  <div>🎵 Playful Bark Sequence</div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Pawsitive sounds activated! 🎉
              </div>
            </div>
          </MacWindow>
        )}

        {openWindows.includes('deleteConfirm') && (
          <MacWindow 
            title="🗑️ Folder Deleted" 
            width="w-72" 
            height="h-48"
            className="absolute top-80 left-80"
          >
            <div className="space-y-3 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">💥</div>
                <div className="font-bold">Negaswiss Deleted!</div>
              </div>
              
              <div className="bg-destructive/20 border border-destructive/40 p-3 rounded">
                <div className="text-xs text-center">
                  Folder "negaswiss" has been permanently deleted with retro sound effects!
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Deletion complete! 🔊
              </div>
            </div>
          </MacWindow>
        )}
      </div>
    </div>
  );
};

export default Index;