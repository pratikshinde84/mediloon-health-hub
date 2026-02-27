import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";

import NotFound from "./pages/NotFound";

import {
  ChatbotProvider,
  useChatbotContext,
} from "./components/chatbot/ChatbotContext";
import { ChatbotIcon } from "./components/chatbot/ChatbotIcon";
import { ChatSplitScreen } from "./components/chatbot/ChatSplitScreen";

const queryClient = new QueryClient();

function MainContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useChatbotContext();

  return (
    <div className={`main-content-wrapper ${isOpen ? "split-active" : ""}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatbotProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />

            <MainContent>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainContent>

            {/* Global Chatbot Components */}
            <ChatbotIcon />
            <ChatSplitScreen />
          </BrowserRouter>
        </ChatbotProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;