import React from 'react';
import { Sparkles, ArrowUp, ShieldAlert, BookOpen, GraduationCap } from 'lucide-react';
import { GENERAL_CAMPUS_INFO } from '../data/universityKnowledge';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenKnowledgeBase?: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenKnowledgeBase,
  onSelectCategory
}) => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { id: 'academics', label: 'Academics & CGPA' },
    { id: 'attendance', label: '75% Attendance Rules' },
    { id: 'examinations', label: 'Examinations & Hall Tickets' },
    { id: 'placements', label: 'Placements & Internships' },
    { id: 'library', label: 'Central Library & IEEE' },
    { id: 'hostel', label: 'Hostel & Mess Policies' },
    { id: 'administration', label: 'Registrar & Bonafide' },
    { id: 'events', label: 'Clubs & Campus Festivals' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Purpose */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-sky-200" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Presidency<span className="text-sky-400"> AI Helpdesk</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Official intelligent campus helpdesk for Presidency University students, faculty, and visitors. Delivers verified academic and administrative guidance 24/7.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <strong className="text-slate-200">Institution:</strong> {GENERAL_CAMPUS_INFO.universityName}
              </div>
              <div>
                <strong className="text-slate-200">Campus Location:</strong> Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119
              </div>
            </div>
          </div>

          {/* Col 2: Campus Domains */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore Campus Domains
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCategory && onSelectCategory(c.id)}
                  className="text-left text-slate-400 hover:text-sky-300 py-1 transition-colors truncate"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Official Channels */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Official University Channels
            </h4>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="text-sky-300 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Knowledge Directory Protocol</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Examination timetables and event announcements are published strictly through official university communication channels.
              </p>
            </div>

            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Administrative Office:</span> Available for official certificates and student records.
            </div>
          </div>
        </div>

        {/* Technology Stack & Technical Competition Credits */}
        <div className="py-6 border-b border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-slate-300">Technologies Used:</span>
            <span>React 19</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>TypeScript</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Tailwind CSS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Node.js / Express</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-sky-400 font-medium">Google Gemini AI API (gemini-3.8-flash)</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenKnowledgeBase && (
              <button
                type="button"
                onClick={onOpenKnowledgeBase}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Directory</span>
              </button>
            )}
            <button
              type="button"
              onClick={onScrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Short Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-2xl leading-relaxed text-slate-400">
            <strong className="text-slate-300 font-medium">Disclaimer: </strong>
            Presidency AI Helpdesk is an assistive campus guidance system for Presidency University, Bengaluru. For official physical document seals and administrative records, please visit the respective administrative office.
          </p>
          <div className="text-slate-400 text-right shrink-0">
            &copy; {currentYear} Presidency University, Bengaluru. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
