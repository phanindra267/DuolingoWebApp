"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealType = "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const getAnimationStyles = () => {
    if (!visible) {
      switch (animation) {
        case "fade-up":
          return { opacity: 0, transform: "translateY(40px)" };
        case "fade-left":
          return { opacity: 0, transform: "translateX(40px)" };
        case "fade-right":
          return { opacity: 0, transform: "translateX(-40px)" };
        case "scale":
          return { opacity: 0, transform: "scale(0.9)" };
        case "fade":
          return { opacity: 0 };
      }
    }
    return {
      opacity: 1,
      transform: "translate(0) scale(1)",
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };
  };

  return (
    <div ref={ref} className={cn("will-change-[opacity,transform]", className)} style={getAnimationStyles()}>
      {children}
    </div>
  );
}

export function StaggerContainer({ children, staggerDelay = 0.1, className, threshold = 0.15 }: { children: ReactNode[], staggerDelay?: number, className?: string, threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, i) => (
        <div 
          key={i} 
          style={{ 
            opacity: visible ? 1 : 0, 
            transform: visible ? "translateY(0)" : "translateY(30px)", 
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
            willChange: "opacity, transform"
          }}
        >
          {child}
        </div>
      )) : children}
    </div>
  );
}
