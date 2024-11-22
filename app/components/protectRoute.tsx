'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to login if no token
      router.push('/login');
      return;
    }

    // Fetch protected data from the API
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // If the response is not OK, redirect to login
          router.push('/login');
        } else {
          const data = await response.json();
          setUser(data.user); // Set the user data received from the API
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [router]);

  if (loading) {
    // You can display a loading spinner or message here while fetching
    return <div>Loading...</div>;
  }

  return <>{user && children}</>; // Render children only if user data is present
};

export default ProtectedRoute;
