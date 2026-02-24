import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
}

const AnalyticsCard = ({ title, value, change, positive, icon: Icon }: AnalyticsCardProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-card rounded-xl border border-border shadow-card p-5"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      {change && (
        <span className={`text-xs font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
          {positive ? "+" : ""}{change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{title}</p>
  </motion.div>
);

export default AnalyticsCard;
