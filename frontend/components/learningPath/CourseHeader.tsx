import { ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseHeaderProps {
  unitNumber: number;
  unitTitle: string;
  unitDescription: string;
  colorClass: string;
  onGuidebook?: () => void;
}

export function CourseHeader({ unitNumber, unitTitle, unitDescription, colorClass, onGuidebook }: CourseHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between gap-4 border-b-2 border-border bg-white px-5 py-3 shadow-md transition-colors",
        colorClass,
      )}
    >
      <div className="flex items-center gap-2 text-sm text-primary-foreground">
        <ArrowLeft className="size-4" />
        <span>Section {unitNumber}</span>
      </div>
      <div className="flex-1 text-center">
        <h2 className="font-display text-lg font-extrabold text-primary-foreground">
          {unitTitle}
        </h2>
        <p className="text-xs text-primary-foreground/80">{unitDescription}</p>
      </div>
      <button
        onClick={onGuidebook}
        className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/30"
      >
        <BookOpen className="size-4" />
        GUIDEBOOK
      </button>
    </header>
  );
}
