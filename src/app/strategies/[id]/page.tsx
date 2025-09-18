import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StrategyDetailView from '@/components/StrategyDetailView';
import { mockStrategies } from '@/data/mock';

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const strategy = mockStrategies.find(s => s.id === id);
  
  if (!strategy) {
    return {
      title: '攻略不存在 - GameGuide Hub'
    };
  }

  return {
    title: `${strategy.title} - GameGuide Hub`,
    description: strategy.excerpt,
    keywords: strategy.tags.join(', '),
    openGraph: {
      title: strategy.title,
      description: strategy.excerpt,
      images: [strategy.thumbnail],
      type: 'article',
      publishedTime: strategy.createdAt,
      modifiedTime: strategy.updatedAt,
      authors: [strategy.author.name],
    },
  };
}

export async function generateStaticParams() {
  return mockStrategies.map((strategy) => ({
    id: strategy.id,
  }));
}

export default async function StrategyPage({ params }: Props) {
  const { id } = await params;
  const strategy = mockStrategies.find(s => s.id === id);

  if (!strategy) {
    notFound();
  }

  return <StrategyDetailView strategy={strategy} />;
}