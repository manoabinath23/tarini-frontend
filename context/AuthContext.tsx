import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authAPI } from '../services/api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const userData = await SecureStore.getItemAsync('userData');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      const response = await authAPI.register(userData);
      await SecureStore.setItemAsync('userToken', response.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const login = async (nickname: string, password: string) => {
    try {
      const response = await authAPI.login(nickname, password);
      await SecureStore.setItemAsync('userToken', response.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userData');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      await SecureStore.setItemAsync('userData', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};