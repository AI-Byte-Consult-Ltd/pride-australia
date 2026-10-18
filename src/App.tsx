
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { JurisdictionProvider } from "@/contexts/JurisdictionContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const CommunityMapPage = lazy(() => import("./pages/CommunityMapPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const GuidelinesPage = lazy(() => import("./pages/GuidelinesPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const MissionPage = lazy(() => import("./pages/MissionPage"));
const GoalsPage = lazy(() => import("./pages/GoalsPage"));
const ValuesPage = lazy(() => import("./pages/ValuesPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const EarlySupportersPage = lazy(() => import("./pages/EarlySupportersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// NEW PAGES
const TransparencyCostsPage = lazy(() => import("./pages/TransparencyCostsPage"));
const GDPRPage = lazy(() => import("./pages/GDPRPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));

// NEW: Constitution page
const ConstitutionPage = lazy(() => import("./pages/ConstitutionPage"));

// ✅ NEW: News article page (/news/:id)
const NewsArticlePage = lazy(() => import("./pages/NewsArticle"));

// ✅ NEW: User profile page (/users/:username)
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

// ✅ NEW: Business profile page (/business/:id)
const BusinessProfilePage = lazy(() => import("./pages/BusinessProfilePage"));

// Arcade & Shop
const PrideArcadePage = lazy(() => import("./pages/PrideArcadePage"));

// Password recovery
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

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
                <Suspense fallback={<PageFallback />}>
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/mission" element={<MissionPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/values" element={<ValuesPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route
                    path="/early-supporters"
                    element={<EarlySupportersPage />}
                  />
                  <Route path="/community-map" element={<CommunityMapPage />} />

                  {/* News */}
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/news/:id" element={<NewsArticlePage />} />

                  {/* Events */}
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/arcade" element={<PrideArcadePage />} />

                  {/* Foundation */}
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  <Route
                    path="/transparency-and-costs"
                    element={<TransparencyCostsPage />}
                  />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Legal */}
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/guidelines" element={<GuidelinesPage />} />
                  <Route path="/gdpr" element={<GDPRPage />} />
                  <Route path="/constitution" element={<ConstitutionPage />} />

                  {/* App */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route
                    path="/dashboard/settings"
                    element={<SettingsPage />}
                  />
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* NEW: Profile route */}
                  <Route path="/users/:username" element={<UserProfilePage />} />

                  {/* NEW: Business profile route */}
                  <Route
                    path="/business/:id"
                    element={<BusinessProfilePage />}
                  />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </JurisdictionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
