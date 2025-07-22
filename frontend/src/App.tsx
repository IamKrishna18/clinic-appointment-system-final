import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/AuthModal"; // adjust path if needed

const queryClient = new QueryClient();

const App = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Listen for "open-login-modal" event
  useEffect(() => {
    const openLoginModal = () => {
      setAuthMode("login");
      setAuthModalOpen(true);
    };

    window.addEventListener("open-login-modal", openLoginModal);
    return () => window.removeEventListener("open-login-modal", openLoginModal);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode={authMode}
          onModeChange={(mode) => setAuthMode(mode)} onLoginSuccess={function (user: any): void {
            throw new Error("Function not implemented.");
          } }        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
