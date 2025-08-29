import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function NotificationsPage() {
  const { user } = useAuth();
  const { data: items = [] } = useQuery({ queryKey: ['/api/notifications'], enabled: !!user });

  const markMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('POST', `/api/notifications/${id}/read`);
      return res.json();
    },
    onSuccess: ()=> queryClient.invalidateQueries({ queryKey: ['/api/notifications'] })
  });

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please log in to view notifications.</div>;

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(items as any[]).map(n => (
            <div key={n._id} className={`p-3 rounded border flex items-center justify-between ${n.isRead? 'opacity-70':''}`}>
              <div>
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
              </div>
              {!n.isRead && <Button size="sm" variant="outline" onClick={()=>markMutation.mutate(n._id)}>Mark read</Button>}
            </div>
          ))}
          {(items as any[]).length===0 && <div className="text-sm text-muted-foreground">No notifications.</div>}
        </CardContent>
      </Card>
    </div>
  );
}
