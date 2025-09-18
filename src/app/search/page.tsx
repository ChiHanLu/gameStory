'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, FunnelIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useSearchStore } from '@/store/search';
import { useThemeStore } from '@/store/theme';
import { mockStrategies, mockGames } from '@/data/mock';
import { Strategy, Game } from '@/types';
import StrategyCard from '@/components/StrategyCard';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDarkMode } = useThemeStore();
  const { 
    searchHistory, 
    addToHistory, 
    removeFromHistory, 
    clearHistory
  } = useSearchStore();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    game: '',
    difficulty: '',
    category: '',
    sortBy: 'relevance'
  });

  // 搜尋邏輯
  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    // 模擬搜尋延遲
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // 簡單的模糊搜尋實現
    const filteredResults = mockStrategies.filter(strategy => {
      const matchesQuery = 
        strategy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGame = !filters.game || strategy.gameId === filters.game;
      const matchesDifficulty = !filters.difficulty || strategy.difficulty === filters.difficulty;
      const matchesCategory = !filters.category || strategy.category === filters.category;
      
      return matchesQuery && matchesGame && matchesDifficulty && matchesCategory;
    });

    // 排序邏輯
    switch (filters.sortBy) {
      case 'newest':
        filteredResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filteredResults.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'likes':
        filteredResults.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filteredResults.sort((a, b) => b.views - a.views);
        break;
      default:
        // relevance - 保持原順序
        break;
    }

    setResults(filteredResults);
    setIsLoading(false);

    // 添加到搜尋歷史
    if (searchQuery.trim()) {
      addToHistory(searchQuery.trim());
    }
  };

  // 初始搜尋
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, filters, performSearch]);

  // 處理搜尋提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      performSearch(query.trim());
    }
  };

  // 清除篩選器
  const clearFilters = () => {
    setFilters({
      game: '',
      difficulty: '',
      category: '',
      sortBy: 'relevance'
    });
  };

  // 快速搜尋建議
  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const uniqueCategories = [...new Set(mockStrategies.map(s => s.category))];
  const difficulties = [
    { label: '新手', value: 'beginner' },
    { label: '中級', value: 'intermediate' },
    { label: '進階', value: 'advanced' },
    { label: '專家', value: 'expert' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              🔍 搜尋遊戲攻略
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              找到你需要的遊戲攻略，從基礎教學到高階技巧，
              數千篇專業攻略等你探索
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="搜尋攻略、遊戲名稱、標籤..."
                    className="w-full pl-12 pr-20 py-4 text-lg rounded-xl border-0 bg-white/90 backdrop-blur-sm focus:ring-4 focus:ring-white/30 focus:bg-white text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    搜尋
                  </button>
                </div>
              </form>
              
              {/* Quick Search Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="text-sm opacity-80">熱門搜尋：</span>
                {['英雄聯盟', 'Genshin Impact', '薩爾達', 'Valorant', 'Minecraft'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleQuickSearch(tag)}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Tips */}
        {!query && (
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🎯 搜尋小技巧
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🔤</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">關鍵字搜尋</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  輸入遊戲名稱、攻略類型或特定技巧關鍵字
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🏷️</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">標籤篩選</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  使用標籤快速找到特定類型的攻略內容
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">排序選項</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  按相關性、時間、熱度等條件排序結果
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">進階篩選</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  根據難度等級和遊戲類型精確篩選
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FunnelIcon className="h-4 w-4" />
                篩選器
                {(filters.game || filters.difficulty || filters.category) && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                    {[filters.game, filters.difficulty, filters.category].filter(Boolean).length}
                  </span>
                )}
              </button>
              
              {(filters.game || filters.difficulty || filters.category) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  清除篩選
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {query && (
                <span className="text-sm text-gray-600 dark:text-neutral-400">
                  找到 <span className="font-semibold text-primary-500">{results.length}</span> 個結果
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">排序:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                >
                  <option value="relevance">相關性</option>
                  <option value="newest">最新</option>
                  <option value="oldest">最舊</option>
                  <option value="likes">最多讚</option>
                  <option value="views">最多觀看</option>
                </select>
              </div>
            </div>
          </div>

          {/* 篩選器和排序 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FunnelIcon className="h-4 w-4" />
                篩選器
                {(filters.game || filters.difficulty || filters.category) && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                    {[filters.game, filters.difficulty, filters.category].filter(Boolean).length}
                  </span>
                )}
              </button>
              
              {(filters.game || filters.difficulty || filters.category) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  清除篩選
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">排序:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
              >
                <option value="relevance">相關性</option>
                <option value="newest">最新</option>
                <option value="oldest">最舊</option>
                <option value="likes">最多讚</option>
                <option value="views">最多觀看</option>
              </select>
            </div>
          </div>

          {/* 展開的篩選器 */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    遊戲
                  </label>
                  <select
                    value={filters.game}
                    onChange={(e) => setFilters({ ...filters, game: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="">所有遊戲</option>
                    {mockGames.map(game => (
                      <option key={game.id} value={game.id}>{game.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    難度
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="">所有難度</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    分類
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="">所有分類</option>
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 側邊欄 - 搜尋歷史 */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            {/* 搜尋歷史 */}
            {searchHistory.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    搜尋歷史
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    清除
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.slice(0, 10).map((term, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleQuickSearch(term)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex-1 text-left truncate"
                      >
                        {term}
                      </button>
                      <button
                        onClick={() => removeFromHistory(term)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <XMarkIcon className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 熱門搜尋 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                熱門搜尋
              </h3>
              <div className="space-y-2">
                {['Boss戰攻略', '新手入門', 'PVP技巧', '裝備推薦', '隱藏任務'].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(term)}
                    className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 py-1"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 主要內容區域 */}
          <div className="flex-1 min-w-0">
            {/* 搜尋結果標題 */}
            {query && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  搜尋結果: &quot;{query}&quot;
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {isLoading ? '搜尋中...' : `找到 ${results.length} 個結果`}
                </p>
              </div>
            )}

            {/* 載入狀態 */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            )}

            {/* 搜尋結果 */}
            {!isLoading && query && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map(strategy => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
              </div>
            )}

            {/* 無結果 */}
            {!isLoading && query && results.length === 0 && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  沒有找到相關結果
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  試試調整搜尋關鍵字或篩選條件
                </p>
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  清除所有篩選器
                </button>
              </div>
            )}

            {/* 無搜尋時的建議 */}
            {!query && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  開始搜尋攻略
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  輸入關鍵字來搜尋遊戲攻略
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['新手攻略', 'Boss戰', 'PVP', '裝備', '技能樹'].map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(tag)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}