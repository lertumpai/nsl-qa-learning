"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { submitQuizSession } from "@/app/actions/quizzes";
import QuizOption from "@/components/QuizOption";
import type { Quiz, SubmitQuizResult } from "@/types";

interface LessonMeta {
  id: number;
  title: string;
  level_slug: string;
  level_title: string;
  step_order: number;
  total_lessons: number;
}

interface Props {
  lesson: LessonMeta;
  quizzes: Quiz[];
  sessionId: string;
}

export default function QuizClient({ lesson, quizzes, sessionId }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const current = quizzes[currentIndex];
  const total = quizzes.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const selectedAnswer = answers[current.id];
  const isLast = currentIndex === total - 1;

  const options: { key: "A" | "B" | "C" | "D"; label: string }[] = [
    { key: "A", label: current.option_a },
    { key: "B", label: current.option_b },
    { key: "C", label: current.option_c },
    { key: "D", label: current.option_d },
  ];

  function handleSelect(optionKey: string) {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionKey }));
  }

  function handleReveal() {
    if (!selectedAnswer) return;
    setRevealed(true);
  }

  function handleNext() {
    setRevealed(false);
    setCurrentIndex((i) => i + 1);
  }

  async function handleSubmit() {
    if (!selectedAnswer && !revealed) return;
    setSubmitting(true);

    const finalAnswers = { ...answers };
    if (!finalAnswers[current.id] && selectedAnswer) {
      finalAnswers[current.id] = selectedAnswer;
    }

    try {
      const result: SubmitQuizResult = await submitQuizSession(
        sessionId,
        lesson.id,
        finalAnswers
      );

      // Store result in sessionStorage for the result page
      sessionStorage.setItem(
        `quiz_result_${lesson.id}`,
        JSON.stringify({ ...result, lessonId: lesson.id, lessonTitle: lesson.title, levelSlug: lesson.level_slug })
      );

      router.push(`/quiz/result?lesson=${lesson.id}`);
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 3,
          py: 1.5,
        }}
      >
        <Container maxWidth="md" disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              href={`/lesson/${lesson.id}`}
              startIcon={<ArrowLeft size={14} />}
              variant="text"
              size="small"
              sx={{ color: "text.secondary", flexShrink: 0 }}
            >
              Back
            </Button>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Question {currentIndex + 1} of {total}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 6, borderRadius: 4 }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Lesson context */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <BookOpen size={16} color="#9CA3AF" />
          <Typography variant="body2" color="text.secondary">
            {lesson.title}
          </Typography>
        </Box>

        {/* Question card */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            mb: 3,
            boxShadow: "0 4px 6px rgba(13,148,136,0.08)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Chip
            label={`Q${currentIndex + 1}`}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: "primary.main",
              color: "white",
              fontFamily: '"Fira Code", monospace',
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Fira Code", monospace',
              fontWeight: 600,
              lineHeight: 1.5,
              color: "text.primary",
            }}
          >
            {current.question}
          </Typography>
        </Box>

        {/* Answer options */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          {options.map((opt) => (
            <QuizOption
              key={opt.key}
              optionKey={opt.key}
              label={opt.label}
              selected={selectedAnswer === opt.key}
              revealed={revealed}
              correctAnswer={current.answer}
              onSelect={() => handleSelect(opt.key)}
            />
          ))}
        </Box>

        {/* Explanation (after reveal) */}
        {revealed && current.explanation && (
          <Box
            sx={{
              backgroundColor: "#F0FDFA",
              border: "1px solid",
              borderColor: "primary.light",
              borderRadius: 2,
              p: 2.5,
              mb: 4,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontWeight: 700,
                color: "primary.main",
                display: "block",
                mb: 0.5,
              }}
            >
              EXPLANATION
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {current.explanation}
            </Typography>
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {!revealed ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleReveal}
              disabled={!selectedAnswer}
              sx={{ px: 4, minWidth: 160 }}
            >
              Check Answer
            </Button>
          ) : isLast ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{ px: 4, minWidth: 160 }}
              endIcon={
                submitting ? (
                  <CircularProgress size={16} sx={{ color: "white" }} />
                ) : (
                  <ArrowRight size={16} />
                )
              }
            >
              {submitting ? "Submitting…" : "See Results"}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              endIcon={<ArrowRight size={16} />}
              sx={{ px: 4, minWidth: 160 }}
            >
              Next Question
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
