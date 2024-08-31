'use client';

import React, { Suspense } from 'react';
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import { useSocialAuth } from '@/hooks';
import { Spinner } from '@/components/common';

// A new component that uses the useSocialAuth hook
function SocialAuthHandler({ googleAuthenticate }: { googleAuthenticate: any }) {
  useSocialAuth(googleAuthenticate, 'google-oauth2');

  return (
    <div className='my-8'>
      <Spinner lg />
    </div>
  );
}

// The Page component wrapped in Suspense
export default function Page() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();

  return (
    <Suspense fallback={<Spinner lg />}>
      <SocialAuthHandler googleAuthenticate={googleAuthenticate} />
    </Suspense>
  );
}
