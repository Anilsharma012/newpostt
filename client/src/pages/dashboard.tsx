import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>My Ads</CardTitle></CardHeader>
          <CardContent>Manage your listings.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Subscriptions</CardTitle></CardHeader>
          <CardContent>View and manage your plans.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
          <CardContent>Payment history.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Favorites</CardTitle></CardHeader>
          <CardContent>Saved items.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
          <CardContent>Your reviews.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Chat</CardTitle></CardHeader>
          <CardContent>Conversations with buyers/sellers.</CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
