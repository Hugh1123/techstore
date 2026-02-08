import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const CATEGORIES = ['全部', '3C產品', '遊戲', '運動用品', '服飾', '書籍', '其他'];

const Home = () => {
  const [searchParams] = useSearchParams();
  const { products } = useStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  useEffect(() => {
    let result = [...products];
    
    // 搜尋過濾
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 分類過濾
    if (selectedCategory !== '全部') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchParams]);

  const searchQuery = searchParams.get('search');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 搜尋結果提示 */}
        {searchQuery && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              搜尋 "<span className="font-semibold text-primary">{searchQuery}</span>" 的結果：
              共 {filteredProducts.length} 件商品
            </p>
          </div>
        )}

        {/* 分類篩選 */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-lg">沒有找到商品</p>
            <p className="text-gray-400 text-sm mt-2">試試其他搜尋關鍵字或分類</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-lg overflow-hidden card-shadow animate-fade-in hover:-translate-y-1 transition-transform"
              >
                {/* 商品圖片 */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {product.condition}
                  </span>
                </div>

                {/* 商品資訊 */}
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 h-10">
                    {product.title}
                  </h3>
                  <p className="text-primary font-bold text-lg">
                    NT$ {product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-4 h-4 rounded-full"
                    />
                    <span>{product.seller.name}</span>
                    <span className="ml-auto">⭐ {product.seller.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
