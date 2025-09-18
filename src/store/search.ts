import { create } from 'zustand';
import { Strategy, Game, SearchFilters, SortOption } from '@/types';

// 搜尋和過濾狀態
interface SearchStore {
  // 搜尋狀態
  query: string;
  filters: SearchFilters;
  searchHistory: string[];
  
  // 結果狀態
  strategies: Strategy[];
  games: Game[];
  isLoading: boolean;
  error: string | null;
  
  // 分頁狀態
  currentPage: number;
  hasNextPage: boolean;
  
  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
  setStrategies: (strategies: Strategy[]) => void;
  setGames: (games: Game[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  // Initial state
  query: '',
  filters: {
    sortBy: SortOption.LATEST
  },
  searchHistory: [],
  strategies: [],
  games: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasNextPage: true,
  
  // Actions
  setQuery: (query: string) => {
    set({ query });
  },
  
  setFilters: (newFilters: Partial<SearchFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1 // 重置頁碼
    }));
  },
  
  clearFilters: () => {
    set({
      filters: { sortBy: SortOption.LATEST },
      currentPage: 1
    });
  },
  
  addToHistory: (query: string) => {
    if (!query.trim()) return;
    
    set(state => {
      const newHistory = [query, ...state.searchHistory.filter(item => item !== query)];
      return {
        searchHistory: newHistory.slice(0, 10) // 只保留最近 10 筆
      };
    });
  },
  
  clearHistory: () => {
    set({ searchHistory: [] });
  },

  removeFromHistory: (query: string) => {
    set(state => ({
      searchHistory: state.searchHistory.filter(item => item !== query)
    }));
  },

  setStrategies: (strategies: Strategy[]) => {
    set({ strategies });
  },
  
  setGames: (games: Game[]) => {
    set({ games });
  },
  
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  
  setError: (error: string | null) => {
    set({ error });
  },
  
  setPage: (currentPage: number) => {
    set({ currentPage });
  },
  
  resetSearch: () => {
    set({
      query: '',
      filters: { sortBy: SortOption.LATEST },
      strategies: [],
      games: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      hasNextPage: true
    });
  }
}));