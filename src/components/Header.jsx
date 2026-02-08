import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const { getCartItemCount, getUnreadCount, currentUser } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartCount = getCartItemCount();
  const unreadCount = getUnreadCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">TechStore</span>
          </Link>

          {/* 搜尋列 */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋商品..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* 右側按鈕 */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* 上傳商品按鈕 */}
            <Link
              to="/upload"
              className="bg-primary hover:bg-secondary text-white px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <span className="hidden sm:inline">上傳商品</span>
              <span className="sm:hidden">+</span>
            </Link>

            {/* 聊聊按鈕 */}
            <Link
              to="/chat"
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              title="聊聊"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* 購物車按鈕 */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              title="購物車"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* 用戶頭像 */}
            <div className="flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer hover:border-primary transition-colors"
                title={currentUser.name}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
