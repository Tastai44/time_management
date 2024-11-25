'use client';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '../interfaces/User';

type ProtectedRouteProps = {
  children: (user: IUser) => ReactNode; // Declare children as a function
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // State to hold user info

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
          localStorage.setItem("userId", data.user.userId);
          setUser(data.user); // Set the user data received from the API
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        router.push('/login');
      }
    };

    fetchProtectedData();
  }, [router]);

  return <>{user && children(user)}</>; // Call children as a function with user
};

export default ProtectedRoute;
