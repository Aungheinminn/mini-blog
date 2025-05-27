import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/client';

const skipPaths = ['/signin', '/signup'];

/**
 * AuthGuard runs on the client to redirect unauthenticated users to the sign-in page.
 * Use with Astro client directive: <AuthGuard client:load />
 */
export default function AuthGuard() {
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (skipPaths.includes(currentPath)) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/signin';
      }
    });
    return () => unsubscribe();
  }, []);
  return null;
}