import { useState, useEffect, createContext, useContext } from 'react';
import { UserProfile, UserRole, mockUserProfiles } from '../utils/mockData';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, otp?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock authentication hook for demo purposes
export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sadaksathi-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('sadaksathi-user');
      }
    }
  }, []);

  const login = async (email: string, otp?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const foundUser = mockUserProfiles.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('sadaksathi-user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    // If no existing user found, create a guest user
    const guestUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'user',
      preferences: {
        language: 'ne',
        darkMode: false,
        notifications: true,
        voiceEnabled: true,
        aiAssistantRole: 'friend',
        aiAssistantGender: 'female'
      },
      emergencyContacts: []
    };
    
    setUser(guestUser);
    localStorage.setItem('sadaksathi-user', JSON.stringify(guestUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sadaksathi-user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('sadaksathi-user', JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = user !== null;

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    // Role hierarchy: superadmin > admin > user > guest
    const roleHierarchy: Record<UserRole, number> = {
      guest: 0,
      user: 1,
      admin: 2,
      superadmin: 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  return {
    user,
    isLoading,
    login,
    logout,
    updateProfile,
    isAuthenticated,
    hasRole
  };
}

export { AuthContext };
