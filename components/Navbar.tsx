"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { BookOpen, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

interface NavbarProps {
  secret?: string;
}

export default function Navbar({ secret }: NavbarProps) {
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
          href="/learn"
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

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
          <Button
            component={Link}
            href="/learn"
            variant="text"
            sx={{ color: "text.secondary", fontWeight: 500, display: { xs: "none", sm: "flex" } }}
          >
            Levels
          </Button>

          {secret && (
            <Chip
              label={secret}
              size="small"
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontWeight: 700,
                fontSize: "0.7rem",
                backgroundColor: "#F0FDFA",
                color: "primary.main",
                border: "1px solid",
                borderColor: "primary.light",
                maxWidth: 120,
                display: { xs: "none", sm: "flex" },
              }}
            />
          )}

          {secret && (
            <form action={logout}>
              <Button
                type="submit"
                variant="text"
                size="small"
                startIcon={<LogOut size={14} />}
                sx={{ color: "text.secondary", fontWeight: 500, minWidth: 0 }}
              >
                Logout
              </Button>
            </form>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
