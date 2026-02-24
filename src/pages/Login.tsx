import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";

const Login = () => (
  <div className="min-h-screen flex">
    {/* Left - Branding */}
    <div className="hidden lg:flex flex-1 gradient-wave items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-foreground/20"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              top: `${10 + i * 15}%`,
              left: `${-5 + i * 12}%`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 text-center text-primary-foreground max-w-md">
        <div className="h-16 w-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold">M</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Mediloon</h1>
        <p className="text-primary-foreground/80 text-lg leading-relaxed">
          Your AI-powered pharmacy companion. Smart medicines, smarter health.
        </p>
      </div>
    </div>

    {/* Right - Form */}
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <FadeUp className="w-full max-w-sm">
        <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
          <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Mediloon</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">Sign in</h2>
        <p className="text-sm text-muted-foreground mb-8">Enter your credentials to continue</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              />
            </div>
          </div>

          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-11 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </FadeUp>
    </div>
  </div>
);

export default Login;
