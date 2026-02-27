import { Link } from "react-router-dom";
import { LayoutDashboard, Package, Users, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, ShoppingBag, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { label: "Dashboard", id: "dashboard", icon: LayoutDashboard },
  { label: "Products", id: "products", icon: Package },
  { label: "Orders", id: "orders", icon: ShoppingBag },
  { label: "Customers", id: "customers", icon: Users },
  { label: "Analytics", id: "analytics", icon: BarChart3 },
  { label: "Prescriptions", id: "prescriptions", icon: FileText },
  { label: "Settings", id: "settings", icon: Settings },
];

interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps = {}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-slate-200 bg-white"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 h-[72px]">
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-base font-bold text-slate-800">AdminPanel</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onTabChange && onTabChange(link.id)}
              className={`flex items-center w-full text-left gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 bg-white mt-auto">
        <Link
          to="/login"
          className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
