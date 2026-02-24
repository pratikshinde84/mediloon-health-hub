import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantityStepper = ({ value, onChange, min = 1, max = 99 }: QuantityStepperProps) => (
  <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
    <button
      onClick={() => value > min && onChange(value - 1)}
      className="p-2 hover:bg-secondary transition-colors disabled:opacity-40"
      disabled={value <= min}
    >
      <Minus className="h-3.5 w-3.5 text-foreground" />
    </button>
    <motion.span
      key={value}
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      className="w-10 text-center text-sm font-semibold text-foreground"
    >
      {value}
    </motion.span>
    <button
      onClick={() => value < max && onChange(value + 1)}
      className="p-2 hover:bg-secondary transition-colors disabled:opacity-40"
      disabled={value >= max}
    >
      <Plus className="h-3.5 w-3.5 text-foreground" />
    </button>
  </div>
);

export default QuantityStepper;
