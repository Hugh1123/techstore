// LocalStorage 工具函數
export const storage = {
  // 商品相關
  getProducts: () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  },
  
  setProducts: (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  },
  
  addProduct: (product) => {
    const products = storage.getProducts();
    products.unshift(product);
    storage.setProducts(products);
  },
  
  getProductById: (id) => {
    const products = storage.getProducts();
    return products.find(p => p.id === id);
  },
  
  // 購物車相關
  getCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },
  
  setCart: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  
  addToCart: (productId, quantity = 1) => {
    const cart = storage.getCart();
    const product = storage.getProductById(productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        product
      });
    }
    
    storage.setCart(cart);
  },
  
  removeFromCart: (productId) => {
    const cart = storage.getCart().filter(item => item.productId !== productId);
    storage.setCart(cart);
  },
  
  updateCartQuantity: (productId, quantity) => {
    const cart = storage.getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      storage.setCart(cart);
    }
  },
  
  clearCart: () => {
    localStorage.setItem('cart', JSON.stringify([]));
  },
  
  // 聊天相關
  getChats: () => {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [];
  },
  
  setChats: (chats) => {
    localStorage.setItem('chats', JSON.stringify(chats));
  },
  
  getChatById: (chatId) => {
    const chats = storage.getChats();
    return chats.find(c => c.chatId === chatId);
  },
  
  addChat: (chat) => {
    const chats = storage.getChats();
    const existingChat = chats.find(c => c.chatId === chat.chatId);
    
    if (!existingChat) {
      chats.push(chat);
      storage.setChats(chats);
    }
  },
  
  addMessage: (chatId, message) => {
    const chats = storage.getChats();
    const chat = chats.find(c => c.chatId === chatId);
    
    if (chat) {
      chat.messages.push(message);
      chat.lastMessage = message.text;
      chat.lastMessageTime = message.timestamp;
      storage.setChats(chats);
    }
  },
  
  markChatAsRead: (chatId) => {
    const chats = storage.getChats();
    const chat = chats.find(c => c.chatId === chatId);
    
    if (chat) {
      chat.unreadCount = 0;
      storage.setChats(chats);
    }
  },
  
  // 用戶相關（模擬登入用戶）
  getCurrentUser: () => {
    return {
      id: 'current_user',
      name: '我',
      avatar: 'https://ui-avatars.com/api/?name=ME&background=FF6B35&color=fff'
    };
  }
};

// 生成假賣家資料
export const generateSeller = (index = 0) => {
  const sellers = [
    { name: '小明', rating: 4.8 },
    { name: '阿華', rating: 4.9 },
    { name: '小美', rating: 4.7 },
    { name: '大雄', rating: 4.6 },
    { name: '靜香', rating: 4.9 },
  ];
  
  const seller = sellers[index % sellers.length];
  
  return {
    id: `seller_${index}`,
    name: seller.name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=random`,
    rating: seller.rating
  };
};

// 初始化範例資料
export const initializeSampleData = () => {
  const products = storage.getProducts();
  
  if (products.length === 0) {
    const sampleProducts = [
      {
        id: '1',
        title: 'iPhone 15 Pro Max 256GB',
        description: '全新未拆封，原廠公司貨，保固一年。顏色：鈦藍色。配件齊全：充電線、說明書、原廠貼紙。',
        price: 42900,
        condition: '全新',
        category: '3C產品',
        images: ['https://picsum.photos/seed/iphone15/800/800'],
        seller: generateSeller(0),
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'MacBook Air M2 13吋',
        description: '2023年購入，使用狀況良好，僅有輕微使用痕跡。8GB RAM + 256GB SSD。附原廠充電器。',
        price: 32000,
        condition: '二手-近全新',
        category: '3C產品',
        images: ['https://picsum.photos/seed/macbook/800/800'],
        seller: generateSeller(1),
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Sony WH-1000XM5 降噪耳機',
        description: '使用半年，功能完全正常，耳罩稍有使用痕跡。附原廠收納盒、充電線。',
        price: 8500,
        condition: '二手-良好',
        category: '3C產品',
        images: ['https://picsum.photos/seed/sony/800/800'],
        seller: generateSeller(2),
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Nintendo Switch OLED 主機',
        description: '全新未拆，台灣公司貨。白色款，附原廠保固卡。',
        price: 10500,
        condition: '全新',
        category: '遊戲',
        images: ['https://picsum.photos/seed/switch/800/800'],
        seller: generateSeller(3),
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Adidas Ultra Boost 跑鞋',
        description: '尺寸 US 9.5，穿過 3 次，幾乎全新。鞋盒完整保留。',
        price: 3200,
        condition: '二手-近全新',
        category: '運動用品',
        images: ['https://picsum.photos/seed/adidas/800/800'],
        seller: generateSeller(4),
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Canon EOS R6 單眼相機',
        description: '2022年購入，快門數約 5000 次。功能正常，外觀良好。含原廠電池x2、充電器。',
        price: 55000,
        condition: '二手-良好',
        category: '3C產品',
        images: ['https://picsum.photos/seed/canon/800/800'],
        seller: generateSeller(0),
        createdAt: new Date().toISOString()
      }
    ];
    
    storage.setProducts(sampleProducts);
  }
};
