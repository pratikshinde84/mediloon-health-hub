import { motion } from 'framer-motion';

export function InsightsPanel() {
    const insights = [
        {
            icon: "⚠️",
            text: "Paracetamol demand up 40% — consider restocking",
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-800",
            borderColor: "border-yellow-200"
        },
        {
            icon: "🔴",
            text: "3 orders flagged for prescription verification",
            bgColor: "bg-red-50",
            textColor: "text-red-800",
            borderColor: "border-red-200"
        },
        {
            icon: "📦",
            text: "Low stock: Amoxicillin 250mg (12 units left)",
            bgColor: "bg-orange-50",
            textColor: "text-orange-800",
            borderColor: "border-orange-200"
        }
    ]

    return (
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span> Key Insights
            </h3>
            <div className="space-y-3">
                {insights.map((insight, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-3 p-3 ${insight.bgColor} border ${insight.borderColor} rounded-lg`}
                    >
                        <span className="text-lg">{insight.icon}</span>
                        <span className={`text-sm font-medium ${insight.textColor}`}>{insight.text}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
