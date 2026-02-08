import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentUser] = useState(storage.getCurrentUser());

  // 初始化資料
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(storage.getProducts());
    setCart(storage.getCart());
    setChats(storage.getChats());
  };

  // 商品相關
  const addProduct = (product) => {
    storage.addProduct(product);
    setProducts(storage.getProducts());
  };

  const getProductById = (id) => {
    return storage.getProductById(id);
  };

  // 購物車相關
  const addToCart = (productId, quantity = 1) => {
    storage.addToCart(productId, quantity);
    setCart(storage.getCart());
  };

  const removeFromCart = (productId) => {
    storage.removeFromCart(productId);
    setCart(storage.getCart());
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      storage.updateCartQuantity(productId, quantity);
      setCart(storage.getCart());
    }
  };

  const clearCart = () => {
    storage.clearCart();
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // 聊天相關
  const getChatById = (chatId) => {
    return storage.getChatById(chatId);
  };

  const createOrGetChat = (sellerId, sellerName, sellerAvatar) => {
    const chats = storage.getChats();
    let chat = chats.find(c => 
      c.participants.includes(sellerId) && c.participants.includes(currentUser.id)
    );

    if (!chat) {
      chat = {
        chatId: `chat_${Date.now()}`,
        participants: [currentUser.id, sellerId],
        sellerName,
        sellerAvatar,
        messages: [],
        unreadCount: 0,
        lastMessage: '',
        lastMessageTime: new Date().toISOString()
      };
      storage.addChat(chat);
      setChats(storage.getChats());
    }

    return chat.chatId;
  };

  const sendMessage = (chatId, text) => {
    const message = {
      id: `msg_${Date.now()}`,
      sender: currentUser.id,
      text,
      timestamp: new Date().toISOString()
    };

    storage.addMessage(chatId, message);
    setChats(storage.getChats());
  };

  const markChatAsRead = (chatId) => {
    storage.markChatAsRead(chatId);
    setChats(storage.getChats());
  };

  const getUnreadCount = () => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };

  const value = {
    // 狀態
    products,
    cart,
    chats,
    currentUser,
    
    // 商品方法
    addProduct,
    getProductById,
    
    // 購物車方法
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    
    // 聊天方法
    getChatById,
    createOrGetChat,
    sendMessage,
    markChatAsRead,
    getUnreadCount,
    
    // 刷新資料
    loadData
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
