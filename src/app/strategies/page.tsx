import { Metadata } from 'next';
import StrategyGrid from '@/components/StrategyGrid';
import { mockStrategies } from '@/data/mock';

export const metadata: Metadata = {
  title: '遊戲攻略 - GameGuide Hub',
  description: '瀏覽最新最完整的遊戲攻略，涵蓋各種遊戲類型和難度等級。',
  keywords: '遊戲攻略, 攻略大全, 遊戲指南, 遊戲技巧',
};

export default function StrategiesPage() {
  const totalStrategies = mockStrategies.length;
  const totalViews = mockStrategies.reduce((sum, strategy) => sum + strategy.views, 0);
  const averageRating = mockStrategies.reduce((sum, strategy) => sum + strategy.rating, 0) / totalStrategies;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="container-max section-padding py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              🎮 遊戲攻略大全
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              探索最新最完整的遊戲攻略，從新手入門到專家級技巧，涵蓋所有熱門遊戲類型。
              由專業玩家和編輯團隊精心製作，幫助你快速提升遊戲技巧，成為遊戲高手。
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{totalStrategies.toLocaleString()}</div>
                <div className="text-sm opacity-80">攻略總數</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{(totalViews / 1000000).toFixed(1)}M</div>
                <div className="text-sm opacity-80">總觀看次數</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">{averageRating.toFixed(1)}⭐</div>
                <div className="text-sm opacity-80">平均評分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding py-12">
        {/* Category Highlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            熱門遊戲分類
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold">FPS 射擊</div>
              <div className="text-sm opacity-80">234 攻略</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="font-semibold">RPG 角色</div>
              <div className="text-sm opacity-80">189 攻略</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">🏰</div>
              <div className="font-semibold">策略遊戲</div>
              <div className="text-sm opacity-80">156 攻略</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">🏃‍♂️</div>
              <div className="font-semibold">動作冒險</div>
              <div className="text-sm opacity-80">198 攻略</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl mb-2">🧩</div>
              <div className="font-semibold">解謎益智</div>
              <div className="text-sm opacity-80">87 攻略</div>
            </div>
          </div>
        </section>

        {/* Featured Strategies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🔥 本週熱門攻略
            </h2>
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              查看更多 →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStrategies.filter(s => s.isHot).slice(0, 3).map(strategy => (
              <div key={strategy.id} className="card group hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={strategy.thumbnail} 
                    alt={strategy.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      🔥 熱門
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {strategy.views.toLocaleString()} 觀看
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {strategy.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={strategy.author.avatar} alt={strategy.author.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm text-gray-500">{strategy.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{strategy.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search Tips */}
        <section className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            💡 搜尋小貼士
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span>🔍</span>
              <span>使用關鍵字快速找到相關攻略</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏷️</span>
              <span>透過標籤篩選特定類型攻略</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>按評分排序找到最優質內容</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>查看最新發佈的攻略內容</span>
            </div>
          </div>
        </section>

        {/* Strategy Grid with Enhanced Header */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📚 所有攻略
              </h2>
              <p className="text-gray-600 dark:text-neutral-400 mt-1">
                找到最適合你的遊戲攻略，提升技巧從這裡開始
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-neutral-400">
              共 {totalStrategies} 篇攻略
            </div>
          </div>
          
          <StrategyGrid 
            strategies={mockStrategies} 
            showFilters={true}
            itemsPerPage={12}
          />
        </section>
      </div>
    </div>
  );
}