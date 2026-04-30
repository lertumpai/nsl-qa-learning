import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinkButton from "@/components/LinkButton";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { getLessonById, getAdjacentLessons } from "@/app/actions/lessons";
import { getSession } from "@/lib/session";
import Navbar from "@/components/Navbar";
import LessonContent from "@/components/LessonContent";
import LessonImagePreview from "@/components/LessonImagePreview";
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { lessonId } = await params;
  const id = parseInt(lessonId);
  if (isNaN(id)) notFound();

  const sessionId = await getSession();
  const [lesson, adjacent] = await Promise.all([
    getLessonById(id, sessionId ?? undefined),
    getAdjacentLessons(id),
  ]);

  if (!lesson) notFound();

  const progress = Math.round((lesson.step_order / lesson.total_lessons) * 100);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar secret={sessionId ?? undefined} />

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
          <LinkButton
            href={`/level/${lesson.level_slug}`}
            startIcon={<ArrowLeft size={14} />}
            variant="text"
            size="small"
            sx={{ color: "text.secondary" }}
          >
            {lesson.level_title}
          </LinkButton>
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
              fontSize: { xs: "1.4rem", sm: "2rem", md: "3rem" },
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
          <LessonImagePreview
            src={lesson.image}
            alt={`${lesson.title} lesson image`}
          />
          <LessonContent content={lesson.content} />
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: { xs: "stretch", sm: "space-between" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
          }}
        >
          {adjacent.prev ? (
            <LinkButton
              href={`/lesson/${adjacent.prev.id}`}
              startIcon={<ArrowLeft size={16} />}
              variant="outlined"
              sx={{ flex: "0 1 auto", width: { xs: "100%", sm: "auto" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {adjacent.prev.title}
            </LinkButton>
          ) : (
            <Box sx={{ display: { xs: "none", sm: "block" } }} />
          )}

          <LinkButton
            href={`/lesson/${lesson.id}/quiz`}
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={16} />}
            sx={{ px: 4, py: 1.5, width: { xs: "100%", sm: "auto" } }}
          >
            {lesson.completed ? "Retake Quiz" : "Start Quiz"}
          </LinkButton>
        </Box>
      </Container>
    </Box>
  );
}
