"use client";

import Button, { ButtonProps } from "@mui/material/Button";
import Link from "next/link";

type LinkButtonProps = ButtonProps & { href: string };

export default function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
