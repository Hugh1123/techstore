import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { useEffect } from 'react';
import { initializeSampleData } from './utils/storage';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Upload from './pages/Upload';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Chat from './pages/Chat';

function App() {
  useEffect(() => {
    // 初始化範例資料
    initializeSampleData();
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
