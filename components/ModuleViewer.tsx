import React from 'react';
import { Module, ContentBlock } from '../types';
import { Copy, Terminal } from 'lucide-react';

interface ModuleViewerProps {
  module: Module;
}

const CodeBlock: React.FC<{ content: string; language?: string }> = ({ content, language }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-400 uppercase">{language || 'text'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Copy size={14} />
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-slate-300">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};

const ModuleViewer: React.FC<ModuleViewerProps> = ({ module }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-4xl font-bold text-slate-100 mb-4">{module.title}</h2>
        <p className="text-xl text-slate-400 leading-relaxed">{module.description}</p>
      </div>

      <div className="space-y-6">
        {module.content.map((block, idx) => {
          switch (block.type) {
            case 'header':
              return (
                <h3 key={idx} className="text-2xl font-bold text-emerald-400 mt-8 mb-4 flex items-center gap-2">
                  <span className="text-emerald-900">#</span> {block.content}
                </h3>
              );
            case 'subHeader':
              return (
                <h4 key={idx} className="text-lg font-semibold text-slate-200 mt-6 mb-2 border-l-2 border-emerald-600 pl-3">
                  {block.content}
                </h4>
              );
            case 'paragraph':
              return (
                <p key={idx} className="text-slate-400 leading-7">
                  {block.content}
                </p>
              );
            case 'code':
              return (
                <CodeBlock key={idx} content={block.content} language={block.language} />
              );
            case 'list':
              return (
                <div key={idx} className="flex items-start gap-3 pl-2">
                   <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                   <p className="text-slate-300 leading-7">{block.content}</p>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ModuleViewer;
