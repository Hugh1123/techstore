# TechStore - 全新拍賣平台 🛍️

一個功能完整的現代化拍賣平台，參考旋轉拍賣風格設計。

## ✨ 核心功能

### 1. 📸 上傳商品
- 支援拖放上傳，最多 5 張照片
- 完整的商品資訊表單（標題、描述、價格、狀態、分類）
- 即時照片預覽
- 表單驗證

### 2. 🏪 商品列表
- 響應式 Grid 布局（手機/平板/桌面）
- 即時搜尋功能
- 分類篩選（3C產品、遊戲、運動用品等）
- 商品卡片顯示：圖片、標題、價格、狀態、賣家資訊

### 3. 📦 商品詳情
- 大圖輪播系統
- 完整商品資訊展示
- 賣家資訊與評分
- 三個行動按鈕：聊聊、加入購物車、立即購買

### 4. 🛒 購物車系統
- 獨立購物車頁面
- 數量調整（+/- 按鈕）
- 即時總金額計算（含運費）
- 移除商品功能

### 5. 💬 聊聊系統
- 左右分欄式介面
- 對話列表（顯示最後訊息、時間、未讀數量）
- 即時聊天功能
- 響應式設計（手機版單欄切換）

### 6. 💳 結帳流程
- 完整收件資訊表單
- 表單驗證（姓名、電話、Email、地址）
- 訂單摘要顯示
- 模擬下單流程

## 🎨 設計特色

- **視覺風格**：參考旋轉拍賣，橘紅色主色調 (#FF6B35)
- **響應式設計**：完美支援手機/平板/桌面
- **流暢動畫**：過場動畫、懸停效果、載入提示
- **現代 UI**：卡片式布局、圓角設計、輕微陰影
- **使用者體驗**：直覺的導航、即時反饋、清晰的視覺層次

## 🛠️ 技術棧

- **React 18** - 現代化前端框架
- **Vite** - 快速建置工具
- **React Router** - 客戶端路由
- **Tailwind CSS** - 工具優先的 CSS 框架
- **Context API** - 全域狀態管理
- **LocalStorage** - 資料持久化

## 📁 專案結構

```
techstore/
├── src/
│   ├── components/       # 元件
│   │   └── Header.jsx   # 導航列
│   ├── context/         # Context API
│   │   └── StoreContext.jsx
│   ├── pages/           # 頁面
│   │   ├── Home.jsx            # 首頁（商品列表）
│   │   ├── ProductDetail.jsx  # 商品詳情
│   │   ├── Upload.jsx          # 上傳商品
│   │   ├── Cart.jsx            # 購物車
│   │   ├── Checkout.jsx        # 結帳
│   │   └── Chat.jsx            # 聊聊系統
│   ├── utils/           # 工具函數
│   │   └── storage.js   # LocalStorage 工具
│   ├── App.jsx          # 主應用程式
│   ├── main.jsx         # 入口點
│   └── index.css        # 全域樣式
├── public/              # 靜態資源
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── package.json         # 專案配置
```

## 🚀 開始使用

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器
```bash
npm run dev
```

開啟瀏覽器訪問：http://localhost:3000

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 📱 頁面路由

- `/` - 首頁（商品列表）
- `/product/:id` - 商品詳情頁
- `/upload` - 上傳商品
- `/cart` - 購物車
- `/checkout` - 結帳頁面
- `/chat` - 聊聊系統（對話列表）
- `/chat/:chatId` - 特定聊天室

## 💾 資料結構

### 商品資料
```javascript
{
  id: "uuid",
  title: "商品標題",
  description: "商品描述",
  price: 1200,
  condition: "全新",
  category: "3C產品",
  images: ["base64_image"],
  seller: {
    id: "seller_id",
    name: "賣家名稱",
    avatar: "avatar_url",
    rating: 4.8
  },
  createdAt: "2026-02-08T10:00:00Z"
}
```

### 購物車資料
```javascript
{
  productId: "uuid",
  quantity: 2,
  product: { /* 商品完整資訊 */ }
}
```

### 聊天資料
```javascript
{
  chatId: "uuid",
  participants: ["user1", "user2"],
  sellerName: "賣家名稱",
  sellerAvatar: "avatar_url",
  messages: [
    {
      id: "msg_uuid",
      sender: "user1",
      text: "訊息內容",
      timestamp: "2026-02-08T10:30:00Z"
    }
  ],
  unreadCount: 0,
  lastMessage: "最後訊息",
  lastMessageTime: "2026-02-08T10:30:00Z"
}
```

## 🎯 特色功能

1. **即時搜尋與篩選**
   - 支援關鍵字搜尋
   - 分類快速篩選
   - URL 參數保留搜尋狀態

2. **完整的購物車體驗**
   - 數量調整
   - 即時計算總金額
   - 購物車數量提示

3. **聊聊系統**
   - 未讀訊息提醒
   - 時間格式化顯示
   - 響應式雙欄/單欄切換

4. **資料持久化**
   - LocalStorage 自動儲存
   - 重新整理不遺失資料
   - 範例資料自動初始化

5. **使用者體驗優化**
   - Toast 提示訊息
   - 載入狀態提示
   - 平滑滾動
   - 懸停動畫效果

## 🎨 UI/UX 亮點

- **卡片式設計**：清晰的視覺層次
- **橘紅色主題**：醒目且現代
- **響應式網格**：自動適應不同螢幕
- **圖標與圖示**：直覺的視覺語言
- **流暢動畫**：淡入效果、懸停變化
- **友善提示**：空狀態、錯誤訊息、成功提示

## 📝 待擴展功能（未來計劃）

- [ ] 用戶登入/註冊系統
- [ ] 後端 API 整合
- [ ] 圖片上傳到雲端（Cloudinary/S3）
- [ ] 真實付款整合（Stripe/PayPal）
- [ ] 商品評價系統
- [ ] 賣家管理後台
- [ ] 訂單追蹤系統
- [ ] 推播通知
- [ ] 社群分享功能
- [ ] 收藏商品功能

## 👨‍💻 開發資訊

- **開發時間**：2026-02-08
- **React 版本**：18.3.1
- **Vite 版本**：6.0.5
- **Tailwind CSS 版本**：3.4.17

## 📄 授權

MIT License

---

**TechStore** - 打造全新的線上購物體驗 🚀
