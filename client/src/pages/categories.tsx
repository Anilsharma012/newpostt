import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Link } from 'wouter';

export default function CategoriesPage() {
  const { data: categories = [] } = useQuery({ queryKey: ['/api/categories'] });
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Browse Categories</h1>
        <div className="grid grid-cols-3 gap-3">
          {(categories as any[]).map((c)=> (
            <Link key={c._id} to={`/listings?category=${c._id}`}>
              <div className="bg-white rounded-xl shadow border p-3 flex flex-col items-center justify-center aspect-square">
                <div className="text-2xl">{c.icon}</div>
                <div className="text-xs mt-1 text-center line-clamp-2">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
      <Footer />
    </div>
  );
}
