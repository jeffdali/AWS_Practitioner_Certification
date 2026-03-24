
export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}
