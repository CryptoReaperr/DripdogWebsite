import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import DripDogLogo from '@/assets/DripDogLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-drip-dark p-4 text-center">
      <div className="max-w-md mx-auto">
        <DripDogLogo width={120} height={120} className="mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Page Not Found</h2>
        
        <p className="text-slate-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}