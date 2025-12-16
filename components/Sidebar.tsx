import React from 'react';
import { Module, UserProgress } from '../types';
import { CheckCircle, Circle, Terminal, BookOpen, Menu, X } from 'lucide-react';

interface SidebarProps {
  modules: Module[];
  progress: UserProgress;
  onSelectModule: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, progress, onSelectModule, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-800 text-emerald-400 rounded-lg shadow-lg border border-emerald-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
        flex flex-col
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-emerald-900/30 rounded-lg">
            <Terminal className="text-emerald-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">CLI Mastery</h1>
            <p className="text-xs text-emerald-500 font-mono">v1.0.0 // Curriculum</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {modules.map((module, index) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isActive = progress.currentModuleId === module.id;

            return (
              <button
                key={module.id}
                onClick={() => {
                  onSelectModule(module.id);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={`
                  w-full text-left p-4 rounded-xl transition-all duration-200 border
                  flex items-start gap-3 group
                  ${isActive 
                    ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'bg-transparent border-transparent hover:bg-slate-800 hover:border-slate-700'}
                `}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle size={18} className="text-emerald-400" />
                  ) : isActive ? (
                    <Circle size={18} className="text-emerald-400 animate-pulse" />
                  ) : (
                    <BookOpen size={18} className="text-slate-500 group-hover:text-slate-400" />
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${isActive ? 'text-emerald-300' : 'text-slate-300 group-hover:text-slate-200'}`}>
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
           <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
             <div 
               className="bg-emerald-500 h-full transition-all duration-500 ease-out"
               style={{ width: `${(progress.completedModules.length / modules.length) * 100}%` }}
             />
           </div>
           <p className="text-xs text-center mt-2 text-slate-500 font-mono">
             {Math.round((progress.completedModules.length / modules.length) * 100)}% TERMINAL SYNCED
           </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
