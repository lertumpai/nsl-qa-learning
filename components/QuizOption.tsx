"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  optionKey: "A" | "B" | "C" | "D";
  label: string;
  selected: boolean;
  revealed: boolean;
  correctAnswer: string;
  onSelect: () => void;
}

export default function QuizOption({
  optionKey,
  label,
  selected,
  revealed,
  correctAnswer,
  onSelect,
}: Props) {
  const isCorrect = optionKey === correctAnswer;
  const isWrongSelected = selected && revealed && !isCorrect;
  const isCorrectAnswer = revealed && isCorrect;
  const isSelectedCorrect = selected && revealed && isCorrect;

  let bg = "background.paper";
  let border = "#E5E7EB";
  let color = "text.primary";
  let icon: React.ReactNode = null;

  if (!revealed) {
    if (selected) {
      bg = "#F0FDFA";
      border = "#0D9488";
      color = "#0D9488";
    }
  } else {
    if (isSelectedCorrect) {
      bg = "#DCFCE7";
      border = "#22C55E";
      color = "#15803D";
      icon = <CheckCircle size={20} color="#22C55E" />;
    } else if (isWrongSelected) {
      bg = "#FEE2E2";
      border = "#EF4444";
      color = "#DC2626";
      icon = <XCircle size={20} color="#EF4444" />;
    } else if (isCorrectAnswer) {
      bg = "#DCFCE7";
      border = "#22C55E";
      color = "#15803D";
      icon = <CheckCircle size={20} color="#22C55E" />;
    }
  }

  return (
    <Box
      onClick={!revealed ? onSelect : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 2,
        border: "2px solid",
        borderColor: border,
        backgroundColor: bg,
        cursor: revealed ? "default" : "pointer",
        transition: "all 150ms ease-out",
        "&:hover": revealed
          ? {}
          : {
              borderColor: "primary.main",
              backgroundColor: "#F0FDFA",
              transform: "translateX(2px)",
            },
      }}
    >
      {/* Option key badge */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "2px solid",
          borderColor: border,
          backgroundColor: selected && !revealed ? "primary.main" : "transparent",
          color: selected && !revealed ? "white" : color,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontFamily: '"Fira Code", monospace', fontWeight: 700, fontSize: "0.75rem" }}
        >
          {optionKey}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          flex: 1,
          lineHeight: 1.5,
          fontWeight: selected ? 600 : 400,
          color,
        }}
      >
        {label}
      </Typography>

      {icon && <Box sx={{ flexShrink: 0 }}>{icon}</Box>}
    </Box>
  );
}
