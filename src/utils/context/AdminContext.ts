/* eslint-disable no-unused-vars */
import { createContext } from 'react';

interface IAdminContextProps {
  user: { fullName: string; email: string };
  isAdminAuth: boolean;
  isUpdatingAdminAuth: boolean;
  adminSignIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string; data?: any }>;
  getRefreshToken: () => void;
  signOut: () => Promise<{ success: boolean; error?: string }>;
}

const AdminContext = createContext<IAdminContextProps>({
  user: { fullName: null, email: null },
  isAdminAuth: false,
  isUpdatingAdminAuth: false,
  adminSignIn: async (email, password) => ({
    success: false,
  }),
  getRefreshToken: async () => {},
  signOut: async () => ({
    success: false,
  }),
});

export default AdminContext;
