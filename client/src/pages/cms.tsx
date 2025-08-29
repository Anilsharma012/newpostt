import React from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CMSPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['/api/pages', slug] });
  const page = data as any;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        {isLoading ? <p>Loading...</p> : page ? (
          <article className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <p>Page not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
