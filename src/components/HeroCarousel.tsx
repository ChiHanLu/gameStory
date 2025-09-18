'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/store/theme';
import { mockGames } from '@/data/mock';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  className?: string;
}

export default function HeroCarousel({ className = '' }: HeroCarouselProps) {
  const { language } = useThemeStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  // 取得熱門遊戲前5個作為輪播內容
  const featuredGames = mockGames.slice(0, 5).map(game => ({
    ...game,
    heroImage: game.thumbnail,
    ctaText: language === 'zh-TW' ? '探索攻略' : 'Explore Guides',
    description: game.description
  }));

  useEffect(() => {
    // 初始化後自動播放
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);

  return (
    <section className={`relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 bg-white/50 rounded-full transition-all duration-300 hover:bg-white/80"></span>`;
          },
        }}
        className="w-full h-full"
      >
        {featuredGames.map((game, index) => (
          <SwiperSlide key={game.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={game.heroImage}
                  alt={game.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container-max section-padding">
                  <div className="max-w-2xl">
                    {/* Game Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm mb-4">
                      <span className="text-primary-300 text-sm font-medium">
                        {game.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {game.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                      {game.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {game.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/games/${game.id}`}
                        className="inline-flex items-center space-x-2 btn-primary text-base px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      >
                        <PlayIcon className="w-5 h-5" />
                        <span>{game.ctaText}</span>
                      </Link>
                      
                      <Link
                        href={`/games/${game.id}/strategies`}
                        className="inline-flex items-center space-x-2 btn-secondary bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4"
                      >
                        <span>{language === 'zh-TW' ? '查看攻略' : 'View Guides'}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Icons */}
              <div className="absolute bottom-6 right-6 flex space-x-2">
                {game.platform.map((platform) => (
                  <div
                    key={platform}
                    className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-xs text-white/80 font-medium">
                      {platform.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className="hero-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        className="hero-next absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"></div>

      {/* Play/Pause Control */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => {
            const swiper = swiperRef.current?.swiper;
            if (swiper) {
              if (swiper.autoplay.running) {
                swiper.autoplay.stop();
              } else {
                swiper.autoplay.start();
              }
            }
          }}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
          aria-label="Toggle autoplay"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="play-pause-icon">
              <PlayIcon className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div className="hero-progress h-full bg-gradient-to-r from-primary-400 to-secondary-400 transition-all duration-300 ease-out w-0"></div>
      </div>
    </section>
  );
}

// 進度條更新的自定義樣式
const style = `
  .hero-carousel .swiper-pagination-bullet-active {
    background: #10B981 !important;
    opacity: 1 !important;
    transform: scale(1.2);
  }
  
  .hero-carousel .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5) !important;
    opacity: 0.7 !important;
    transition: all 0.3s ease !important;
  }
  
  .hero-carousel .swiper-pagination-bullet:hover {
    background: rgba(255, 255, 255, 0.8) !important;
    transform: scale(1.1);
  }
`;

// 注入樣式
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}