import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/api';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on app start and validate against database
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('campbuzz_current_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);

          // Validate user still exists in database
          const storedUsers = localStorage.getItem('campbuzz_users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const userExists = users.find((u: any) => u.id === user.id);

            if (userExists) {
              setCurrentUser(user);
            } else {
              // User no longer exists in database, clear localStorage
              localStorage.removeItem('campbuzz_current_user');
              setCurrentUser(null);
            }
          } else {
            // No users in database, clear localStorage
            localStorage.removeItem('campbuzz_current_user');
            setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('campbuzz_current_user');
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('campbuzz_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campbuzz_current_user');
    }
  };

  const value: UserContextType = {
    currentUser,
    setCurrentUser: updateCurrentUser,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
