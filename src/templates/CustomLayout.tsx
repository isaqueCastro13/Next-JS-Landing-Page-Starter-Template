import { useEffect } from 'react';

import { useRouter } from 'next/router';

interface CustomLayoutProps {
  children: any;
}

const CustomLayout = ({ children }: CustomLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <>{children}</>;
};

export default CustomLayout;
