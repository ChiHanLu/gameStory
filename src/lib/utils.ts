import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 合併 Tailwind CSS 類別
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化日期
export function formatDate(date: string | Date, locale: string = 'zh-TW'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (locale === 'zh-TW') {
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days > 7) {
      return dateObj.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } else if (days >= 1) {
      return `${Math.floor(days)} 天前`;
    } else if (hours >= 1) {
      return `${Math.floor(hours)} 小時前`;
    } else if (minutes >= 1) {
      return `${Math.floor(minutes)} 分鐘前`;
    } else {
      return '剛剛';
    }
  }
  
  return dateObj.toLocaleDateString(locale);
}

// 格式化數字
export function formatNumber(num: number, locale: string = 'zh-TW'): string {
  if (locale === 'zh-TW') {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}萬`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
  } else {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
  }
  
  return num.toLocaleString(locale);
}

// 截斷文字
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// 生成隨機 ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 防抖函數
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 節流函數
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 深拷貝
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (obj instanceof Object) {
    const copy = {} as { [key: string]: unknown };
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as { [key: string]: unknown })[key]);
    });
    return copy as T;
  }
  return obj;
}

// 滾動到元素
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// 檢查是否為行動裝置
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 取得圖片尺寸
export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
}

// 複製到剪貼簿
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 備用方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// URL 參數處理
export function getSearchParams(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

// 解析 URL 參數
export function parseUrl(url: string): { pathname: string; search: Record<string, string> } {
  const urlObj = new URL(url, window.location.origin);
  const search: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    search[key] = value;
  });
  
  return {
    pathname: urlObj.pathname,
    search
  };
}

// 檢查圖片載入
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// 安全的 JSON 解析
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}