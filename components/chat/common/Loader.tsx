// components/chat/Loader.tsx

import React from 'react';
import { Spinner } from '@/components/common';

export default function Loader() {
  return (
    <div className="flex justify-center items-center p-4">
      <Spinner />
    </div>
  );
}
