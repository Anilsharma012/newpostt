import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { BackNav } from '@/components/BackNav';

export default function AdminPromotions() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  if (!user || user.role !== 'admin') return <div className="min-h-screen bg-background flex items-center justify-center">Admin only</div>;
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <BackNav />
          <Card className="mb-6"><CardHeader><CardTitle>Promotions</CardTitle></CardHeader><CardContent>
            <p className="text-muted-foreground mb-4">Manage featured, urgent, bump-up, and notifications.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={()=>setLocation('/admin/ads')}>Manage Featured & Urgent</Button>
            </div>
          </CardContent></Card>
        </main>
      </div>
    </div>
  );
}
