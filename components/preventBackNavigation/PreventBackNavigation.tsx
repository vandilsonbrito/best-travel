'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PreventBackNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      router.push('/');
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return null;
};

export default PreventBackNavigation;
