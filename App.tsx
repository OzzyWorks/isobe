
import React, { useState, useEffect, useCallback } from 'react';
import { SCENARIO } from './constants';
import { Scene, GameState } from './types';
import { getStaticImage } from './services/geminiService';

const App: React.FC = () => {
  // Load persistent data
  const [clearedEndings, setClearedEndings] = useState<string[]>(() => {
    const saved = localStorage.getItem('cleared_endings');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [allVisitedScenes, setAllVisitedScenes] = useState<string[]>(() => {
    const saved = localStorage.getItem('visited_scenes');
    return saved ? JSON.parse(saved) : ['start'];
  });

  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'start',
    history: [],
    visitedScenes: ['start']
  });

  const [bgImage, setBgImage] = useState<string>(getStaticImage('CLUB_ROOM'));
  const [charImage, setCharImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // 安全なシーン取得 (万が一未定義のIDが来た場合のためにstartへ戻す)
  const currentScene = SCENARIO[gameState.currentSceneId] || SCENARIO['start'];

  const updateImages = useCallback((scene: Scene) => {
    if (scene.background.includes("CLUB_ROOM")) setBgImage(getStaticImage('CLUB_ROOM'));
    if (scene.background.includes("HARBOR")) setBgImage(getStaticImage('HARBOR'));

    if (scene.character !== 'none') {
      let charKey = '';
      switch (scene.character) {
        case 'wataru': charKey = 'WATARU'; break;
        case 'gou': charKey = 'GOU'; break;
        case 'misaki': charKey = 'MISAKI'; break;
        case 'shadow': charKey = 'SHADOW'; break;
      }
      if (charKey) setCharImage(getStaticImage(charKey));
    } else {
      setCharImage(null);
    }
  }, []);

  const typeText = useCallback((text: string) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
  }, []);

  useEffect(() => {
    updateImages(currentScene);
    typeText(currentScene.text);

    // Track visited scenes globally
    if (!allVisitedScenes.includes(currentScene.id)) {
      const newVisited = [...allVisitedScenes, currentScene.id];
      setAllVisitedScenes(newVisited);
      localStorage.setItem('visited_scenes', JSON.stringify(newVisited));
    }

    // Save ending if reached
    if (currentScene.isEnding && currentScene.name) {
      if (!clearedEndings.includes(currentScene.name)) {
        const newEndings = [...clearedEndings, currentScene.name];
        setClearedEndings(newEndings);
        localStorage.setItem('cleared_endings', JSON.stringify(newEndings));
      }
    }
  }, [gameState.currentSceneId, updateImages, typeText]);

  const handleChoice = (nextId: string) => {
    if (isTyping) {
        setDisplayedText(currentScene.text);
        setIsTyping(false);
        return;
    }
    // 存在しないシーンへの遷移を防ぐ
    if (!SCENARIO[nextId]) {
      console.warn(`Target scene ${nextId} not found, resetting to start.`);
      setGameState((prev) => ({
        ...prev,
        currentSceneId: 'start',
        history: [...prev.history, { name: currentScene.name, text: currentScene.text }]
      }));
      return;
    }
    setGameState((prev) => ({
      ...prev,
      currentSceneId: nextId,
      history: [...prev.history, { name: currentScene.name, text: currentScene.text }]
    }));
  };

  const resetGame = () => {
    setGameState({
      currentSceneId: 'start',
      history: [],
      visitedScenes: ['start']
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Character */}
      {charImage && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
           <img 
            src={charImage} 
            className="h-[80vh] object-contain opacity-20 filter grayscale blur-sm"
            alt="Character Shadow"
          />
        </div>
      )}

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30">
        <div className="bg-black/60 backdrop-blur-md p-4 border-l-4 border-yellow-400 max-w-xs md:max-w-md">
          <h1 className="text-lg md:text-xl font-bold tracking-tighter pixel-font">磯辺の海は、ホモソーシャルな香りがする。</h1>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setIsLogOpen(true)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs border border-white/20 transition-all">LOG</button>
            <button onClick={() => setIsGalleryOpen(true)} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs border border-white/20 transition-all">GALLERY ({clearedEndings.length}/7)</button>
          </div>
        </div>
        
        {currentScene.isEnding && (
          <div className="bg-red-600 px-6 py-2 rotate-3 transform shadow-2xl animate-bounce">
             <span className="font-black text-xl italic">{currentScene.name}</span>
          </div>
        )}
      </div>

      {/* Bottom Interface */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col gap-6 z-20">
        
        {/* Choices */}
        {!isTyping && currentScene.choices && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-slide-up">
            {currentScene.choices.map((choice, idx) => {
              const hasVisited = allVisitedScenes.includes(choice.nextScene);
              return (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice.nextScene)}
                  className={`
                    w-full md:w-auto min-w-[280px] px-8 py-4 backdrop-blur-lg border-2 rounded-xl text-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-center shadow-xl group
                    ${hasVisited 
                      ? 'bg-white/10 border-white/30 text-white hover:bg-white/20' 
                      : 'bg-yellow-500/20 border-yellow-400 text-yellow-200 hover:bg-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.3)]'}
                  `}
                >
                  <span className={hasVisited ? '' : 'animate-pulse'}>{choice.text}</span>
                  {!hasVisited && <span className="block text-[10px] mt-1 text-yellow-400 opacity-60">NEW PATH</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Reset */}
        {currentScene.isEnding && (
          <div className="flex justify-center animate-slide-up">
            <button
                onClick={resetGame}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-2xl font-black shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:brightness-110 active:scale-95 transition-all"
            >
                最初からやり直す
            </button>
          </div>
        )}

        {/* Textbox */}
        <div className="relative w-full max-w-5xl mx-auto group">
          {currentScene.name && (
            <div className="absolute -top-7 left-6 px-6 py-2 bg-yellow-400 text-black font-black skew-x-12 shadow-lg z-10">
              <span className="-skew-x-12 block">{currentScene.name}</span>
            </div>
          )}
          
          <div 
            className="w-full min-h-[160px] p-8 md:p-10 bg-black/80 backdrop-blur-2xl border-t-2 border-x-2 border-white/20 rounded-t-[2rem] shadow-2xl cursor-pointer hover:bg-black/90 transition-colors"
            onClick={() => isTyping ? handleChoice(gameState.currentSceneId) : null}
          >
            <p className="text-xl md:text-2xl leading-relaxed tracking-wide font-medium">
              {displayedText}
              {isTyping && <span className="inline-block w-3 h-6 bg-white animate-pulse ml-1 align-middle" />}
            </p>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {isLogOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4">
            <h2 className="text-3xl font-black pixel-font text-yellow-400">LOG (回想)</h2>
            <button onClick={() => setIsLogOpen(false)} className="text-5xl font-light hover:text-red-500 transition-colors">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-6 pr-4">
            {gameState.history.map((item, idx) => (
              <div key={idx} className="border-l-2 border-white/10 pl-6">
                <p className="text-yellow-400 font-bold mb-1">{item.name || '???'}</p>
                <p className="text-lg opacity-80">{item.text}</p>
              </div>
            ))}
            <div className="border-l-2 border-yellow-400 pl-6 bg-white/5 py-4">
              <p className="text-yellow-400 font-bold mb-1">{currentScene.name || '???'}</p>
              <p className="text-lg">{currentScene.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4">
            <h2 className="text-3xl font-black pixel-font text-blue-400">ENDING GALLERY</h2>
            <button onClick={() => setIsGalleryOpen(false)} className="text-5xl font-light hover:text-red-500 transition-colors">&times;</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
            {Object.values(SCENARIO).filter(s => s.isEnding).map((end, idx) => {
              const isCleared = clearedEndings.includes(end.name!);
              return (
                <div key={idx} className={`p-6 rounded-2xl border-2 transition-all ${isCleared ? 'bg-white/5 border-yellow-500/50 shadow-lg' : 'bg-black border-white/5 opacity-40'}`}>
                  <p className="text-xs text-white/40 mb-2">END NO. {idx + 1}</p>
                  <p className={`text-xl font-bold ${isCleared ? 'text-yellow-400' : 'text-white/20'}`}>
                    {isCleared ? end.name : '????????????'}
                  </p>
                  {isCleared && <p className="mt-4 text-sm opacity-60 line-clamp-2">{end.text}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>
    </div>
  );
};

export default App;
