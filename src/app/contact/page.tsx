import { Suspense } from 'react';
import ContactComponent from './ContactComponent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactComponent />
    </Suspense>
  );
}