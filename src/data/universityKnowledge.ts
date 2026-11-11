export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
  keywords: string[];
  department: string;
}

export interface UniversityCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  badge: string;
  suggestedQuestions: string[];
  items: KnowledgeItem[];
}

export const OFFICIAL_KNOWLEDGE_BASE_TEXT = `OFFICIAL UNIVERSITY KNOWLEDGE BASE:

ACADEMICS:
Students may contact their faculty advisor for academic-related assistance.

ATTENDANCE:
Students should follow the minimum attendance requirement prescribed by university regulations.

EXAMINATIONS:
Examination timetables and notifications are published through official university channels.

PLACEMENTS:
Students may contact the Placement Department for training and placement-related information.

LIBRARY:
Students may access library resources according to the library's timings and regulations.

HOSTEL:
Hostel-related complaints should be submitted to the Hostel Administration.

ADMINISTRATION:
Students may contact the respective administrative office for certificates and student records.

EVENTS:
University event announcements are shared through official communication channels.`;

export const UNIVERSITY_CATEGORIES: UniversityCategory[] = [
  {
    id: "academics",
    title: "Academics",
    iconName: "GraduationCap",
    description: "Students may contact their faculty advisor for academic-related assistance.",
    badge: "Faculty Advisor",
    suggestedQuestions: [
      "Who should I contact for academic-related assistance?",
      "Who can help me with academic problems or course guidance?"
    ],
    items: [
      {
        id: "acad-policy",
        category: "academics",
        title: "Academic Assistance & Faculty Advisor",
        summary: "Students may contact their faculty advisor for academic-related assistance.",
        details: "Students may contact their faculty advisor for academic-related assistance.",
        keywords: ["academic", "advisor", "faculty", "assistance", "guidance", "courses", "problems", "studies"],
        department: "Faculty Advisor / Academic Department"
      }
    ]
  },
  {
    id: "attendance",
    title: "Attendance",
    iconName: "Clock",
    description: "Students should follow the minimum attendance requirement prescribed by university regulations.",
    badge: "Regulations",
    suggestedQuestions: [
      "What is the university attendance requirement?",
      "What attendance policy should students follow?"
    ],
    items: [
      {
        id: "att-policy",
        category: "attendance",
        title: "Minimum Attendance Requirement",
        summary: "Students should follow the minimum attendance requirement prescribed by university regulations.",
        details: "Students should follow the minimum attendance requirement prescribed by university regulations.",
        keywords: ["attendance", "minimum", "regulations", "requirement", "classes", "presence"],
        department: "Academic Office / University Regulations"
      }
    ]
  },
  {
    id: "examinations",
    title: "Examinations",
    iconName: "FileSpreadsheet",
    description: "Examination timetables and notifications are published through official university channels.",
    badge: "Official Channels",
    suggestedQuestions: [
      "Where can I find examination timetables and notifications?",
      "How are exam schedules announced?"
    ],
    items: [
      {
        id: "exam-policy",
        category: "examinations",
        title: "Examination Timetables & Notifications",
        summary: "Examination timetables and notifications are published through official university channels.",
        details: "Examination timetables and notifications are published through official university channels.",
        keywords: ["examination", "exams", "timetables", "notifications", "datesheet", "schedule", "channels"],
        department: "Examination Department / Official Channels"
      }
    ]
  },
  {
    id: "placements",
    title: "Placements",
    iconName: "Briefcase",
    description: "Students may contact the Placement Department for training and placement-related information.",
    badge: "Placement Dept",
    suggestedQuestions: [
      "Who should I contact for placement and training information?",
      "How do I get placement training guidance?"
    ],
    items: [
      {
        id: "place-policy",
        category: "placements",
        title: "Placement Training & Career Services",
        summary: "Students may contact the Placement Department for training and placement-related information.",
        details: "Students may contact the Placement Department for training and placement-related information.",
        keywords: ["placement", "training", "jobs", "internships", "careers", "department", "recruitment"],
        department: "Placement Department"
      }
    ]
  },
  {
    id: "library",
    title: "Library",
    iconName: "BookOpen",
    description: "Students may access library resources according to the library's timings and regulations.",
    badge: "Timings & Rules",
    suggestedQuestions: [
      "How can students access university library resources?",
      "What are the rules for accessing the library?"
    ],
    items: [
      {
        id: "lib-policy",
        category: "library",
        title: "Library Resource Access & Regulations",
        summary: "Students may access library resources according to the library's timings and regulations.",
        details: "Students may access library resources according to the library's timings and regulations.",
        keywords: ["library", "resources", "books", "access", "timings", "regulations", "study"],
        department: "University Library"
      }
    ]
  },
  {
    id: "hostel",
    title: "Hostel",
    iconName: "Home",
    description: "Hostel-related complaints should be submitted to the Hostel Administration.",
    badge: "Hostel Admin",
    suggestedQuestions: [
      "How do I submit a hostel-related complaint?",
      "Who should I contact for hostel maintenance or issues?"
    ],
    items: [
      {
        id: "hostel-policy",
        category: "hostel",
        title: "Hostel Administration & Complaints",
        summary: "Hostel-related complaints should be submitted to the Hostel Administration.",
        details: "Hostel-related complaints should be submitted to the Hostel Administration.",
        keywords: ["hostel", "complaint", "room", "administration", "maintenance", "warden", "living"],
        department: "Hostel Administration"
      }
    ]
  },
  {
    id: "administration",
    title: "Administration",
    iconName: "Building2",
    description: "Students may contact the respective administrative office for certificates and student records.",
    badge: "Administrative Office",
    suggestedQuestions: [
      "Who should I contact for certificates and student records?",
      "How can I request official student records or certificates?"
    ],
    items: [
      {
        id: "admin-policy",
        category: "administration",
        title: "Certificates & Student Records",
        summary: "Students may contact the respective administrative office for certificates and student records.",
        details: "Students may contact the respective administrative office for certificates and student records.",
        keywords: ["administration", "certificates", "records", "bonafide", "transcript", "office", "documents"],
        department: "Respective Administrative Office"
      }
    ]
  },
  {
    id: "events",
    title: "Events",
    iconName: "Calendar",
    description: "University event announcements are shared through official communication channels.",
    badge: "Official Channels",
    suggestedQuestions: [
      "Where are university event announcements shared?",
      "How do students learn about upcoming university events?"
    ],
    items: [
      {
        id: "events-policy",
        category: "events",
        title: "University Event Announcements",
        summary: "University event announcements are shared through official communication channels.",
        details: "University event announcements are shared through official communication channels.",
        keywords: ["events", "announcements", "festivals", "activities", "channels", "communication", "campus"],
        department: "University Communications / Official Channels"
      }
    ]
  }
];

export const GENERAL_CAMPUS_INFO = {
  universityName: "Presidency University, Bengaluru",
  shortName: "Presidency University",
  chatbotName: "Presidency AI Helpdesk",
  location: "Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119",
  officialWebsite: "https://presidencyuniversity.in",
  academicYear: "Official Academic Regulations"
};

export const UNAVAILABLE_INFO_MESSAGE =
  "I'm sorry, that information is not available in the supplied university knowledge base. Please contact the respective university department for confirmation.";
