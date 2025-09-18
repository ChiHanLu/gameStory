'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PencilIcon, PhotoIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { useUserStore } from '@/store/user';
import { mockGames } from '@/data/mock';
import { Difficulty } from '@/types';

export default function CreateStrategyPage() {
  const router = useRouter();
  const { currentUser, isLoggedIn } = useUserStore();
  
  const [formData, setFormData] = useState({
    title: '',
    gameId: '',
    difficulty: '',
    category: '',
    tags: '',
    excerpt: '',
    content: '',
    thumbnail: ''
  });
  
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 如果用戶未登入，重定向到登入頁面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <PencilIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            需要登入才能發佈攻略
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            請先登入您的帳戶以開始創作攻略
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            前往登入
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 模擬 API 提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 這裡應該調用實際的 API
      console.log('提交攻略:', formData);
      
      // 成功後重定向
      router.push('/strategies');
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              ✍️ 創作你的遊戲攻略
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              分享你的遊戲心得與專業技巧，幫助其他玩家提升遊戲水平，
              成為遊戲社群中受人尊敬的攻略達人
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tips Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            💡 攻略創作小貼士
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">清晰標題</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                使用具體且吸引人的標題，讓讀者一眼就知道攻略內容
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📸</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">豐富圖片</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                添加螢幕截圖和說明圖片，讓攻略更加直觀易懂
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">詳細步驟</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                提供清晰的步驟說明，讓新手也能輕鬆跟隨
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🏷️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">準確標籤</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                使用相關標籤讓更多需要的玩家能找到你的攻略
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本資訊 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              基本資訊
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 標題 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  攻略標題 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="請輸入攻略標題"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* 遊戲選擇 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  選擇遊戲 *
                </label>
                <select
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">請選擇遊戲</option>
                  {mockGames.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>

              {/* 難度 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  攻略難度 *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">請選擇難度</option>
                  <option value="beginner">新手</option>
                  <option value="intermediate">中級</option>
                  <option value="advanced">進階</option>
                  <option value="expert">專家</option>
                </select>
              </div>

              {/* 分類 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  攻略分類 *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="例: 新手教學、高難度挑戰"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* 標籤 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  標籤
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="用逗號分隔標籤，例: Boss戰,技巧,裝備"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* 縮略圖 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  縮略圖 URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* 簡介 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  攻略簡介 *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="簡短描述這個攻略的內容和特色"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* 內容編輯 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                攻略內容
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreview(false)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    !isPreview 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <PencilIcon className="h-4 w-4 inline mr-1" />
                  編輯
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreview(true)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    isPreview 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  預覽
                </button>
              </div>
            </div>

            {!isPreview ? (
              <div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={20}
                  placeholder="請使用 Markdown 格式編寫攻略內容..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  支援 Markdown 語法：**粗體**、*斜體*、`程式碼`、連結、圖片等
                </p>
              </div>
            ) : (
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[500px] bg-gray-50 dark:bg-gray-700">
                {formData.content ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>
                      {formData.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    內容預覽將在這裡顯示...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 提交按鈕 */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '發佈中...' : '發佈攻略'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}