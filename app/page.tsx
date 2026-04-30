import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import { BookOpen, Lock } from "lucide-react";
import { getSession } from "@/lib/session";
import { login } from "@/app/actions/auth";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function GatePage({ searchParams }: PageProps) {
  // Already logged in → go straight to /learn
  const session = await getSession();
  if (session) redirect("/learn");

  const { error } = await searchParams;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #134E4A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 4,
            p: { xs: 4, sm: 5 },
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                backgroundColor: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={24} color="#0D9488" />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, color: "primary.main" }}
            >
              QA Academy
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Lock size={18} color="#6B7280" />
            <Typography variant="h5" sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700 }}>
              Enter your secret
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This course is invite-only. Enter your personal access secret to continue.
          </Typography>

          {error === "invalid" && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              Invalid secret. Please try again.
            </Alert>
          )}

          <Box
            component="form"
            action={login}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="secret"
              label="Access secret"
              type="password"
              autoComplete="off"
              required
              fullWidth
              autoFocus
              size="small"
              slotProps={{ htmlInput: { spellCheck: false } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
                fontWeight: 700,
                py: 1.25,
              }}
            >
              Enter
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Chip
              label="ZERO TO HERO"
              size="small"
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: 1.5,
                backgroundColor: "#F0FDFA",
                color: "primary.main",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
