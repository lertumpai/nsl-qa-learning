"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import { ArrowLeft, RefreshCw, ArrowRight, ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import type { SubmitQuizResult } from "@/types";

interface StoredResult extends SubmitQuizResult {
  lessonId: number;
  lessonTitle: string;
  levelSlug: string;
}

interface Props {
  lessonId: number;
}

function getMessage(score: number) {
  if (score >= 90) return { title: "Outstanding!", subtitle: "You've mastered this lesson.", color: "#22C55E" };
  if (score >= 70) return { title: "Great work!", subtitle: "You passed! Keep it up.", color: "#0D9488" };
  if (score >= 50) return { title: "Good effort!", subtitle: "Review the lesson and try again.", color: "#F59E0B" };
  return { title: "Keep practicing!", subtitle: "Read the lesson again carefully before retrying.", color: "#EF4444" };
}

function ReviewItem({ result, index }: { result: SubmitQuizResult["results"][0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        border: "1.5px solid",
        borderColor: result.is_correct ? "#BBFECF" : "#FECACA",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        onClick={() => setOpen((v) => !v)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          cursor: "pointer",
          backgroundColor: result.is_correct ? "#F0FDF4" : "#FFF5F5",
          "&:hover": { filter: "brightness(0.97)" },
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          {result.is_correct ? (
            <CheckCircle size={20} color="#22C55E" />
          ) : (
            <XCircle size={20} color="#EF4444" />
          )}
        </Box>

        <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
          {index + 1}. {result.question}
        </Typography>

        {open ? <ChevronUp size={16} color="#9CA3AF" /> : <ChevronDown size={16} color="#9CA3AF" />}
      </Box>

      <Collapse in={open}>
        <Box sx={{ p: 2, borderTop: "1px solid", borderColor: result.is_correct ? "#BBFECF" : "#FECACA", backgroundColor: "background.paper" }}>
          <Box sx={{ display: "flex", gap: 3, mb: 1.5, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Your Answer</Typography>
              <Chip
                label={result.your_answer || "—"}
                size="small"
                sx={{
                  display: "block",
                  mt: 0.5,
                  backgroundColor: result.is_correct ? "#DCFCE7" : "#FEE2E2",
                  color: result.is_correct ? "#15803D" : "#DC2626",
                  fontFamily: '"Fira Code", monospace',
                  fontWeight: 700,
                }}
              />
            </Box>
            {!result.is_correct && (
              <Box>
                <Typography variant="caption" color="text.secondary">Correct Answer</Typography>
                <Chip
                  label={result.correct_answer}
                  size="small"
                  sx={{
                    display: "block",
                    mt: 0.5,
                    backgroundColor: "#DCFCE7",
                    color: "#15803D",
                    fontFamily: '"Fira Code", monospace',
                    fontWeight: 700,
                  }}
                />
              </Box>
            )}
          </Box>

          {result.explanation && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {result.explanation}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function QuizResultClient({ lessonId }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`quiz_result_${lessonId}`);
    if (!stored) {
      router.replace("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, [lessonId, router]);

  if (!result) return null;

  const msg = getMessage(result.score);
  const passed = result.score >= 70;

  return (
    <Box>
      {/* Score hero */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ScoreGauge score={result.score} size={180} />
        </Box>

        <Typography
          variant="h4"
          sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, mb: 1, color: msg.color }}
        >
          {msg.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {msg.subtitle}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
              {result.correct}
            </Typography>
            <Typography variant="caption" color="text.secondary">Correct</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "error.main" }}>
              {result.total - result.correct}
            </Typography>
            <Typography variant="caption" color="text.secondary">Wrong</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {result.total}
            </Typography>
            <Typography variant="caption" color="text.secondary">Total</Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 6 }}>
        <Button
          component={Link}
          href={`/lesson/${lessonId}/quiz`}
          startIcon={<RefreshCw size={16} />}
          variant="outlined"
        >
          Retake Quiz
        </Button>
        <Button
          component={Link}
          href={`/level/${result.levelSlug}`}
          startIcon={<ArrowLeft size={16} />}
          variant="text"
          sx={{ color: "text.secondary" }}
        >
          Back to Level
        </Button>
        {passed && (
          <Button
            component={Link}
            href={`/lesson/${lessonId}`}
            endIcon={<ArrowRight size={16} />}
            variant="contained"
          >
            Continue Learning
          </Button>
        )}
      </Box>

      {/* Question review */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, mb: 3 }}
        >
          Question Review
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {result.results.map((r, i) => (
            <ReviewItem key={r.quiz_id} result={r} index={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
