export interface ContentBlock {
  type: 'header' | 'subHeader' | 'paragraph' | 'code' | 'list';
  content: string;
  language?: 'bash' | 'powershell' | 'text';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: ContentBlock[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedModules: string[];
  currentModuleId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
