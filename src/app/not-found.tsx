import Link from 'next/link';
import { ExclamationTriangleIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center px-4">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-neutral-300 mb-4">
          迷路了？
        </h2>
        <p className="text-gray-600 dark:text-neutral-400 text-lg mb-8 max-w-md mx-auto">
          很抱歉，您要找的頁面不存在。可能是連結已失效，或者頁面已被移動。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 btn-primary px-6 py-3"
          >
            <HomeIcon className="w-5 h-5" />
            <span>返回首頁</span>
          </Link>
          
          <Link
            href="/strategies"
            className="inline-flex items-center space-x-2 btn-secondary px-6 py-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>瀏覽攻略</span>
          </Link>
        </div>

        {/* Search Suggestions */}
        <div className="mt-12 max-w-md mx-auto">
          <h3 className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-4">
            或者試試這些熱門攻略：
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              '薩爾達傳說',
              'Cyberpunk 2077',
              '英雄聯盟',
              '原神',
              'CS:GO'
            ].map((game) => (
              <Link
                key={game}
                href={`/search?q=${encodeURIComponent(game)}`}
                className="px-3 py-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full text-sm text-gray-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                {game}
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-xs text-gray-500 dark:text-neutral-500">
          <p>錯誤代碼: 404 - 頁面未找到</p>
        </div>
      </div>
    </div>
  );
}