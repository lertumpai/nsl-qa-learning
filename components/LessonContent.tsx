"use client";

import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Components } from "react-markdown";

interface Props {
  content: string;
}

const components: Components = {
  h2: ({ children }) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontFamily: '"Fira Code", monospace',
        fontWeight: 700,
        mt: 4,
        mb: 2,
        color: "text.primary",
        borderBottom: "2px solid",
        borderColor: "primary.light",
        pb: 1,
      }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      variant="h5"
      component="h3"
      sx={{
        fontFamily: '"Fira Code", monospace',
        fontWeight: 600,
        mt: 3,
        mb: 1.5,
        color: "text.primary",
      }}
    >
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography
      variant="h6"
      component="h4"
      sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 600, mt: 2, mb: 1 }}
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography
      variant="body1"
      component="p"
      sx={{ mb: 2, lineHeight: 1.7, color: "text.primary" }}
    >
      {children}
    </Typography>
  ),
  strong: ({ children }) => (
    <Box component="strong" sx={{ fontWeight: 700, color: "primary.dark" }}>
      {children}
    </Box>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <Box
          component="pre"
          sx={{
            backgroundColor: "#0F172A",
            color: "#E2E8F0",
            p: 2.5,
            borderRadius: 2,
            overflowX: "auto",
            fontSize: "0.85rem",
            fontFamily: '"Fira Code", monospace',
            lineHeight: 1.6,
            my: 2,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <code>{children}</code>
        </Box>
      );
    }
    return (
      <Box
        component="code"
        sx={{
          backgroundColor: "#F0FDFA",
          color: "#0D9488",
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          fontSize: "0.875em",
          fontFamily: '"Fira Code", monospace',
          border: "1px solid #CCFBF1",
        }}
      >
        {children}
      </Box>
    );
  },
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 2, "& li": { mb: 0.5 } }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 2, "& li": { mb: 0.5 } }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ lineHeight: 1.7 }}>
      {children}
    </Typography>
  ),
  table: ({ children }) => (
    <Box sx={{ overflowX: "auto", my: 2 }}>
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          "& th, & td": {
            border: "1px solid",
            borderColor: "divider",
            px: 2,
            py: 1,
            textAlign: "left",
          },
          "& th": {
            backgroundColor: "#F0FDFA",
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            fontSize: "0.85rem",
          },
          "& tr:hover": { backgroundColor: "#F0FDFA80" },
        }}
      >
        {children}
      </Box>
    </Box>
  ),
  blockquote: ({ children }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        pl: 2,
        py: 0.5,
        my: 2,
        backgroundColor: "#F0FDFA",
        borderRadius: "0 8px 8px 0",
        fontStyle: "italic",
      }}
    >
      {children}
    </Box>
  ),
  hr: () => (
    <Box component="hr" sx={{ border: "none", borderTop: "1px solid", borderColor: "divider", my: 3 }} />
  ),
};

export default function LessonContent({ content }: Props) {
  return (
    <Box sx={{ "& > *:first-of-type": { mt: 0 } }}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </Box>
  );
}
