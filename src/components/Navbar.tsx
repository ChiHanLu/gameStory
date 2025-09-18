'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/store/theme';
import { useUserStore } from '@/store/user';
import { useSearchStore } from '@/store/search';
import { debounce } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { theme, language, setTheme, setLanguage } = useThemeStore();
  const { isAuthenticated, user } = useUserStore();
  const { query, setQuery, searchHistory, addToHistory } = useSearchStore();

  // 搜尋防抖處理
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
      // 這裡可以觸發搜尋 API 或導航到搜尋頁面
      console.log('搜尋:', searchQuery);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query);
      // 導航到搜尋結果頁面
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  // 點擊外部關閉下拉菜單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-menu')) {
        setIsThemeMenuOpen(false);
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: language === 'zh-TW' ? '首頁' : 'Home' },
    { href: '/strategies', label: language === 'zh-TW' ? '攻略' : 'Strategies' },
    { href: '/games', label: language === 'zh-TW' ? '遊戲' : 'Games' },
    { href: '/community', label: language === 'zh-TW' ? '社群' : 'Community' },
  ];

  const themeOptions = [
    { value: 'light', icon: SunIcon, label: language === 'zh-TW' ? '明亮' : 'Light' },
    { value: 'dark', icon: MoonIcon, label: language === 'zh-TW' ? '暗黑' : 'Dark' },
    { value: 'system', icon: ComputerDesktopIcon, label: language === 'zh-TW' ? '系統' : 'System' },
  ];

  const languageOptions = [
    { value: 'zh-TW', label: '繁體中文' },
    { value: 'en-US', label: 'English' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-700">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GG</span>
            </div>
            <span className="font-bold text-xl text-gradient hidden sm:block">
              GameGuide Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder={language === 'zh-TW' ? '搜尋攻略、遊戲...' : 'Search strategies, games...'}
                  className="input-field pl-10 pr-4"
                />
              </div>
              
              {/* Search History Dropdown */}
              {query === '' && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mb-2">
                      {language === 'zh-TW' ? '最近搜尋' : 'Recent searches'}
                    </p>
                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(item)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Theme Switcher */}
            <div className="relative dropdown-menu">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 text-gray-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                aria-label="Theme"
              >
                {theme === 'light' && <SunIcon className="w-5 h-5" />}
                {theme === 'dark' && <MoonIcon className="w-5 h-5" />}
                {theme === 'system' && <ComputerDesktopIcon className="w-5 h-5" />}
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg py-1">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value as 'light' | 'dark' | 'system');
                        setIsThemeMenuOpen(false);
                      }}
                      className={cn(
                        'flex items-center space-x-2 w-full px-3 py-2 text-sm transition-colors',
                        theme === option.value
                          ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                      )}
                    >
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative dropdown-menu">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 text-gray-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                aria-label="Language"
              >
                <LanguageIcon className="w-5 h-5" />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg py-1">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setLanguage(option.value as 'zh-TW' | 'en-US');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={cn(
                        'block w-full px-3 py-2 text-sm text-left transition-colors',
                        language === option.value
                          ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {isAuthenticated && user ? (
              <Link
                href="/profile"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-neutral-300">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1 btn-primary text-sm px-4 py-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>{language === 'zh-TW' ? '登入' : 'Login'}</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-neutral-700">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder={language === 'zh-TW' ? '搜尋攻略、遊戲...' : 'Search strategies, games...'}
                  className="input-field pl-10 pr-4"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-neutral-700">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 dark:text-neutral-300 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}