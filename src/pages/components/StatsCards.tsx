import { motion } from 'framer-motion';

const stats = [
    {
        title: "Products",
        value: "1,234",
        change: "+12.5%",
        icon: "📦",
        color: "bg-blue-500"
    },
    {
        title: "Customers",
        value: "2,847",
        subtitle: "Total Orders",
        icon: "👥",
        color: "bg-green-500"
    },
    {
        title: "Revenue",
        value: "$4.2L",
        icon: "💰",
        color: "bg-purple-500"
    },
    {
        title: "Growth",
        value: "+5.1%",
        icon: "📈",
        color: "bg-orange-500"
    }
]

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl shadow-sm p-6 border border-slate-100"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                            <p className="text-2xl font-bold mt-2 text-slate-800">{stat.value}</p>
                            {stat.change && (
                                <p className="text-green-600 text-sm mt-1 font-medium">{stat.change}</p>
                            )}
                            {stat.subtitle && (
                                <p className="text-slate-400 text-xs mt-1">{stat.subtitle}</p>
                            )}
                        </div>
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-sm`}>
                            {stat.icon}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
