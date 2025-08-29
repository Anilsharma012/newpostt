import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Subscription() {
  const { data: packages = [] } = useQuery({ queryKey: ['/api/packages'] });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Subscription Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(packages as any[]).map((p) => (
            <Card key={p._id}>
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">${p.basePrice}</div>
                <ul className="text-sm text-muted-foreground mb-4">
                  <li>Featured: {p.features.featured ? 'Yes' : 'No'}</li>
                  <li>Urgent: {p.features.urgent ? 'Yes' : 'No'}</li>
                  <li>Boost Days: {p.features.boostDays}</li>
                  <li>Max Listings: {p.features.maxListings}</li>
                </ul>
                <Button>Select</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
