/**
 * MarkChord Syntax Highlighting Plugin for Obsidian
 * Version: 2.0.0 - With Parser Integration
 */

import { Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MarkChordSettings {
  theme: string;
  enableInReading: boolean;
  enableParser: boolean;
}

const DEFAULT_SETTINGS: MarkChordSettings = {
  theme: 'default',
  enableInReading: true,
  enableParser: false, // Will enable when parser is integrated
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
        el.createSpan({ cls: 'markchord-percent', text: '%' });
        i++;
      } else if (/[A-G]/.test(char)) {
        // Parse chord
        let chord = char;
        i++;
        while (i < line.length && /[a-z0-9#b♯♭+°/]/.test(line[i])) {
          chord += line[i];
          i++;
        }
        
        // Determine chord type
        let chordClass = 'markchord-chord-major';
        if (chord.match(/m|min|-/)) {
          chordClass = 'markchord-chord-minor';
        } else if (chord.match(/dim|°|o/)) {
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

    new Setting(containerEl)
      .setName('Enable Parser (Experimental)')
      .setDesc('Use the MarkChord parser for advanced features')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableParser)
        .onChange(async (value) => {
          this.plugin.settings.enableParser = value;
          await this.plugin.saveSettings();
        }));
  }
}
