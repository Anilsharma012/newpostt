import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function AdminPages() {
  const { user } = useAuth();
  const { data: pages = [] } = useQuery({ queryKey: ['/api/pages'], enabled: user?.role==='admin' });
  const [editing, setEditing] = useState<any | null>(null);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const method = editing._id ? 'PUT' : 'POST';
      const url = editing._id ? `/api/admin/pages/${editing._id}` : '/api/admin/pages';
      const res = await apiRequest(method, url, editing);
      return res.json();
    },
    onSuccess: ()=> { setEditing(null); queryClient.invalidateQueries({ queryKey: ['/api/pages'] }); }
  });

  if (!user || user.role !== 'admin') return <div className="min-h-screen bg-background flex items-center justify-center">Admin only</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <Card className="mb-6"><CardHeader><CardTitle>Pages</CardTitle></CardHeader><CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(pages as any[]).map((p)=> (
                <div key={p._id} className="border rounded p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">/{p.slug}</div>
                  <Button className="mt-3" size="sm" onClick={()=>setEditing(p)}>Edit</Button>
                </div>
              ))}
            </div>
          </CardContent></Card>

          <Card>
            <CardHeader><CardTitle>{editing? 'Edit Page':'Create Page'}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Title</Label>
                <Input value={editing?.title||''} onChange={(e)=>setEditing({ ...(editing||{}), title:e.target.value })} />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={editing?.slug||''} onChange={(e)=>setEditing({ ...(editing||{}), slug:e.target.value })} />
              </div>
              <div>
                <Label>Content (HTML)</Label>
                <Textarea value={editing?.content||''} onChange={(e)=>setEditing({ ...(editing||{}), content:e.target.value })} rows={10} />
              </div>
              <div>
                <Button onClick={()=>saveMutation.mutate()} disabled={!editing}>Save</Button>
                <Button variant="ghost" className="ml-2" onClick={()=>setEditing(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
