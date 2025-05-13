import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../appwrite/appwrite';


interface User{
     $id: string;
     name: string;
     email: string;
    //  avatar: string;
    
}


type GlobalContextType = {
  loggedIn: boolean,
  setLoggedIn: () => void
  user: User|null,
  setUser: () => void
  loading: boolean,
  setloading: () => void
}




// why start with capital letter ? cause we are writing jsx using it
const AuthContext = createContext<GlobalContextType|undefined>(undefined);

const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setLoggedIn(true);
        setUser(response);
      })
      .catch(() => {
        setLoggedIn(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useGlobalContext must be used within a GlobalProvider');

  return context;
};

export default AuthProvider

































