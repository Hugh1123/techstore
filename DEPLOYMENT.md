# TechStore 部署指南

## 🚀 部署選項

### 選項 1：Vercel（推薦）

1. 前往 [Vercel](https://vercel.com)
2. 使用 GitHub 帳號登入
3. 點擊 "Import Project"
4. 選擇 TechStore repository
5. 保持預設設定（Vite 已自動偵測）
6. 點擊 "Deploy"

**優點**：
- 自動 SSL 憑證
- 全球 CDN
- 自動部署（push 到 main 分支）
- 預覽部署（Pull Requests）

### 選項 2：Netlify

1. 前往 [Netlify](https://www.netlify.com)
2. 點擊 "Add new site" → "Import an existing project"
3. 連接 GitHub 帳號並選擇 repository
4. 建置設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 點擊 "Deploy site"

### 選項 3：GitHub Pages

1. 修改 `vite.config.js`，新增 base path：
```javascript
export default defineConfig({
  base: '/techstore/',  // 你的 repo 名稱
  // ...
})
```

2. 安裝 gh-pages：
```bash
npm install -D gh-pages
```

3. 在 `package.json` 新增 script：
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. 部署：
```bash
npm run deploy
```

5. 在 GitHub repository 設定中啟用 GitHub Pages

### 選項 4：自己的伺服器

1. 建置專案：
```bash
npm run build
```

2. 將 `dist/` 資料夾內容上傳到伺服器

3. 配置 Web 伺服器（Nginx 範例）：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/techstore;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 環境變數（如需使用 API）

如果未來整合後端 API，建立 `.env` 檔案：

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=TechStore
```

在程式碼中使用：
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📱 測試部署後的網站

部署完成後，測試以下功能：

1. ✅ 首頁商品列表顯示
2. ✅ 搜尋功能運作
3. ✅ 分類篩選功能
4. ✅ 點擊商品進入詳情頁
5. ✅ 上傳商品功能
6. ✅ 加入購物車
7. ✅ 購物車數量調整
8. ✅ 結帳流程
9. ✅ 聊聊系統
10. ✅ 響應式設計（手機/平板/桌面）

## 🐛 常見問題

### 404 錯誤（重新整理頁面）

如果重新整理非首頁時出現 404：
- Vercel：已有 `vercel.json` 配置
- Netlify：已有 `netlify.toml` 配置
- 其他：確保伺服器配置正確處理 SPA 路由

### 圖片無法顯示

LocalStorage 有大小限制（通常 5-10MB）：
- 建議未來整合 Cloudinary 或 AWS S3
- 壓縮上傳的圖片
- 限制圖片尺寸

### LocalStorage 資料遺失

LocalStorage 依賴瀏覽器：
- 清除瀏覽器資料會遺失
- 建議未來整合後端 API 做持久化儲存

## 📊 效能優化建議

1. **圖片優化**
   - 使用 WebP 格式
   - 實作懶載入（lazy loading）
   - 使用 CDN

2. **程式碼分割**
   - 已由 Vite 自動處理
   - 可進一步使用 React.lazy()

3. **快取策略**
   - 設定適當的 Cache-Control headers
   - 使用 Service Worker（PWA）

4. **SEO 優化**
   - 實作 React Helmet 管理 meta tags
   - 考慮 SSR（Next.js）或 SSG

## 🔐 安全性注意事項

- ⚠️ 目前沒有後端驗證，所有資料存在瀏覽器
- ⚠️ 未來需要實作：
  - 用戶認證（JWT/OAuth）
  - API 金鑰保護
  - XSS/CSRF 防護
  - 資料加密

## 📈 下一步

1. 設定 Google Analytics
2. 實作錯誤追蹤（Sentry）
3. 整合後端 API
4. 新增更多支付選項
5. 實作 PWA 功能

---

需要協助？查看 [README.md](./README.md) 或開啟 Issue！
