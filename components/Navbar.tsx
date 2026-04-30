"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%", px: { xs: 2, md: 3 } }}>
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          }}
        >
          <BookOpen size={24} color="#0D9488" />
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Fira Code", monospace', color: "primary.main", fontWeight: 700 }}
          >
            QA Academy
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            component={Link}
            href="/"
            variant="text"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            Levels
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
