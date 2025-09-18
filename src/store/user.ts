import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

// 用戶狀態
interface UserStore {
  user: User | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  addToFavorites: (strategyId: string) => void;
  removeFromFavorites: (strategyId: string) => void;
  toggleFavorite: (strategyId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentUser: null,
      isAuthenticated: false,
      isLoggedIn: false,
      favorites: [],
      isLoading: false,
      error: null,
      
      setUser: (user: User | null) => {
        set({
          user,
          currentUser: user,
          isAuthenticated: !!user,
          isLoggedIn: !!user,
          favorites: user?.favorites || []
        });
      },
      
      login: (user: User) => {
        set({
          user,
          currentUser: user,
          isAuthenticated: true,
          isLoggedIn: true,
          favorites: user.favorites || [],
          error: null
        });
      },
      
      logout: () => {
        set({
          user: null,
          currentUser: null,
          isAuthenticated: false,
          isLoggedIn: false,
          favorites: [],
          error: null
        });
      },
      
      addToFavorites: (strategyId: string) => {
        const { user, favorites } = get();
        if (!user || favorites.includes(strategyId)) return;
        
        const newFavorites = [...favorites, strategyId];
        set({
          favorites: newFavorites,
          user: {
            ...user,
            favorites: newFavorites
          }
        });
      },
      
      removeFromFavorites: (strategyId: string) => {
        const { user, favorites } = get();
        if (!user) return;
        
        const newFavorites = favorites.filter(id => id !== strategyId);
        set({
          favorites: newFavorites,
          user: {
            ...user,
            favorites: newFavorites
          }
        });
      },

      toggleFavorite: (strategyId: string) => {
        const { favorites } = get();
        if (favorites.includes(strategyId)) {
          get().removeFromFavorites(strategyId);
        } else {
          get().addToFavorites(strategyId);
        }
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
      
      setError: (error: string | null) => {
        set({ error });
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        favorites: state.favorites
      })
    }
  )
);