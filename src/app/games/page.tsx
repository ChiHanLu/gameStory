'use client';

import { useState, useMemo } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  PlayIcon,
  StarIcon,
  EyeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronRightIcon,
  GamepadIcon
} from '@heroicons/react/24/outline';
import { mockGames } from '@/data/mock';
import { GameCategory, Platform } from '@/types';

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | ''>('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | ''>('');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'rating' | 'name'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // 分類統計
  const categoryStats = useMemo(() => {
    const stats: Record<GameCategory, number> = {} as Record<GameCategory, number>;
    Object.values(GameCategory).forEach(category => {
      stats[category] = mockGames.filter(game => game.category === category).length;
    });
    return stats;
  }, []);

  // 平台統計
  const platformStats = useMemo(() => {
    const stats: Record<Platform, number> = {} as Record<Platform, number>;
    Object.values(Platform).forEach(platform => {
      stats[platform] = mockGames.filter(game => game.platform.includes(platform)).length;
    });
    return stats;
  }, []);

  // 篩選和排序遊戲
  const filteredGames = useMemo(() => {
    let filtered = mockGames.filter(game => {
      const matchesSearch = !searchQuery || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      const matchesPlatform = !selectedPlatform || game.platform.includes(selectedPlatform);
      
      return matchesSearch && matchesCategory && matchesPlatform;
    });

    // 排序
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        // 假設有評分，這裡用隨機排序模擬
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        // popularity - 保持原順序或根據某些指標排序
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const categoryLabels: Record<GameCategory, string> = {
    [GameCategory.FPS]: 'FPS 射擊',
    [GameCategory.RPG]: 'RPG 角色',
    [GameCategory.MOBA]: 'MOBA',
    [GameCategory.RTS]: 'RTS 策略',
    [GameCategory.ACTION]: '動作',
    [GameCategory.ADVENTURE]: '冒險',
    [GameCategory.PUZZLE]: '解謎',
    [GameCategory.SPORTS]: '體育',
    [GameCategory.SIMULATION]: '模擬',
    [GameCategory.OTHER]: '其他'
  };

  const platformLabels: Record<Platform, string> = {
    [Platform.PC]: 'PC',
    [Platform.MOBILE]: '手機',
    [Platform.CONSOLE]: '主機',
    [Platform.WEB]: '網頁'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              🎮 遊戲大全
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              探索熱門遊戲世界，找到你最愛的遊戲類型。
              從經典大作到最新力作，這裡有最全面的遊戲資料庫和攻略資源。
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{mockGames.length}</div>
                <div className="text-sm opacity-80">支援遊戲</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{Object.keys(categoryStats).length}</div>
                <div className="text-sm opacity-80">遊戲分類</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{Object.keys(platformStats).length}</div>
                <div className="text-sm opacity-80">支援平台</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 熱門遊戲分類
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categoryStats).slice(0, 5).map(([category, count]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as GameCategory)}
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">
                  {category === GameCategory.FPS && '🎯'}
                  {category === GameCategory.RPG && '⚔️'}
                  {category === GameCategory.MOBA && '🏰'}
                  {category === GameCategory.ACTION && '🏃‍♂️'}
                  {category === GameCategory.SPORTS && '⚽'}
                  {category === GameCategory.PUZZLE && '🧩'}
                  {category === GameCategory.SIMULATION && '🚗'}
                  {category === GameCategory.ADVENTURE && '🗺️'}
                </div>
                <div className="font-semibold text-sm">{categoryLabels[category as GameCategory]}</div>
                <div className="text-xs opacity-70 mt-1">{count} 款遊戲</div>
              </button>
            ))}
          </div>
        </section>

        {/* Platform Section */}
        <section className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🖥️ 支援平台
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(platformStats).map(([platform, count]) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform as Platform)}
                className={`p-6 rounded-lg text-center transition-all ${
                  selectedPlatform === platform
                    ? 'bg-purple-500 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">
                  {platform === Platform.PC && '💻'}
                  {platform === Platform.MOBILE && '📱'}
                  {platform === Platform.CONSOLE && '🎮'}
                  {platform === Platform.WEB && '🌐'}
                </div>
                <div className="font-semibold">{platformLabels[platform as Platform]}</div>
                <div className="text-sm opacity-70">{count} 款</div>
              </button>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜尋遊戲名稱、標籤..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FunnelIcon className="w-4 h-4" />
                  篩選
                  {(selectedCategory || selectedPlatform) && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                      {[selectedCategory, selectedPlatform].filter(Boolean).length}
                    </span>
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="popularity">人氣排序</option>
                  <option value="newest">最新發布</option>
                  <option value="name">名稱排序</option>
                  <option value="rating">評分排序</option>
                </select>

                {(selectedCategory || selectedPlatform) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedPlatform('');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    清除篩選
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                找到 <span className="font-semibold text-primary-500">{filteredGames.length}</span> 款遊戲
              </span>
              {searchQuery && (
                <span className="text-sm text-gray-500">
                  搜尋: "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section>
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="card group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                        {categoryLabels[game.category]}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <PlayIcon className="w-4 h-4" />
                        <span>查看攻略</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {game.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {game.platform.slice(0, 3).map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                        >
                          {platformLabels[platform]}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {game.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {game.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded">
                          +{game.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(game.releaseDate).getFullYear()}</span>
                      <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GamepadIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                找不到相關遊戲
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                試試調整搜尋條件或瀏覽其他分類
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSelectedPlatform('');
                }}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                清除所有篩選
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}