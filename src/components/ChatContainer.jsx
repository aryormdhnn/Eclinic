import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import db from '../firebaseConfig/firebaseConfig';
import "../css/chatcontainer.css";

const ChatContainer = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Derive username from Supabase user if available, else use manual input
  const currentUser = user?.user_metadata?.username || user?.email?.split('@')[0] || displayName;

  const chatsRef = collection(db, 'Messages');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Listen to Firestore in real-time
  useEffect(() => {
    const q = query(chatsRef, orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const fireChats = [];
      querySnapshot.forEach((doc) => {
        fireChats.push({ id: doc.id, ...doc.data() });
      });
      setChats(fireChats);
    });
    return () => unsub();
  }, []);

  // Auto-join if user is logged in via Supabase
  useEffect(() => {
    if (user) setHasJoined(true);
  }, [user]);

  const sendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    const newChat = {
      message: message.trim(),
      user: currentUser,
      createdAt: serverTimestamp(),
    };

    const chatRef = doc(chatsRef);
    setMessage('');
    inputRef.current?.focus();

    setDoc(chatRef, newChat)
      .then(() => { /* saved */ })
      .catch(() => { /* failed silently */ });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setHasJoined(true);
  };

  const handleLogout = () => {
    setHasJoined(false);
    setDisplayName('');
    setChats([]);
  };

  const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    return timestamp.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // ── Login Screen ─────────────────────────────────────────────────────
  if (!hasJoined) {
    return (
      <div className="chat-page-wrapper">
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">💬</div>
              <div className="chat-header-text">
                <h4>Konsultasi Chat</h4>
                <p><span className="chat-status-dot" />Dokter Online</p>
              </div>
            </div>
          </div>
          <div className="chat-login-screen">
            <div className="chat-login-icon">💬</div>
            <h3>Masuk ke Ruang Chat</h3>
            <p>Masukkan nama tampilan Anda untuk mulai berkonsultasi</p>
            <form onSubmit={handleJoin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input
                type="text"
                className="chat-login-input"
                placeholder="Nama Anda..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
              />
              <button type="submit" className="chat-login-btn" disabled={!displayName.trim()}>
                Mulai Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Chat Screen ───────────────────────────────────────────────────────
  return (
    <div className="chat-page-wrapper">
      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <div className="chat-header-text">
              <h4>Ruang Konsultasi</h4>
              <p><span className="chat-status-dot" />Online — {currentUser}</p>
            </div>
          </div>
          <button className="chat-header-logout" onClick={handleLogout} aria-label="Keluar dari chat">
            Keluar
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages-area">
          {chats.length === 0 ? (
            <div className="chat-empty-state">
              <div className="chat-empty-icon">💬</div>
              <p>Belum ada pesan. Mulai percakapan!</p>
            </div>
          ) : (
            chats.map((chat, index) => {
              const isSender = chat.user === currentUser;
              const initial = (chat.user || '?').charAt(0).toUpperCase();

              return (
                <div
                  key={chat.id || index}
                  className={`message-row ${isSender ? 'sender' : 'receiver'}`}
                >
                  <div className="message-avatar" aria-hidden="true">
                    {initial}
                  </div>
                  <div className="message-content">
                    {!isSender && (
                      <span className="message-username">{chat.user}</span>
                    )}
                    <div className="message-bubble" role="article" aria-label={`Pesan dari ${chat.user}`}>
                      {chat.message}
                    </div>
                    {chat.createdAt && (
                      <span className="message-time">{formatTime(chat.createdAt)}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            className="chat-input-field"
            type="text"
            placeholder="Ketik pesan Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Input pesan"
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!message.trim()}
            aria-label="Kirim pesan"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
