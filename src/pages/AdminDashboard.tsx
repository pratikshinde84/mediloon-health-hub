import { ShoppingBag, Users, DollarSign, TrendingUp, Bot, Package, AlertCircle } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AnalyticsCard from "@/components/ui/AnalyticsCard";
import AIBadge from "@/components/ui/AIBadge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/PageTransition";

const recentOrders = [
  { id: "#MED-4821", customer: "Aarav Sharma", amount: "₹435", status: "Delivered", time: "10 min ago" },
  { id: "#MED-4820", customer: "Priya Patel", amount: "₹1,280", status: "Processing", time: "25 min ago" },
  { id: "#MED-4819", customer: "Rahul Singh", amount: "₹650", status: "Shipped", time: "1 hr ago" },
  { id: "#MED-4818", customer: "Neha Gupta", amount: "₹320", status: "Delivered", time: "2 hr ago" },
  { id: "#MED-4817", customer: "Vikram Das", amount: "₹890", status: "Processing", time: "3 hr ago" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-accent/15 text-accent",
  Shipped: "bg-primary/10 text-primary",
};

const AdminDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <AdminSidebar />
    <main className="flex-1 p-4 md:p-8 overflow-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
          </div>
          <AIBadge label="AI Insights Active" />
        </div>
      </FadeUp>

      {/* Analytics */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Orders", value: "2,847", change: "12.5%", positive: true, icon: ShoppingBag },
          { title: "Revenue", value: "₹4.2L", change: "8.2%", positive: true, icon: DollarSign },
          { title: "Customers", value: "1,234", change: "5.1%", positive: true, icon: Users },
          { title: "Growth", value: "23.4%", change: "2.3%", positive: true, icon: TrendingUp },
        ].map((card, i) => (
          <StaggerItem key={i}>
            <AnalyticsCard {...card} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <FadeUp delay={0.1} className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border shadow-card">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Order</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Customer</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="p-3 font-medium text-foreground">{order.id}</td>
                      <td className="p-3 text-foreground">{order.customer}</td>
                      <td className="p-3 font-semibold text-foreground">{order.amount}</td>
                      <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[order.status]}`}>{order.status}</span></td>
                      <td className="p-3 text-muted-foreground">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeUp>

        {/* AI Insights Panel */}
        <FadeUp delay={0.2}>
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {[
                  { text: "Paracetamol demand up 40% — consider restocking", icon: TrendingUp },
                  { text: "3 orders flagged for prescription verification", icon: AlertCircle },
                  { text: "Low stock: Amoxicillin 250mg (12 units left)", icon: Package },
                ].map(({ text, icon: Icon }, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-secondary/50">
                    <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  </div>
);

export default AdminDashboard;
