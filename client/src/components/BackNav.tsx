import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function BackNav({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${className}`}>
      <Button variant="outline" size="sm" onClick={() => window.history.back()} data-testid="nav-back">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>
      <Button variant="outline" size="sm" onClick={() => window.history.forward()} data-testid="nav-forward">
        Forward <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
