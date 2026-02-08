import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES = ['3C產品', '遊戲', '運動用品', '服飾', '書籍', '其他'];
const CONDITIONS = ['全新', '二手-近全新', '二手-良好', '二手-普通'];

const Upload = () => {
  const navigate = useNavigate();
  const { addProduct } = useStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: CONDITIONS[0],
    category: CATEGORIES[0],
  });
  
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const maxImages = 5;
    
    if (images.length + fileArray.length > maxImages) {
      alert(`最多只能上傳 ${maxImages} 張照片`);
      return;
    }

    fileArray.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert('只能上傳圖片檔案');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    handleImageUpload(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '請輸入商品標題';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '請輸入商品描述';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = '請輸入有效的價格';
    }
    
    if (images.length === 0) {
      newErrors.images = '請至少上傳一張照片';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const product = {
      id: uuidv4(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      condition: formData.condition,
      category: formData.category,
      images: images,
      seller: {
        id: 'current_user',
        name: '我',
        avatar: 'https://ui-avatars.com/api/?name=ME&background=FF6B35&color=fff',
        rating: 5.0
      },
      createdAt: new Date().toISOString()
    };

    addProduct(product);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">上傳你的商品</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 上傳照片 */}
          <div className="bg-white rounded-lg p-6 card-shadow">
            <label className="block font-semibold text-gray-800 mb-3">
              📸 上傳照片（最多5張）
            </label>
            
            {/* 拖放區域 */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-orange-50'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-2">拖放照片到此處，或</p>
              <label className="inline-block bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
                選擇檔案
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}

            {/* 照片預覽 */}
            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 商品資訊 */}
          <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">📝 商品資訊</h3>

            {/* 商品標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品標題 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：iPhone 15 Pro Max 256GB"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* 商品描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品描述 *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="詳細描述商品的狀況、配件、使用情形等..."
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* 價格 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                價格 *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  NT$
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* 商品狀態 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品狀態 *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CONDITIONS.map(condition => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>

            {/* 商品分類 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品分類 *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-lg font-medium transition-colors"
            >
              上傳商品
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
