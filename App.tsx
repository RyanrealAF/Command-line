import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModuleViewer from './components/ModuleViewer';
import QuizComponent from './components/QuizComponent';
import AITutor from './components/AITutor';
import { CURRICULUM_DATA } from './constants';
import { UserProgress } from './types';
import { ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(() => {
    // Basic persistence
    const saved = localStorage.getItem('cli-mastery-progress');
    return saved ? JSON.parse(saved) : { completedModules: [], currentModuleId: CURRICULUM_DATA[0].id };
  });

  useEffect(() => {
    localStorage.setItem('cli-mastery-progress', JSON.stringify(progress));
  }, [progress]);

  const activeModule = CURRICULUM_DATA.find(m => m.id === progress.currentModuleId) || CURRICULUM_DATA[0];

  const handleModuleSelect = (id: string) => {
    setProgress(prev => ({ ...prev, currentModuleId: id }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModuleComplete = () => {
    // Mark as complete
    if (!progress.completedModules.includes(activeModule.id)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, activeModule.id]
      }));
    }

    // Find next module
    const currentIndex = CURRICULUM_DATA.findIndex(m => m.id === activeModule.id);
    if (currentIndex < CURRICULUM_DATA.length - 1) {
      setTimeout(() => {
         handleModuleSelect(CURRICULUM_DATA[currentIndex + 1].id);
      }, 1500); // Small delay to show completion state
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden">
      <Sidebar 
        modules={CURRICULUM_DATA} 
        progress={progress} 
        onSelectModule={handleModuleSelect}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto relative w-full">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-full">
          {/* Breadcrumb / Top Bar */}
          <div className="mb-8 flex items-center text-sm text-slate-500 font-mono">
             <span>CURRICULUM</span>
             <ChevronRight size={14} className="mx-2" />
             <span className="text-emerald-500">{activeModule.id.toUpperCase()}</span>
          </div>

          <ModuleViewer module={activeModule} />

          <div className="border-t border-slate-800 pt-12 mt-12">
            <QuizComponent 
              key={activeModule.id} // Reset quiz when module changes
              questions={activeModule.quiz} 
              onComplete={handleModuleComplete} 
            />
          </div>
          
          <div className="h-20"></div> {/* Spacer for bottom scroll */}
        </div>
      </main>

      <AITutor />
    </div>
  );
};

export default App;
