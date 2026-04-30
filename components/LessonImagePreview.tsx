"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { X, ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

const FALLBACK_IMAGE = "/lesson-placeholder.svg";

export default function LessonImagePreview({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGE);
  }, [src]);

  const handleImageError = () => {
    if (currentSrc !== FALLBACK_IMAGE) {
      setCurrentSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.secondary",
            mb: 1,
            fontFamily: '"Fira Code", monospace',
          }}
        >
          Lesson image
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={() => setOpen(true)}
          sx={{
            display: "block",
            p: 0,
            m: 0,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            cursor: "zoom-in",
            overflow: "hidden",
            background: "transparent",
            position: "relative",
            width: { xs: 120, sm: 160 },
            height: { xs: 80, sm: 106 },
            transition: "transform 160ms ease, box-shadow 160ms ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(15, 118, 110, 0.18)",
            },
          }}
        >
          <Box
            component="img"
            src={currentSrc}
            alt={alt}
            onError={handleImageError}
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 8,
              bottom: 8,
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ZoomIn size={14} />
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        <IconButton
          aria-label="Close image"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: { xs: -4, sm: -18 },
            top: { xs: -44, sm: -18 },
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            zIndex: 1,
          }}
        >
          <X size={18} />
        </IconButton>

        <Box
          component="img"
          src={currentSrc}
          alt={alt}
          onError={handleImageError}
          sx={{
            width: "100%",
            maxHeight: "82vh",
            objectFit: "contain",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.2)",
            bgcolor: "black",
          }}
        />
      </Dialog>
    </>
  );
}
