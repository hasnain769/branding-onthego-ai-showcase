'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl font-medium text-muted-foreground">Page Not Found</p>
        <p className="text-lg text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button asChild variant="hero">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
