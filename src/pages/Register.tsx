import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, ArrowRight, AlertCircle } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reloadCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.mobile_number) {
      setError("All fields are required");
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError("Password must contain at least one number");
      return false;
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile_number.replace(/\D/g, ""))) {
      setError("Mobile number must be 10 digits");
      return false;
    }

    return true;
  };

// allow base URL to be configured via VITE_API_URL
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      // store user email for identification
      localStorage.setItem("user_email", data.email);

      // load cart after registration
      await reloadCart();

      toast({
        title: "✅ Account created",
        description: "Welcome to Mediloon!",
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <p className="text-sm text-red-600 ml-2">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="1234567890"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Min 8 chars, 1 uppercase, 1 number</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"} <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </FadeUp>
      </div>
    </div>
  );
};

export default Register;
