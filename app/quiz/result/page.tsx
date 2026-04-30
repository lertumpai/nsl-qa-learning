import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuizResultClient from "@/components/QuizResultClient";

interface PageProps {
  searchParams: Promise<{ lesson?: string }>;
}

export default async function QuizResultPage({ searchParams }: PageProps) {
  const { lesson } = await searchParams;

  if (!lesson) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">No quiz result found.</Typography>
        <Button component={Link} href="/" startIcon={<ArrowLeft size={16} />} variant="contained">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <QuizResultClient lessonId={parseInt(lesson)} />
      </Container>
    </Box>
  );
}
