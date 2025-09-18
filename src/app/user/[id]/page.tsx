'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UserIcon, HeartIcon, BookmarkIcon, PencilIcon, Cog6ToothIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useUserStore } from '@/store/user';
import { mockUsers, mockStrategies } from '@/data/mock';
import { User, Strategy } from '@/types';
import StrategyCard from '@/components/StrategyCard';
import { formatDate, formatNumber } from '@/utils/format';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { currentUser, isLoggedIn, favorites, toggleFavorite } = useUserStore();
  
  const [activeTab, setActiveTab] = useState<'strategies' | 'favorites' | 'following'>('strategies');
  
  // 根據 URL 參數獲取用戶資料
  const profileUser = mockUsers.find(user => user.id === userId);
  const isOwnProfile = currentUser?.id === userId;
  
  // 獲取用戶發佈的攻略
  const userStrategies = mockStrategies.filter(strategy => strategy.authorId === userId);
  
  // 獲取用戶收藏的攻略
  const favoriteStrategies = mockStrategies.filter(strategy => 
    profileUser?.favorites.includes(strategy.id)
  );
  
  // 獲取關注的用戶
  const followingUsers = mockUsers.filter(user => 
    profileUser?.following.includes(user.id)
  );
  
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            用戶不存在
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            找不到您要查看的用戶檔案
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'strategies', 
      label: '發佈攻略', 
      count: userStrategies.length,
      icon: PencilIcon 
    },
    { 
      id: 'favorites', 
      label: '收藏攻略', 
      count: favoriteStrategies.length,
      icon: BookmarkIcon 
    },
    { 
      id: 'following', 
      label: '關注用戶', 
      count: followingUsers.length,
      icon: HeartIcon 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Background */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-48"></div>
      
      {/* 用戶資料頭部 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl -mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* 頭像 */}
            <div className="flex-shrink-0 relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-40 h-40 rounded-full object-cover border-6 border-white dark:border-gray-700 shadow-2xl"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            {/* 用戶資訊 */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profileUser.name}
                  </h1>
                  {profileUser.bio && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg">
                      {profileUser.bio}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <span>加入時間: {formatDate(profileUser.createdAt)}</span>
                  </div>
                </div>
                
                {/* 操作按鈕 */}
                {isOwnProfile ? (
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Cog6ToothIcon className="h-4 w-4" />
                    編輯資料
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <HeartIcon className="h-4 w-4" />
                      關注
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      發送訊息
                    </button>
                  </div>
                )}
              </div>
              
              {/* 統計數據 */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(profileUser.stats.strategiesCount)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">攻略數</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatNumber(profileUser.stats.likesReceived)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">獲得讚數</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">👥</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatNumber(profileUser.stats.followersCount)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">粉絲數</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">👁️</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatNumber(userStrategies.reduce((sum, s) => sum + s.views, 0))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">總觀看數</div>
                </div>
              </div>
              
              {/* Achievement Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {profileUser.stats.strategiesCount >= 10 && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-medium">
                    🏆 攻略達人
                  </span>
                )}
                {profileUser.stats.likesReceived >= 100 && (
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 rounded-full text-xs font-medium">
                    💖 人氣作者
                  </span>
                )}
                {profileUser.stats.followersCount >= 50 && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium">
                    🌟 知名玩家
                  </span>
                )}
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                  ✅ 活躍用戶
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 標籤頁導航 */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'strategies' | 'favorites' | 'following')}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 發佈攻略標籤頁 */}
        {activeTab === 'strategies' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isOwnProfile ? '我的攻略' : `${profileUser.name} 的攻略`}
              </h2>
              {isOwnProfile && (
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <PencilIcon className="h-4 w-4" />
                  發佈新攻略
                </button>
              )}
            </div>
            
            {userStrategies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {userStrategies.map(strategy => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <PencilIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  尚未發佈攻略
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isOwnProfile ? '開始創作您的第一篇攻略吧！' : '該用戶還沒有發佈任何攻略'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 收藏攻略標籤頁 */}
        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {isOwnProfile ? '我的收藏' : `${profileUser.name} 的收藏`}
            </h2>
            
            {favoriteStrategies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteStrategies.map(strategy => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  尚未收藏攻略
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isOwnProfile ? '收藏您喜歡的攻略以便隨時查看' : '該用戶還沒有收藏任何攻略'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 關注用戶標籤頁 */}
        {activeTab === 'following' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {isOwnProfile ? '我關注的用戶' : `${profileUser.name} 關注的用戶`}
            </h2>
            
            {followingUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {followingUsers.map(user => (
                  <div key={user.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {user.name}
                    </h3>
                    {user.bio && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {user.bio}
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>{user.stats.strategiesCount} 攻略</span>
                      <span>{user.stats.followersCount} 粉絲</span>
                    </div>
                    <button className="w-full px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      查看資料
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HeartIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  尚未關注任何用戶
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isOwnProfile ? '發現並關注有趣的創作者' : '該用戶還沒有關注任何人'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}