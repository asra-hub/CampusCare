import React, { useState } from 'react';
import { Sparkles, ArrowRight, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearchSubmit(query.trim());
    setQuery('');
  };

  const quickPrompts = [
    'Who do I contact for academic problems?',
    'Where can I find examination timetables?',
    'How do I get placement training information?',
    'How do I submit a hostel complaint?',
    'What attendance requirement should students follow?'
  ];

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Gradient Mesh */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/70 via-sky-50/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-200/30 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Large Chat Input */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Academic Trust Label & Campus Location */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-900 tracking-wide uppercase mb-3">
              <span className="flex items-center gap-1.5 text-blue-700">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Presidency University, Bengaluru
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 normal-case font-medium">
                Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119
              </span>
            </div>

            {/* Main Heading per requirement 3 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] text-balance">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-sky-600">
                Presidency University
              </span>
            </h1>

            {/* Tagline per requirement 4 */}
            <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Your Campus. Your Answers. One AI Helpdesk.
            </p>
            <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Your official AI-powered university assistant. Get instantaneous, verified guidance on academics, attendance, examinations, placements, hostel administration, and campus life 24/7.
            </p>

            {/* Large Chat Input Box */}
            <div className="mt-8 max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-xl shadow-blue-950/8 border-2 border-blue-100/90 hover:border-blue-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all p-2 gap-2"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about your university..."
                    className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 py-2.5"
                    aria-label="Ask anything about your university"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-base rounded-xl transition-all shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>Ask AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Inquiry Prompts */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium mr-1">Popular questions:</span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSearchSubmit(prompt)}
                    className="px-2.5 py-1 text-slate-600 hover:text-blue-900 hover:bg-blue-50/80 rounded-md transition-colors text-left border border-slate-200/60 bg-white/70"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Adjacency Trust Metrics */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-xl text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">24/7</div>
                <div className="text-xs text-slate-500 font-medium">Instant Responses</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-blue-800 font-mono tabular-nums">8 Domains</div>
                <div className="text-xs text-slate-500 font-medium">Comprehensive Policy Coverage</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-700 font-mono tabular-nums">100%</div>
                <div className="text-xs text-slate-500 font-medium">Fact-Grounded Directory</div>
              </div>
            </div>
          </div>

          {/* Right Column: Collegiate Campus Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl shadow-blue-950/10 bg-slate-900">
              <img
                src="/src/assets/images/presidency_university_campus_1794377012281.jpg"
                alt="Presidency University Bengaluru campus in Rajanukunte Yelahanka with modern academic blocks and landscaped lawns"
                className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle Gradient Scrim per constitution */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* In-Card Floating Student Assistance Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5 text-sky-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">Presidency AI Helpdesk</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-0.5">
                      Rajanukunte, Yelahanka, Bengaluru · 24/7 Student Assistance
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Presidency University Knowledge Base
                  </span>
                  <span className="font-mono text-slate-500">Yelahanka, Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
