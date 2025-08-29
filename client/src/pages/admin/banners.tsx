import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function AdminBanners() {
  const { user } = useAuth();
  const { data: banners = [] } = useQuery({ queryKey: ['/api/admin/banners'], enabled: user?.role==='admin' });
  const [form, setForm] = useState({ title:'', imageUrl:'', linkUrl:'', position:'home_top' });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST','/api/admin/banners', form);
      return res.json();
    },
    onSuccess: ()=> { queryClient.invalidateQueries({ queryKey: ['/api/admin/banners'] }); setForm({ title:'', imageUrl:'', linkUrl:'', position:'home_top' }); }
  });

  if (!user || user.role !== 'admin') return <div className="min-h-screen bg-background flex items-center justify-center">Admin only</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <Card className="mb-6"><CardHeader><CardTitle>Banners & Sliders</CardTitle></CardHeader><CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(banners as any[]).map((b)=> (
                <div key={b._id} className="border rounded p-4">
                  <img src={b.imageUrl} alt={b.title} className="w-full h-24 object-cover rounded mb-2"/>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.position}</div>
                </div>
              ))}
            </div>
          </CardContent></Card>

          <Card>
            <CardHeader><CardTitle>Create Banner</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div><Label>Title</Label><Input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} /></div>
              <div><Label>Image URL</Label><Input value={form.imageUrl} onChange={(e)=>setForm({...form,imageUrl:e.target.value})} /></div>
              <div><Label>Link URL</Label><Input value={form.linkUrl} onChange={(e)=>setForm({...form,linkUrl:e.target.value})} /></div>
              <div><Label>Position</Label><Input value={form.position} onChange={(e)=>setForm({...form,position:e.target.value})} /></div>
              <div className="md:col-span-4"><Button onClick={()=>createMutation.mutate()}>Create</Button></div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
