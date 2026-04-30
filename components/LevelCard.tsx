"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { BookOpen, TrendingUp, Zap, Clock, ChevronRight } from "lucide-react";
import type { Level } from "@/types";

const ICONS: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Zap: <Zap size={32} />,
};

const LEVEL_DURATIONS: Record<string, string> = {
  beginner: "~2 hrs",
  intermediate: "~4 hrs",
  advanced: "~5 hrs",
};

interface Props {
  level: Level;
  isLocked: boolean;
  index: number;
}

export default function LevelCard({ level, isLocked }: Props) {
  const lessonCount = level.lesson_count ?? 0;
  const completedCount = level.completed_count ?? 0;
  const progress = lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;
  const hasStarted = completedCount > 0;
  const isCompleted = completedCount === lessonCount && lessonCount > 0;

  return (
    <Card
      component={isLocked ? "div" : Link}
      href={isLocked ? undefined : `/level/${level.slug}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: "2px solid transparent",
        position: "relative",
        overflow: "visible",
        opacity: isLocked ? 0.6 : 1,
        cursor: isLocked ? "not-allowed" : "pointer",
        transition: "all 200ms ease-out",
        "&:hover": isLocked
          ? {}
          : {
              border: `2px solid ${level.color}`,
              transform: "translateY(-4px)",
              boxShadow: `0 16px 32px ${level.color}30`,
            },
      }}
    >
      {/* Color accent bar */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${level.color}, ${level.color}88)`,
          borderRadius: "12px 12px 0 0",
        }}
      />

      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon + Badge */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${level.color}15`,
              color: level.color,
            }}
          >
            {ICONS[level.icon] ?? <BookOpen size={32} />}
          </Box>

          <Chip
            label={level.title.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: `${level.color}15`,
              color: level.color,
              fontFamily: '"Fira Code", monospace',
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: 1,
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            mb: 1,
            color: "text.primary",
          }}
        >
          {level.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6, flexGrow: 1 }}
        >
          {level.description}
        </Typography>

        {/* Stats row */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BookOpen size={14} color="#6B7280" />
            <Typography variant="caption" color="text.secondary">
              {lessonCount} lessons
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Clock size={14} color="#6B7280" />
            <Typography variant="caption" color="text.secondary">
              {LEVEL_DURATIONS[level.slug] ?? "~3 hrs"}
            </Typography>
          </Box>
        </Box>

        {/* Progress (only if started) */}
        {hasStarted && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: level.color }}>
                {completedCount}/{lessonCount}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                "& .MuiLinearProgress-bar": { backgroundColor: level.color },
                backgroundColor: `${level.color}20`,
              }}
            />
          </Box>
        )}

        {/* CTA */}
        <Button
          fullWidth
          variant="contained"
          endIcon={<ChevronRight size={16} />}
          disabled={isLocked}
          sx={{
            backgroundColor: level.color,
            "&:hover": { backgroundColor: level.color, filter: "brightness(1.1)" },
            boxShadow: `0 4px 12px ${level.color}40`,
          }}
        >
          {isCompleted ? "Review Level" : hasStarted ? "Continue" : "Start Level"}
        </Button>
      </CardContent>
    </Card>
  );
}
