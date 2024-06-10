import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Loader from "@/components/common/Loader";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const currentPath = router.pathname;

    useEffect(() => {
      if (currentPath !== '/auth/signin' && !loading && !user) {
        router.push('/auth/signin');
      }
    }, [currentPath, loading, user, router]);


    if (loading) {
      return <Loader/>;
    }

    if (currentPath !== '/auth/signin' && !user) {
      return null; // Render nothing if no user
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
