/**
 * MarkChord Syntax Highlighting Plugin for Obsidian
 * Version: 2.0.0 - With Quick to Standard Converter
 */

import { Plugin, PluginSettingTab, Setting, Notice, Editor, MarkdownView } from 'obsidian';

interface MarkChordSettings {
  theme: string;
  enableInReading: boolean;
}

const DEFAULT_SETTINGS: MarkChordSettings = {
  theme: 'default',
  enableInReading: true,
};

export default class MarkChordPlugin extends Plugin {
  settings: MarkChordSettings;

  async onload() {
    console.log('Loading MarkChord Syntax Highlighting Plugin');

    // Load settings
    await this.loadSettings();

    // Register markdown code block processor for reading view
    this.registerMarkdownCodeBlockProcessor('markchord', (source, el, ctx) => {
      el.classList.add('markchord-block');
      this.highlightMarkChordBlock(source, el);
    });

    // Add settings tab
    this.addSettingTab(new MarkChordSettingTab(this.app, this));

    // Add command to convert Quick to Standard
    this.addCommand({
      id: 'convert-quick-to-standard',
      name: 'Convert Quick to Standard',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this.convertQuickToStandardCommand(editor);
      }
    });

    console.log('MarkChord plugin loaded successfully');
  }

  onunload() {
    console.log('Unloading MarkChord plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  /**
   * Highlight a MarkChord block in reading view
   */
  highlightMarkChordBlock(source: string, el: HTMLElement) {
    el.empty();
    const lines = source.split('\n');

    lines.forEach(line => {
      const lineEl = el.createEl('div', { cls: 'markchord-line' });
      const trimmed = line.trim();

      // Title: # Text
      if (trimmed.startsWith('#') && !trimmed.startsWith('##')) {
        lineEl.classList.add('markchord-title');
        this.highlightWithDiscreteSymbol(line, lineEl, '#');
      }
      // Section: ## Text
      else if (trimmed.startsWith('##')) {
        lineEl.classList.add('markchord-section');
        if (line.includes('|')) {
          this.highlightSectionWithChords(line, lineEl);
        } else {
          this.highlightWithDiscreteSymbol(line, lineEl, '##');
        }
      }
      // Metadata: @key value
      else if (trimmed.startsWith('@')) {
        lineEl.classList.add('markchord-meta');
        this.highlightMetadata(line, lineEl);
      }
      // Line comment: ''comment
      else if (trimmed.startsWith("''")) {
        lineEl.classList.add('markchord-comment-line');
        if (line.includes('|')) {
          this.highlightLineCommentWithChords(line, lineEl);
        } else {
          this.highlightComment(line, lineEl, "''");
        }
      }
      // Beat comment line
      else if (trimmed.startsWith("'")) {
        lineEl.classList.add('markchord-comment-beat');
        this.highlightBeatCommentLine(line, lineEl);
      }
      // Section comment: /comment
      else if (trimmed.startsWith('/')) {
        lineEl.classList.add('markchord-comment-section');
        if (line.includes('|')) {
          this.highlightSectionCommentWithChords(line, lineEl);
        } else {
          this.highlightComment(line, lineEl, '/');
        }
      }
      // Chord grid line (contains |)
      else if (line.includes('|')) {
        lineEl.classList.add('markchord-grid');
        this.highlightChordLine(line, lineEl);
      }
      // Regular line
      else {
        lineEl.textContent = line;
      }
    });
  }

  /**
   * Highlight section comment with chords (/comment | C | D | ...)
   */
  highlightSectionCommentWithChords(line: string, el: HTMLElement) {
    const pipeIndex = line.indexOf('|');
    const commentPart = line.substring(0, pipeIndex);
    const chordPart = line.substring(pipeIndex);

    const spaces = commentPart.match(/^\s*/)?.[0] || '';
    el.appendText(spaces);
    el.createSpan({ cls: 'markchord-symbol-discrete', text: '/' });
    const commentText = commentPart.substring(spaces.length + 1);
    el.createSpan({ cls: 'markchord-comment-text', text: commentText });

    this.highlightChordLine(chordPart, el);
  }

  /**
   * Highlight line comment with chords (''comment | C | D | ...)
   */
  highlightLineCommentWithChords(line: string, el: HTMLElement) {
    const pipeIndex = line.indexOf('|');
    const commentPart = line.substring(0, pipeIndex);
    const chordPart = line.substring(pipeIndex);

    const spaces = commentPart.match(/^\s*/)?.[0] || '';
    el.appendText(spaces);
    el.createSpan({ cls: 'markchord-symbol-discrete', text: "''" });
    const commentText = commentPart.substring(spaces.length + 2);
    el.createSpan({ cls: 'markchord-comment-text', text: commentText });

    this.highlightChordLine(chordPart, el);
  }

  /**
   * Highlight beat comment line (multiple ' aligned with bars)
   */
  highlightBeatCommentLine(line: string, el: HTMLElement) {
    let i = 0;
    while (i < line.length) {
      const char = line[i];

      if (char === "'") {
        let commentText = "'";
        i++;
        while (i < line.length && line[i] !== ' ' && line[i] !== "'") {
          commentText += line[i];
          i++;
        }

        el.createSpan({ cls: 'markchord-symbol-discrete', text: "'" });
        if (commentText.length > 1) {
          el.createSpan({ cls: 'markchord-comment-text', text: commentText.substring(1) });
        }
      } else {
        el.appendText(char);
        i++;
      }
    }
  }

  /**
   * Highlight metadata line (@key value)
   */
  highlightMetadata(line: string, el: HTMLElement) {
    const match = line.match(/^(\s*)(@)(\w+)(\s+)(.*)$/);
    if (match) {
      const [, spaces, at, key, spacesAfter, value] = match;
      el.appendText(spaces);
      el.createSpan({ cls: 'markchord-meta-at', text: at });
      el.createSpan({ cls: 'markchord-meta-key', text: key });
      el.appendText(spacesAfter);
      el.createSpan({ cls: 'markchord-meta-value', text: value });
    } else {
      el.textContent = line;
    }
  }

  /**
   * Highlight section header with chords
   */
  highlightSectionWithChords(line: string, el: HTMLElement) {
    const pipeIndex = line.indexOf('|');
    const sectionPart = line.substring(0, pipeIndex);
    const chordPart = line.substring(pipeIndex);

    el.createSpan({ cls: 'markchord-symbol-discrete', text: '##' });
    const sectionText = sectionPart.substring(2);
    el.createSpan({ cls: 'markchord-section-name', text: sectionText });

    this.highlightChordLine(chordPart, el);
  }

  /**
   * Highlight text with discrete symbol at start
   */
  highlightWithDiscreteSymbol(line: string, el: HTMLElement, symbol: string) {
    el.createSpan({ cls: 'markchord-symbol-discrete', text: symbol });
    const restText = line.substring(symbol.length);
    el.appendText(restText);
  }

  /**
   * Highlight comment with discrete symbol
   */
  highlightComment(line: string, el: HTMLElement, symbol: string) {
    el.createSpan({ cls: 'markchord-symbol-discrete', text: symbol });
    const restText = line.substring(symbol.length);
    el.appendText(restText);
  }

  /**
   * Highlight a chord grid line
   */
  highlightChordLine(line: string, el: HTMLElement) {
    let i = 0;
    while (i < line.length) {
      const char = line[i];

      // Check repeat markers FIRST
      if (char === ':' && line[i + 1] === '|') {
        el.createSpan({ cls: 'markchord-repeat', text: ':|' });
        i += 2;
      } else if (char === '|' && line[i + 1] === ':') {
        el.createSpan({ cls: 'markchord-repeat', text: '|:' });
        i += 2;
      } else if (char === '|') {
        el.createSpan({ cls: 'markchord-bar', text: '|' });
        i++;
      } else if (char === '%') {
        el.createSpan({ cls: 'markchord-repeat-symbol', text: '%' });
        i++;
      } else {
        // Check if we're at the start of a chord (after | or :)
        const prevChar = i > 0 ? line[i - 1] : '';
        const isAfterBar = prevChar === '|' || prevChar === ':';

        if (isAfterBar && char !== ' ') {
          // Extract chord
          let chord = '';
          while (i < line.length && line[i] !== '|' && line[i] !== ' ') {
            chord += line[i];
            i++;
          }

          // Determine chord class - match CSS class names
          let chordClass = 'markchord-chord';
          if (chord.match(/m7|min7|m9|min9|m11|min11|m13|min13|m/)) {
            chordClass = 'markchord-chord-minor';
          } else if (chord.match(/maj7|M7|maj9|M9|maj11|M11|maj13|M13/)) {
            chordClass = 'markchord-chord-major';
          } else if (chord.match(/dim|o7/)) {
            chordClass = 'markchord-chord-dim';
          } else if (chord.match(/aug|\+/)) {
            chordClass = 'markchord-chord-aug';
          } else if (chord.match(/sus/)) {
            chordClass = 'markchord-chord-sus';
          } else if (chord.match(/^[A-G][#b]?7/)) {
            chordClass = 'markchord-chord-dom';
          }

          el.createSpan({ cls: chordClass, text: chord });
        } else {
          el.appendText(char);
          i++;
        }
      }
    }
  }

  /**
   * Command to convert Quick mode to Standard mode
   */
  convertQuickToStandardCommand(editor: Editor) {
    const cursor = editor.getCursor();
    const line = cursor.line;

    const codeBlock = this.findMarkChordBlock(editor, line);

    if (!codeBlock) {
      new Notice('Cursor is not inside a markchord code block');
      return;
    }

    const { start, end, content } = codeBlock;

    if (!content.includes('@quick') && !content.includes('@q') && !content.match(/^\s*_[a-z0-9]+/m)) {
      new Notice('This is not a Quick mode block');
      return;
    }

    try {
      const standardContent = convertQuickToStandard(content);
      const from = { line: start + 1, ch: 0 };
      const to = { line: end - 1, ch: editor.getLine(end - 1).length };
      editor.replaceRange(standardContent, from, to);
      new Notice('✓ Converted to Standard mode');
    } catch (error) {
      console.error('Error converting:', error);
      new Notice('Error: ' + (error as Error).message);
    }
  }

  /**
   * Find the markchord code block containing the cursor
   */
  findMarkChordBlock(editor: Editor, lineNumber: number): { start: number; end: number; content: string } | null {
    const totalLines = editor.lineCount();
    let start = -1;

    for (let i = lineNumber; i >= 0; i--) {
      const line = editor.getLine(i);
      if (line.trim() === '```markchord') {
        start = i;
        break;
      }
      if (line.trim().startsWith('```') && line.trim() !== '```markchord') {
        return null;
      }
    }

    if (start === -1) return null;

    let end = -1;
    for (let i = start + 1; i < totalLines; i++) {
      const line = editor.getLine(i);
      if (line.trim() === '```') {
        end = i;
        break;
      }
    }

    if (end === -1) return null;

    const contentLines = [];
    for (let i = start + 1; i < end; i++) {
      contentLines.push(editor.getLine(i));
    }

    return { start, end, content: contentLines.join('\n') };
  }
}

/**
 * Settings tab
 */
class MarkChordSettingTab extends PluginSettingTab {
  plugin: MarkChordPlugin;

  constructor(app: any, plugin: MarkChordPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'MarkChord Syntax Highlighting' });

    new Setting(containerEl)
      .setName('Theme')
      .setDesc('Choose the color theme for MarkChord syntax highlighting')
      .addDropdown(dropdown => dropdown
        .addOption('default', 'Light (Default)')
        .addOption('dark', 'Dark')
        .addOption('high-contrast', 'High Contrast')
        .setValue(this.plugin.settings.theme)
        .onChange(async (value) => {
          this.plugin.settings.theme = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Enable in Reading View')
      .setDesc('Apply syntax highlighting in reading/preview mode')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableInReading)
        .onChange(async (value) => {
          this.plugin.settings.enableInReading = value;
          await this.plugin.saveSettings();
        }));
  }
}

// ============================================
// Quick to Standard Converter
// ============================================

interface Section {
  label: string;
  name: string;
  lines: string[][];
  commentLines: string[][]; // Comentarios de compás por línea
  repeat?: number;
}

const SECTION_NAMES: Record<string, string> = {
  'i': 'Intro', 'v1': 'Verse 1', 'v2': 'Verse 2', 'v3': 'Verse 3', 'v4': 'Verse 4',
  'c': 'Chorus', 'pc': 'Pre-Chorus', 'b': 'Bridge', 's': 'Solo', 'm': 'Middle 8',
  'o': 'Outro', 'k': 'Coda'
};

function convertQuickToStandard(quickSource: string): string {
  const lines = quickSource.split('\n');
  const metadata: Record<string, string> = {};
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#') && !trimmed.startsWith('##')) {
      metadata.title = trimmed;
      continue;
    }

    if (trimmed.startsWith('@')) {
      const match = trimmed.match(/^@(\w+)\s*(.*)$/);
      if (match) {
        const key = match[1];
        const value = match[2];
        if (key === 'quick' || key === 'q') continue;
        const expandedKey = expandMetadataKey(key);
        metadata[expandedKey] = value;
      }
      continue;
    }

    if (trimmed.startsWith('_')) {
      if (currentSection) sections.push(currentSection);
      const match = trimmed.match(/^_([a-z0-9]+)\s*(.*)$/);
      if (match) {
        const label = match[1];
        const rest = match[2].trim();
        const sectionName = SECTION_NAMES[label] || capitalize(label);
        currentSection = { label, name: sectionName, lines: [], commentLines: [] };
        if (rest) {
          const { chords, comments, repeat } = parseQuickChordLine(rest);
          if (chords.length > 0) {
            currentSection.lines.push(chords);
            currentSection.commentLines.push(comments);
          }
          if (repeat) currentSection.repeat = repeat;
        }
      }
      continue;
    }

    if (currentSection && trimmed) {
      const { chords, comments, repeat } = parseQuickChordLine(trimmed);
      if (chords.length > 0) {
        currentSection.lines.push(chords);
        currentSection.commentLines.push(comments);
      }
      if (repeat && !currentSection.repeat) currentSection.repeat = repeat;
    }
  }

  if (currentSection) sections.push(currentSection);
  return generateStandardFormat(metadata, sections);
}

function expandMetadataKey(key: string): string {
  const expansions: Record<string, string> = {
    'k': 'key', 'tm': 'time', 'tr': 'transp', 'bpm': 'tempo', 'l': 'layout', 'n': 'nashville'
  };
  return expansions[key] || key;
}

function parseQuickChordLine(line: string): { chords: string[]; comments: string[]; repeat?: number } {
  let repeat: number | undefined;
  const repeatMatch = line.match(/\s+x(\d+)\s*$/);
  if (repeatMatch) {
    repeat = parseInt(repeatMatch[1]);
    line = line.substring(0, line.length - repeatMatch[0].length);
  }

  const tokens = line.trim().split(/\s+/);
  const chords: string[] = [];
  const comments: string[] = [];
  let pendingComment = ''; // Comentario que va con el siguiente acorde

  for (const token of tokens) {
    if (!token) continue;

    // Es un comentario - guardarlo para el siguiente acorde
    if (token.startsWith("'")) {
      pendingComment = token;
    }
    // Es un acorde con guiones (c-d-em)
    else if (token.includes('-')) {
      const parts = token.split('-');
      for (let i = 0; i < parts.length; i++) {
        chords.push(normalizeChord(parts[i]));
        // Solo el primer acorde del grupo lleva el comentario pendiente
        comments.push(i === 0 ? pendingComment : '');
      }
      pendingComment = '';
    }
    // Es un punto (silencio)
    else if (token === '.') {
      chords.push(' ');
      comments.push(pendingComment);
      pendingComment = '';
    }
    // Es un acorde normal
    else {
      chords.push(normalizeChord(token));
      comments.push(pendingComment);
      pendingComment = '';
    }
  }

  return { chords, comments, repeat };
}

function normalizeChord(chord: string): string {
  if (!chord || chord === '.') return ' ';
  let result = chord.charAt(0).toUpperCase() + chord.slice(1);
  if (/^\d/.test(chord)) result = chord;
  result = result.replace(/^([A-G][#b]?)d([^a-z]|$)/, '$1maj7$2').replace(/^([A-G][#b]?)M/, '$1maj');
  return result;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateStandardFormat(metadata: Record<string, string>, sections: Section[]): string {
  const output: string[] = [];
  if (metadata.title) output.push(metadata.title);

  const orderedKeys = ['interpretes', 'album', 'year', 'key', 'time', 'tempo', 'transp', 'layout'];
  if (!metadata.layout) metadata.layout = 'section';

  for (const key of orderedKeys) {
    if (metadata[key]) output.push('@' + key + ' ' + metadata[key]);
  }
  for (const key in metadata) {
    if (!orderedKeys.includes(key) && key !== 'title') {
      output.push('@' + key + ' ' + metadata[key]);
    }
  }
  output.push('');

  let maxSectionNameLength = 0;
  for (const section of sections) {
    if (section.name.length > maxSectionNameLength) {
      maxSectionNameLength = section.name.length;
    }
  }
  const leftColumnWidth = maxSectionNameLength + 5;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const repeatCount = section.repeat || 1;

    for (let r = 0; r < repeatCount; r++) {
      for (let lineIdx = 0; lineIdx < section.lines.length; lineIdx++) {
        const chordLine = section.lines[lineIdx];
        const commentLine = section.commentLines[lineIdx] || [];

        // Generar línea de comentarios de compás si existen
        const hasComments = commentLine.some(c => c && c.trim());
        if (hasComments) {
          const indent = ' '.repeat(leftColumnWidth);
          const commentGridLine = formatBeatCommentLine(commentLine, chordLine);
          if (commentGridLine) {
            output.push(indent + commentGridLine);
          }
        }

        // Generar línea de acordes
        if (r === 0 && lineIdx === 0) {
          const sectionHeader = ('## ' + section.name).padEnd(leftColumnWidth);
          const gridLine = formatGridLine(chordLine);
          output.push(sectionHeader + gridLine);
        } else {
          const indent = ' '.repeat(leftColumnWidth);
          const gridLine = formatGridLine(chordLine);
          output.push(indent + gridLine);
        }
      }
    }

    if (i < sections.length - 1) output.push('');
  }

  return output.join('\n');
}

function formatGridLine(chords: string[]): string {
  const maxLength = Math.max(...chords.map(c => c.length), 3);
  const cellWidth = maxLength + 2;
  const cells = chords.map(chord => {
    const content = chord.trim() || ' ';
    return ' ' + content.padEnd(cellWidth - 2) + ' ';
  });
  return '|' + cells.join('|') + '|';
}

function formatBeatCommentLine(comments: string[], chords: string[]): string {
  // Encontrar el índice del último comentario real
  let lastCommentIdx = -1;
  for (let i = comments.length - 1; i >= 0; i--) {
    if (comments[i] && comments[i].trim()) {
      lastCommentIdx = i;
      break;
    }
  }

  // Si no hay comentarios, no generar línea
  if (lastCommentIdx === -1) return '';

  // Calcular el ancho de celda basado en los acordes
  const maxLength = Math.max(...chords.map(c => c.length), 3);
  const cellWidth = maxLength + 2;

  const cells: string[] = [];
  // Solo generar hasta el último comentario real (no después)
  for (let i = 0; i <= lastCommentIdx; i++) {
    const comment = comments[i];
    if (comment && comment.trim()) {
      // Tiene comentario: usar tal cual (ya tiene ')
      cells.push(comment.padEnd(cellWidth));
    } else {
      // No tiene comentario: poner ' vacío
      cells.push("'".padEnd(cellWidth));
    }
  }

  return cells.join(' ');
}
