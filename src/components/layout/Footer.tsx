import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/dashboard" className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <span className="text-lg font-bold text-foreground">Mediloon</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered autonomous pharmacy delivering trusted medicines with smart health insights.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/cart" className="hover:text-primary transition-colors">Cart</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-primary transition-colors cursor-pointer">Help Center</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">FAQs</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Mediloon. All rights reserved. Powered by AI.
      </div>
    </div>
  </footer>
);

export default Footer;
