import { useState } from 'react';
import { DesktopIcon } from '@/components/DesktopIcon';
import { MacWindow } from '@/components/MacWindow';
import { MenuBar } from '@/components/MenuBar';
import { CRTScreen } from '@/components/CRTScreen';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [folders, setFolders] = useState(['All Too Well', 'I did something bad']);
  const [showAccessModal, setShowAccessModal] = useState(true);
  const [accessAnswer, setAccessAnswer] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkAccess = () => {
    console.log(accessAnswer);
    
    // Normalize the input for comparison
    const normalizedInput = accessAnswer
      .toLowerCase()
      .trim()
      // Remove extra spaces
      .replace(/\s+/g, ' ')
      // Handle different apostrophe characters
      .replace(/[''′`]/g, "'")
      // Handle different quote characters
      .replace(/[""″]/g, '"')
      // Handle different dash characters
      .replace(/[–—−]/g, '-');
    
    // Define acceptable variations
    const acceptableAnswers = [
      "ain't nothin but a heartache",
      "aint nothin but a heartache",
      "ain't nothing but a heartache",
      "aint nothing but a heartache",
      "ain't nothin' but a heartache",
      "aint nothin' but a heartache",
      "ain't nothing' but a heartache",
      "aint nothing' but a heartache"
    ];
    
    if (acceptableAnswers.includes(normalizedInput)) {
      setHasAccess(true);
      setShowAccessModal(false);
      setShowConfetti(true);
      // Play success sound
      playSound(523.25, 150); // C5
      setTimeout(() => playSound(659.25, 150), 100); // E5
      setTimeout(() => playSound(783.99, 200), 200); // G5
      
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // Play error sound
      playSound(200, 300);
      setAccessAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAccess();
    }
  };

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
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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

  const handleAllTooWellOpen = () => {
    if (!hasAccess) {
      playSound(200, 300); // Error sound
      return;
    }
    // Play sound fx 1 - cheerful notification sound
    playSound(523.25, 150); // C5
    setTimeout(() => playSound(659.25, 150), 100); // E5
    setTimeout(() => playSound(783.99, 200), 200); // G5
    openWindow('All Too Well');
  };

  const handleIDidSomethingBadDelete = () => {
    if (!hasAccess) {
      playSound(200, 300); // Error sound
      return;
    }
    // Play sound fx 2 - retro computer beep sequence  
    playSound(800, 100);
    setTimeout(() => playSound(600, 100), 120);
    setTimeout(() => playSound(400, 150), 240);
    
    // Show deletion confirmation first (don't remove folder yet)
    openWindow('deleteConfirm');
  };

  const confirmDeletion = () => {
    // Actually remove the folder after confirmation
    setFolders(folders.filter(folder => folder !== 'I did something bad'));
    closeWindow('deleteConfirm');
  };

  const cancelDeletion = () => {
    // Just close the confirmation window
    closeWindow('deleteConfirm');
  };

  return (
    <div className="h-screen p-0">
      <CRTScreen intensity="medium">
        <MenuBar />
        
        {/* Access Modal */}
        {showAccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🔐</div>
                <h2 className="text-xl font-bold mb-2">Access Required</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tell me why...
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={accessAnswer}
                  onChange={(e) => setAccessAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
                
                <button
                  onClick={checkAccess}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Submit Answer
                </button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Hint: It's a classic song lyric...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confetti Animation */}
        {showConfetti && (
          <>
            <div className="fixed inset-0 pointer-events-none z-40">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                    width: '4px',
                    height: '4px',
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'][Math.floor(Math.random() * 10)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    animation: `confetti-fall ${2 + Math.random() * 3}s linear forwards`,
                    animationDelay: `${Math.random() * 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes confetti-fall {
                  0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                  }
                }
              `
            }} />
          </>
        )}
        
        {/* Desktop */}
        <div className="h-full p-4 relative">
          {/* Custom Folders - Mobile Grid / Desktop Absolute */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 md:absolute md:top-4 md:right-4 md:space-y-4">          
          {/* Custom folders with sound effects */}
          {folders.includes('All Too Well') && (
            <DesktopIcon
              icon="📁"
              label="All Too Well"
              onClick={handleAllTooWellOpen}
              isFolder={true}
              className="sound-folder"
            />
          )}
          {folders.includes('I did something bad') && (
            <DesktopIcon
              icon="📁"
              label="I did something bad"
              onClick={handleIDidSomethingBadDelete}
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
            className="hidden md:block md:absolute md:top-20 md:left-20"
            onClose={() => closeWindow('projects')}
          >
            <div className="space-y-2 text-sm">
              <div className="font-bold mb-3 crt-text">🚀 Mis Proyectos:</div>
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
            className="hidden md:block md:absolute md:top-40 md:left-40"
            onClose={() => closeWindow('about')}
          >
            <div className="space-y-3 text-sm">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">👨‍💻</div>
                <div className="font-bold crt-text">Rafa Heras</div>
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

        {openWindows.includes('All Too Well') && (
          <MacWindow 
            title="🧣 All Too Well Collection" 
            width="w-80" 
            height="h-72"
            className="hidden md:block md:absolute md:top-60 md:left-60"
            onClose={() => closeWindow('All Too Well')}
          >
            <div className="space-y-3 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🧣✨</div>
                <div className="font-bold">"I remember it all too well"</div>
                <div className="text-xs text-muted-foreground">The scarf, the autumn, the memories</div>
              </div>
              
              <div className="bg-muted p-3 rounded border">
                <div className="text-xs space-y-1">
                  <div>🎵 All Too Well - Red</div>
                  <div>🎵 10 minute version</div>
                  <div>🎵 Heartbreak anthem</div>
                  <div>🎵 Autumn vibes</div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                We remember it all too well! 🧣
              </div>
            </div>
          </MacWindow>
        )}

        {openWindows.includes('deleteConfirm') && (
          <MacWindow 
            title="😈 Delete Confirmation" 
            width="w-80" 
            height="h-56"
            className="hidden md:block md:absolute md:top-80 md:left-80"
            onClose={cancelDeletion}
          >
            <div className="space-y-4 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="font-bold">Delete "I did something bad" folder?</div>
              </div>
              
              <div className="bg-yellow-100 border border-yellow-400 p-3 rounded text-xs text-center">
                This action cannot be undone. The folder will be permanently deleted.
              </div>

              <div className="flex space-x-2 justify-center">
                <button 
                  className="btn-retro text-xs px-3 py-1"
                  onClick={cancelDeletion}
                >
                  Cancel
                </button>
                <button 
                  className="btn-retro text-xs px-3 py-1 bg-destructive text-destructive-foreground"
                  onClick={confirmDeletion}
                >
                  Delete
                </button>
              </div>
            </div>
          </MacWindow>
        )}

        {/* Mobile Windows - Centered Modals */}
        {openWindows.includes('projects') && (
          <MacWindow 
            title="Proyectos web" 
            width="w-full" 
            height="h-auto"
            className="md:hidden"
            onClose={() => closeWindow('projects')}
          >
            <div className="space-y-2 text-sm">
              <div className="font-bold mb-3 crt-text">🚀 Mis Proyectos:</div>
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
            width="w-full" 
            height="h-auto"
            className="md:hidden"
            onClose={() => closeWindow('about')}
          >
            <div className="space-y-3 text-sm">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">👨‍💻</div>
                <div className="font-bold crt-text">Rafa Heras</div>
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

        {openWindows.includes('All Too Well') && (
          <MacWindow 
            title="🧣 All Too Well Collection" 
            width="w-full" 
            height="h-auto"
            className="md:hidden"
            onClose={() => closeWindow('All Too Well')}
          >
            <div className="space-y-3 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🧣✨</div>
                <div className="font-bold">"I remember it all too well"</div>
                <div className="text-xs text-muted-foreground">The scarf, the autumn, the memories</div>
              </div>
              
              <div className="bg-muted p-3 rounded border">
                <div className="text-xs space-y-1">
                  <div>🎵 All Too Well - Red</div>
                  <div>🎵 10 minute version</div>
                  <div>🎵 Heartbreak anthem</div>
                  <div>🎵 Autumn vibes</div>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                We remember it all too well! 🧣
              </div>
            </div>
          </MacWindow>
        )}

        {openWindows.includes('deleteConfirm') && (
          <MacWindow 
            title="😈 Delete Confirmation" 
            width="w-full" 
            height="h-auto"
            className="md:hidden"
            onClose={cancelDeletion}
          >
            <div className="space-y-4 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="font-bold">Delete "I did something bad" folder?</div>
              </div>
              
              <div className="bg-yellow-100 border border-yellow-400 p-3 rounded text-xs text-center">
                This action cannot be undone. The folder will be permanently deleted.
              </div>

              <div className="flex space-x-2 justify-center">
                <button 
                  className="btn-retro text-xs px-3 py-1"
                  onClick={cancelDeletion}
                >
                  Cancel
                </button>
                <button 
                  className="btn-retro text-xs px-3 py-1 bg-destructive text-destructive-foreground"
                  onClick={confirmDeletion}
                >
                  Delete
                </button>
              </div>
            </div>
          </MacWindow>
        )}
        </div>
      </CRTScreen>
    </div>
  );
};

export default Index;