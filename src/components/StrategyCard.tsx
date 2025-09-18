'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HeartIcon,
  EyeIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Strategy } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';
import { useThemeStore } from '@/store/theme';
import { useUserStore } from '@/store/user';

interface StrategyCardProps {
  strategy: Strategy;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showAuthor?: boolean;
  showStats?: boolean;
}

export default function StrategyCard({ 
  strategy, 
  className = '',
  size = 'medium',
  showAuthor = true,
  showStats = true
}: StrategyCardProps) {
  const { language } = useThemeStore();
  const { isAuthenticated, favorites, addToFavorites, removeFromFavorites } = useUserStore();
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(favorites.includes(strategy.id));
  const [likeCount, setLikeCount] = useState(strategy.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // 可以顯示登入提示
      return;
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // 可以顯示登入提示
      return;
    }
    
    if (isBookmarked) {
      removeFromFavorites(strategy.id);
    } else {
      addToFavorites(strategy.id);
    }
    
    setIsBookmarked(!isBookmarked);
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

  const sizeClasses = {
    small: 'w-full max-w-sm',
    medium: 'w-full max-w-md',
    large: 'w-full max-w-lg'
  };

  const imageHeight = {
    small: 'h-40',
    medium: 'h-48',
    large: 'h-56'
  };

  return (
    <Link href={`/strategies/${strategy.id}`}>
      <article className={`card group cursor-pointer overflow-hidden ${sizeClasses[size]} ${className}`}>
        {/* Thumbnail */}
        <div className={`relative ${imageHeight[size]} overflow-hidden`}>
          <Image
            src={strategy.thumbnail}
            alt={strategy.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500 border-red-500 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                aria-label={isLiked ? 'Unlike' : 'Like'}
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
              </button>
              
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {isBookmarked ? (
                  <BookmarkSolidIcon className="w-4 h-4" />
                ) : (
                  <BookmarkIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Hot Badge */}
          {strategy.isHot && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                🔥 {language === 'zh-TW' ? '熱門' : 'Hot'}
              </span>
            </div>
          )}

          {/* Difficulty Badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(strategy.difficulty)}`}>
              {getDifficultyText(strategy.difficulty)}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">
              {strategy.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
            {strategy.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
            {strategy.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {strategy.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-400 text-xs rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author Info */}
          {showAuthor && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="relative w-6 h-6">
                <Image
                  src={strategy.author.avatar}
                  alt={strategy.author.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="24px"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-neutral-400">
                {strategy.author.name}
              </span>
              <span className="text-gray-400 dark:text-neutral-500">•</span>
              <span className="text-sm text-gray-500 dark:text-neutral-500 flex items-center space-x-1">
                <ClockIcon className="w-3 h-3" />
                <span>{formatDate(strategy.createdAt, language)}</span>
              </span>
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-neutral-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>{formatNumber(strategy.views, language)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <HeartIcon className="w-4 h-4" />
                  <span>{formatNumber(likeCount, language)}</span>
                </div>
              </div>
              
              {strategy.isRecommended && (
                <span className="text-secondary-500 text-xs font-medium">
                  ⭐ {language === 'zh-TW' ? '推薦' : 'Recommended'}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}