import React, { useEffect, useState, useRef, useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import "../css/chatcontainer.css";

const ChatContainer = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Derive username from Supabase user if available
  const currentUser = user?.user_metadata?.username || user?.email?.split('@')[0] || displayName;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Auto-join if user already logged in via Supabase
  useEffect(() => {
    if (user) setHasJoined(true);
  }, [user]);

  // 1. Fetch existing messages + subscribe realtime
  useEffect(() => {
    if (!hasJoined) return;

    // Initial fetch — ambil pesan yang sudah ada
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) setChats(data);
    };

    fetchMessages();

    // Realtime subscription — dengarkan INSERT baru
    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setChats((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hasJoined]);

  // 2. Kirim pesan baru ke Supabase
  const sendMessage = async () => {
    if (!message.trim() || !currentUser || isSending) return;

    setIsSending(true);
    const text = message.trim();
    setMessage('');

    const { error } = await supabase.from('messages').insert({
      user_name: currentUser,
      message: text,
    });

    if (error) {
      // Jika gagal, kembalikan pesan ke input
      setMessage(text);
    }

    setIsSending(false);
    inputRef.current?.focus();
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
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ── Login Screen ──────────────────────────────────────────────────────
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
            <form
              onSubmit={handleJoin}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
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
          <button
            className="chat-header-logout"
            onClick={handleLogout}
            aria-label="Keluar dari chat"
          >
            Keluar
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-messages-area">
          {chats.length === 0 ? (
            <div className="chat-empty-state">
              <div className="chat-empty-icon">💬</div>
              <p>Belum ada pesan. Mulai percakapan!</p>
            </div>
          ) : (
            chats.map((chat, index) => {
              const isSender = chat.user_name === currentUser;
              const initial = (chat.user_name || '?').charAt(0).toUpperCase();

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
                      <span className="message-username">{chat.user_name}</span>
                    )}
                    <div
                      className="message-bubble"
                      role="article"
                      aria-label={`Pesan dari ${chat.user_name}`}
                    >
                      {chat.message}
                    </div>
                    {chat.created_at && (
                      <span className="message-time">{formatTime(chat.created_at)}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
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
            disabled={!message.trim() || isSending}
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
