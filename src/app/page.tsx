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

        {/* Stats Section */}
        <section className="section-padding py-16 bg-white dark:bg-neutral-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              GameGuide Hub 數據統計
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              數萬玩家信賴的遊戲攻略平台，提供最全面的遊戲指南與社群交流
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 dark:text-neutral-400 font-medium">
                優質攻略
              </div>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                50,000+
              </div>
              <div className="text-gray-600 dark:text-neutral-400 font-medium">
                活躍用戶
              </div>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                1,000+
              </div>
              <div className="text-gray-600 dark:text-neutral-400 font-medium">
                支援遊戲
              </div>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                4.8/5
              </div>
              <div className="text-gray-600 dark:text-neutral-400 font-medium">
                用戶評分
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              為什麼選擇 GameGuide Hub？
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              我們提供最全面的遊戲攻略服務，幫助每一位玩家提升遊戲技巧
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                專業攻略
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                由經驗豐富的玩家和專業編輯團隊精心編寫，確保攻略的準確性和實用性，幫助你快速掌握遊戲技巧。
              </p>
            </div>
            
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                即時更新
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                跟上遊戲版本更新的步伐，攻略內容即時更新，確保你獲得最新最有效的遊戲資訊和策略。
              </p>
            </div>
            
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                社群互動
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                與全球玩家交流心得，分享遊戲經驗，在社群中找到志同道合的夥伴，一起探索遊戲的樂趣。
              </p>
            </div>
            
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                跨平台支援
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                支援 PC、手機、主機等多個平台，無論你在哪裡遊戲，都能找到對應的攻略和技巧指導。
              </p>
            </div>
            
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                個人化推薦
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                根據你的遊戲偏好和遊玩歷史，智能推薦最適合的攻略內容，提升你的學習效率。
              </p>
            </div>
            
            <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                進階技巧
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                從新手入門到專家級技巧，提供全方位的學習資源，幫助你在遊戲中達到更高的成就。
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-20 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl mx-4 lg:mx-8 text-center text-white relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              準備好提升你的遊戲技巧了嗎？
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              加入我們的社群，獲得專業攻略指導，與全球玩家交流心得，開啟你的遊戲進階之路
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="btn-primary bg-white text-primary-500 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                🚀 立即註冊
              </Link>
              <Link
                href="/strategies"
                className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary-500 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                📚 瀏覽攻略
              </Link>
            </div>
            <div className="mt-8 flex justify-center items-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>100% 免費註冊</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>即時攻略更新</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎮</span>
                <span>支援所有熱門遊戲</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
