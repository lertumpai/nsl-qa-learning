"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  score: number;
  size?: number;
}

export default function ScoreGauge({ score, size = 160 }: Props) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 90) return "#22C55E";
    if (score >= 70) return "#0D9488";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={10}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      {/* Center text */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            color: getColor(),
            lineHeight: 1,
          }}
        >
          {score}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          %
        </Typography>
      </Box>
    </Box>
  );
}
