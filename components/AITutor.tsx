import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Loader2, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Command Line Tutor. Ask me anything about Bash, PowerShell, or the curriculum.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key not found");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `You are an expert, friendly Command Line Interface (CLI) instructor. You are tutoring a student who is learning Bash and PowerShell. 
                        Keep your answers concise, practical, and encouraging. 
                        If they ask about code, provide both Bash and PowerShell examples if relevant. 
                        
                        User Question: ${userMessage}`
                    }
                ]
            }
        ]
      });

      const text = response.text || "I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to the AI Tutor. Please check your API key configuration." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110
          ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'bg-emerald-600 text-white'}
        `}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`
        fixed bottom-6 right-6 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
      `}>
        {/* Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-900/50 rounded-lg">
                <Bot size={18} className="text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-100">AI Tutor</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-emerald-900/50 text-emerald-400'}
              `}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`
                p-3 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-slate-700 text-slate-100 rounded-tr-none' 
                  : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center flex-shrink-0">
                 <Bot size={14} />
               </div>
               <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                 <Loader2 size={16} className="animate-spin text-emerald-500" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:bg-emerald-900/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AITutor;
