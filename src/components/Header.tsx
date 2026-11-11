import React, { useState } from 'react';
import { Sparkles, Menu, X, ShieldAlert, BookOpen } from 'lucide-react';
import { GENERAL_CAMPUS_INFO } from '../data/universityKnowledge';

interface HeaderProps {
  onOpenKnowledgeBase?: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenKnowledgeBase,
  onScrollToSection,
  activeSection = 'home'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChannelsModal, setShowChannelsModal] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Single Brand Wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-sky-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-950 font-sans leading-tight">
                  Presidency<span className="text-blue-700 font-extrabold"> University</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Presidency AI Helpdesk · Bengaluru
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Single line, quiet hover) */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-900 ${
                  activeSection === 'home' ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('categories')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-900 ${
                  activeSection === 'categories' ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                Explore Categories
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('helpdesk')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-900 ${
                  activeSection === 'helpdesk' ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                Helpdesk
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-blue-900 ${
                  activeSection === 'about' ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                About
              </button>
              {onOpenKnowledgeBase && (
                <button
                  type="button"
                  onClick={onOpenKnowledgeBase}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-blue-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Knowledge Base</span>
                </button>
              )}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowChannelsModal(true)}
                className="px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100/80 rounded-lg transition-colors border border-blue-200/60 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="View official university communication channels"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Official Channels</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('helpdesk')}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-950 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('helpdesk')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 rounded-lg flex items-center gap-1"
              >
                <span>Ask AI</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('categories')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
            >
              Explore Categories
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('helpdesk')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-blue-900 font-semibold bg-blue-50/70 rounded-md"
            >
              Helpdesk & Chat
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
            >
              About Presidency University
            </button>
            {onOpenKnowledgeBase && (
              <button
                type="button"
                onClick={() => {
                  onOpenKnowledgeBase();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Browse University Knowledge Base</span>
              </button>
            )}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowChannelsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-blue-800 flex items-center gap-1 py-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Official Channels Directory</span>
              </button>
              <span className="text-[11px] text-slate-500 font-medium">Bengaluru</span>
            </div>
          </div>
        )}
      </header>

      {/* Official Channels Modal */}
      {showChannelsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowChannelsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Official University Channels</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Presidency University · Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119
                </p>
              </div>
            </div>

            <div className="space-y-2.5 my-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Academics</div>
                <div className="text-slate-700 mt-0.5">Students may contact their faculty advisor for academic-related assistance.</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Examinations</div>
                <div className="text-slate-700 mt-0.5">Examination timetables and notifications are published through official university channels.</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Placements</div>
                <div className="text-slate-700 mt-0.5">Students may contact the Placement Department for training and placement-related information.</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Hostel</div>
                <div className="text-slate-700 mt-0.5">Hostel-related complaints should be submitted to the Hostel Administration.</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Administration</div>
                <div className="text-slate-700 mt-0.5">Students may contact the respective administrative office for certificates and student records.</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-900 uppercase">Events</div>
                <div className="text-slate-700 mt-0.5">University event announcements are shared through official communication channels.</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowChannelsModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              Close Directory
            </button>
          </div>
        </div>
      )}
    </>
  );
};
