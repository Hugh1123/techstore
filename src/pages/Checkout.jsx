import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const SHIPPING_FEE = 60;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_FEE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '請輸入電話';
    } else if (!/^09\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = '請輸入有效的手機號碼（例如：0912345678）';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '請輸入有效的電子郵件';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = '請輸入地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsProcessing(true);

    // 模擬處理訂單
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 清空購物車
    clearCart();

    // 顯示成功訊息並導向首頁
    alert('✓ 訂單已送出！\n\n我們會盡快為您處理訂單。');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">購物車是空的</p>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">結帳</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左側：收件資訊表單 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 card-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">收件資訊</h2>

              <div className="space-y-4">
                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    收件人姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="請輸入姓名"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* 電話 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    聯絡電話 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912345678"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* 電子郵件 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電子郵件 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* 地址 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    收件地址 *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="請輸入完整地址（含縣市、區域、街道、門牌號碼）"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* 備註 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    備註（選填）
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="有任何特殊需求嗎？"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-primary hover:bg-secondary text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? '處理中...' : '確認訂單'}
              </button>
            </form>
          </div>

          {/* 右側：訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 card-shadow sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">訂單摘要</h2>

              {/* 商品列表 */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                        {item.product.title}
                      </p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>x {item.quantity}</span>
                        <span>NT$ {(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 金額明細 */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>運費</span>
                  <span>NT$ {SHIPPING_FEE}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
                  <span>總計</span>
                  <span className="text-primary">NT$ {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
