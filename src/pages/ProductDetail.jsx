import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addToCart, createOrGetChat } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">商品不存在</p>
          <Link to="/" className="text-primary hover:underline">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.id);
    navigate('/cart');
  };

  const handleChat = () => {
    const chatId = createOrGetChat(
      product.seller.id,
      product.seller.name,
      product.seller.avatar
    );
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 返回按鈕 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左側：圖片輪播 */}
          <div className="space-y-4">
            {/* 主圖 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden card-shadow">
              <img
                src={product.images[currentImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 縮圖導航 */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 右側：商品資訊 */}
          <div className="space-y-6">
            {/* 標題與價格 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <div className="text-3xl font-bold text-primary">
                NT$ {product.price.toLocaleString()}
              </div>
            </div>

            {/* 賣家資訊 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-4">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{product.seller.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span>⭐</span>
                    <span>{product.seller.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 商品狀態 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-semibold text-gray-800">商品狀態</span>
              </div>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                {product.condition}
              </span>
            </div>

            {/* 商品分類 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-semibold text-gray-800">商品分類</span>
              </div>
              <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                {product.category}
              </span>
            </div>

            {/* 商品描述 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="font-semibold text-gray-800">商品描述</span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* 操作按鈕 */}
            <div className="sticky bottom-0 bg-white rounded-lg p-4 card-shadow flex gap-3">
              <button
                onClick={handleChat}
                className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                聊聊
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-lg font-medium transition-colors"
              >
                加入購物車
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-lg font-medium transition-colors"
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 加入購物車提示 Toast */}
      {showAddedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in z-50">
          ✓ 已加入購物車
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
