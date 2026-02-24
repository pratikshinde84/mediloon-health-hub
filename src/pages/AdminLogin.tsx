import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Shield, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";

const AdminLogin = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-6">
    <FadeUp className="w-full max-w-sm">
      <div className="flex items-center gap-2 mb-8 justify-center">
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">Admin Portal</span>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card p-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Admin Sign In</h2>
        <p className="text-sm text-muted-foreground mb-6">Access the Mediloon admin dashboard</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" placeholder="admin@mediloon.com" className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" placeholder="••••••••" className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow" />
            </div>
          </div>
          <Link to="/admin/dashboard">
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full h-11 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2">
              Sign In <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-5">
          Need an account? <Link to="/admin/register" className="text-primary font-medium hover:underline">Register</Link>
        </p>
      </div>
    </FadeUp>
  </div>
);

export default AdminLogin;
