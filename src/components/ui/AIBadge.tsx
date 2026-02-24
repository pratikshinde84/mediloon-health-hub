import { Sparkles } from "lucide-react";

const AIBadge = ({ label = "AI Recommended" }: { label?: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full gradient-primary text-primary-foreground animate-pulse_badge">
    <Sparkles className="h-3.5 w-3.5" />
    {label}
  </span>
);

export default AIBadge;
