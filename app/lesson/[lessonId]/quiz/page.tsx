import { notFound } from "next/navigation";
import { getLessonById } from "@/app/actions/lessons";
import { getRandomQuizzes } from "@/app/actions/quizzes";
import { getOrCreateSession } from "@/lib/session";
import QuizClient from "@/components/QuizClient";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { lessonId } = await params;
  const id = parseInt(lessonId);
  if (isNaN(id)) notFound();

  const sessionId = await getOrCreateSession();
  const [lesson, quizzes] = await Promise.all([
    getLessonById(id, sessionId),
    getRandomQuizzes(id, 12),
  ]);

  if (!lesson) notFound();
  if (quizzes.length === 0) notFound();

  return (
    <QuizClient
      lesson={lesson}
      quizzes={quizzes}
      sessionId={sessionId}
    />
  );
}
