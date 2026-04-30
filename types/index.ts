export interface Level {
  id: number;
  slug: string;
  title: string;
  description: string;
  order_index: number;
  icon: string;
  color: string;
  lesson_count?: number;
  completed_count?: number;
}

export interface Lesson {
  id: number;
  level_id: number;
  title: string;
  description: string;
  content: string;
  step_order: number;
  duration_min: number;
  image: string;
}

export interface Quiz {
  id: number;
  lesson_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface UserProgress {
  id: number;
  session_id: string;
  lesson_id: number;
  completed: boolean;
  quiz_score: number | null;
  attempts: number;
  last_attempt_at: string | null;
}

export interface QuizResult {
  quiz_id: number;
  question: string;
  your_answer: string;
  correct_answer: string;
  is_correct: boolean;
  explanation: string;
}

export interface SubmitQuizResult {
  score: number;
  correct: number;
  total: number;
  results: QuizResult[];
}
