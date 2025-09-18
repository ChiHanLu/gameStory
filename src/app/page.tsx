import Link from 'next/link';
import { ChevronRightIcon, FireIcon, TrophyIcon, StarIcon } from '@heroicons/react/24/outline';
import HeroCarousel from '@/components/HeroCarousel';
import StrategyCard from '@/components/StrategyCard';
import { getHotStrategies, getRecommendedStrategies, mockGames } from '@/data/mock';

export default function Home() {
  const hotStrategies = getHotStrategies(4);
  const recommendedStrategies = getRecommendedStrategies(6);
  const featuredGames = mockGames.slice(0, 6);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Main Content */}
      <main className="container-max">
        {/* Hot Strategies Section */}
        <section className="section-padding py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-red-500 rounded-lg flex items-center justify-center">
                <FireIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">熱門攻略</h2>
                <p className="text-gray-600 dark:text-neutral-400">最受歡迎的遊戲攻略</p>
              </div>
            </div>
            <Link
              href="/strategies?filter=hot"
              className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              <span>查看更多</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                size="small"
              />
            ))}
          </div>
        </section>

        {/* Featured Games Section */}
        <section className="section-padding py-16 bg-gray-50 dark:bg-neutral-800/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">精選遊戲</h2>
                <p className="text-gray-600 dark:text-neutral-400">熱門遊戲與最新攻略</p>
              </div>
            </div>
            <Link
              href="/games"
              className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              <span>查看更多</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="card group cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                      {game.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      {game.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {game.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended Strategies Section */}
        <section className="section-padding py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-green-500 rounded-lg flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">推薦攻略</h2>
                <p className="text-gray-600 dark:text-neutral-400">編輯精選的優質攻略</p>
              </div>
            </div>
            <Link
              href="/strategies?filter=recommended"
              className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              <span>查看更多</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                size="medium"
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mx-4 lg:mx-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            準備好提升你的遊戲技巧了嗎？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            加入我們的社群，分享攻略，與玩家交流心得
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="btn-primary bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              立即註冊
            </Link>
            <Link
              href="/strategies"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 text-lg font-semibold"
            >
              瀏覽攻略
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
