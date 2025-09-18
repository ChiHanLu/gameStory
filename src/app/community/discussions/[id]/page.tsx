import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { formatDate } from '@/utils/format';

// 模擬討論數據 (實際應該從 API 獲取)
const mockDiscussion = {
  id: 'disc-1',
  title: '英雄聯盟 S14 世界賽預測討論',
  content: `# 英雄聯盟 S14 世界賽預測討論

大家好！隨著 S14 世界賽的臨近，我想和大家討論一下今年哪支隊伍最有希望奪冠。

## 我的觀點

個人看好 **T1**，主要原因：
1. Faker 的經驗和領導力無可替代
2. 隊伍配合越來越默契
3. 在關鍵比賽中的抗壓能力很強

但是 **JDG** 的表現也很亮眼：
- 個人實力都很強
- 戰術執行力很好
- 適應版本的能力快

## 其他強隊

- **Gen.G**: 韓國賽區的另一支強隊
- **BLG**: 中國賽區的黑馬
- **G2**: 歐洲的希望

大家覺得哪支隊伍最有機會？歡迎在下面分享你們的看法！`,
  author: {
    id: 'user-1',
    name: '遊戲達人小王',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
  },
  category: 'esports',
  tags: ['英雄聯盟', '世界賽', 'Esports'],
  replies: 47,
  views: 1205,
  likes: 23,
  isLiked: false,
  isBookmarked: false,
  isPinned: true,
  isHot: true,
  createdAt: '2024-01-15T10:30:00Z',
  lastReply: '2024-01-15T14:22:00Z'
};

const mockReplies = [
  {
    id: 'reply-1',
    content: '我也覺得 T1 很有機會！Faker 真的是永遠的神，而且這個陣容的化學反應越來越好了。',
    author: {
      id: 'user-2',
      name: 'LOL老玩家',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2ac?w=100&h=100&fit=crop&crop=face'
    },
    likes: 8,
    isLiked: false,
    createdAt: '2024-01-15T11:15:00Z',
    replies: []
  },
  {
    id: 'reply-2',
    content: 'JDG 的個人實力確實很強，但我覺得在大賽經驗上還是 T1 更勝一籌。不過今年的競爭真的很激烈！',
    author: {
      id: 'user-3',
      name: '電競分析師',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    likes: 12,
    isLiked: true,
    createdAt: '2024-01-15T12:30:00Z',
    replies: [
      {
        id: 'reply-2-1',
        content: '同意！經驗在世界賽這種級別的比賽中真的很重要。',
        author: {
          id: 'user-4',
          name: '遊戲愛好者',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        likes: 3,
        isLiked: false,
        createdAt: '2024-01-15T13:45:00Z'
      }
    ]
  }
];

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${mockDiscussion.title} - 社群討論 | GameGuide Hub`,
    description: mockDiscussion.content.slice(0, 160),
  };
}

export default async function DiscussionDetailPage({ params }: Props) {
  const { id } = await params;
  
  // 實際應用中應該根據 ID 從 API 獲取數據
  if (id !== mockDiscussion.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary-500">首頁</Link>
            <span>/</span>
            <Link href="/community" className="hover:text-primary-500">社群</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">討論詳情</span>
          </div>
        </nav>

        {/* Main Discussion */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              {mockDiscussion.isPinned && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium rounded">
                  📌 置頂
                </span>
              )}
              {mockDiscussion.isHot && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded">
                  🔥 熱門
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {mockDiscussion.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href={`/user/${mockDiscussion.author.id}`} className="flex items-center gap-3">
                  <img
                    src={mockDiscussion.author.avatar}
                    alt={mockDiscussion.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {mockDiscussion.author.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(mockDiscussion.createdAt)}
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  <span>{mockDiscussion.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>{mockDiscussion.replies}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {/* 這裡應該使用 Markdown 渲染器，簡化顯示 */}
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {mockDiscussion.content.replace(/#+ /g, '').replace(/\*\*/g, '')}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {mockDiscussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <HeartIcon className="w-5 h-5" />
                  <span>{mockDiscussion.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <BookmarkIcon className="w-5 h-5" />
                  <span>收藏</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                  <ShareIcon className="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>
              
              <button className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                <ArrowUturnLeftIcon className="w-5 h-5" />
                <span>回覆</span>
              </button>
            </div>
          </div>
        </article>

        {/* Reply Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            發表回覆
          </h3>
          <textarea
            placeholder="分享你的想法..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="flex justify-end mt-4">
            <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              發送回覆
            </button>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            回覆 ({mockReplies.length})
          </h3>
          
          {mockReplies.map((reply) => (
            <div key={reply.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Link href={`/user/${reply.author.id}`}>
                    <img
                      src={reply.author.avatar}
                      alt={reply.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/user/${reply.author.id}`}
                        className="font-semibold text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
                      >
                        {reply.author.name}
                      </Link>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {reply.content}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                        <HeartIcon className="w-4 h-4" />
                        <span>{reply.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                        回覆
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Nested Replies */}
                {reply.replies && reply.replies.length > 0 && (
                  <div className="ml-14 mt-4 space-y-4">
                    {reply.replies.map((nestedReply) => (
                      <div key={nestedReply.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Link href={`/user/${nestedReply.author.id}`}>
                          <img
                            src={nestedReply.author.avatar}
                            alt={nestedReply.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Link
                              href={`/user/${nestedReply.author.id}`}
                              className="font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
                            >
                              {nestedReply.author.name}
                            </Link>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(nestedReply.createdAt)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {nestedReply.content}
                          </p>
                          
                          <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                            <HeartIcon className="w-3 h-3" />
                            <span>{nestedReply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}