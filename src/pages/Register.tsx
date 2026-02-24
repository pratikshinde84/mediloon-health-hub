import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";

const Register = () => (
  <div className="min-h-screen flex">
    {/* Left branding */}
    <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-primary-foreground/20" style={{ width: `${120 + i * 90}px`, height: `${120 + i * 90}px`, bottom: `${5 + i * 14}%`, right: `${-5 + i * 10}%` }} />
        ))}
      </div>
      <div className="relative z-10 text-center text-primary-foreground max-w-md">
        <h1 className="text-4xl font-bold mb-4">Join Mediloon</h1>
        <p className="text-primary-foreground/80 text-lg">AI-powered health solutions at your fingertips. Get personalized medicine recommendations.</p>
      </div>
    </div>

    {/* Right form */}
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <FadeUp className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-foreground mb-1">Create account</h2>
        <p className="text-sm text-muted-foreground mb-8">Start your health journey today</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="John Doe" className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" placeholder="you@email.com" className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" placeholder="••••••••" className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow" />
            </div>
          </div>

          <Link to="/onboarding">
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full h-11 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2">
              Create Account <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </FadeUp>
    </div>
  </div>
);

export default Register;
