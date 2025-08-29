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

import React from 'react';
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
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/ads" component={AdsManagement} />
      <Route path="/admin/users" component={UsersManagement} />
      <Route path="/admin/packages" component={React.lazy(() => import('@/pages/admin/packages'))} />
      <Route path="/admin/pages" component={React.lazy(() => import('@/pages/admin/pages'))} />
      <Route path="/admin/banners" component={React.lazy(() => import('@/pages/admin/banners'))} />
      <Route path="/admin/promotions" component={React.lazy(() => import('@/pages/admin/promotions'))} />
      {/* CMS Pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
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
