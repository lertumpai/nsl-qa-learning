"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D9488",
      light: "#2DD4BF",
      dark: "#0F766E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F97316",
      light: "#FB923C",
      dark: "#EA580C",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      light: "#4ADE80",
      dark: "#16A34A",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
    },
    background: {
      default: "#F0FDFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#134E4A",
      secondary: "#374151",
    },
  },
  typography: {
    fontFamily: '"Fira Sans", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Fira Sans", "Helvetica Neue", Arial, sans-serif',
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Fira Sans", "Helvetica Neue", Arial, sans-serif',
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }

        body {
          background-color: #F0FDFA;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        pre, code {
          font-family: 'Fira Code', 'Courier New', monospace;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 200ms ease-out",
          boxShadow: "none",
          "&.MuiButton-containedPrimary": {
            boxShadow: "0 4px 6px rgba(13,148,136,0.25)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(13,148,136,0.35)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 4px 6px rgba(13,148,136,0.08), 0 1px 3px rgba(0,0,0,0.06)",
          transition: "all 200ms ease-out",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 10px 25px rgba(13,148,136,0.15)",
            transform: "translateY(-2px)",
            border: "2px solid #2DD4BF",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
          fontFamily: '"Fira Code", monospace',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
        },
      },
    },
  },
});

export default theme;
