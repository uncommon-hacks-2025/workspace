import { cn } from "@/lib/utils";
import { FC } from "react";

export interface TextProps {
  children?: React.ReactNode;
  className?: string;
}
export const H1 = ({ children, className }: Readonly<TextProps>) => (
  <h1
    className={cn(
      "text-6xl font-bold font-[family-name:var(--font-inter)]",
      className,
    )}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className }: Readonly<TextProps>) => (
  <h2
    className={cn(
      "text-3xl font-bold font-[family-name:var(--font-inter)]",
      className,
    )}
  >
    {children}
  </h2>
);

export const P: FC<Readonly<TextProps>> = ({
  children,
  className,
}: Readonly<TextProps>) => (
  <p className={cn("text-md", className)}>{children}</p>
);
