import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  CalendarIcon,
  TagIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon,
  GlobeAltIcon,
  StarIcon,
  EyeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { mockGames, mockStrategies } from '@/data/mock';
import { Platform } from '@/types';
import StrategyCard from '@/components/StrategyCard';

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const game = mockGames.find(g => g.id === id);
  
  if (!game) {
    return {
      title: '遊戲不存在 - GameGuide Hub'
    };
  }

  return {
    title: `${game.title} - 遊戲攻略大全 | GameGuide Hub`,
    description: game.description,
    keywords: [game.title, ...game.tags].join(', '),
    openGraph: {
      title: game.title,
      description: game.description,
      images: [game.thumbnail],
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return mockGames.map((game) => ({
    id: game.id,
  }));
}

export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = mockGames.find(g => g.id === id);

  if (!game) {
    notFound();
  }

  // 獲取該遊戲的相關攻略
  const gameStrategies = mockStrategies.filter(strategy => strategy.gameId === id);
  const relatedGames = mockGames.filter(g => 
    g.id !== id && 
    (g.category === game.category || 
     g.tags.some(tag => game.tags.includes(tag)))
  ).slice(0, 4);

  const platformIcons = {
    [Platform.PC]: ComputerDesktopIcon,
    [Platform.MOBILE]: DevicePhoneMobileIcon,
    [Platform.CONSOLE]: TvIcon,
    [Platform.WEB]: GlobeAltIcon
  };

  const platformLabels = {
    [Platform.PC]: 'PC',
    [Platform.MOBILE]: '行動裝置',
    [Platform.CONSOLE]: '遊戲主機',
    [Platform.WEB]: '網頁瀏覽器'
  };

  const categoryLabels = {
    'fps': 'FPS 射擊',
    'rpg': 'RPG 角色扮演',
    'moba': 'MOBA',
    'rts': 'RTS 策略',
    'action': '動作遊戲',
    'adventure': '冒險遊戲',
    'puzzle': '解謎遊戲',
    'sports': '體育遊戲',
    'simulation': '模擬遊戲',
    'other': '其他'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-end">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {game.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6 max-w-3xl leading-relaxed">
                  {game.description}
                </p>
                
                {/* Game Meta Info */}
                <div className="flex flex-wrap gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>發行日期: {new Date(game.releaseDate).toLocaleDateString('zh-TW')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-5 h-5" />
                    <span>類型: {categoryLabels[game.category as keyof typeof categoryLabels]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5" />
                    <span>{gameStrategies.length} 篇攻略</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href={`/strategies?game=${id}`}
                  className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                >
                  查看攻略
                </Link>
                <Link
                  href="/create"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/30 transition-colors font-semibold"
                >
                  創作攻略
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Game Details */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🎮 遊戲詳情
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    支援平台
                  </h3>
                  <div className="space-y-3">
                    {game.platform.map((platform) => {
                      const Icon = platformIcons[platform];
                      return (
                        <div key={platform} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Icon className="w-6 h-6 text-primary-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {platformLabels[platform]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    遊戲標籤
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Strategies Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📚 相關攻略
                </h2>
                <Link
                  href={`/strategies?game=${id}`}
                  className="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
                >
                  查看全部
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
              
              {gameStrategies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gameStrategies.slice(0, 6).map(strategy => (
                    <StrategyCard key={strategy.id} strategy={strategy} size="small" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpenIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    尚未有攻略
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    成為第一個為這款遊戲創作攻略的人！
                  </p>
                  <Link
                    href="/create"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    創作攻略
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Game Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 遊戲統計
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">攻略數量</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{gameStrategies.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">總觀看數</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {gameStrategies.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">平均評分</span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {gameStrategies.length > 0 
                        ? (gameStrategies.reduce((sum, s) => sum + s.rating, 0) / gameStrategies.length).toFixed(1)
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">發行年份</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(game.releaseDate).getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            {gameStrategies.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ✍️ 主要攻略作者
                </h3>
                <div className="space-y-3">
                  {Array.from(new Set(gameStrategies.map(s => s.author)))
                    .slice(0, 5)
                    .map((author, index) => (
                      <Link
                        key={author.id}
                        href={`/user/${author.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {author.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {gameStrategies.filter(s => s.author.id === author.id).length} 篇攻略
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🎯 相關遊戲
                </h3>
                <div className="space-y-4">
                  {relatedGames.map((relatedGame) => (
                    <Link
                      key={relatedGame.id}
                      href={`/games/${relatedGame.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <img
                          src={relatedGame.thumbnail}
                          alt={relatedGame.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-1">
                            {relatedGame.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {relatedGame.description}
                          </p>
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