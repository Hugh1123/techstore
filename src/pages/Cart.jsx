import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const SHIPPING_FEE = 60;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  const subtotal = getCartTotal();
  const total = subtotal + (cart.length > 0 ? SHIPPING_FEE : 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">我的購物車</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center card-shadow">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 text-lg mb-6">購物車是空的</p>
            <Link
              to="/"
              className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              去逛逛
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 商品列表 */}
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.productId}
                  className="bg-white rounded-lg p-4 card-shadow flex gap-4 animate-fade-in"
                >
                  {/* 商品圖片 */}
                  <Link
                    to={`/product/${item.productId}`}
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* 商品資訊 */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-semibold text-gray-800 hover:text-primary line-clamp-2 mb-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-500 mb-1">
                        {item.product.condition} · {item.product.category}
                      </p>
                      <p className="text-primary font-bold text-lg">
                        NT$ {item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* 數量控制 */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                      >
                        移除
                      </button>
                    </div>
                  </div>

                  {/* 小計（桌面版） */}
                  <div className="hidden sm:flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">小計</p>
                      <p className="text-xl font-bold text-primary">
                        NT$ {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 總計區域 */}
            <div className="bg-white rounded-lg p-6 card-shadow">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">訂單摘要</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>運費</span>
                  <span>NT$ {SHIPPING_FEE}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span>總計</span>
                  <span className="text-primary">NT$ {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium text-center transition-colors"
                >
                  繼續購物
                </Link>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-lg font-medium transition-colors"
                >
                  前往結帳
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
