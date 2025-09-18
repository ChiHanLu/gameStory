'use client';

import { useState, useMemo } from 'react';
import { 
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import StrategyCard from '@/components/StrategyCard';
import { Strategy, GameCategory, Difficulty, SortOption } from '@/types';
import { useThemeStore } from '@/store/theme';
import { useSearchStore } from '@/store/search';
import { cn } from '@/lib/utils';

interface StrategyGridProps {
  strategies: Strategy[];
  className?: string;
  showFilters?: boolean;
  itemsPerPage?: number;
}

export default function StrategyGrid({ 
  strategies, 
  className = '',
  showFilters = true,
  itemsPerPage = 12
}: StrategyGridProps) {
  const { language } = useThemeStore();
  const { filters, setFilters } = useSearchStore();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 過濾和排序邏輯
  const filteredAndSortedStrategies = useMemo(() => {
    let filtered = [...strategies];

    // 搜尋過濾
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(strategy =>
        strategy.title.toLowerCase().includes(query) ||
        strategy.excerpt.toLowerCase().includes(query) ||
        strategy.tags.some(tag => tag.toLowerCase().includes(query)) ||
        strategy.author.name.toLowerCase().includes(query)
      );
    }

    // 分類過濾
    if (filters.category) {
      // 這裡需要根據策略的遊戲ID來過濾，簡化處理
      // 實際應該查詢遊戲資料來匹配分類
    }

    // 難度過濾
    if (filters.difficulty) {
      filtered = filtered.filter(strategy => strategy.difficulty === filters.difficulty);
    }

    // 標籤過濾
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(strategy =>
        filters.tags!.some(tag => strategy.tags.includes(tag))
      );
    }

    // 評分過濾
    if (filters.rating) {
      filtered = filtered.filter(strategy => strategy.rating >= filters.rating!);
    }

    // 排序
    switch (filters.sortBy) {
      case SortOption.LATEST:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case SortOption.POPULAR:
        filtered.sort((a, b) => b.views - a.views);
        break;
      case SortOption.RATING:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case SortOption.VIEWS:
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    return filtered;
  }, [strategies, searchQuery, filters]);

  // 分頁邏輯
  const totalPages = Math.ceil(filteredAndSortedStrategies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStrategies = filteredAndSortedStrategies.slice(startIndex, startIndex + itemsPerPage);

  const difficultyOptions = [
    { value: Difficulty.BEGINNER, label: language === 'zh-TW' ? '新手' : 'Beginner' },
    { value: Difficulty.INTERMEDIATE, label: language === 'zh-TW' ? '進階' : 'Intermediate' },
    { value: Difficulty.ADVANCED, label: language === 'zh-TW' ? '高級' : 'Advanced' },
    { value: Difficulty.EXPERT, label: language === 'zh-TW' ? '專家' : 'Expert' },
  ];

  const sortOptions = [
    { value: SortOption.LATEST, label: language === 'zh-TW' ? '最新' : 'Latest' },
    { value: SortOption.POPULAR, label: language === 'zh-TW' ? '熱門' : 'Popular' },
    { value: SortOption.RATING, label: language === 'zh-TW' ? '評分' : 'Rating' },
    { value: SortOption.VIEWS, label: language === 'zh-TW' ? '觀看次數' : 'Views' },
  ];

  const categoryOptions = [
    { value: GameCategory.FPS, label: 'FPS' },
    { value: GameCategory.RPG, label: 'RPG' },
    { value: GameCategory.MOBA, label: 'MOBA' },
    { value: GameCategory.RTS, label: 'RTS' },
    { value: GameCategory.ACTION, label: language === 'zh-TW' ? '動作' : 'Action' },
    { value: GameCategory.ADVENTURE, label: language === 'zh-TW' ? '冒險' : 'Adventure' },
    { value: GameCategory.PUZZLE, label: language === 'zh-TW' ? '解謎' : 'Puzzle' },
    { value: GameCategory.SPORTS, label: language === 'zh-TW' ? '運動' : 'Sports' },
    { value: GameCategory.SIMULATION, label: language === 'zh-TW' ? '模擬' : 'Simulation' },
    { value: GameCategory.OTHER, label: language === 'zh-TW' ? '其他' : 'Other' },
  ];

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filter Bar */}
      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'zh-TW' ? '搜尋攻略...' : 'Search strategies...'}
                className="input-field pl-10"
              />
            </div>

            {/* Filter Toggle & Sort */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors',
                  isFilterOpen
                    ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/20 dark:border-primary-700 dark:text-primary-400'
                    : 'border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800'
                )}
              >
                <FunnelIcon className="w-4 h-4" />
                <span>{language === 'zh-TW' ? '篩選' : 'Filter'}</span>
              </button>

              <select
                value={filters.sortBy || SortOption.LATEST}
                onChange={(e) => setFilters({ sortBy: e.target.value as SortOption })}
                className="input-field min-w-[120px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {language === 'zh-TW' ? '遊戲分類' : 'Category'}
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => setFilters({ category: e.target.value as GameCategory || undefined })}
                    className="input-field"
                  >
                    <option value="">{language === 'zh-TW' ? '全部分類' : 'All Categories'}</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {language === 'zh-TW' ? '難度' : 'Difficulty'}
                  </label>
                  <select
                    value={filters.difficulty || ''}
                    onChange={(e) => setFilters({ difficulty: e.target.value as Difficulty || undefined })}
                    className="input-field"
                  >
                    <option value="">{language === 'zh-TW' ? '全部難度' : 'All Difficulties'}</option>
                    {difficultyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    {language === 'zh-TW' ? '最低評分' : 'Min Rating'}
                  </label>
                  <select
                    value={filters.rating || ''}
                    onChange={(e) => setFilters({ rating: e.target.value ? Number(e.target.value) : undefined })}
                    className="input-field"
                  >
                    <option value="">{language === 'zh-TW' ? '任何評分' : 'Any Rating'}</option>
                    <option value="4.5">4.5+ ⭐</option>
                    <option value="4.0">4.0+ ⭐</option>
                    <option value="3.5">3.5+ ⭐</option>
                    <option value="3.0">3.0+ ⭐</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn-secondary w-full"
                  >
                    {language === 'zh-TW' ? '清除篩選' : 'Clear Filters'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-neutral-400 mb-6">
            <span>
              {language === 'zh-TW' 
                ? `顯示 ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredAndSortedStrategies.length)} 項，共 ${filteredAndSortedStrategies.length} 項結果`
                : `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredAndSortedStrategies.length)} of ${filteredAndSortedStrategies.length} results`
              }
            </span>
          </div>
        </div>
      )}

      {/* Strategy Grid */}
      {paginatedStrategies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedStrategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 dark:text-neutral-600 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {language === 'zh-TW' ? '找不到符合條件的攻略' : 'No strategies found'}
          </h3>
          <p className="text-gray-600 dark:text-neutral-400 mb-4">
            {language === 'zh-TW' ? '請嘗試調整搜尋條件或篩選器' : 'Try adjusting your search terms or filters'}
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            {language === 'zh-TW' ? '清除所有篩選' : 'Clear All Filters'}
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            {language === 'zh-TW' ? '上一頁' : 'Previous'}
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg',
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'border border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800'
                )}
              >
                {page}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            {language === 'zh-TW' ? '下一頁' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}