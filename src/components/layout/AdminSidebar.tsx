import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/dashboard", icon: Package },
  { label: "Customers", href: "/admin/dashboard", icon: Users },
  { label: "Analytics", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Settings", href: "/admin/dashboard", icon: Settings },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-card"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-base font-bold text-foreground">Admin</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
