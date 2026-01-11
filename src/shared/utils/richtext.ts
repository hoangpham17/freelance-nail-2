/**
 * Convert Airtable richtext (Markdown-like) format to HTML
 * https://support.airtable.com/docs/using-markdown-in-airtable
 */
export const parseAirtableRichtext = (richtext?: string): string => {
  if (!richtext) return "";

  let html = richtext;

  // First, handle escaped characters (must be done first to preserve literal characters)
  // Replace escaped markdown characters with placeholders
  const escapeMap: Array<{ pattern: RegExp; placeholder: string }> = [
    { pattern: /\\\*/g, placeholder: "___ESCAPED_ASTERISK___" },
    { pattern: /\\_/g, placeholder: "___ESCAPED_UNDERSCORE___" },
    { pattern: /\\~/g, placeholder: "___ESCAPED_TILDE___" },
    { pattern: /\\`/g, placeholder: "___ESCAPED_BACKTICK___" },
    { pattern: /\\\[/g, placeholder: "___ESCAPED_LEFT_BRACKET___" },
    { pattern: /\\\]/g, placeholder: "___ESCAPED_RIGHT_BRACKET___" },
    { pattern: /\\#/g, placeholder: "___ESCAPED_HASH___" },
    { pattern: /\\>/g, placeholder: "___ESCAPED_GT___" },
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
    '<input type="checkbox" checked disabled> <span>$1</span>'
  );
  html = html.replace(
    /\[\s\]\s*(.+)/g,
    '<input type="checkbox" disabled> <span>$1</span>'
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
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Inline code (must be before bold/italic to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Strikethrough
  html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  // Bold (both ** and __)
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic (both * and _) - must be after bold to avoid conflicts
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Restore escaped characters
  escapeMap.forEach(({ placeholder }) => {
    const originalChar = placeholder
      .replace(/___ESCAPED_|___/g, "")
      .toLowerCase();
    let restoredChar = "";
    switch (originalChar) {
      case "asterisk":
        restoredChar = "*";
        break;
      case "underscore":
        restoredChar = "_";
        break;
      case "tilde":
        restoredChar = "~";
        break;
      case "backtick":
        restoredChar = "`";
        break;
      case "left_bracket":
        restoredChar = "[";
        break;
      case "right_bracket":
        restoredChar = "]";
        break;
      case "hash":
        restoredChar = "#";
        break;
      case "gt":
        restoredChar = ">";
        break;
    }
    html = html.replace(new RegExp(placeholder, "g"), restoredChar);
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
    return `<p>${trimmed}</p>`;
  });

  html = paragraphProcessedLines.filter(Boolean).join("\n");

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");

  return html;
};
