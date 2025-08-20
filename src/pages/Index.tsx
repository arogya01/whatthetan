import { useState } from "react";
import { DesktopIcon } from "@/components/DesktopIcon";
import { MacWindow } from "@/components/MacWindow";
import { MenuBar } from "@/components/MenuBar";
import { CRTScreen } from "@/components/CRTScreen";

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [folders, setFolders] = useState(["All Too Well", "Casually Creul"]);

  // Check sessionStorage for cached access on component mount
  const [showAccessModal, setShowAccessModal] = useState(() => {
    const cachedAccess = sessionStorage.getItem("whatthetan-access");
    return !cachedAccess;
  });
  const [accessAnswer, setAccessAnswer] = useState("");
  const [hasAccess, setHasAccess] = useState(() => {
    const cachedAccess = sessionStorage.getItem("whatthetan-access");
    return !!cachedAccess;
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [openToggles, setOpenToggles] = useState<{ [key: string]: boolean }>(
    {}
  );

  const checkAccess = () => {
    console.log(accessAnswer);

    // Normalize the input for comparison
    const normalizedInput = accessAnswer
      .toLowerCase()
      .trim()
      // Remove extra spaces
      .replace(/\s+/g, " ")
      // Handle different apostrophe characters
      .replace(/[''′`]/g, "'")
      // Handle different quote characters
      .replace(/[""″]/g, '"')
      // Handle different dash characters
      .replace(/[–—−]/g, "-");

    // Define acceptable variations
    const acceptableAnswers = [
      "ain't nothin but a heartache",
      "aint nothin but a heartache",
      "ain't nothing but a heartache",
      "aint nothing but a heartache",
      "ain't nothin' but a heartache",
      "aint nothin' but a heartache",
      "ain't nothing' but a heartache",
      "aint nothing' but a heartache",
    ];

    if (acceptableAnswers.includes(normalizedInput)) {
      setHasAccess(true);
      setShowAccessModal(false);
      setShowConfetti(true);

      // Cache the access in sessionStorage
      sessionStorage.setItem("whatthetan-access", "granted");

      // Play success sound
      playSound(523.25, 150); // C5
      setTimeout(() => playSound(659.25, 150), 100); // E5
      setTimeout(() => playSound(783.99, 200), 200); // G5

      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // Play error sound
      playSound(200, 300);
      // setევ
      setAccessAnswer("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAccess();
    }
  };

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== windowId));
  };

  // Create audio context for sound effects
  const playSound = (frequency: number, duration: number = 200) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.log("Audio not available");
    }
  };

  const handleToggleClick = (toggleKey: string) => {
    setOpenToggles((prev) => ({
      ...prev,
      [toggleKey]: !prev[toggleKey],
    }));
    // Play toggle sound
    playSound(440, 100); // A4 note
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
    openWindow("All Too Well");
  };

  const handleCasuallyCreulOpen = () => {
    if (!hasAccess) {
      playSound(200, 300); // Error sound
      return;
    }
    // Play sound fx
    playSound(600, 100);
    setTimeout(() => playSound(700, 100), 120);
    setTimeout(() => playSound(800, 150), 240);
    openWindow("Casually Creul");
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
                    top: "-10px",
                    width: "4px",
                    height: "4px",
                    backgroundColor: [
                      "#ff6b6b",
                      "#4ecdc4",
                      "#45b7d1",
                      "#96ceb4",
                      "#feca57",
                      "#ff9ff3",
                      "#54a0ff",
                      "#5f27cd",
                      "#00d2d3",
                      "#ff9f43",
                    ][Math.floor(Math.random() * 10)],
                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    animation: `confetti-fall ${
                      2 + Math.random() * 3
                    }s linear forwards`,
                    animationDelay: `${Math.random() * 2}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            <style
              dangerouslySetInnerHTML={{
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
              `,
              }}
            />
          </>
        )}

        {/* Desktop */}
        <div className="h-full p-4 relative">
          {/* Custom Folders - Mobile Grid / Desktop Absolute */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 md:absolute md:top-4 md:right-4 md:space-y-4">
            {/* Custom folders with sound effects */}
            {folders.includes("All Too Well") && (
              <DesktopIcon
                icon="📁"
                label="All Too Well"
                onClick={handleAllTooWellOpen}
                isFolder={true}
                className="sound-folder"
              />
            )}
            {folders.includes("Casually Creul") && (
              <DesktopIcon
                icon="📁"
                label="Casually Creul"
                onClick={handleCasuallyCreulOpen}
                isFolder={true}
                className="sound-folder"
              />
            )}
          </div>

          {/* Windows */}

          {openWindows.includes("All Too Well") && (
            <MacWindow
              title="🧣 All Too Well"
              width="w-80"
              height="h-72"
              className="w-full md:w-80 h-auto md:h-72 md:absolute md:top-60 md:left-60"
              onClose={() => closeWindow("All Too Well")}
            >
              <div className="space-y-3 text-sm">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🧣✨</div>
                  <div className="font-bold italic text-xs my-8">
                    wanna be defined by the things that I love <br /> Not the
                    things I hate <br /> Not the things I'm afraid of, <br /> I'm
                    afraid of or <br /> the things that haunt me in the middle
                    of the night, <br /> I just think that You are what you
                    love
                  </div>
                </div>

                <div className="space-y-2">
                  {/* to dance in extremes */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("dance")}
                    >
                      <span>to dance in extremes</span>
                      <span
                        className={`transition-transform ${
                          openToggles["dance"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["dance"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        its either I'll try my comfort food or something
                        entirely new,
                      </div>
                    )}
                  </div>

                  {/* Authentic */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("authentic")}
                    >
                      <span>Authentic</span>
                      <span
                        className={`transition-transform ${
                          openToggles["authentic"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["authentic"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        Like you say you can do remote and tell your parents
                        that it's hybrid, but you can't. you won't. (Omission of
                        truth is fine)
                      </div>
                    )}
                  </div>

                  {/* unconditional love for billus */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("billus")}
                    >
                      <span>unconditional love for billus 🥰</span>
                      <span
                        className={`transition-transform ${
                          openToggles["billus"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["billus"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        its sort of makes me appreciate that you just haven't
                        found your area of interest yet, waking up at 7
                        everyday, being genuinely concerned :) (am I lowkey
                        envious of them 🫨 ?)
                      </div>
                    )}
                  </div>

                  {/* pretty fuckin saweettt */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("sweet")}
                    >
                      <span>pretty fuckin saweettt</span>
                      <span
                        className={`transition-transform ${
                          openToggles["sweet"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["sweet"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        Like genuinely sweet, not doing for the sake of it
                      </div>
                    )}
                  </div>

                  {/* Dissection */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("dissection")}
                    >
                      <span>Dissection</span>
                      <span
                        className={`transition-transform ${
                          openToggles["dissection"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["dissection"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        you like to dissect movies like you'd feel the character
                        from your lens, then, form your opinion, are they smart,
                        cunt or whatever…
                      </div>
                    )}
                  </div>

                  {/* PEOPLE WATCHING */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("people")}
                    >
                      <span>PEOPLE WATCHING</span>
                      <span
                        className={`transition-transform ${
                          openToggles["people"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["people"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        didn't like in the beginning, but I guess have come to
                        realize that it's just, umm, fun :)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </MacWindow>
          )}

          {openWindows.includes("Casually Creul") && (
            <MacWindow
              title="😏 Casually Creul"
              width="w-80"
              height="h-72"
              className="w-full md:w-80 h-auto md:h-72"
              onClose={() => closeWindow("Casually Creul")}
            >
              <div className="space-y-3 text-sm">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">😏</div>
                  <div className="font-bold italic">Negligible Glances</div>
                </div>

                <div className="space-y-2">
                  {/* IRRATIONAL FEAR */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("fear")}
                    >
                      <span>IRRATIONAL FEAR</span>
                      <span
                        className={`transition-transform ${
                          openToggles["fear"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["fear"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        you’ve this nagging thing in your mind that you’re
                        blasting too much emotions (I might be wrong), then you
                        drop your benevelent message of “darna mat huh (yeah
                        sure)” :)
                      </div>
                    )}
                  </div>

                  {/* UNBOTHERING */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("unbothering")}
                    >
                      <span>UNBOTHERING</span>
                      <span
                        className={`transition-transform ${
                          openToggles["unbothering"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["unbothering"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        sometimes it feels you’re holding back on something, I
                        don’t know what is it, cannot put it into words, it’s
                        just is I think.
                      </div>
                    )}
                  </div>

                  {/* TOO HOT */}
                  <div className="border rounded p-2">
                    <button
                      className="flex items-center justify-between w-full text-left font-medium italic hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleClick("hot")}
                    >
                      <span>TOO HOT</span>
                      <span
                        className={`transition-transform ${
                          openToggles["hot"] ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </button>
                    {openToggles["hot"] && (
                      <div className="mt-2 pl-4 text-xs text-muted-foreground border-l-2 border-muted">
                        stop wearing clothes in your room for starters 🙂‍↔️
                      </div>
                    )}
                  </div>
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
