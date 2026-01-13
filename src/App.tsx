import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { JurisdictionProvider } from "@/contexts/JurisdictionContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import MarketplacePage from "./pages/MarketplacePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import CookiesPage from "./pages/CookiesPage";
import GuidelinesPage from "./pages/GuidelinesPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MissionPage from "./pages/MissionPage";
import GoalsPage from "./pages/GoalsPage";
import ValuesPage from "./pages/ValuesPage";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import SettingsPage from "./pages/SettingsPage";
import EarlySupportersPage from "./pages/EarlySupportersPage";
import NotFound from "./pages/NotFound";

// NEW PAGE
import TransparencyCostsPage from "./pages/TransparencyCostsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000, // 60s
    },
  },
});

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <JurisdictionProvider>
            <TooltipProvider>
              {/* Global UI */}
              <Toaster />
              <Sonner />

              <BrowserRouter>
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/mission" element={<MissionPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/values" element={<ValuesPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/early-supporters" element={<EarlySupportersPage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/events" element={<EventsPage />} />

                  {/* Legal */}
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/guidelines" element={<GuidelinesPage />} />
                  <Route
                    path="/transparency-and-costs"
                    element={<TransparencyCostsPage />}
                  />

                  {/* App */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/settings" element={<SettingsPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </JurisdictionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
