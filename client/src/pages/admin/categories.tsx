import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function AdminCategories() {
  const { user } = useAuth();
  const { data: categories = [] } = useQuery({ queryKey: ['/api/categories'], enabled: user?.role==='admin' });
  const [catForm, setCatForm] = useState({ name: '', icon: '', description: '' });
  const [selectedCat, setSelectedCat] = useState<string>('');
  const { data: subcategories = [] } = useQuery({ queryKey: ['/api/subcategories', { categoryId: selectedCat }], enabled: !!selectedCat && user?.role==='admin' });
  const [subForm, setSubForm] = useState({ categoryId: '', name: '' });

  const createCategory = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST','/api/admin/categories', catForm);
      return res.json();
    },
    onSuccess: ()=>{ setCatForm({ name:'', icon:'', description:'' }); queryClient.invalidateQueries({ queryKey: ['/api/categories'] }); }
  });

  const createSubcategory = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST','/api/admin/subcategories', subForm);
      return res.json();
    },
    onSuccess: ()=>{ setSubForm({ categoryId:'', name:'' }); queryClient.invalidateQueries({ queryKey: ['/api/subcategories', { categoryId: selectedCat }] }); }
  });

  const selectedCatObj = useMemo(()=> (categories as any[]).find(c=>c._id===selectedCat), [categories, selectedCat]);

  if (!user || user.role !== 'admin') return <div className="min-h-screen bg-background flex items-center justify-center">Admin only</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <Card className="mb-6"><CardHeader><CardTitle>Categories</CardTitle></CardHeader><CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(categories as any[]).map((c)=> (
                <div key={c._id} className="border rounded p-4">
                  <div className="font-semibold flex items-center gap-2"><span className="text-xl">{c.icon}</span> {c.name}</div>
                  <div className="text-xs text-muted-foreground">/{c.slug}</div>
                  {c.description && <div className="text-sm mt-2 text-muted-foreground line-clamp-3">{c.description}</div>}
                </div>
              ))}
            </div>
          </CardContent></Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Create Category</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div><Label>Name</Label><Input value={catForm.name} onChange={(e)=>setCatForm({...catForm,name:e.target.value})} /></div>
                <div><Label>Icon (emoji or text)</Label><Input value={catForm.icon} onChange={(e)=>setCatForm({...catForm,icon:e.target.value})} placeholder="📱" /></div>
                <div><Label>Description</Label><Textarea value={catForm.description} onChange={(e)=>setCatForm({...catForm,description:e.target.value})} rows={4} /></div>
                <div><Button onClick={()=>createCategory.mutate()} disabled={!catForm.name || !catForm.icon}>Create</Button></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Create Subcategory</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Category</Label>
                  <Select value={subForm.categoryId} onValueChange={(v)=>{ setSubForm({...subForm, categoryId:v}); setSelectedCat(v); }}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {(categories as any[]).map((c)=> <SelectItem value={c._id} key={c._id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Subcategory Name</Label><Input value={subForm.name} onChange={(e)=>setSubForm({...subForm,name:e.target.value})} /></div>
                <div><Button onClick={()=>createSubcategory.mutate()} disabled={!subForm.categoryId || !subForm.name}>Create</Button></div>

                {selectedCatObj && (
                  <div className="pt-4">
                    <div className="font-semibold mb-2">Subcategories of {selectedCatObj.name}</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(subcategories as any[]).map((s)=> (
                        <div key={s._id} className="text-sm border rounded px-2 py-1">{s.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
