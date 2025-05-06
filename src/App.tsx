
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Library from "./pages/Library";
import Upload from "./pages/Upload";
import Discussion from "./pages/Discussion";
import NotFound from "./pages/NotFound";
import DiscussionDetail from "./pages/DiscussionDetail";
import MobileAuth from "./pages/MobileAuth";
import CategoryDetail from "./pages/CategoryDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:categoryId" element={<CategoryDetail />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/discussion/:id" element={<DiscussionDetail />} />
          <Route path="/auth/mobile" element={<MobileAuth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
