import { lessons as lessonRows } from "@/scripts/lessons";
import { quizzes as quizRows } from "@/scripts/quizzes";
import type { Lesson, Level, Quiz } from "@/types";

const LEVELS: Level[] = [
  {
    id: 1,
    slug: "beginner",
    title: "Beginner",
    description:
      "Start from zero. Learn the foundations every QA must know — testing concepts, bug reporting, and your first test cases.",
    order_index: 1,
    icon: "BookOpen",
    color: "#22C55E",
  },
  {
    id: 2,
    slug: "intermediate",
    title: "Intermediate",
    description:
      "Level up your skills. Master test design techniques, API testing, Agile QA, and real-world strategies.",
    order_index: 2,
    icon: "TrendingUp",
    color: "#F97316",
  },
  {
    id: 3,
    slug: "advanced",
    title: "Advanced",
    description:
      "Become a QA leader. Automate everything, integrate CI/CD, tackle security and performance testing.",
    order_index: 3,
    icon: "Zap",
    color: "#EF4444",
  },
];

const levelBySlug = new Map(LEVELS.map((level) => [level.slug, level]));
const lessonCountByLevel = lessonRows.reduce<Record<string, number>>((counts, lesson) => {
  counts[lesson.level_slug] = (counts[lesson.level_slug] ?? 0) + 1;
  return counts;
}, {});
const totalDurationByLevel = lessonRows.reduce<Record<string, number>>((totals, lesson) => {
  totals[lesson.level_slug] = (totals[lesson.level_slug] ?? 0) + lesson.duration_min;
  return totals;
}, {});

export const lessons: (Lesson & { level_slug: string; level_title: string })[] = lessonRows.map(
  (lesson, index) => {
    const level = levelBySlug.get(lesson.level_slug);
    if (!level) {
      throw new Error(`Unknown level slug: ${lesson.level_slug}`);
    }

    return {
      id: index + 1,
      level_id: level.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      step_order: lesson.step_order,
      duration_min: lesson.duration_min,
      image: lesson.image,
      level_slug: level.slug,
      level_title: level.title,
    };
  }
);

const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
const lessonByTitle = new Map(lessons.map((lesson) => [lesson.title, lesson]));

export const levels: Level[] = LEVELS.map((level) => ({
  ...level,
  lesson_count: lessonCountByLevel[level.slug] ?? 0,
  total_duration_min: totalDurationByLevel[level.slug] ?? 0,
}));

export const quizzes: Quiz[] = quizRows.map((quiz, index) => {
  const lesson = lessonByTitle.get(quiz.lesson_title);
  if (!lesson) {
    throw new Error(`Quiz references unknown lesson: ${quiz.lesson_title}`);
  }

  return {
    id: index + 1,
    lesson_id: lesson.id,
    question: quiz.question,
    option_a: quiz.option_a,
    option_b: quiz.option_b,
    option_c: quiz.option_c,
    option_d: quiz.option_d,
    answer: quiz.answer,
    explanation: quiz.explanation,
  };
});

export function getContentLevelBySlug(slug: string) {
  return levels.find((level) => level.slug === slug) ?? null;
}

export function getContentLessonById(id: number) {
  return lessonById.get(id) ?? null;
}

export function getContentLessonsByLevelSlug(slug: string) {
  return lessons
    .filter((lesson) => lesson.level_slug === slug)
    .sort((a, b) => a.step_order - b.step_order);
}

export function getContentAdjacentLessons(lessonId: number) {
  const current = getContentLessonById(lessonId);
  if (!current) return { prev: null, next: null };

  const sameLevelLessons = getContentLessonsByLevelSlug(current.level_slug);
  const currentIndex = sameLevelLessons.findIndex((lesson) => lesson.id === lessonId);

  return {
    prev: currentIndex > 0 ? sameLevelLessons[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < sameLevelLessons.length - 1
        ? sameLevelLessons[currentIndex + 1]
        : null,
  };
}

export function getContentQuizzesByLessonId(lessonId: number) {
  return quizzes.filter((quiz) => quiz.lesson_id === lessonId);
}

export function getContentQuizzesByIds(ids: number[]) {
  const idSet = new Set(ids);
  return quizzes.filter((quiz) => idSet.has(quiz.id));
}

export function getTotalLessonsForLevel(slug: string) {
  return lessonCountByLevel[slug] ?? 0;
}
