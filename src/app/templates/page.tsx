import { Suspense } from 'react';
import TemplatesComponent from './TemplatesComponent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemplatesComponent />
    </Suspense>
  );
}