import type { ElementType, ReactNode } from "react";
import { useReveal } from "../hooks";

type Props = {
  children: ReactNode;
  /** Kardeşler arası gecikme sırası. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/** Görünür alana girince açılan sarmalayıcı. */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--i": delay } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
