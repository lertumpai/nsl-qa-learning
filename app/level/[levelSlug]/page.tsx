import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { getLevelBySlug } from "@/app/actions/levels";
import { getOrCreateSession } from "@/lib/session";
import Navbar from "@/components/Navbar";
import LessonStepper from "@/components/LessonStepper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ levelSlug: string }>;
}

export default async function LevelPage({ params }: PageProps) {
  const { levelSlug } = await params;
  const sessionId = await getOrCreateSession();
  const level = await getLevelBySlug(levelSlug, sessionId);

  if (!level) notFound();

  const completedCount = level.lessons.filter((l) => l.completed).length;
  const totalLessons = level.lessons.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const firstIncomplete = level.lessons.find((l) => !l.completed);
  const resumeLesson = firstIncomplete ?? level.lessons[0];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${level.color}18 0%, ${level.color}08 100%)`,
          borderBottom: "1px solid",
          borderColor: "divider",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowLeft size={16} />}
            variant="text"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            All Levels
          </Button>

          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
            <Box>
              <Chip
                label={level.title.toUpperCase()}
                size="small"
                sx={{
                  mb: 2,
                  backgroundColor: `${level.color}18`,
                  color: level.color,
                  fontFamily: '"Fira Code", monospace',
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              />
              <Typography
                variant="h3"
                sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, mb: 1 }}
              >
                {level.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                {level.description}
              </Typography>
            </Box>

            {resumeLesson && (
              <Button
                component={Link}
                href={`/lesson/${resumeLesson.id}`}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: level.color,
                  "&:hover": { backgroundColor: level.color, filter: "brightness(1.1)" },
                  px: 4,
                  py: 1.5,
                }}
              >
                {completedCount > 0 ? "Resume" : "Start Learning"}
              </Button>
            )}
          </Box>

          {/* Progress bar */}
          <Box sx={{ mt: 4, maxWidth: 480 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: level.color }}>
                {completedCount} / {totalLessons} lessons
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 8,
                "& .MuiLinearProgress-bar": { backgroundColor: level.color },
                backgroundColor: `${level.color}20`,
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {progress}% complete
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Lesson Stepper */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h5"
          sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, mb: 4 }}
        >
          Lessons
        </Typography>
        <LessonStepper lessons={level.lessons} levelColor={level.color} />
      </Container>
    </Box>
  );
}
