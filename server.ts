import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  UNIVERSITY_CATEGORIES,
  GENERAL_CAMPUS_INFO,
  OFFICIAL_KNOWLEDGE_BASE_TEXT,
  UNAVAILABLE_INFO_MESSAGE
} from './src/data/universityKnowledge.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory knowledge store (defaulting to the official knowledge base)
let activeKnowledgeBase: string = OFFICIAL_KNOWLEDGE_BASE_TEXT;

// Deterministic rule-based local answer generator adhering strictly to user rules
function getLocalFallbackAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Rule 8: Unrelated to university services
  const isGeneralUnrelated =
    (q.includes('weather') || q.includes('recipe') || q.includes('movie') || q.includes('football match') || q.includes('joke') || q.includes('capital of') || q.includes('bitcoin') || q.includes('crypto')) &&
    !q.includes('campus') && !q.includes('exam') && !q.includes('hostel') && !q.includes('class') && !q.includes('academic');

  if (isGeneralUnrelated) {
    return 'Presidency AI Helpdesk is specifically dedicated to Presidency University campus inquiries (Academics, Attendance, Examinations, Placements, Library, Hostel, Administration, and Events). For non-university questions, please consult external resources.';
  }

  // Rule 6 check: If asking for invented facts (specific percentage, exact date, fee amount, opening hours)
  const asksForInventedFacts =
    q.includes('how much') ||
    q.includes('fee') ||
    q.includes('cost') ||
    q.includes('what percent') ||
    q.includes('percentage') ||
    q.includes('what time') ||
    q.includes('opening hour') ||
    q.includes('closing hour') ||
    q.includes('phone number') ||
    q.includes('exact date') ||
    q.includes('when is the exam') ||
    q.includes('when does the library open') ||
    q.includes('statistics') ||
    q.includes('average package') ||
    q.includes('highest package');

  if (asksForInventedFacts) {
    return UNAVAILABLE_INFO_MESSAGE;
  }

  // Rule 2: Academic problems / subject difficulties / who to contact for academic help
  if (
    q.includes('academic') ||
    q.includes('faculty advisor') ||
    q.includes('subject') ||
    q.includes('course') ||
    q.includes('study problem') ||
    q.includes('studying') ||
    q.includes('academic help') ||
    q.includes('academic problem') ||
    q.includes('advisor') ||
    q.includes('grades') ||
    q.includes('gpa')
  ) {
    return 'Students may contact their faculty advisor for academic-related assistance.';
  }

  // Rule 3: Examination timetables & schedules
  if (
    q.includes('exam') ||
    q.includes('timetable') ||
    q.includes('datesheet') ||
    q.includes('date sheet') ||
    q.includes('notification') ||
    q.includes('schedule')
  ) {
    return 'Examination timetables and notifications are published through official university channels.';
  }

  // Rule 4: Placement training & recruitment
  if (
    q.includes('placement') ||
    q.includes('training') ||
    q.includes('internship') ||
    q.includes('career') ||
    q.includes('job') ||
    q.includes('recruitment')
  ) {
    return 'Students may contact the Placement Department for training and placement-related information.';
  }

  // Rule 5: Hostel complaint & issues
  if (
    q.includes('hostel') ||
    q.includes('dorm') ||
    q.includes('room') ||
    q.includes('roommate')
  ) {
    return 'Hostel-related complaints should be submitted to the Hostel Administration.';
  }

  // Attendance
  if (q.includes('attendance') || q.includes('attend') || q.includes('absent')) {
    return 'Students should follow the minimum attendance requirement prescribed by university regulations.';
  }

  // Library
  if (q.includes('library') || q.includes('book') || q.includes('journal') || q.includes('reading room')) {
    return "Students may access library resources according to the library's timings and regulations.";
  }

  // Administration / records / certificates
  if (
    q.includes('admin') ||
    q.includes('certificate') ||
    q.includes('record') ||
    q.includes('transcript') ||
    q.includes('bonafide') ||
    q.includes('document')
  ) {
    return 'Students may contact the respective administrative office for certificates and student records.';
  }

  // Events
  if (q.includes('event') || q.includes('announcement') || q.includes('fest') || q.includes('competition') || q.includes('activity')) {
    return 'University event announcements are shared through official communication channels.';
  }

  // Rule 7 Default: Unavailable info
  return UNAVAILABLE_INFO_MESSAGE;
}

// GET /api/knowledge
app.get('/api/knowledge', (_req: Request, res: Response) => {
  res.json({
    categories: UNIVERSITY_CATEGORIES,
    campusInfo: GENERAL_CAMPUS_INFO,
    officialText: activeKnowledgeBase
  });
});

// POST /api/knowledge/sync
app.post('/api/knowledge/sync', (req: Request, res: Response) => {
  const { content } = req.body;
  if (typeof content === 'string' && content.trim().length > 0) {
    activeKnowledgeBase = content.trim();
    return res.json({ success: true, message: 'Official knowledge base updated.' });
  }
  return res.status(400).json({ error: 'Invalid content format' });
});

// POST /api/chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid student query.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const fallback = getLocalFallbackAnswer(message);
      return res.json({
        response: fallback,
        model: 'campus-knowledge-engine',
        isGrounded: true
      });
    }

    // Initialize Gemini AI with telemetry header
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `You are Presidency AI Helpdesk, the friendly and professional university campus helpdesk assistant for Presidency University, Bengaluru (located at Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119).

YOUR MISSION & PERSONALITY:
- Provide natural, clear, concise, and helpful responses to university students.
- Be polite, approachable, warm, and easy for students to understand.
- Understand different ways of asking the same question (including colloquial expressions, diverse phrasings, and informal student speech).
- Answer ONLY using the facts from the official university knowledge base below. Do not guess or fabricate information.

OFFICIAL UNIVERSITY KNOWLEDGE BASE:
${activeKnowledgeBase}

CORE DIRECTIVES:
1. ACADEMIC INQUIRIES & PROBLEMS:
   If a student asks who to approach for academic help, expresses difficulty with subjects, course selection, or asks if a faculty advisor can help (e.g. "Who do I approach for academic help?", "I have a problem with my subjects. Whom should I contact?", "Can my faculty advisor help me?"), politely explain that students may contact their faculty advisor for academic-related assistance.

2. EXAMINATION TIMETABLES & SCHEDULES:
   If a student asks where to find examination timetables, datesheets, or notifications, inform them that examination timetables and notifications are published through official university channels.

3. PLACEMENT & TRAINING:
   If a student asks about placement training, career guidance, job drives, or interview prep, explain that students may contact the Placement Department for training and placement-related information.

4. HOSTEL ISSUES & COMPLAINTS:
   If a student asks how to raise a hostel complaint, report room issues, or hostel maintenance, inform them that hostel-related complaints should be submitted to the Hostel Administration.

5. ATTENDANCE:
   Students should follow the minimum attendance requirement prescribed by university regulations.

6. LIBRARY ACCESS:
   Students may access library resources according to the library's timings and regulations.

7. CERTIFICATES & STUDENT RECORDS:
   Students may contact the respective administrative office for certificates and student records.

8. EVENTS & ANNOUNCEMENTS:
   University event announcements are shared through official communication channels.

STRICT CONSTRAINTS:
- NEVER invent examination dates, attendance percentages, hostel fees, library opening hours, placement statistics, office timings or contact details.
- If the requested information is not in the knowledge base, clearly say:
"I'm sorry, that information is not available in the supplied university knowledge base. Please contact the respective university department for confirmation."
- If a question is unrelated to university services, politely explain the scope of this helpdesk.`;

    const contents: any[] = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history.slice(-4)) {
        if (turn.role === 'user' && turn.text) {
          contents.push({ role: 'user', parts: [{ text: turn.text }] });
        } else if (turn.role === 'model' && turn.text) {
          contents.push({ role: 'model', parts: [{ text: turn.text }] });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    const replyText = geminiResponse.text?.trim() || getLocalFallbackAnswer(message);

    return res.json({
      response: replyText,
      model: 'gemini-3.8-flash',
      isGrounded: true
    });
  } catch (error: any) {
    console.error('Error generating AI helpdesk response:', error);
    const fallbackAnswer = getLocalFallbackAnswer(req.body?.message || '');
    return res.json({
      response: fallbackAnswer,
      model: 'campus-knowledge-fallback',
      isGrounded: true
    });
  }
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Presidency AI Helpdesk - Presidency University, Bengaluru',
    location: 'Rajanukunte, Yelahanka, Bengaluru, Karnataka – 560119',
    timestamp: new Date().toISOString()
  });
});

// Server setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Presidency AI Helpdesk] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
