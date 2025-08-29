import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function AdminPackages() {
  const { user } = useAuth();
  const { data: packages = [] } = useQuery({ queryKey: ['/api/packages'], enabled: user?.role==='admin' });
  const [form, setForm] = useState({ name: '', basePrice: 0, featured: false, urgent: false, boostDays: 0, maxListings: 1 });

  const createMutation = useMutation({
    mutationFn: async () => {
      const body = { name: form.name, basePrice: Number(form.basePrice), features: { featured: form.featured, urgent: form.urgent, boostDays: Number(form.boostDays), maxListings: Number(form.maxListings) } };
      const res = await apiRequest('POST','/api/admin/packages', body);
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['/api/packages'] }); setForm({ name:'', basePrice:0, featured:false, urgent:false, boostDays:0, maxListings:1 }); }
  });

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen bg-background flex items-center justify-center">Admin only</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <Card className="mb-6"><CardHeader><CardTitle>Packages</CardTitle></CardHeader><CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(packages as any[]).map((p)=> (
                <div key={p._id} className="border rounded p-4">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">Price: ${p.basePrice}</div>
                  <div className="text-xs">Feat: {String(p.features.featured)} | Urg: {String(p.features.urgent)} | Boost: {p.features.boostDays} | Max: {p.features.maxListings}</div>
                </div>
              ))}
            </div>
          </CardContent></Card>

          <Card>
            <CardHeader><CardTitle>Create Package</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-2"><Label>Name</Label><Input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></div>
              <div><Label>Base Price</Label><Input type="number" value={form.basePrice} onChange={(e)=>setForm({...form,basePrice:Number(e.target.value)})} /></div>
              <div><Label>Boost Days</Label><Input type="number" value={form.boostDays} onChange={(e)=>setForm({...form,boostDays:Number(e.target.value)})} /></div>
              <div><Label>Max Listings</Label><Input type="number" value={form.maxListings} onChange={(e)=>setForm({...form,maxListings:Number(e.target.value)})} /></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><Checkbox checked={form.featured} onCheckedChange={(v)=>setForm({...form,featured:!!v})} /> Featured</label>
                <label className="flex items-center gap-2"><Checkbox checked={form.urgent} onCheckedChange={(v)=>setForm({...form,urgent:!!v})} /> Urgent</label>
              </div>
              <div className="md:col-span-6"><Button onClick={()=>createMutation.mutate()}>Create</Button></div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
