"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { CheckCircle, Circle, Clock, PlayCircle, ChevronRight } from "lucide-react";
import type { Lesson } from "@/types";

interface LessonWithProgress extends Lesson {
  completed: boolean;
  quiz_score: number | null;
}

interface Props {
  lessons: LessonWithProgress[];
  levelColor: string;
}

export default function LessonStepper({ lessons, levelColor }: Props) {
  const firstIncompleteIndex = lessons.findIndex((l) => !l.completed);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {lessons.map((lesson, index) => {
        const isCompleted = lesson.completed;
        const isCurrent =
          index === firstIncompleteIndex || (firstIncompleteIndex === -1 && index === lessons.length - 1);
        const isAccessible = index <= (firstIncompleteIndex === -1 ? lessons.length - 1 : firstIncompleteIndex);

        return (
          <Box
            key={lesson.id}
            sx={{ display: "flex", gap: 0, position: "relative" }}
          >
            {/* Connector line */}
            {index < lessons.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  left: 19,
                  top: 48,
                  width: 2,
                  height: "calc(100% - 24px)",
                  backgroundColor: isCompleted ? levelColor : "#E5E7EB",
                  zIndex: 0,
                }}
              />
            )}

            {/* Step indicator */}
            <Box
              sx={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                mt: "20px",
                backgroundColor: isCompleted
                  ? levelColor
                  : isCurrent
                  ? `${levelColor}20`
                  : "#F3F4F6",
                border: isCurrent ? `2px solid ${levelColor}` : "2px solid transparent",
                color: isCompleted ? "white" : isCurrent ? levelColor : "#9CA3AF",
                flexDirection: "column",
              }}
            >
              {isCompleted ? (
                <CheckCircle size={20} />
              ) : isCurrent ? (
                <PlayCircle size={20} />
              ) : (
                <Circle size={20} />
              )}
            </Box>

            {/* Lesson card */}
            <Box
              component={isAccessible ? Link : "div"}
              href={isAccessible ? `/lesson/${lesson.id}` : undefined}
              sx={{
                flex: 1,
                ml: 2,
                mb: 2,
                p: 2.5,
                borderRadius: 3,
                border: "1.5px solid",
                borderColor: isCompleted
                  ? `${levelColor}40`
                  : isCurrent
                  ? levelColor
                  : "#E5E7EB",
                backgroundColor: isCompleted
                  ? `${levelColor}08`
                  : isCurrent
                  ? `${levelColor}05`
                  : "background.paper",
                textDecoration: "none",
                cursor: isAccessible ? "pointer" : "default",
                transition: "all 200ms ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                "&:hover": isAccessible
                  ? {
                      borderColor: levelColor,
                      boxShadow: `0 4px 12px ${levelColor}20`,
                      transform: "translateX(4px)",
                    }
                  : {},
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: '"Fira Code", monospace',
                      fontWeight: 700,
                      color: levelColor,
                      opacity: 0.7,
                    }}
                  >
                    STEP {lesson.step_order}
                  </Typography>
                  {isCurrent && !isCompleted && (
                    <Chip
                      label="NEXT UP"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.6rem",
                        fontFamily: '"Fira Code", monospace',
                        fontWeight: 700,
                        backgroundColor: levelColor,
                        color: "white",
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: isAccessible ? "text.primary" : "text.secondary",
                    mb: 0.5,
                  }}
                >
                  {lesson.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Clock size={12} color="#9CA3AF" />
                    <Typography variant="caption" color="text.secondary">
                      {lesson.duration_min} min
                    </Typography>
                  </Box>
                  {lesson.quiz_score !== null && (
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: lesson.quiz_score >= 70 ? "#22C55E" : "#EF4444" }}
                    >
                      Quiz: {lesson.quiz_score}%
                    </Typography>
                  )}
                </Box>
              </Box>

              {isAccessible && (
                <ChevronRight
                  size={18}
                  color={isCompleted ? levelColor : "#9CA3AF"}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
