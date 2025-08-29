import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Listings from "@/pages/listings";
import ListingDetail from "@/pages/listing-detail";
import PostAd from "@/pages/post-ad";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin/dashboard";
import AdsManagement from "@/pages/admin/ads-management";
import UsersManagement from "@/pages/admin/users-management";
import AdminLogin from "@/pages/admin/login";
import Subscription from "@/pages/subscription";
import Dashboard from "@/pages/dashboard";
import { AboutPage, ContactPage, FAQPage, BlogPage, PrivacyPage, TermsPage } from "@/pages/page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/listings" component={Listings} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/post-ad" component={PostAd} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/ads" component={AdsManagement} />
      <Route path="/admin/users" component={UsersManagement} />
      {/* Category routes */}
      <Route path="/category/:slug" component={Listings} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
