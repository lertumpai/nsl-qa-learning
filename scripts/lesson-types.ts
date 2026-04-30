export type LessonRow = {
  level_slug: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  content: string;
  step_order: number;
  duration_min: number;
  image: string;
};
