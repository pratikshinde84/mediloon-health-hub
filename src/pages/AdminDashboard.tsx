import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminSidebar from "@/components/layout/AdminSidebar";
import { StatsCards } from "./components/StatsCards"
import { InsightsPanel } from "./components/InsightsPanel"
import { ProductsTable } from "./components/ProductsTable"
import { OrdersTable } from "./components/OrdersTable"
import { CustomersTable } from "./components/CustomersTable"
import { AnalyticsCharts } from "./components/AnalyticsCharts"
import { PrescriptionRequests } from "./components/PrescriptionRequests"
import { StoreSettings } from "./components/StoreSettings"
import AIBadge from "@/components/ui/AIBadge";
import { FadeUp } from "@/components/animations/PageTransition";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-500 font-medium mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <AIBadge label="AI Insights Active" />
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="space-y-6">
          <FadeUp delay={0.3}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-white border border-slate-200 text-slate-600 p-1.5 rounded-xl h-auto flex flex-wrap justify-start gap-1 shadow-sm">
                <TabsTrigger value="dashboard" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Dashboard</TabsTrigger>
                <TabsTrigger value="products" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Products</TabsTrigger>
                <TabsTrigger value="orders" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Orders</TabsTrigger>
                <TabsTrigger value="customers" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Customers</TabsTrigger>
                <TabsTrigger value="analytics" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Analytics</TabsTrigger>
                <TabsTrigger value="prescriptions" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Prescriptions</TabsTrigger>
                <TabsTrigger value="settings" className="rounded-lg px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:shadow-none transition-all">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="m-0 space-y-6 animate-in fade-in-50 duration-500">
                <StatsCards />
                <InsightsPanel />
              </TabsContent>

              <TabsContent value="products" className="m-0 animate-in fade-in-50 duration-500">
                <ProductsTable />
              </TabsContent>

              <TabsContent value="orders" className="m-0 animate-in fade-in-50 duration-500">
                <OrdersTable />
              </TabsContent>

              <TabsContent value="customers" className="m-0 animate-in fade-in-50 duration-500">
                <CustomersTable />
              </TabsContent>

              <TabsContent value="analytics" className="m-0 animate-in fade-in-50 duration-500">
                <AnalyticsCharts />
              </TabsContent>

              <TabsContent value="prescriptions" className="m-0 animate-in fade-in-50 duration-500">
                <PrescriptionRequests />
              </TabsContent>

              <TabsContent value="settings" className="m-0 animate-in fade-in-50 duration-500">
                <StoreSettings />
              </TabsContent>
            </Tabs>
          </FadeUp>
        </div>
      </main>
    </div>
  )
}
