import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function ChatPage() {
  const { user } = useAuth();
  const { data: threads = [] } = useQuery({ queryKey: ['/api/chats'], enabled: !!user });
  const [activeId, setActiveId] = useState<string>('');
  const { data: messages = [] } = useQuery({ queryKey: ['/api/chats', activeId, 'messages'], enabled: !!user && !!activeId });
  const [text, setText] = useState('');

  const sendMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', `/api/chats/${activeId}/messages`, { message: text });
      return res.json();
    },
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['/api/chats', activeId, 'messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/chats'] });
    }
  });

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please log in to view chats.</div>;

  const active = useMemo(()=> (threads as any[]).find(t=>t._id===activeId) || (threads as any[])[0], [threads, activeId]);

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Conversations</CardTitle></CardHeader>
          <CardContent className="space-y-2 max-h-[70vh] overflow-auto">
            {(threads as any[]).map((t)=> (
              <div key={t._id} className={`p-3 rounded border cursor-pointer ${active?._id===t._id?'bg-accent':''}`} onClick={()=>setActiveId(t._id)}>
                <div className="text-sm text-muted-foreground">Listing: {String(t.listingId).slice(-6)}</div>
                <div className="text-xs">Updated: {new Date(t.lastMessageAt).toLocaleString()}</div>
              </div>
            ))}
            {(threads as any[]).length===0 && <div className="text-sm text-muted-foreground">No conversations yet.</div>}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Messages</CardTitle></CardHeader>
          <CardContent className="flex flex-col h-[70vh]">
            <div className="flex-1 overflow-auto space-y-2">
              {(messages as any[]).map((m)=> (
                <div key={m._id} className={`max-w-[75%] p-2 rounded ${m.senderId===user?.id||m.senderId===user?._id?'bg-primary text-white ml-auto':'bg-muted mr-auto'}`}>{m.message}</div>
              ))}
              {(messages as any[]).length===0 && <div className="text-sm text-muted-foreground">Select a conversation to start chatting.</div>}
            </div>
            <div className="mt-3 flex gap-2">
              <Input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type a message" />
              <Button onClick={()=>sendMutation.mutate()} disabled={!active?._id || !text.trim()}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
