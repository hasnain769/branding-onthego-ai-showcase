import { Suspense } from 'react';
import ServicesComponent from './ServicesComponent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesComponent />
    </Suspense>
  );
}
