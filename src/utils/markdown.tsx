import React from 'react';

/**
 * Lightweight, safe markdown formatter for AI chat responses.
 * Formats bold, bullet lists, numbered lists, blockquotes, and paragraph breaks cleanly.
 */
export function formatAiResponse(text: string): React.ReactNode {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-2.5 ml-4 list-disc space-y-1.5 text-slate-800 leading-relaxed">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="pl-1">
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-2.5 ml-4 list-decimal space-y-1.5 text-slate-800 leading-relaxed">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="pl-1">
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    // Heading 3 or 4: ### or ####
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={`h3-${i}`} className="mt-3.5 mb-1.5 text-base font-bold text-slate-900 tracking-tight">
          {parseInlineFormatting(line.replace('### ', ''))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={`h2-${i}`} className="mt-4 mb-2 text-lg font-bold text-slate-900 tracking-tight">
          {parseInlineFormatting(line.replace('## ', ''))}
        </h3>
      );
      continue;
    }

    // Unordered list item (- or *)
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Ordered list item (1. or 2.)
    const numberMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberMatch[1]);
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${i}`} className="my-2.5 pl-3.5 border-l-2 border-blue-400 text-slate-700 italic bg-blue-50/50 py-1 rounded-r">
          {parseInlineFormatting(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
      continue;
    }

    // Regular line
    flushList();
    elements.push(
      <p key={`p-${i}`} className="my-1.5 text-slate-800 leading-relaxed text-[15px]">
        {parseInlineFormatting(line)}
      </p>
    );
  }

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

function parseInlineFormatting(str: string): React.ReactNode {
  // Support bold: **bold**
  // Support code: `code`
  // Support italic: *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={`c-${match.index}`} className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono text-blue-700 font-medium">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={`i-${match.index}`} className="italic text-slate-800">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    parts.push(str.substring(lastIndex));
  }

  return parts;
}
