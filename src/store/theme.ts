import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, Language } from '@/types';

// 主題和語言狀態
interface ThemeStore {
  theme: Theme;
  language: Language;
  isInitialized: boolean;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark', // 預設暗黑模式
      language: 'zh-TW',
      isInitialized: false,
      
      get isDarkMode() {
        const theme = get().theme;
        if (theme === 'dark') return true;
        if (theme === 'light') return false;
        // system theme
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      },
      
      setTheme: (theme: Theme) => {
        set({ theme });
        
        // 更新 DOM
        const root = document.documentElement;
        
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // system theme
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      },
      
      setLanguage: (language: Language) => {
        set({ language });
        document.documentElement.lang = language;
      },
      
      initializeTheme: () => {
        if (get().isInitialized) return;
        
        const { theme } = get();
        const root = document.documentElement;
        
        // 應用主題
        if (theme === 'dark') {
          root.classList.add('dark');
        } else if (theme === 'light') {
          root.classList.remove('dark');
        } else {
          // system theme
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
          
          // 監聽系統主題變化
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (get().theme === 'system') {
              if (e.matches) {
                root.classList.add('dark');
              } else {
                root.classList.remove('dark');
              }
            }
          });
        }
        
        set({ isInitialized: true });
      }
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      })
    }
  )
);