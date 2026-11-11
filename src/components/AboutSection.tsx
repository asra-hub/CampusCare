import React from 'react';
import {
  Clock,
  ShieldCheck,
  Building,
  Zap,
  Users,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      title: "24/7 Instant Access",
      description: "University offices have fixed counter hours, but student queries happen around the clock. Presidency AI Helpdesk provides instantaneous answers even during late-night exam prep."
    },
    {
      icon: ShieldCheck,
      title: "Zero Hallucination Grounding",
      description: "Unlike generic conversational models that guess or invent rules, Presidency AI Helpdesk answers strictly from verified university regulations, academic codes, and official policies."
    },
    {
      icon: Building,
      title: "Cross-Departmental Directory",
      description: "Navigating between the Academic Dean's Block, Examination Wing, Placement Hub, and Hostel Warden's office is simplified into a single unified conversational desk."
    },
    {
      icon: Users,
      title: "Clear Escalation & Contacts",
      description: "When physical paperwork or faculty signatures are required (e.g. NOCs, Grade Grievances), the assistant provides exact counter numbers, room locations, and department emails."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800 mb-2.5">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Presidency University · Bengaluru</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            How Presidency AI Transforms Student Guidance
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminating long queues, confusing paperwork procedures, and hearsay advice by bringing authoritative university guidance directly to students’ screens at Presidency University.
          </p>
        </div>

        {/* 2-Column Split: Visual & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left: Image & Caption */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/presidency_student_hub_1794377029706.jpg"
                alt="Presidency University Bengaluru Innovation Centre and Student Helpdesk Lounge"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                  Presidency University Innovation Centre & Helpdesk
                </div>
                <div className="text-lg font-bold mt-1">
                  Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119
                </div>
              </div>
            </div>
          </div>

          {/* Right: Concrete Problem vs Solution Comparison */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2.5 text-rose-700 font-bold text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Traditional Campus Experience</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Students often spend hours waiting in queues between administrative counters, relying on outdated senior WhatsApp groups or vague hearsay regarding attendance condonation, exam notifications, or placement training.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-900 text-white shadow-lg shadow-blue-950/10">
              <div className="flex items-center gap-2.5 text-sky-300 font-bold text-sm mb-2">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>The Presidency AI Helpdesk Solution</span>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Presidency AI Helpdesk acts as an authoritative, conversational university assistant. By centralizing verified university handbooks, academic regulations, and departmental directives into Gemini AI, students obtain crisp answers in under two seconds.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-800 flex items-center gap-4 text-xs text-sky-200">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No counter queues
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Presidency University Grounded
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mobile-optimized
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/60 text-slate-800 text-xs leading-relaxed">
              <strong className="text-blue-950 font-semibold block mb-1">
                Campus Location & Operations:
              </strong>
              Presidency University, Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119. Engineered with full-stack security where Gemini AI calls remain strictly on the backend, ensuring zero API key exposure to the browser while maintaining sub-second response delivery.
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
