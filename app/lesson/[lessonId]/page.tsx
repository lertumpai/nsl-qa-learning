import { notFound } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { getLessonById, getAdjacentLessons } from "@/app/actions/lessons";
import { getOrCreateSession } from "@/lib/session";
import Navbar from "@/components/Navbar";
import LessonContent from "@/components/LessonContent";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { lessonId } = await params;
  const id = parseInt(lessonId);
  if (isNaN(id)) notFound();

  const sessionId = await getOrCreateSession();
  const [lesson, adjacent] = await Promise.all([
    getLessonById(id, sessionId),
    getAdjacentLessons(id),
  ]);

  if (!lesson) notFound();

  const progress = Math.round((lesson.step_order / lesson.total_lessons) * 100);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      {/* Top progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          borderRadius: 0,
          "& .MuiLinearProgress-bar": { backgroundColor: "primary.main" },
          backgroundColor: "divider",
        }}
      />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <Button
            component={Link}
            href={`/level/${lesson.level_slug}`}
            startIcon={<ArrowLeft size={14} />}
            variant="text"
            size="small"
            sx={{ color: "text.secondary" }}
          >
            {lesson.level_title}
          </Button>
          <Typography color="text.secondary" variant="body2">
            /
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {lesson.title}
          </Typography>
        </Box>

        {/* Lesson Header */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
            <Chip
              label={`STEP ${lesson.step_order} OF ${lesson.total_lessons}`}
              size="small"
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontWeight: 700,
                fontSize: "0.65rem",
                backgroundColor: "primary.main",
                color: "white",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Clock size={14} color="#9CA3AF" />
              <Typography variant="caption" color="text.secondary">
                {lesson.duration_min} min read
              </Typography>
            </Box>
            {lesson.completed && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "success.main" }}>
                <CheckCircle size={14} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "success.main" }}>
                  Completed • {lesson.quiz_score}%
                </Typography>
              </Box>
            )}
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Fira Code", monospace',
              fontWeight: 700,
              lineHeight: 1.2,
              color: "text.primary",
            }}
          >
            {lesson.title}
          </Typography>
        </Box>

        {/* Lesson Content */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            mb: 6,
          }}
        >
          <LessonContent content={lesson.content} />
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {adjacent.prev ? (
            <Button
              component={Link}
              href={`/lesson/${adjacent.prev.id}`}
              startIcon={<ArrowLeft size={16} />}
              variant="outlined"
              sx={{ flex: "0 1 auto" }}
            >
              {adjacent.prev.title}
            </Button>
          ) : (
            <Box />
          )}

          <Button
            component={Link}
            href={`/lesson/${lesson.id}/quiz`}
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={16} />}
            sx={{ px: 4, py: 1.5 }}
          >
            {lesson.completed ? "Retake Quiz" : "Start Quiz"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
