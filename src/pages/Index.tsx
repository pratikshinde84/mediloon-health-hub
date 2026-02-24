import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Sparkles, Bot } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";

const Index = () => (
  <div className="min-h-screen bg-background flex flex-col">
    {/* Nav */}
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-foreground">Medi<span className="gradient-text">loon</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
          <Link to="/register">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-5 py-2 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </header>

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="gradient-wave py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary-foreground/15" style={{ width: `${80 + i * 50}px`, height: `${80 + i * 50}px`, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
          ))}
        </div>
        <div className="container relative z-10 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs font-semibold mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Autonomous Pharmacy
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto">
              Healthcare, <br />Reimagined with AI
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Smart medicine recommendations, instant delivery, and personalized health insights — all powered by artificial intelligence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-8 py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold text-base hover:bg-primary-foreground/90 transition-colors flex items-center gap-2">
                  Start Now <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link to="/admin/login">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-8 py-3.5 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-colors">
                  Admin Portal
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Why Mediloon?</h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">Next-generation pharmacy experience powered by cutting-edge AI technology</p>
      </FadeUp>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Bot, title: "AI Recommendations", desc: "Personalized medicine suggestions based on your health profile and history." },
          { icon: Clock, title: "30-Min Delivery", desc: "Express delivery to your doorstep with real-time tracking and updates." },
          { icon: Shield, title: "100% Authentic", desc: "Every medicine verified and sourced directly from licensed manufacturers." },
        ].map(({ icon: Icon, title, desc }, i) => (
          <FadeUp key={title} delay={i * 0.1}>
            <motion.div whileHover={{ y: -4 }} className="bg-card rounded-2xl border border-border shadow-card p-6 text-center hover:shadow-card-hover transition-shadow">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="container pb-20">
      <div className="gradient-hero rounded-2xl p-10 md:p-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Ready to Experience Smart Healthcare?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Join thousands of users already benefiting from AI-powered pharmacy services.</p>
        <Link to="/register">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-8 py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
            Get Started Free
          </motion.button>
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border bg-card py-8">
      <div className="container text-center text-xs text-muted-foreground">
        © 2026 Mediloon. All rights reserved. AI-Powered Autonomous Pharmacy.
      </div>
    </footer>
  </div>
);

export default Index;
