import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: '首頁', href: '/' },
      { label: '遊戲攻略', href: '/strategies' },
      { label: '遊戲列表', href: '/games' },
      { label: '社群', href: '/community' },
    ],
    support: [
      { label: '幫助中心', href: '/help' },
      { label: '聯絡我們', href: '/contact' },
      { label: '意見回饋', href: '/feedback' },
      { label: 'FAQ', href: '/faq' },
    ],
    legal: [
      { label: '隱私政策', href: '/privacy' },
      { label: '服務條款', href: '/terms' },
      { label: '版權聲明', href: '/copyright' },
      { label: 'Cookie 政策', href: '/cookies' },
    ],
    social: [
      { label: 'Discord', href: 'https://discord.gg/gameguide', external: true },
      { label: 'Twitter', href: 'https://twitter.com/gameguide', external: true },
      { label: 'YouTube', href: 'https://youtube.com/@gameguide', external: true },
      { label: 'Twitch', href: 'https://twitch.tv/gameguide', external: true },
    ],
  };

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-300">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GG</span>
              </div>
              <span className="font-bold text-xl text-white">
                GameGuide Hub
              </span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              專業的遊戲攻略分享平台，匯聚全球玩家智慧，提供最完整、最實用的遊戲攻略和心得分享。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="w-4 h-4 text-primary-400" />
                <span>support@gameguide-hub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="w-4 h-4 text-primary-400" />
                <span>台北市信義區松仁路100號</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">產品</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">支援</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">法律條款</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-white mb-2">加入我們的社群</h3>
              <div className="flex space-x-4">
                {footerLinks.social.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md">
              <h3 className="font-semibold text-white mb-2">訂閱攻略通知</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="輸入您的電子郵件"
                  className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-l-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg transition-colors text-sm font-medium"
                >
                  訂閱
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                訂閱最新的遊戲攻略和活動資訊
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700 bg-neutral-950 dark:bg-neutral-950">
        <div className="container-max section-padding py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-neutral-500">
            <div className="flex items-center space-x-1 mb-2 md:mb-0">
              <span>© {currentYear} GameGuide Hub. All rights reserved.</span>
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-500 fill-current" />
              <span>by GameGuide Team</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span>Version 1.0.0</span>
              <Link
                href="/status"
                className="flex items-center space-x-1 hover:text-primary-400 transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}