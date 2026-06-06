import React, { useState, useRef, useEffect, useContext } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import '../css/aiChat.css';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// System prompt — karakter dokter AI eClinic
const SYSTEM_PROMPT = `Kamu adalah dr. Aria, dokter umum virtual dari eClinic — platform telemedicine terpercaya di Indonesia.

Kepribadianmu:
- Ramah, empatis, dan profesional
- Berbicara dalam Bahasa Indonesia yang jelas dan mudah dipahami
- Tidak menggurui, tapi memberi edukasi kesehatan yang akurat

Tugasmu:
- Membantu pasien memahami gejala yang mereka rasakan
- Memberikan saran kesehatan umum dan pertolongan pertama
- Menjelaskan kapan pasien perlu ke dokter spesialis
- TIDAK mendiagnosis penyakit secara definitif

Penting:
- Selalu ingatkan pasien bahwa saranmu bukan pengganti konsultasi dokter langsung untuk kondisi serius
- Jawab dengan singkat, jelas, dan terstruktur
- Gunakan emoji sesekali agar terasa lebih hangat (🩺💊✅)
- Jika ada kondisi darurat (nyeri dada hebat, sesak berat, stroke), segera sarankan ke IGD`;

const SUGGESTIONS = [
  'Saya sering sakit kepala 🤕',
  'Bagaimana mengatasi demam?',
  'Gejala flu dan cara mengatasinya',
  'Tekanan darah tinggi apa bahaya?',
  'Saya susah tidur akhir-akhir ini',
];

const AIDokterPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Pasien';

  // Initialize Gemini chat session
  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const session = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: `Baik, saya siap membantu sebagai dr. Aria dari eClinic.` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });
    setChatSession(session);

    // Welcome message
    setMessages([
      {
        role: 'ai',
        text: `Halo ${userName}! 👋 Saya **dr. Aria**, dokter virtual eClinic yang siap membantu Anda.\n\nCeritakan keluhan atau pertanyaan kesehatan Anda, dan saya akan memberikan informasi yang berguna. Ingat, untuk kondisi serius, tetap konsultasikan dengan dokter secara langsung ya. 🩺`,
        time: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading || !chatSession) return;

    setInput('');
    setIsLoading(true);

    // Add user message
    const userMsg = { role: 'user', text: messageText, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const result = await chatSession.sendMessage(messageText);
      const response = await result.response;
      const aiText = response.text();

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: aiText, time: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Maaf, saya mengalami gangguan koneksi. Silakan coba lagi ya. 🙏',
          time: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render text with basic markdown (bold, newlines)
  const renderText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map((line, i) => `<p key=${i}>${line || '&nbsp;'}</p>`)
      .join('');
  };

  return (
    <div className="ai-chat-page">
      <div className="ai-chat-window">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-doc-avatar">🩺</div>
          <div className="ai-doc-info">
            <h4>dr. Aria — Dokter Virtual eClinic</h4>
            <p>
              <span className="ai-online-dot" />
              Didukung Google Gemini AI · Selalu Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="ai-messages-area">
          {/* Welcome / Suggestion Card */}
          {messages.length <= 1 && (
            <div className="ai-welcome-card">
              <h3>💬 Apa yang ingin Anda tanyakan?</h3>
              <p>dr. Aria siap menjawab pertanyaan kesehatan Anda. Coba mulai dengan salah satu topik di bawah:</p>
              <div className="ai-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="ai-suggestion-chip"
                    onClick={() => sendMessage(s)}
                    disabled={isLoading}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`ai-message-row ${msg.role === 'user' ? 'user' : 'ai'}`}
            >
              <div className="ai-msg-avatar">
                {msg.role === 'user'
                  ? userName.charAt(0).toUpperCase()
                  : '🩺'}
              </div>
              <div className="ai-msg-content">
                <div
                  className="ai-bubble"
                  dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                />
                <span className="ai-msg-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="ai-message-row ai">
              <div className="ai-msg-avatar">🩺</div>
              <div className="ai-msg-content">
                <div className="ai-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="ai-input-area">
          <input
            ref={inputRef}
            className="ai-input-field"
            type="text"
            placeholder="Ketik pertanyaan kesehatan Anda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-label="Input pertanyaan"
          />
          <button
            className="ai-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            aria-label="Kirim pertanyaan"
          >
            <FiSend />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="ai-disclaimer">
          ⚠️ dr. Aria adalah AI dan bukan pengganti dokter sungguhan. Untuk kondisi darurat, segera hubungi 119.
        </div>
      </div>
    </div>
  );
};

export default AIDokterPage;
