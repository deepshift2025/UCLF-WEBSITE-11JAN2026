
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, Sparkles, User, ShieldCheck, Upload, X, FileText, 
  Loader2, Info, AlertCircle, ArrowLeft, Plus, MessageSquare,
  History, Settings, Menu, Trash2, ChevronLeft, Lock, Award, GraduationCap, Briefcase
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';
import { MembershipTier } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  attachment?: {
    name: string;
    type: string;
    data: string; // base64
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

interface DailyUsage {
  date: string;
  queries: number;
  uploads: number;
}

const AIAssistant: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachment, setAttachment] = useState<{ file: File; base64: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage>({ date: '', queries: 0, uploads: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  
  const LIMITS = {
    GUEST: { queries: 5, uploads: 1, label: 'Guest Access' },
    STUDENT: { queries: 15, uploads: 5, label: 'Student Tier' },
    ASSOCIATE: { queries: 30, uploads: 10, label: 'Associate Tier' },
    FULL: { queries: 40, uploads: 15, label: 'Full Member Tier' }
  };

  // Initialize data
  useEffect(() => {
    // Load User
    const userStr = localStorage.getItem('uclf_user');
    const user = userStr ? JSON.parse(userStr) : null;
    setCurrentUser(user);

    // Load Chat History
    const savedChats = localStorage.getItem('uclf_ai_chats');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        setSessions(parsed);
        if (parsed.length > 0) setActiveSessionId(parsed[0].id);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    // Load Usage
    const today = new Date().toISOString().split('T')[0];
    const savedUsage = localStorage.getItem('uclf_ai_usage');
    if (savedUsage) {
      const parsedUsage: DailyUsage = JSON.parse(savedUsage);
      if (parsedUsage.date === today) {
        setDailyUsage(parsedUsage);
      } else {
        const newUsage = { date: today, queries: 0, uploads: 0 };
        setDailyUsage(newUsage);
        localStorage.setItem('uclf_ai_usage', JSON.stringify(newUsage));
      }
    } else {
      const newUsage = { date: today, queries: 0, uploads: 0 };
      setDailyUsage(newUsage);
      localStorage.setItem('uclf_ai_usage', JSON.stringify(newUsage));
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('uclf_ai_chats', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Save usage
  useEffect(() => {
    if (dailyUsage.date) {
      localStorage.setItem('uclf_ai_usage', JSON.stringify(dailyUsage));
    }
  }, [dailyUsage]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  // Dynamic limits calculation based on tier
  const currentLimits = useMemo(() => {
    if (!currentUser) return LIMITS.GUEST;
    switch (currentUser.tier) {
      case MembershipTier.STUDENT: return LIMITS.STUDENT;
      case MembershipTier.ASSOCIATE: return LIMITS.ASSOCIATE;
      case MembershipTier.FULL: return LIMITS.FULL;
      case 'Admin': return LIMITS.FULL; // Admin gets the highest tier limits
      default: return LIMITS.GUEST;
    }
  }, [currentUser]);

  const isQueryLimitReached = dailyUsage.queries >= currentLimits.queries;
  const isUploadLimitReached = dailyUsage.uploads >= currentLimits.uploads;

  const createNewChat = () => {
    const newId = Math.random().toString(36).substring(7);
    const newSession: ChatSession = {
      id: newId,
      title: 'New Consultation',
      messages: [
        { 
          role: 'assistant', 
          text: "Welcome to the UCLF AI Legal Assistant. I am an expert on the Ugandan legal system. You can ask me questions about Ugandan law or upload contracts for my analysis. How can I assist you today?" 
        }
      ],
      createdAt: Date.now()
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages, isTyping]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploadLimitReached) {
      alert(`Daily document upload limit reached (${currentLimits.uploads}). Limits reset at midnight.`);
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("Document not accepted. Maximum size is 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setAttachment({ file, base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() && !attachment) return;

    if (isQueryLimitReached) {
      alert(`Daily query limit reached (${currentLimits.queries}). Please come back tomorrow or login for higher limits.`);
      return;
    }
    
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      const newId = Math.random().toString(36).substring(7);
      const newSession: ChatSession = {
        id: newId,
        title: input.slice(0, 30) || 'Document Review',
        messages: [],
        createdAt: Date.now()
      };
      setSessions([newSession, ...sessions]);
      setActiveSessionId(newId);
      currentSessionId = newId;
    }

    const userMessage: Message = { 
      role: 'user', 
      text: input,
      attachment: attachment ? {
        name: attachment.file.name,
        type: attachment.file.type,
        data: attachment.base64
      } : undefined
    };

    // Update usage state
    setDailyUsage(prev => ({
      ...prev,
      queries: prev.queries + 1,
      uploads: attachment ? prev.uploads + 1 : prev.uploads
    }));

    // Update session with user message
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId 
        ? { 
            ...s, 
            messages: [...s.messages, userMessage],
            title: s.messages.length <= 1 && input ? input.slice(0, 30) : s.title 
          } 
        : s
    ));

    const promptForAI = input;
    const currentAttachment = attachment;
    
    setInput('');
    setAttachment(null);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [{ text: promptForAI || "Please analyze this document." }];
      
      if (currentAttachment) {
        parts.push({
          inlineData: {
            mimeType: currentAttachment.file.type,
            data: currentAttachment.base64
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: `You are the UCLF AI Legal Assistant, a premier legal expert in the Republic of Uganda. 
          Knowledge: Constitution, Statutes (Evidence Act, Penal Code, Land Act), Case precedents (High Court to Supreme Court), and Christian Legal Ethics.
          Tasks: Summarize concepts, analyze contracts, cite Ugandan law, guide on procedure.
          Style: Professional, authoritative yet compassionate.
          Disclaimer: Mention you are an AI tool for preliminary guidance, not professional advice from an advocate.`,
        }
      });

      const aiText = response.text || "I'm sorry, I encountered an error. Please try again.";
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, { role: 'assistant', text: aiText }] } 
          : s
      ));
    } catch (error) {
      console.error("AI Error:", error);
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, { role: 'assistant', text: "Connection error. Please try again." }] } 
          : s
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const getTierIcon = () => {
    if (!currentUser) return <User size={14} className="text-gray-400" />;
    switch (currentUser.tier) {
      case MembershipTier.STUDENT: return <GraduationCap size={14} className="text-green-600" />;
      case MembershipTier.ASSOCIATE: return <Award size={14} className="text-orange-600" />;
      case MembershipTier.FULL: return <Briefcase size={14} className="text-primary" />;
      case 'Admin': return <ShieldCheck size={14} className="text-red-600" />;
      default: return <User size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white overflow-hidden text-gray-800">
      
      {/* Sidebar - Gemini Style */}
      <aside 
        className={`bg-[#f0f4f9] flex flex-col transition-all duration-300 border-r border-gray-200 ${
          isSidebarOpen ? 'w-72' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-4 flex flex-col h-full min-w-[18rem]">
          <button 
            onClick={createNewChat}
            className="flex items-center space-x-3 px-4 py-3 bg-white/50 hover:bg-white rounded-full transition-all text-sm font-semibold shadow-sm border border-gray-200 mb-8"
          >
            <Plus size={20} className="text-primary" />
            <span>New Consultation</span>
          </button>

          <div className="flex-grow overflow-y-auto space-y-1">
            <h3 className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Recent Consultations</h3>
            {sessions.length === 0 ? (
              <p className="px-4 text-xs text-gray-400 italic">No previous chats</p>
            ) : (
              sessions.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setActiveSessionId(s.id)}
                  className={`group flex items-center justify-between px-4 py-2.5 rounded-full cursor-pointer transition-all ${
                    activeSessionId === s.id ? 'bg-[#dde3ea] text-gray-900 font-medium' : 'hover:bg-[#e1e6ed] text-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <MessageSquare size={16} className="shrink-0" />
                    <span className="truncate text-sm">{s.title}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteChat(e, s.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Usage Stats in Sidebar */}
          <div className="p-4 bg-white/40 rounded-2xl border border-gray-100 mb-4 mt-4">
            <div className="flex items-center space-x-2 mb-3">
              {getTierIcon()}
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                {currentLimits.label}
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span>Daily Queries</span>
                  <span className={isQueryLimitReached ? 'text-red-500' : 'text-primary'}>
                    {dailyUsage.queries} / {currentLimits.queries}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isQueryLimitReached ? 'bg-red-500' : 'bg-primary'}`} 
                    style={{ width: `${(dailyUsage.queries / currentLimits.queries) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span>Daily Uploads</span>
                  <span className={isUploadLimitReached ? 'text-red-500' : 'text-primary'}>
                    {dailyUsage.uploads} / {currentLimits.uploads}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isUploadLimitReached ? 'bg-red-500' : 'bg-primary'}`} 
                    style={{ width: `${(dailyUsage.uploads / currentLimits.uploads) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {(!currentUser || currentUser.tier === MembershipTier.STUDENT || currentUser.tier === MembershipTier.ASSOCIATE) && (
              <Link to="/membership" className="mt-4 block text-center text-[9px] font-black text-primary hover:underline uppercase tracking-widest">
                Expand limits with higher membership
              </Link>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200 space-y-1">
            <Link to="/resources" className="flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-[#e1e6ed] text-sm text-gray-600 transition-all">
              <ArrowLeft size={18} />
              <span>Back to Resources</span>
            </Link>
            <div className="flex items-center space-x-3 px-4 py-3 rounded-full hover:bg-[#e1e6ed] text-sm text-gray-600 cursor-pointer transition-all">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative min-w-0">
        
        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-4 left-4 z-30 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 ${isSidebarOpen ? 'hidden' : 'block'}`}
        >
          <Menu size={24} />
        </button>

        {/* Floating Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="flex items-center space-x-4">
             {isSidebarOpen && (
               <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                 <ChevronLeft size={20} />
               </button>
             )}
             <div className="flex items-center space-x-3">
               <div className="bg-primary p-2 rounded-xl text-secondary shadow-sm">
                 <Sparkles size={20} />
               </div>
               <div>
                 <h1 className="text-lg font-bold text-gray-900">UCLF Legal AI</h1>
                 <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Ugandan Law Expert</p>
               </div>
             </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-primary" />
            <span>Confidential Consultation</span>
          </div>
        </div>

        {/* Chat Display area */}
        <div className="flex-grow overflow-y-auto pt-8">
          {!activeSession || activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-primary/5 p-6 rounded-3xl mb-6">
                <Sparkles size={48} className="text-primary opacity-20" />
              </div>
              <h2 className="text-3xl font-bold mb-4 font-serif text-gray-900">How can I help you today?</h2>
              <p className="text-gray-500 max-w-lg mx-auto mb-12">
                Ask about the Ugandan Constitution, land laws, criminal procedures, or upload a document for ethical and legal analysis.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {[
                  "What are the requirements for a valid land sale agreement in Uganda?",
                  "Summarize the process of bail application in Magistrates Court.",
                  "Explain the role of faith in Christian legal practice.",
                  "Help me review this tenancy agreement for compliance."
                ].map(q => (
                  <button 
                    key={q}
                    onClick={() => setInput(q)}
                    disabled={isQueryLimitReached}
                    className="p-4 text-left rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all text-sm font-medium text-gray-700 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-6 space-y-12 pb-32">
              {activeSession.messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'assistant' ? 'items-start space-x-6' : 'justify-end'}`}>
                  {m.role === 'assistant' && (
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary shadow-md mt-1">
                      <Sparkles size={20} />
                    </div>
                  )}
                  <div className={`group flex flex-col ${m.role === 'user' ? 'max-w-[85%]' : 'flex-grow'}`}>
                    <div className={`p-5 rounded-3xl ${
                      m.role === 'user' 
                        ? 'bg-[#f0f4f9] text-gray-800 self-end' 
                        : 'bg-white text-gray-800'
                    }`}>
                      {m.attachment && (
                        <div className="mb-4 p-3 bg-white/50 rounded-xl border border-gray-200 flex items-center space-x-3">
                          <FileText size={18} className="text-primary" />
                          <span className="text-xs font-bold truncate max-w-[200px]">{m.attachment.name}</span>
                        </div>
                      )}
                      <div className="prose prose-sm prose-blue max-w-none whitespace-pre-wrap leading-relaxed text-[15px]">
                        {m.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-6">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary shadow-md animate-pulse">
                    <Sparkles size={20} />
                  </div>
                  <div className="flex flex-col space-y-2 w-full pt-2">
                    <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Centered Input Box - Gemini Style */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-6 px-4">
          <div className="max-w-3xl mx-auto">
            
            {isQueryLimitReached && (
              <div className="flex items-center justify-center mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-red-100 animate-in slide-in-from-bottom-2">
                <Lock size={12} className="mr-2" /> Daily query limit reached. Renewed every 24 hours.
              </div>
            )}

            <div className={`bg-[#f0f4f9] rounded-[2rem] p-4 shadow-sm border border-transparent transition-all ${!isQueryLimitReached ? 'focus-within:bg-white focus-within:shadow-xl focus-within:border-gray-200' : 'opacity-50'}`}>
              {attachment && (
                <div className="mb-3 p-2 bg-white rounded-2xl border border-gray-100 flex items-center justify-between animate-in slide-in-from-bottom-2">
                  <div className="flex items-center space-x-3 pl-2">
                    <FileText className="text-primary" size={16} />
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{attachment.file.name}</span>
                  </div>
                  <button onClick={() => setAttachment(null)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <div className="flex items-end space-x-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isQueryLimitReached || isUploadLimitReached}
                  className={`p-3 text-gray-500 hover:text-primary hover:bg-white rounded-full transition-all shrink-0 ${isUploadLimitReached ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <Upload size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                
                <textarea 
                  rows={1}
                  disabled={isQueryLimitReached}
                  className="flex-grow bg-transparent border-none focus:ring-0 outline-none resize-none py-3 text-[15px] font-medium placeholder-gray-500 disabled:cursor-not-allowed"
                  placeholder={isQueryLimitReached ? "Daily quota exceeded" : "Ask a legal question..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                  }}
                />
                
                <button 
                  onClick={handleSend}
                  disabled={isTyping || isQueryLimitReached || (!input.trim() && !attachment)}
                  className={`p-3 rounded-full transition-all shrink-0 ${
                    !input.trim() && !attachment || isQueryLimitReached
                      ? 'text-gray-300' 
                      : 'text-primary hover:bg-white shadow-sm'
                  }`}
                >
                  {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-8">
               <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-primary" />
                 <span>Max File: 10MB</span>
               </div>
               <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <Sparkles size={14} className="text-secondary" />
                 <span>Quota: {currentLimits.queries} Q / {currentLimits.uploads} Docs</span>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
