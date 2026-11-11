import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  FileSpreadsheet,
  Briefcase,
  BookOpen,
  Home,
  Building2,
  Calendar,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { UNIVERSITY_CATEGORIES, UniversityCategory } from '../data/universityKnowledge';

interface CategoryCardsProps {
  onSelectCategory: (categoryId: string) => void;
  onAskQuestion: (question: string, categoryId?: string) => void;
  selectedCategoryId?: string;
  onOpenKnowledgeBase?: (categoryId?: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Clock,
  FileSpreadsheet,
  Briefcase,
  BookOpen,
  Home,
  Building2,
  Calendar
};

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  onSelectCategory,
  onAskQuestion,
  selectedCategoryId,
  onOpenKnowledgeBase
}) => {
  const [activeExpandedCategory, setActiveExpandedCategory] = useState<string | null>(
    selectedCategoryId || null
  );

  const handleCardClick = (cat: UniversityCategory) => {
    setActiveExpandedCategory(activeExpandedCategory === cat.id ? null : cat.id);
    onSelectCategory(cat.id);
  };

  const currentCategory = UNIVERSITY_CATEGORIES.find((c) => c.id === activeExpandedCategory);

  return (
    <section id="categories" className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800 mb-2.5">
            <span>Explore Campus Domains</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">8 Key Student Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Explore University Departments & Regulations
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select any department to inspect verified policies, key office timings, and frequently asked student questions.
          </p>
        </div>

        {/* 8 Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UNIVERSITY_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || GraduationCap;
            const isSelected = activeExpandedCategory === cat.id;

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(cat)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(cat);
                  }
                }}
                className={`group relative text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-lg shadow-blue-900/10 ring-2 ring-blue-500/20'
                    : 'bg-white hover:bg-blue-50/30 border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-blue-50 group-hover:bg-blue-100 text-blue-900'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/90 group-hover:bg-blue-100/60 group-hover:text-blue-900 px-2 py-0.5 rounded-md transition-colors">
                    {cat.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform ${
                      isSelected ? 'rotate-90 text-blue-600' : 'group-hover:translate-x-0.5'
                    }`}
                  />
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                {/* Card Footer: Suggested Queries Hint */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium group-hover:text-blue-700">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {cat.suggestedQuestions.length} FAQs ready
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    {isSelected ? 'Viewing' : 'Explore'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Expanded Section for the selected category */}
        {currentCategory && (
          <div className="mt-8 p-6 sm:p-8 bg-white rounded-2xl border-2 border-blue-200/80 shadow-xl shadow-blue-900/5 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                  {React.createElement(ICON_MAP[currentCategory.iconName] || GraduationCap, {
                    className: 'w-5 h-5'
                  })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                    <span>{currentCategory.title} Help & Questions</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {currentCategory.badge}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{currentCategory.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onOpenKnowledgeBase && (
                  <button
                    type="button"
                    onClick={() => onOpenKnowledgeBase(currentCategory.id)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Official Guidelines</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveExpandedCategory(null)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Suggested Question Chips */}
            <div className="mt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Suggested Student Questions (Click to ask Campus AI immediately):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCategory.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onAskQuestion(q, currentCategory.id)}
                    className="p-3.5 rounded-xl border border-blue-100 hover:border-blue-300 bg-blue-50/40 hover:bg-blue-100/60 text-left transition-all duration-150 flex items-start gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <div className="w-6 h-6 rounded-md bg-blue-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      ?
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-950">
                        {q}
                      </p>
                      <span className="text-[11px] text-blue-700 font-medium mt-1 flex items-center gap-1">
                        <span>Ask Campus AI</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
