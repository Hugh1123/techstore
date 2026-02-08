import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chats, getChatById, sendMessage, markChatAsRead, currentUser } = useStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState(chatId);

  const selectedChat = selectedChatId ? getChatById(selectedChatId) : null;

  useEffect(() => {
    if (chatId) {
      setSelectedChatId(chatId);
      markChatAsRead(chatId);
    }
  }, [chatId, markChatAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedChatId) return;

    sendMessage(selectedChatId, message.trim());
    setMessage('');
  };

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    navigate(`/chat/${id}`);
    markChatAsRead(id);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '剛剛';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分鐘前`;
    if (diff < 86400000) return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-[calc(100vh-73px)] bg-gray-50 flex">
      {/* 左側：對話列表 */}
      <div className={`${selectedChatId ? 'hidden md:block' : 'block'} w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col`}>
        {/* 標題 */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">聊聊</h2>
        </div>

        {/* 搜尋框 */}
        <div className="p-3 border-b border-gray-200">
          <input
            type="text"
            placeholder="搜尋聊天..."
            className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* 對話列表 */}
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="text-center py-12 px-4">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500">還沒有對話</p>
              <p className="text-gray-400 text-sm mt-1">在商品頁面點擊"聊聊"開始對話</p>
            </div>
          ) : (
            chats.map(chat => (
              <button
                key={chat.chatId}
                onClick={() => handleSelectChat(chat.chatId)}
                className={`w-full p-4 flex gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedChatId === chat.chatId ? 'bg-orange-50' : ''
                }`}
              >
                <img
                  src={chat.sellerAvatar}
                  alt={chat.sellerName}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-800 truncate">
                      {chat.sellerName}
                    </p>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage || '開始對話...'}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 右側：聊天室 */}
      {selectedChat ? (
        <div className={`${selectedChatId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
          {/* 聊天室標題 */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedChatId(null);
                navigate('/chat');
              }}
              className="md:hidden text-gray-600 hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img
              src={selectedChat.sellerAvatar}
              alt={selectedChat.sellerName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">{selectedChat.sellerName}</p>
              <p className="text-xs text-gray-500">賣家</p>
            </div>
          </div>

          {/* 訊息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">開始對話...</p>
              </div>
            ) : (
              selectedChat.messages.map(msg => {
                const isMe = msg.sender === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        isMe
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isMe ? 'text-orange-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 輸入框 */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="輸入訊息..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-full font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                發送
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 text-lg">選擇一個對話開始聊天</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
