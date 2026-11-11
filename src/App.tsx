/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { AiChatInterface } from './components/AiChatInterface';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [modalCategoryId, setModalCategoryId] = useState<string | undefined>(undefined);
  const [customKnowledge, setCustomKnowledge] = useState<string>('');

  // Fetch initial knowledge status
  useEffect(() => {
    fetch('/api/knowledge')
      .then((res) => res.json())
      .catch((err) => console.log('Notice: Knowledge base using local definitions', err));
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskQuestionFromHero = (query: string) => {
    setPendingPrompt(query);
    // Smoothly scroll to helpdesk chat
    const chatElement = document.getElementById('helpdesk');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromCards = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleAskQuestionFromCategory = (question: string, catId?: string) => {
    if (catId) {
      setSelectedCategory(catId);
    }
    setPendingPrompt(question);
    const chatElement = document.getElementById('helpdesk');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenKnowledgeBase = (categoryId?: string) => {
    setModalCategoryId(categoryId);
    setIsKnowledgeModalOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* 1. HEADER */}
      <Header
        activeSection={activeSection}
        onScrollToSection={handleScrollToSection}
        onOpenKnowledgeBase={() => handleOpenKnowledgeBase()}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <HeroSection
          onSearchSubmit={handleAskQuestionFromHero}
          onSelectCategory={handleSelectCategoryFromCards}
        />

        {/* 3. CATEGORY CARDS */}
        <CategoryCards
          selectedCategoryId={selectedCategory}
          onSelectCategory={handleSelectCategoryFromCards}
          onAskQuestion={handleAskQuestionFromCategory}
          onOpenKnowledgeBase={handleOpenKnowledgeBase}
        />

        {/* 4. AI CHAT INTERFACE */}
        <AiChatInterface
          initialPrompt={pendingPrompt}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          customKnowledge={customKnowledge}
        />

        {/* 5. ABOUT SECTION */}
        <AboutSection />
      </main>

      {/* 6. FOOTER */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onOpenKnowledgeBase={() => handleOpenKnowledgeBase()}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          handleScrollToSection('helpdesk');
        }}
      />

      {/* KNOWLEDGE BASE MODAL & CUSTOM INGESTION */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
        initialCategoryId={modalCategoryId}
        onAskQuestion={handleAskQuestionFromCategory}
        customKnowledge={customKnowledge}
        onUpdateCustomKnowledge={setCustomKnowledge}
      />
    </div>
  );
}
