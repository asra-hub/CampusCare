import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  ExternalLink,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { UNIVERSITY_CATEGORIES, GENERAL_CAMPUS_INFO, OFFICIAL_KNOWLEDGE_BASE_TEXT } from '../data/universityKnowledge';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskQuestion: (question: string, categoryId?: string) => void;
  initialCategoryId?: string;
  customKnowledge: string;
  onUpdateCustomKnowledge: (newKnowledge: string) => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  onAskQuestion,
  initialCategoryId,
  customKnowledge,
  onUpdateCustomKnowledge
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'custom'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState(customKnowledge || OFFICIAL_KNOWLEDGE_BASE_TEXT);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveCustom = async () => {
    onUpdateCustomKnowledge(customInput);
    try {
      await fetch('/api/knowledge/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: customInput })
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to sync knowledge base:', err);
    }
  };

  // Filter items
  const allItems = UNIVERSITY_CATEGORIES.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryTitle: c.title, categoryBadge: c.badge }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                University Knowledge Directory
              </h2>
              <p className="text-xs text-slate-400">
                {GENERAL_CAMPUS_INFO.universityName} Official Regulations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="bg-slate-800 p-1 rounded-xl flex items-center text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'browse' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Browse Policies
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeTab === 'custom' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Add / Inspect Custom Facts
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
              aria-label="Close knowledge base"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'browse' ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
            {/* Search & Filter Bar */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search university policies, keywords (e.g. 75%, IEEE, mess, hall ticket)..."
                  className="w-full pl-9 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="all">All Departments ({allItems.length} rules)</option>
                {UNIVERSITY_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm">No policies matched your search criteria.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 text-xs font-semibold text-blue-700 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                          {item.categoryTitle}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{item.categoryBadge}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onAskQuestion(`Can you explain the university rule regarding: ${item.title}?`, item.category);
                          onClose();
                        }}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start sm:self-auto"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI About This</span>
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    {/* Department Directive */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">Directive: {item.department}</span>
                      <span className="text-blue-700 font-semibold text-[11px] bg-blue-50 px-2 py-0.5 rounded">Official University Policy</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Custom Knowledge Input / Ingestion Tab */
          <div className="flex-1 p-6 flex flex-col bg-white overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Inject or Review Custom University Facts</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                As requested, you can paste custom university guidelines, circulars, or specific syllabus/placement criteria here. The backend Gemini model immediately includes these notes in its verified system grounding context!
              </p>
            </div>

            <div className="flex-1 flex flex-col min-h-[280px]">
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Paste university bulletins, specific cutoff percentages, contact numbers, or policies here... e.g.:

- Mid-term exam results will be announced on December 15th.
- Hostel gate closing time is extended to 10:30 PM during Technovate week.
- Placement drive for TechCorp requires 7.2 CGPA and zero active backlogs."
                className="flex-1 p-4 text-sm font-mono text-slate-800 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Knowledge Base synced successfully with server!</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  Changes take effect immediately on subsequent AI questions.
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomInput('')}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  Clear Notes
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Sync Knowledge</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
