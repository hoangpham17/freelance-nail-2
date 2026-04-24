/**
 * Convert Airtable richtext (Markdown-like) format to HTML
 * https://support.airtable.com/docs/using-markdown-in-airtable
 */
export const parseAirtableRichtext = (richtext?: string): string => {
  if (!richtext) return "";

  let html = richtext;

  // First, handle escaped characters (must be done first to preserve literal characters)
  // Use control-char placeholders (no _ or *) so they are not matched by bold/italic regexes
  const escapeMap: Array<{
    pattern: RegExp;
    placeholder: string;
    char: string;
  }> = [
    { pattern: /\\\*/g, placeholder: "\x01", char: "*" },
    { pattern: /\\_/g, placeholder: "\x02", char: "_" },
    { pattern: /\\~/g, placeholder: "\x03", char: "~" },
    { pattern: /\\`/g, placeholder: "\x04", char: "`" },
    { pattern: /\\\[/g, placeholder: "\x05", char: "[" },
    { pattern: /\\\]/g, placeholder: "\x06", char: "]" },
    { pattern: /\\#/g, placeholder: "\x07", char: "#" },
    { pattern: /\\>/g, placeholder: "\x08", char: ">" },
  ];

  escapeMap.forEach(({ pattern, placeholder }) => {
    html = html.replace(pattern, placeholder);
  });

  // Code blocks (must be processed before other formatting)
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Blockquotes
  html = html.replace(/^>\s*(.+)$/gm, "<blockquote>$1</blockquote>");

  // Headings
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Checkboxes
  html = html.replace(
    /\[x\]\s*(.+)/g,
    '<input type="checkbox" checked disabled> <span>$1</span>',
  );
  html = html.replace(
    /\[\s\]\s*(.+)/g,
    '<input type="checkbox" disabled> <span>$1</span>',
  );

  // Process lists line by line
  const listLines = html.split("\n");
  const listProcessedLines: string[] = [];
  let currentList: { type: "ul" | "ol" } | null = null;

  for (let i = 0; i < listLines.length; i++) {
    const line = listLines[i];

    // Check for ordered list item (1. or 1) format)
    const orderedMatch = line.match(/^(\s*)(\d+)[.)]\s+(.+)$/);
    if (orderedMatch) {
      const content = orderedMatch[3];

      // If we're in a different list type, close it
      if (currentList && currentList.type !== "ol") {
        listProcessedLines.push(`</${currentList.type}>`);
        currentList = null;
      }

      // Start new list if needed
      if (!currentList) {
        currentList = { type: "ol" };
        listProcessedLines.push(`<ol>`);
      }

      listProcessedLines.push(`<li>${content}</li>`);
      continue;
    }

    // Check for unordered list item (-, *, or +)
    const unorderedMatch = line.match(/^(\s*)[*\-+]\s+(.+)$/);
    if (unorderedMatch) {
      const content = unorderedMatch[2];

      // If we're in a different list type, close it
      if (currentList && currentList.type !== "ul") {
        listProcessedLines.push(`</${currentList.type}>`);
        currentList = null;
      }

      // Start new list if needed
      if (!currentList) {
        currentList = { type: "ul" };
        listProcessedLines.push(`<ul>`);
      }

      listProcessedLines.push(`<li>${content}</li>`);
      continue;
    }

    // Not a list item - close current list if any
    if (currentList) {
      listProcessedLines.push(`</${currentList.type}>`);
      currentList = null;
    }

    listProcessedLines.push(line);
  }

  // Close any remaining list
  if (currentList) {
    listProcessedLines.push(`</${currentList.type}>`);
  }

  html = listProcessedLines.join("\n");

  // Hyperlinks
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  // Inline code (must be before bold/italic to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Strikethrough
  html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  // Bold (both ** and __)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight: 600;">$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong style="font-weight: 600;">$1</strong>');

  // Italic (both * and _) - must be after bold to avoid conflicts
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Restore escaped characters (placeholders are control chars \x01-\x08, safe from bold/italic)
  escapeMap.forEach(({ placeholder, char: restoredChar }) => {
    html = html.split(placeholder).join(restoredChar);
  });

  // Wrap consecutive block-level elements and paragraphs
  // Split by double newlines to create paragraphs
  const paragraphLines = html.split(/\n\n+/);
  const paragraphProcessedLines = paragraphLines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";

    // If it's already a block element, return as is
    if (/^<(h[1-6]|p|div|ul|ol|blockquote|pre)/.test(trimmed)) {
      return trimmed;
    }

    // Otherwise wrap in paragraph
    return `<p class="whitespace-pre-wrap">${trimmed}</p>`;
  });

  html = paragraphProcessedLines.filter(Boolean).join("\n");

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
};
