import { Metadata } from 'next';
import StrategyGrid from '@/components/StrategyGrid';
import { mockStrategies } from '@/data/mock';

export const metadata: Metadata = {
  title: '遊戲攻略 - GameGuide Hub',
  description: '瀏覽最新最完整的遊戲攻略，涵蓋各種遊戲類型和難度等級。',
  keywords: '遊戲攻略, 攻略大全, 遊戲指南, 遊戲技巧',
};

export default function StrategiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <div className="container-max section-padding py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            遊戲攻略
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-lg">
            探索最新最完整的遊戲攻略，提升你的遊戲技巧
          </p>
        </div>

        {/* Strategy Grid */}
        <StrategyGrid 
          strategies={mockStrategies} 
          showFilters={true}
          itemsPerPage={12}
        />
      </div>
    </div>
  );
}