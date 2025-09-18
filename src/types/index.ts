// 遊戲資料模型
export interface Game {
  id: string;
  title: string;
  name: string; // 顯示名稱
  thumbnail: string;
  description: string;
  tags: string[];
  category: GameCategory;
  platform: Platform[];
  releaseDate: string;
}

// 攻略資料模型
export interface Strategy {
  id: string;
  gameId: string;
  title: string;
  content: string; // Markdown 格式
  excerpt: string;
  thumbnail: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number; // 0-5
  views: number;
  likes: number;
  difficulty: Difficulty;
  category: string; // 攻略分類
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isHot?: boolean;
  isRecommended?: boolean;
}

// 評論資料模型
export interface Comment {
  id: string;
  strategyId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  createdAt: string;
  parentId?: string; // 支援回覆
  replies?: Comment[];
}

// 用戶資料模型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  favorites: string[]; // strategy IDs
  following: string[]; // user IDs
  followers: string[]; // user IDs
  createdAt: string;
  stats: {
    strategiesCount: number;
    likesReceived: number;
    followersCount: number;
  };
}

// 遊戲分類
export enum GameCategory {
  FPS = 'fps',
  RPG = 'rpg',
  MOBA = 'moba',
  RTS = 'rts', 
  ACTION = 'action',
  ADVENTURE = 'adventure',
  PUZZLE = 'puzzle',
  SPORTS = 'sports',
  SIMULATION = 'simulation',
  OTHER = 'other'
}

// 平台類型
export enum Platform {
  PC = 'pc',
  MOBILE = 'mobile',
  CONSOLE = 'console',
  WEB = 'web'
}

// 難度等級
export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// 排序選項
export enum SortOption {
  LATEST = 'latest',
  POPULAR = 'popular',
  RATING = 'rating',
  VIEWS = 'views'
}

// API 回應類型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API 錯誤類型
export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// 搜尋過濾參數
export interface SearchFilters {
  category?: GameCategory;
  platform?: Platform;
  difficulty?: Difficulty;
  tags?: string[];
  rating?: number;
  sortBy?: SortOption;
  query?: string;
}

// 分頁參數
export interface PaginationParams {
  page: number;
  limit: number;
}

// 主題類型
export type Theme = 'light' | 'dark' | 'system';

// 語言類型
export type Language = 'zh-TW' | 'zh-CN' | 'en-US' | 'ja-JP';

// React 組件通用 Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 載入狀態
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// 無限滾動狀態
export interface InfiniteScrollState<T> {
  data: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  error?: string | null;
}