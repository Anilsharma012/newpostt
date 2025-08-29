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
import CategoriesPage from "@/pages/categories";
import CMSPage from "@/pages/cms";
import ChatPage from "@/pages/chat";
import PostAd from "@/pages/post-ad";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin/dashboard";
import AdsManagement from "@/pages/admin/ads-management";
import UsersManagement from "@/pages/admin/users-management";
import AdminLogin from "@/pages/admin/login";
import AdminPackages from "@/pages/admin/packages";
import AdminPages from "@/pages/admin/pages";
import AdminBanners from "@/pages/admin/banners";
import AdminPromotions from "@/pages/admin/promotions";
import AdminCategories from "@/pages/admin/categories";
import Subscription from "@/pages/subscription";
import NotificationsPage from "@/pages/notifications";
import Dashboard from "@/pages/dashboard";
import { AboutPage, ContactPage, FAQPage, BlogPage, PrivacyPage, TermsPage } from "@/pages/page";

import React, { Suspense } from 'react';
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/listings" component={Listings} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/pages/:slug" component={CMSPage} />
      <Route path="/post-ad" component={PostAd} />
      <Route path="/create" component={PostAd} />
      <Route path="/profile" component={Profile} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/ads" component={AdsManagement} />
      <Route path="/admin/users" component={UsersManagement} />
      <Route path="/admin/packages" component={AdminPackages} />
      <Route path="/admin/pages" component={AdminPages} />
      <Route path="/admin/banners" component={AdminBanners} />
      <Route path="/admin/promotions" component={AdminPromotions} />
      <Route path="/admin/categories" component={AdminCategories} />
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
          <Suspense fallback={<div className="p-8">Loading...</div>}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
