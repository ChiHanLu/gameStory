'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
  StarIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Strategy, Comment } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';
import { useThemeStore } from '@/store/theme';
import { useUserStore } from '@/store/user';
import { mockStrategies } from '@/data/mock';
import StrategyCard from './StrategyCard';

interface StrategyDetailViewProps {
  strategy: Strategy;
}

export default function StrategyDetailView({ strategy }: StrategyDetailViewProps) {
  const { language } = useThemeStore();
  const { isAuthenticated, favorites, addToFavorites, removeFromFavorites } = useUserStore();
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(favorites.includes(strategy.id));
  const [likeCount, setLikeCount] = useState(strategy.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // 獲取相關攻略
  const relatedStrategies = mockStrategies
    .filter(s => s.id !== strategy.id && s.gameId === strategy.gameId)
    .slice(0, 3);

  const handleLike = () => {
    if (!isAuthenticated) return;
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    if (!isAuthenticated) return;
    if (isBookmarked) {
      removeFromFavorites(strategy.id);
    } else {
      addToFavorites(strategy.id);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: strategy.title,
          text: strategy.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享取消');
      }
    } else {
      // 複製連結到剪貼簿
      await navigator.clipboard.writeText(window.location.href);
      // 可以顯示通知
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;
    
    // 這裡應該發送 API 請求來創建評論
    console.log('新評論:', newComment);
    setNewComment('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    if (language === 'zh-TW') {
      switch (difficulty) {
        case 'beginner': return '新手';
        case 'intermediate': return '進階';
        case 'advanced': return '高級';
        case 'expert': return '專家';
        default: return difficulty;
      }
    }
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container-max section-padding py-8">
        {/* Back Button */}
        <Link
          href="/strategies"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>{language === 'zh-TW' ? '返回攻略列表' : 'Back to Strategies'}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {strategy.title}
                  </h1>
                  <p className="text-gray-600 dark:text-neutral-400 text-lg mb-4">
                    {strategy.excerpt}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                      isLiked 
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                    }`}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                    <span>{formatNumber(likeCount, language)}</span>
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-all ${
                      isBookmarked 
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                    }`}
                  >
                    {isBookmarked ? (
                      <BookmarkSolidIcon className="w-4 h-4" />
                    ) : (
                      <BookmarkIcon className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-all"
                  >
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-neutral-400 mb-4">
                <div className="flex items-center space-x-1">
                  <UserIcon className="w-4 h-4" />
                  <span>{strategy.author.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{formatDate(strategy.createdAt, language)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>{formatNumber(strategy.views, language)} {language === 'zh-TW' ? '觀看' : 'views'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{strategy.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(strategy.difficulty)}`}>
                  {getDifficultyText(strategy.difficulty)}
                </span>
                {strategy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-400 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{strategy.content}</ReactMarkdown>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'zh-TW' ? '評論討論' : 'Comments'}
                </h2>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  {showComments 
                    ? (language === 'zh-TW' ? '隱藏評論' : 'Hide Comments')
                    : (language === 'zh-TW' ? '顯示評論' : 'Show Comments')
                  }
                </button>
              </div>

              {showComments && (
                <div>
                  {/* Comment Form */}
                  {isAuthenticated && (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={language === 'zh-TW' ? '分享你的想法...' : 'Share your thoughts...'}
                        className="input-field h-24 resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          disabled={!newComment.trim()}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {language === 'zh-TW' ? '發表評論' : 'Post Comment'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    <p className="text-gray-500 dark:text-neutral-400 text-center py-8">
                      {language === 'zh-TW' ? '目前還沒有評論，成為第一個留言的人吧！' : 'No comments yet. Be the first to comment!'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src={strategy.author.avatar}
                    alt={strategy.author.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {strategy.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {language === 'zh-TW' ? '攻略作者' : 'Strategy Author'}
                  </p>
                </div>
              </div>
              <Link
                href={`/users/${strategy.authorId}`}
                className="btn-secondary w-full text-center"
              >
                {language === 'zh-TW' ? '查看個人資料' : 'View Profile'}
              </Link>
            </div>

            {/* Related Strategies */}
            {relatedStrategies.length > 0 && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {language === 'zh-TW' ? '相關攻略' : 'Related Strategies'}
                </h3>
                <div className="space-y-4">
                  {relatedStrategies.map((relatedStrategy) => (
                    <Link
                      key={relatedStrategy.id}
                      href={`/strategies/${relatedStrategy.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="w-16 h-12 relative">
                          <Image
                            src={relatedStrategy.thumbnail}
                            alt={relatedStrategy.title}
                            fill
                            className="rounded object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 line-clamp-2 transition-colors">
                            {relatedStrategy.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-neutral-400 mt-1">
                            <span className="flex items-center space-x-1">
                              <EyeIcon className="w-3 h-3" />
                              <span>{formatNumber(relatedStrategy.views, language)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{relatedStrategy.rating.toFixed(1)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
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