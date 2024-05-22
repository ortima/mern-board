import React, { PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';

export interface UserData {
  token: string;
  userId: string;
  email?: string;
}

export interface AuthContextType {
  userData: UserData | null;
  login: (token: string, userId: string, email?: string
  ) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext)!
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData: UserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
    setLoading(false);
  }, []);

  const login = (token: string, userId: string, email?: string) => {
    const userData: UserData = { token, userId, email };
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
