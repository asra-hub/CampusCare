import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Trash2,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  ShieldCheck,
  Filter,
  User,
  GraduationCap
} from 'lucide-react';
import { formatAiResponse } from '../utils/markdown';
import { UNIVERSITY_CATEGORIES, GENERAL_CAMPUS_INFO } from '../data/universityKnowledge';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  category?: string;
  isError?: boolean;
}

interface AiChatInterfaceProps {
  initialPrompt?: string;
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  customKnowledge?: string;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'model',
  text: `Hello! Welcome to Presidency University. I'm your AI Helpdesk Assistant. How can I help you today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AiChatInterface: React.FC<AiChatInterfaceProps> = ({
  initialPrompt,
  selectedCategory,
  onSelectCategory,
  customKnowledge
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync category prop if updated from outside
  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Handle initial prompt passed from Hero or Category clicks
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSendMessage(initialPrompt.trim());
    }
  }, [initialPrompt]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: activeCategory !== 'all' ? activeCategory : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setErrorNotice(null);

    try {
      // Build conversation history for context
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          category: activeCategory !== 'all' ? activeCategory : undefined,
          customKnowledge
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to reach campus server`);
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: data.response || 'No response returned from the campus directory.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: activeCategory !== 'all' ? activeCategory : undefined
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorNotice(err.message || 'Unable to connect to university helpdesk server. Please check connection or retry.');
      
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "I'm sorry, that information is not available in the supplied university knowledge base. Please contact the respective university department for confirmation.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear your current conversation?')) {
      setMessages([DEFAULT_WELCOME_MESSAGE]);
      setErrorNotice(null);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (onSelectCategory && catId !== 'all') {
      onSelectCategory(catId);
    }
  };

  // Quick suggestions based on active category
  const activeCategoryObj = UNIVERSITY_CATEGORIES.find((c) => c.id === activeCategory);
  const suggestedQueries = activeCategoryObj
    ? activeCategoryObj.suggestedQuestions
    : [
        'Who do I contact for academic problems?',
        'Where can I find examination timetables?',
        'Who do I contact for placement training?',
        'How do I submit a hostel complaint?',
        'What attendance requirement should students follow?'
      ];

  return (
    <section id="helpdesk" className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800 mb-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Presidency University · Bengaluru</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Presidency AI Helpdesk
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Type your inquiry in natural language. Verified guidance for Presidency University students.
          </p>
        </div>

        {/* Chat Container Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-950/5 flex flex-col h-[700px] max-h-[85vh] overflow-hidden">
          {/* Chat Header Bar */}
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-white">Presidency AI Helpdesk</h3>
                  <span className="text-[10px] bg-blue-500/30 text-sky-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30">
                    Official Bot
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Presidency University Knowledge Base · Rajanukunte</span>
                </div>
              </div>
            </div>

            {/* Header Right Controls: Category Filter & Clear */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
                  aria-label="Filter category context"
                >
                  <option value="all" className="bg-slate-900 text-white">All Departments</option>
                  {UNIVERSITY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Clear conversation history"
                aria-label="Clear conversation history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/60">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                      isUser
                        ? 'bg-blue-900 text-white'
                        : msg.isError
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-white border border-slate-200 text-blue-900 shadow-xs'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-blue-600" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`relative p-4 rounded-2xl shadow-xs ${
                        isUser
                          ? 'bg-blue-900 text-white rounded-tr-xs'
                          : msg.isError
                          ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
                          : 'bg-white border border-slate-200/90 text-slate-900 rounded-tl-xs'
                      }`}
                    >
                      {/* Message Content */}
                      {isUser ? (
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="text-[15px] text-slate-800">
                          {formatAiResponse(msg.text)}
                        </div>
                      )}

                      {/* AI bubble action bar */}
                      {!isUser && !msg.isError && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            Official University Record
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="p-1 hover:text-blue-700 hover:bg-slate-100 rounded transition-colors flex items-center gap-1"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[11px] text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Timestamp & Category Tag */}
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400 px-1">
                      <span>{msg.timestamp}</span>
                      {msg.category && (
                        <>
                          <span>·</span>
                          <span className="capitalize text-blue-600 font-medium">{msg.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-blue-900 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-xs bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Searching official university regulations...
                  </span>
                </div>
              </div>
            )}

            {/* Error Notification Banner */}
            {errorNotice && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-700 font-semibold rounded border border-rose-300 flex items-center gap-1 shrink-0 ml-2"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Strip */}
          <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            <div className="flex items-center gap-2">
              {suggestedQueries.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(sq)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-blue-900 bg-white hover:bg-blue-50/80 border border-slate-200/90 rounded-md transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2"
            >
              <div className="flex-1 relative bg-slate-50 border border-slate-300 rounded-2xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeCategory !== 'all'
                      ? `Ask a question about ${activeCategory}... (Press Enter to send)`
                      : 'Ask anything about your university... (Press Enter to send)'
                  }
                  rows={2}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-none max-h-32"
                  aria-label="Student message input"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-12 h-12 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl flex items-center justify-center transition-all shadow-md shadow-blue-950/15 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send query"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for line break</span>
              <span>Presidency AI Helpdesk · Presidency University, Bengaluru</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
