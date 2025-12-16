import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    setShowResult(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const isFinished = showResult && currentQuestionIndex === questions.length - 1;

  return (
    <div className="mt-12 p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-100">Knowledge Check</h3>
        <span className="text-xs font-mono px-2 py-1 bg-slate-800 rounded text-slate-400">
          Q{currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-lg text-slate-300 font-medium leading-relaxed">
          {currentQuestion.question}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            disabled={showResult}
            onClick={() => setSelectedOption(idx)}
            className={`
              w-full text-left p-4 rounded-xl transition-all duration-200 border
              flex items-center justify-between
              ${showResult && idx === currentQuestion.correctAnswer 
                ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-200' 
                : showResult && selectedOption === idx && idx !== currentQuestion.correctAnswer
                ? 'bg-red-900/30 border-red-500/50 text-red-200'
                : selectedOption === idx
                ? 'bg-slate-800 border-emerald-500 text-slate-100 ring-1 ring-emerald-500'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
            `}
          >
            <span>{option}</span>
            {showResult && idx === currentQuestion.correctAnswer && <CheckCircle size={20} className="text-emerald-500" />}
            {showResult && selectedOption === idx && idx !== currentQuestion.correctAnswer && <AlertCircle size={20} className="text-red-500" />}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <p className={`text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'} font-bold mb-1`}>
            {isCorrect ? 'Correct!' : 'Incorrect.'}
          </p>
          <p className="text-sm text-slate-400">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            {isFinished ? 'Complete Module' : 'Next Question'}
            {isFinished && <CheckCircle size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
