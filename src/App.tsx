// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Onboarding from "./pages/Onboarding";
// import Dashboard from "./pages/Dashboard";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import AdminLogin from "./pages/AdminLogin";
// import AdminRegister from "./pages/AdminRegister";
// import AdminDashboard from "./pages/AdminDashboard";
// import NotFound from "./pages/NotFound";
// import ProductDetail from "./pages/ProductDetail";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/onboarding" element={<Onboarding />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/register" element={<AdminRegister />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { ChatbotProvider, useChatbotContext } from "./components/chatbot/ChatbotContext";
import { ChatbotIcon } from "./components/chatbot/ChatbotIcon";
import { ChatSplitScreen } from "./components/chatbot/ChatSplitScreen";

const queryClient = new QueryClient();

function MainContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useChatbotContext();
  return (
    <div className={`main-content-wrapper ${isOpen ? 'split-active' : ''}`}>
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
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* ✅ product detail */}
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* ✅ admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* ✅ fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainContent>

            {/* ✅ AI Pharmacy Chatbot - Global Component */}
            <ChatbotIcon />
            <ChatSplitScreen />
          </BrowserRouter>
        </ChatbotProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;