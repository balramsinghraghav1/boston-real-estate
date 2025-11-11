import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// This is the custom hook that components will use to access the auth state.
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth() must be used inside an AuthProvider');
  }

  return context;
};
