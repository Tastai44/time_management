'use client';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '../interfaces/User';
import { IProject } from '../interfaces/Project';
import { getProjectByUserId } from '../api/project';
import Skeleton from './Skeleton';

type ProtectedRouteProps = {
  children: (user: IUser, projects: IProject[]) => ReactNode; // Declare children as a function
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // State to hold user info
  const [projects, setProjects] = useState<IProject[] | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchProjects = async () => {
      if (userId) {
        const data = await getProjectByUserId(userId);
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

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
          const fetchProjects = async () => {
            const projectData = await getProjectByUserId(data.user.userId);
            setProjects(projectData);
          };
          fetchProjects();
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
        router.push('/login');
      }
    };

    fetchProtectedData();
  }, [router]);

  if (!user || !projects) {
    return (
      <Skeleton />
    );
  }

  return <>{(user && projects) && children(user, projects)}</>; // Call children as a function with user
};

export default ProtectedRoute;
