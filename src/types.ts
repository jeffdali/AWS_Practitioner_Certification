
export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  isMultiple?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  topics: string;
  questions: Question[];
}
