'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { mockUsers, mockStrategies } from '@/data/mock';
import { formatDate, formatNumber } from '@/utils/format';

// 模擬社群討論數據
const mockDiscussions = [
  {
    id: 'disc-1',
    title: '英雄聯盟 S14 世界賽預測討論',
    content: '大家覺得今年世界賽哪支隊伍最有希望奪冠？我個人看好 T1，但 JDG 的表現也很亮眼...',
    author: mockUsers[0] || {
      id: 'default-user-1',
      name: '遊戲達人',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    },
    category: 'esports',
    tags: ['英雄聯盟', '世界賽', 'Esports'],
    replies: 47,
    views: 1205,
    likes: 23,
    isPinned: true,
    isHot: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastReply: '2024-01-15T14:22:00Z'
  },
  {
    id: 'disc-2',
    title: 'Genshin Impact 4.3 版本新角色分析',
    content: '新角色的技能組合看起來很有趣，大家覺得值得抽取嗎？我已經存了很久的原石...',
    author: mockUsers[1] || {
      id: 'default-user-2',
      name: '原神玩家',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2ac?w=100&h=100&fit=crop&crop=face'
    },
    category: 'game-discussion',
    tags: ['Genshin Impact', '角色分析', '攻略'],
    replies: 32,
    views: 892,
    likes: 18,
    isPinned: false,
    isHot: true,
    createdAt: '2024-01-14T16:45:00Z',
    lastReply: '2024-01-15T13:10:00Z'
  },
  {
    id: 'disc-3',
    title: '新手求助：如何提升 Valorant 準度？',
    content: '玩了一個月還是很菜，瞄準總是偏掉，有沒有什麼練習方法推薦？',
    author: mockUsers[2] || {
      id: 'default-user-3',
      name: 'FPS新手',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    category: 'help',
    tags: ['Valorant', '新手', '技巧'],
    replies: 25,
    views: 634,
    likes: 12,
    isPinned: false,
    isHot: false,
    createdAt: '2024-01-14T09:20:00Z',
    lastReply: '2024-01-15T11:30:00Z'
  },
  {
    id: 'disc-4',
    title: '薩爾達王國之淚建造技巧分享',
    content: '分享一些有趣的建造組合，這個遊戲的創造性真的無限大！附上我的飛行器設計圖...',
    author: mockUsers[3] || {
      id: 'default-user-4',
      name: '建造大師',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    category: 'tips',
    tags: ['薩爾達', '建造', '創意'],
    replies: 19,
    views: 456,
    likes: 31,
    isPinned: false,
    isHot: false,
    createdAt: '2024-01-13T20:15:00Z',
    lastReply: '2024-01-15T08:45:00Z'
  },
  {
    id: 'disc-5',
    title: '遊戲攻略創作者交流群',
    content: '想要建立一個攻略創作者的交流群，互相分享經驗、合作創作，有興趣的朋友歡迎加入！',
    author: mockUsers[4] || {
      id: 'default-user-5',
      name: '創作者',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face'
    },
    category: 'community',
    tags: ['創作者', '交流', '合作'],
    replies: 15,
    views: 523,
    likes: 27,
    isPinned: false,
    isHot: false,
    createdAt: '2024-01-13T14:30:00Z',
    lastReply: '2024-01-14T22:10:00Z'
  }
];

const categories = [
  { id: 'all', name: '全部討論', icon: '💬', color: 'gray' },
  { id: 'game-discussion', name: '遊戲討論', icon: '🎮', color: 'blue' },
  { id: 'tips', name: '技巧分享', icon: '💡', color: 'yellow' },
  { id: 'help', name: '新手求助', icon: '🆘', color: 'red' },
  { id: 'esports', name: '電競賽事', icon: '🏆', color: 'purple' },
  { id: 'community', name: '社群活動', icon: '👥', color: 'green' }
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'hot' | 'replies' | 'views'>('hot');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 篩選和排序討論
  const filteredDiscussions = useMemo(() => {
    let filtered = mockDiscussions.filter(discussion => {
      const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // 排序
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'hot':
        filtered.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          if (a.isHot && !b.isHot) return -1;
          if (!a.isHot && b.isHot) return 1;
          return b.likes - a.likes;
        });
        break;
      case 'replies':
        filtered.sort((a, b) => b.replies - a.replies);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  // 社群統計
  const communityStats = {
    totalMembers: 15420,
    activeToday: 892,
    totalDiscussions: mockDiscussions.length + 1247,
    totalReplies: mockDiscussions.reduce((sum, d) => sum + d.replies, 0) + 5690
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              👥 遊戲社群
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              與全球玩家交流心得，分享遊戲經驗，在這裡找到志同道合的夥伴。
              無論你是新手還是大神，都能在社群中找到屬於你的位置。
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{formatNumber(communityStats.totalMembers)}</div>
                <div className="text-sm opacity-80">社群成員</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{formatNumber(communityStats.activeToday)}</div>
                <div className="text-sm opacity-80">今日活躍</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{formatNumber(communityStats.totalDiscussions)}</div>
                <div className="text-sm opacity-80">討論話題</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{formatNumber(communityStats.totalReplies)}</div>
                <div className="text-sm opacity-80">回覆數量</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                快速操作
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  發起討論
                </button>
                <Link
                  href="/create"
                  className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <BookmarkIcon className="w-5 h-5" />
                  創作攻略
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                討論分類
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    {category.id !== 'all' && (
                      <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                        {mockDiscussions.filter(d => d.category === category.id).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🌟 社群之星
              </h3>
              <div className="space-y-3">
                {mockUsers.slice(0, 5).map((user, index) => (
                  <Link
                    key={user.id}
                    href={`/user/${user.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          'bg-orange-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.stats.strategiesCount} 攻略
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="搜尋討論話題..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="hot">熱門排序</option>
                  <option value="latest">最新回覆</option>
                  <option value="replies">回覆數量</option>
                  <option value="views">觀看次數</option>
                </select>
              </div>
              
              {searchQuery && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  找到 <span className="font-semibold text-primary-500">{filteredDiscussions.length}</span> 個相關討論
                </div>
              )}
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                📋 社群守則
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>尊重每位社群成員</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>分享有價值的內容</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>使用適當的標籤分類</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>避免重複發文</span>
                </div>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                    discussion.isPinned ? 'ring-2 ring-yellow-200 dark:ring-yellow-800' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {discussion.author ? (
                        <Link href={`/user/${discussion.author.id}`}>
                          <img
                            src={discussion.author.avatar}
                            alt={discussion.author.name}
                            className="w-12 h-12 rounded-full hover:scale-105 transition-transform"
                          />
                        </Link>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">?</span>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.isPinned && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium rounded">
                              📌 置頂
                            </span>
                          )}
                          {discussion.isHot && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded">
                              🔥 熱門
                            </span>
                          )}
                        </div>
                        
                        <Link
                          href={`/community/discussions/${discussion.id}`}
                          className="block group"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                            {discussion.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {discussion.content}
                          </p>
                        </Link>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {discussion.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            {discussion.author ? (
                              <Link
                                href={`/user/${discussion.author.id}`}
                                className="hover:text-primary-500 transition-colors"
                              >
                                {discussion.author.name}
                              </Link>
                            ) : (
                              <span className="text-gray-400">匿名用戶</span>
                            )}
                            <span>{formatDate(discussion.createdAt)}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <ChatBubbleLeftRightIcon className="w-4 h-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>{formatNumber(discussion.views)}</span>
                            </div>
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <HeartIcon className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                載入更多討論
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}