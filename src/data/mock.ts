import { Game, Strategy, User, GameCategory, Platform, Difficulty } from '@/types';

// 模擬遊戲數據
export const mockGames: Game[] = [
  {
    id: 'game-1',
    title: '薩爾達傳說：王國之淚',
    name: '薩爾達傳說：王國之淚',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
    description: '在這個廣闊的海拉魯王國中，探索天空、大地和地底的秘密，體驗前所未有的冒險。利用全新的組合能力創造無限可能，在三層世界中自由探索，解開古老的謎團。',
    tags: ['冒險', '開放世界', '解謎', '任天堂', '動作'],
    category: GameCategory.ADVENTURE,
    platform: [Platform.CONSOLE],
    releaseDate: '2023-05-12'
  },
  {
    id: 'game-2',
    title: 'Cyberpunk 2077',
    name: 'Cyberpunk 2077',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    description: '在夜城這個充滿霓虹燈的大都市中，成為傳奇網路駭客，體驗未來世界的黑暗與光明。定制你的角色，選擇不同的遊戲風格，在這個充滿選擇與後果的開放世界中書寫你的傳奇。',
    tags: ['RPG', '未來', '開放世界', '劇情', '射擊'],
    category: GameCategory.RPG,
    platform: [Platform.PC, Platform.CONSOLE],
    releaseDate: '2020-12-10'
  },
  {
    id: 'game-3',
    title: '英雄聯盟',
    name: '英雄聯盟',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    description: '5v5 戰術競技遊戲，選擇你的英雄，與團隊合作摧毀敵方水晶。超過150個獨特英雄，無盡的策略組合，與全球數億玩家一同競技，登上最高榮耀。',
    tags: ['MOBA', '競技', '團隊', '策略', 'Esports'],
    category: GameCategory.MOBA,
    platform: [Platform.PC],
    releaseDate: '2009-10-27'
  },
  {
    id: 'game-4',
    title: 'Genshin Impact',
    name: 'Genshin Impact',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    description: '開放世界冒險 RPG，在提瓦特大陸上與各種元素力量戶鬥，尋找失散的兄妹。探索七個國度，收集數百個角色，體驗豐富的劇情和精美的音樂，感受二次元世界的魅力。',
    tags: ['RPG', '開放世界', '二次元', '元素', '冒險'],
    category: GameCategory.RPG,
    platform: [Platform.PC, Platform.MOBILE, Platform.CONSOLE],
    releaseDate: '2020-09-28'
  },
  {
    id: 'game-5',
    title: 'Apex Legends',
    name: 'Apex Legends',
    thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop',
    description: '免費大逃殺射擊遊戲，選擇獨特的傳奇角色，在不斷變化的地圖上與60名玩家展開激烈戰鬥。團隊合作、戰術思考、精準射擊，成為最後的冠軍小隊。',
    tags: ['射擊', '大逃殺', '團隊', '競技', '免費'],
    category: GameCategory.FPS,
    platform: [Platform.PC, Platform.CONSOLE, Platform.MOBILE],
    releaseDate: '2019-02-04'
  },
  {
    id: 'game-6',
    title: 'Elden Ring',
    name: 'Elden Ring',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'FromSoftware 與喬治·R·R·馬丁合作打造的黑暗奇幻 RPG。在廣闊的交界地探索，面對強大的敵人，解開神秘的故事，體驗前所未有的魂系遊戲。',
    tags: ['RPG', '魂系', '開放世界', '黑暗奇幻', '挑戰'],
    category: GameCategory.RPG,
    platform: [Platform.PC, Platform.CONSOLE],
    releaseDate: '2022-02-25'
  },
  {
    id: 'game-7',
    title: 'Valorant',
    name: 'Valorant',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
    description: '5v5 角色射擊遊戲，結合精準射擊與獨特能力。選擇特工，使用戰術技能，在競技模式中證明你的實力，成為戰術射擊遊戲的王者。',
    tags: ['射擊', '競技', '戰術', '團隊', 'Esports'],
    category: GameCategory.FPS,
    platform: [Platform.PC],
    releaseDate: '2020-06-02'
  },
  {
    id: 'game-8',
    title: 'Minecraft',
    name: 'Minecraft',
    thumbnail: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&h=600&fit=crop',
    description: '無限創造的沙盒遊戲，在方塊世界中建造、探索、生存。從簡單的房屋到宏偉的城堡，只有想像力才是你的極限，與朋友一起創造屬於你們的世界。',
    tags: ['沙盒', '建造', '創造', '探索', '多人'],
    category: GameCategory.SIMULATION,
    platform: [Platform.PC, Platform.MOBILE, Platform.CONSOLE],
    releaseDate: '2011-11-18'
  },
  {
    id: 'game-9',
    title: 'FIFA 24',
    name: 'FIFA 24',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    description: '最真實的足球模擬遊戲，擁有全球頂級聯賽和球員。體驗 HyperMotion V 技術帶來的流暢動作，在終極隊伍模式中建立你的夢幻陣容。',
    tags: ['體育', '足球', '模擬', '競技', '多人'],
    category: GameCategory.SPORTS,
    platform: [Platform.PC, Platform.CONSOLE],
    releaseDate: '2023-09-29'
  },
  {
    id: 'game-10',
    title: 'CS:GO',
    name: 'CS:GO',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    description: '經典射擊遊戲，恐怖份子與反恐精英的對決，考驗你的射擊技巧和戰術思維。',
    tags: ['FPS', '競技', '戰術'],
    category: GameCategory.FPS,
    platform: [Platform.PC],
    releaseDate: '2012-08-21'
  }
];

// 模擬用戶數據
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '遊戲大師',
    email: 'gamemaster@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    bio: '資深遊戲玩家，專精於RPG和動作遊戲攻略製作。',
    favorites: ['strategy-1', 'strategy-3'],
    following: ['user-2'],
    followers: ['user-2', 'user-3'],
    createdAt: '2023-01-15T00:00:00Z',
    stats: {
      strategiesCount: 15,
      likesReceived: 234,
      followersCount: 89
    }
  },
  {
    id: 'user-2',
    name: '攻略小幫手',
    email: 'helper@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c01d5b2a?w=100&h=100&fit=crop&crop=face',
    bio: '喜歡分享遊戲心得和小技巧的新手玩家。',
    favorites: ['strategy-2'],
    following: ['user-1'],
    followers: ['user-1'],
    createdAt: '2023-03-20T00:00:00Z',
    stats: {
      strategiesCount: 8,
      likesReceived: 67,
      followersCount: 23
    }
  }
];

// 模擬攻略數據
export const mockStrategies: Strategy[] = [
  {
    id: 'strategy-1',
    gameId: 'game-1',
    title: '薩爾達傳說：王國之淚 完整收集攻略',
    content: `# 薩爾達傳說：王國之淚 完整收集攻略

## 概述
這份攻略將帶你收集遊戲中的所有重要物品和成就。

## 必收集物品清單

### 1. 神廟收集
遊戲中共有152個神廟，每個神廟都會給予祝福之光。

### 2. 呀哈哈種子
全地圖共有1000個呀哈哈種子，用於擴充背包容量。

### 3. 賢者意志
四個主要賢者的特殊能力，是主線劇情的重要道具。

## 詳細攻略步驟

### 第一章：天空島探索
1. 完成教學神廟
2. 收集初始裝備
3. 學習融合能力

### 第二章：中央海拉魯
1. 前往監視堡壘
2. 啟動天望鏡
3. 尋找四個賢者

...更多內容`,
    excerpt: '完整的薩爾達傳說：王國之淚收集攻略，包含所有神廟、呀哈哈種子和重要物品的位置。',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: '遊戲大師',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face'
    },
    rating: 4.8,
    views: 15420,
    likes: 892,
    difficulty: Difficulty.INTERMEDIATE,
    category: '收集攻略',
    tags: ['收集', '神廟', '呀哈哈', '完整攻略'],
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-20T14:20:00Z',
    isHot: true,
    isRecommended: true
  },
  {
    id: 'strategy-2',
    gameId: 'game-3',
    title: '英雄聯盟新手上手指南 2024',
    content: `# 英雄聯盟新手上手指南 2024

## 遊戲基礎概念

### 地圖介紹
召喚峽谷是英雄聯盟的主要戰場，分為三條路線：
- 上路 (Top Lane)
- 中路 (Mid Lane) 
- 下路 (Bot Lane)

### 角色定位
1. **上單** - 坦克或戰士
2. **打野** - 支援各路線
3. **中單** - 法師或刺客
4. **ADC** - 物理輸出
5. **輔助** - 保護ADC

## 新手建議英雄

### 上路推薦
- 蓋倫 (Garen) - 操作簡單的戰士
- 馬爾菲特 (Malphite) - 坦克型英雄

### 中路推薦  
- 安妮 (Annie) - 簡單的法師
- 亞索 (Yasuo) - 進階玩家可嘗試

...更多內容`,
    excerpt: '專為2024年新玩家設計的英雄聯盟入門指南，涵蓋基礎概念、英雄選擇和實戰技巧。',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    authorId: 'user-2',
    author: {
      id: 'user-2',
      name: '攻略小幫手',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c01d5b2a?w=50&h=50&fit=crop&crop=face'
    },
    rating: 4.5,
    views: 8934,
    likes: 445,
    difficulty: Difficulty.BEGINNER,
    category: '新手教學',
    tags: ['新手', '基礎', '英雄推薦', '2024'],
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-02-01T16:45:00Z',
    isHot: true
  },
  {
    id: 'strategy-3',
    gameId: 'game-4',
    title: '原神深淵 12 層滿星攻略',
    content: `# 原神深淵 12 層滿星攻略

## 當期深淵概況

### 12-1 上半場
敵人：愚人眾執行官
推薦隊伍：雷電將軍 + 班尼特 + 香菱 + 行秋

### 12-1 下半場  
敵人：深海魔龍
推薦隊伍：胡桃 + 鍾離 + 夜蘭 + 托馬

## 詳細打法說明

### 隊伍一：國家隊
1. **角色配置**
   - 雷電將軍：主C，負責主要輸出
   - 班尼特：奶媽+攻擊力BUFF
   - 香菱：副C，火元素輸出
   - 行秋：輔助，提供減傷和蒸發反應

2. **輪轉順序**
   班尼特Q → 香菱Q → 行秋QE → 雷電將軍QE循環

### 隊伍二：胡桃蒸發隊
...更多內容`,
    excerpt: '最新版本原神深淵12層的詳細攻略，包含隊伍搭配、輪轉手法和實戰技巧。',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: '遊戲大師',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face'
    },
    rating: 4.9,
    views: 23567,
    likes: 1234,
    difficulty: Difficulty.EXPERT,
    category: '高難度挑戰',
    tags: ['深淵', '滿星', '隊伍搭配', '高難度'],
    createdAt: '2024-02-10T20:00:00Z',
    updatedAt: '2024-02-15T11:30:00Z',
    isHot: true,
    isRecommended: true
  },
  {
    id: 'strategy-4',
    gameId: 'game-5',
    title: 'CS:GO 瞄準訓練完整指南',
    content: `# CS:GO 瞄準訓練完整指南

## 基礎設定

### 滑鼠設定
- DPI: 400-800 (推薦 400)
- 遊戲內靈敏度: 1.5-3.0
- Windows 滑鼠設定: 6/11，關閉加速

### 準心設定
推薦準心程式碼：
\`\`\`
cl_crosshairsize 2
cl_crosshairgap -1
cl_crosshairthickness 0
cl_crosshair_drawoutline 1
\`\`\`

## 訓練地圖推薦

### 1. Aim_Botz
- Steam 工作坊最熱門的瞄準地圖
- 提供移動靶和靜止靶練習

### 2. Fast Aim/Reflex Training
- 專門訓練反應速度
- 適合熱身使用

## 訓練計劃

### 每日訓練流程 (30分鐘)
1. **熱身** (5分鐘)
   - Aim_Botz 打靜止靶
   
2. **反應訓練** (10分鐘)
   - Fast Aim 地圖練習
   
3. **實戰模擬** (15分鐘)
   - DM 伺服器對戰

...更多內容`,
    excerpt: '提升CS:GO瞄準能力的系統性訓練指南，包含設定優化、訓練地圖推薦和練習計劃。',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    authorId: 'user-1',
    author: {
      id: 'user-1',
      name: '遊戲大師',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face'
    },
    rating: 4.7,
    views: 12890,
    likes: 678,
    difficulty: Difficulty.INTERMEDIATE,
    category: '技巧訓練',
    tags: ['瞄準', '訓練', '設定', '技巧'],
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-08T09:10:00Z'
  },
  {
    id: 'strategy-5',
    gameId: 'game-2',
    title: 'Cyberpunk 2077 完美結局達成攻略',
    content: `# Cyberpunk 2077 完美結局達成攻略

## 結局概述

Cyberpunk 2077 有多個不同的結局，要達成最佳結局需要完成特定的支線任務和做出正確的選擇。

## 前置準備

### 必要支線任務
1. **與強尼相關的所有支線**
   - "Chippin' In"
   - "Blistering Love" 
   - "Holdin' On"
   - "Playing for Keeps"

2. **與羅格相關任務**
   - 夜城傳奇系列任務

3. **與潘南相關任務**
   - 流浪者營地系列任務

## 關鍵選擇點

### 第一個重要選擇：與強尼的關係
在屋頂與強尼對話時選擇：
- "我信任你的判斷"
- "聽起來不錯"

### 第二個重要選擇：最終任務
根據你想要的結局選擇不同路線：

1. **太陽結局** - 與羅格合作
2. **星辰結局** - 與潘南合作  
3. **魔鬼結局** - 相信荒坂

...更多內容`,
    excerpt: '詳細解析 Cyberpunk 2077 的各種結局路線，教你如何達成心目中的完美結局。',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    authorId: 'user-2',
    author: {
      id: 'user-2',
      name: '攻略小幫手',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c01d5b2a?w=50&h=50&fit=crop&crop=face'
    },
    rating: 4.6,
    views: 9876,
    likes: 432,
    difficulty: Difficulty.ADVANCED,
    category: '劇情攻略',
    tags: ['結局', '支線任務', '選擇', '劇情'],
    createdAt: '2023-12-20T16:30:00Z',
    updatedAt: '2024-01-02T13:45:00Z'
  }
];

// 獲取熱門攻略
export function getHotStrategies(limit: number = 3): Strategy[] {
  return mockStrategies
    .filter(strategy => strategy.isHot)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

// 獲取推薦攻略
export function getRecommendedStrategies(limit: number = 4): Strategy[] {
  return mockStrategies
    .filter(strategy => strategy.isRecommended)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// 根據遊戲ID獲取攻略
export function getStrategiesByGameId(gameId: string): Strategy[] {
  return mockStrategies.filter(strategy => strategy.gameId === gameId);
}

// 根據作者ID獲取攻略
export function getStrategiesByAuthorId(authorId: string): Strategy[] {
  return mockStrategies.filter(strategy => strategy.authorId === authorId);
}

// 搜尋攻略
export function searchStrategies(query: string): Strategy[] {
  const lowerQuery = query.toLowerCase();
  return mockStrategies.filter(strategy =>
    strategy.title.toLowerCase().includes(lowerQuery) ||
    strategy.excerpt.toLowerCase().includes(lowerQuery) ||
    strategy.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}