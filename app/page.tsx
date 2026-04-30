import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import { getLevels } from "@/app/actions/levels";
import { getSession } from "@/lib/session";
import { quizzes } from "@/lib/content";
import Navbar from "@/components/Navbar";
import LevelCard from "@/components/LevelCard";

export default async function HomePage() {
  const sessionId = await getSession();
  const levels = await getLevels(sessionId ?? undefined);
  const lessonCount = levels.reduce((total, level) => total + (level.lesson_count ?? 0), 0);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />

      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #134E4A 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-20%",
            width: "60%",
            height: "200%",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Chip
            label="ZERO TO HERO"
            size="small"
            sx={{
              mb: 3,
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              fontFamily: '"Fira Code", monospace',
              fontWeight: 700,
              letterSpacing: 2,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Fira Code", monospace',
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Become a QA Engineer
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              mb: 5,
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Master software testing from the fundamentals to advanced automation.
            One lesson at a time, one quiz at a time.
          </Typography>

          {/* Stats */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: levels.length.toString(), label: "Levels" },
              { value: lessonCount.toString(), label: "Lessons" },
              { value: (quizzes.length).toString(), label: "Quiz Questions" },
            ].map((stat) => (
              <Box key={stat.label} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Level Cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            mb: 1,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Choose Your Level
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            mb: 6,
          }}
        >
          Start at Beginner and work your way up. Each level builds on the previous.
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {levels.map((level, index) => (
            <Grid key={level.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <LevelCard level={level} isLocked={false} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          QA Academy — Learn testing the right way
        </Typography>
      </Box>
    </Box>
  );
}
