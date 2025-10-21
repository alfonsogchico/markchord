/**
 * MarkChord Lexer (Tokenizer)
 * Converts raw text into tokens
 */

export enum TokenType {
  // Structure
  TITLE = 'TITLE',                    // # Title
  SECTION_HEADER = 'SECTION_HEADER',  // ## Section
  METADATA = 'METADATA',              // @key value
  
  // Comments
  LINE_COMMENT = 'LINE_COMMENT',      // ''comment
  BEAT_COMMENT = 'BEAT_COMMENT',      // 'comment
  SECTION_COMMENT = 'SECTION_COMMENT',// /comment
  
  // Grid elements
  BAR = 'BAR',                        // |
  REPEAT_START = 'REPEAT_START',      // |:
  REPEAT_END = 'REPEAT_END',          // :|
  CHORD = 'CHORD',                    // Am7, G7#9, etc.
  PERCENT = 'PERCENT',                // %
  
  // Quick mode
  QUICK_SECTION = 'QUICK_SECTION',    // _v1, _c, etc.
  QUICK_CHORD = 'QUICK_CHORD',        // c, am7, etc.
  QUICK_DASH = 'QUICK_DASH',          // -
  QUICK_DOT = 'QUICK_DOT',            // .
  QUICK_REPEAT = 'QUICK_REPEAT',      // x2, x3, etc.
  
  // Misc
  TEXT = 'TEXT',
  WHITESPACE = 'WHITESPACE',
  NEWLINE = 'NEWLINE',
  EOF = 'EOF',
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
  raw: string;
}

export class Lexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];
  private mode: 'standard' | 'quick' = 'standard';

  constructor(source: string, mode: 'standard' | 'quick' = 'standard') {
    this.source = source;
    this.mode = mode;
  }

  /**
   * Tokenize the entire source
   */
  tokenize(): Token[] {
    this.tokens = [];
    this.position = 0;
    this.line = 1;
    this.column = 1;

    // Detect quick mode if not explicitly set
    if (this.mode === 'standard' && this.detectQuickMode()) {
      this.mode = 'quick';
    }

    while (this.position < this.source.length) {
      this.scanToken();
    }

    this.addToken(TokenType.EOF, '');
    return this.tokens;
  }

  /**
   * Detect if document uses Quick mode
   */
  private detectQuickMode(): boolean {
    // Check for @quick or @q metadata
    if (/@(quick|q)\b/.test(this.source)) {
      return true;
    }
    // Check for Quick section labels (_v1, _c, etc.)
    if (/^\s*_[a-z0-9]+/m.test(this.source)) {
      return true;
    }
    return false;
  }

  /**
   * Scan next token
   */
  private scanToken(): void {
    const char = this.peek();
    const nextChar = this.peek(1);

    // Newline
    if (char === '\n') {
      this.addToken(TokenType.NEWLINE, this.advance());
      this.line++;
      this.column = 1;
      return;
    }

    // Start of line - check for special tokens
    if (this.column === 1 || this.isStartOfLine()) {
      // Title: # Text
      if (char === '#' && nextChar !== '#') {
        this.scanTitle();
        return;
      }

      // Section: ## Text
      if (char === '#' && nextChar === '#') {
        this.scanSectionHeader();
        return;
      }

      // Metadata: @key value
      if (char === '@') {
        this.scanMetadata();
        return;
      }

      // Line comment: ''text
      if (char === "'" && nextChar === "'") {
        this.scanLineComment();
        return;
      }

      // Beat comment: 'text or just '
      if (char === "'") {
        this.scanBeatComment();
        return;
      }

      // Section comment: /text
      if (char === '/') {
        this.scanSectionComment();
        return;
      }

      // Quick section: _v1, _c, etc.
      if (this.mode === 'quick' && char === '_') {
        this.scanQuickSection();
        return;
      }
    }

    // Repeat markers
    if (char === '|' && nextChar === ':') {
      this.addToken(TokenType.REPEAT_START, this.advance() + this.advance());
      return;
    }
    if (char === ':' && nextChar === '|') {
      this.addToken(TokenType.REPEAT_END, this.advance() + this.advance());
      return;
    }

    // Bar
    if (char === '|') {
      this.addToken(TokenType.BAR, this.advance());
      return;
    }

    // Percent
    if (char === '%') {
      this.addToken(TokenType.PERCENT, this.advance());
      return;
    }

    // Quick mode dash
    if (this.mode === 'quick' && char === '-') {
      this.addToken(TokenType.QUICK_DASH, this.advance());
      return;
    }

    // Quick mode dot
    if (this.mode === 'quick' && char === '.') {
      this.addToken(TokenType.QUICK_DOT, this.advance());
      return;
    }

    // Chord (standard mode: uppercase start)
    if (this.mode === 'standard' && /[A-G]/.test(char)) {
      this.scanChord();
      return;
    }

    // Quick chord (lowercase)
    if (this.mode === 'quick' && /[a-g0-9]/.test(char)) {
      this.scanQuickChord();
      return;
    }

    // Quick repeat (x2, x3, etc.)
    if (this.mode === 'quick' && char === 'x' && /[0-9]/.test(nextChar)) {
      this.scanQuickRepeat();
      return;
    }

    // Whitespace
    if (/\s/.test(char) && char !== '\n') {
      this.scanWhitespace();
      return;
    }

    // Default: text
    this.scanText();
  }

  /**
   * Scan title (# Title)
   */
  private scanTitle(): void {
    const start = this.position;
    this.advance(); // Skip #
    this.skipWhitespace();
    const text = this.scanUntilNewline();
    this.addToken(TokenType.TITLE, this.source.substring(start, this.position));
  }

  /**
   * Scan section header (## Name)
   */
  private scanSectionHeader(): void {
    const start = this.position;
    this.advance(); // First #
    this.advance(); // Second #
    this.skipWhitespace();
    
    // Read until | or newline
    while (this.position < this.source.length) {
      const char = this.peek();
      if (char === '|' || char === '\n') {
        break;
      }
      this.advance();
    }
    
    this.addToken(TokenType.SECTION_HEADER, this.source.substring(start, this.position));
  }

  /**
   * Scan metadata (@key value)
   */
  private scanMetadata(): void {
    const start = this.position;
    this.advance(); // Skip @
    
    // Read key
    while (this.position < this.source.length && /[a-zA-Z_]/.test(this.peek())) {
      this.advance();
    }
    
    // Read value (rest of line)
    const value = this.scanUntilNewline();
    this.addToken(TokenType.METADATA, this.source.substring(start, this.position));
  }

  /**
   * Scan line comment (''comment)
   */
  private scanLineComment(): void {
    const start = this.position;
    this.advance(); // First '
    this.advance(); // Second '
    const text = this.scanUntilNewline();
    this.addToken(TokenType.LINE_COMMENT, this.source.substring(start, this.position));
  }

  /**
   * Scan beat comment ('comment)
   */
  private scanBeatComment(): void {
    const start = this.position;
    this.advance(); // '
    
    // Read until space or newline
    while (this.position < this.source.length) {
      const char = this.peek();
      if (char === ' ' || char === '\n' || char === "'") {
        break;
      }
      this.advance();
    }
    
    this.addToken(TokenType.BEAT_COMMENT, this.source.substring(start, this.position));
  }

  /**
   * Scan section comment (/comment)
   */
  private scanSectionComment(): void {
    const start = this.position;
    this.advance(); // /
    const text = this.scanUntilNewline();
    this.addToken(TokenType.SECTION_COMMENT, this.source.substring(start, this.position));
  }

  /**
   * Scan chord (e.g., C, Am7, G7#9)
   */
  private scanChord(): void {
    const start = this.position;
    
    // Root note [A-G]
    this.advance();
    
    // Alterations (#, b, ##, bb)
    while (this.position < this.source.length && /[#b♯♭]/.test(this.peek())) {
      this.advance();
    }
    
    // Quality and extensions (m, maj7, dim, etc.)
    while (this.position < this.source.length) {
      const char = this.peek();
      if (/[a-z0-9+°\/]/.test(char)) {
        this.advance();
      } else {
        break;
      }
    }
    
    this.addToken(TokenType.CHORD, this.source.substring(start, this.position));
  }

  /**
   * Scan quick chord (lowercase: c, am7, g7)
   */
  private scanQuickChord(): void {
    const start = this.position;
    
    // Root or number
    this.advance();
    
    // Rest of chord
    while (this.position < this.source.length) {
      const char = this.peek();
      if (/[a-z0-9#bmsudMo+/]/.test(char)) {
        this.advance();
      } else {
        break;
      }
    }
    
    this.addToken(TokenType.QUICK_CHORD, this.source.substring(start, this.position));
  }

  /**
   * Scan quick section (_v1, _c, etc.)
   */
  private scanQuickSection(): void {
    const start = this.position;
    this.advance(); // _
    
    while (this.position < this.source.length && /[a-z0-9]/.test(this.peek())) {
      this.advance();
    }
    
    this.addToken(TokenType.QUICK_SECTION, this.source.substring(start, this.position));
  }

  /**
   * Scan quick repeat (x2, x3, etc.)
   */
  private scanQuickRepeat(): void {
    const start = this.position;
    this.advance(); // x
    
    while (this.position < this.source.length && /[0-9]/.test(this.peek())) {
      this.advance();
    }
    
    this.addToken(TokenType.QUICK_REPEAT, this.source.substring(start, this.position));
  }

  /**
   * Scan whitespace
   */
  private scanWhitespace(): void {
    const start = this.position;
    
    while (this.position < this.source.length && /[ \t]/.test(this.peek())) {
      this.advance();
    }
    
    this.addToken(TokenType.WHITESPACE, this.source.substring(start, this.position));
  }

  /**
   * Scan generic text
   */
  private scanText(): void {
    const start = this.position;
    
    while (this.position < this.source.length) {
      const char = this.peek();
      if (char === '\n' || char === '|' || /\s/.test(char)) {
        break;
      }
      this.advance();
    }
    
    this.addToken(TokenType.TEXT, this.source.substring(start, this.position));
  }

  /**
   * Scan until newline
   */
  private scanUntilNewline(): string {
    const start = this.position;
    
    while (this.position < this.source.length && this.peek() !== '\n') {
      this.advance();
    }
    
    return this.source.substring(start, this.position);
  }

  /**
   * Skip whitespace (not including newline)
   */
  private skipWhitespace(): void {
    while (this.position < this.source.length && /[ \t]/.test(this.peek())) {
      this.advance();
    }
  }

  /**
   * Check if at start of line
   */
  private isStartOfLine(): boolean {
    if (this.position === 0) return true;
    return this.source[this.position - 1] === '\n';
  }

  /**
   * Peek at character at offset
   */
  private peek(offset: number = 0): string {
    const pos = this.position + offset;
    return pos < this.source.length ? this.source[pos] : '';
  }

  /**
   * Advance position and return character
   */
  private advance(): string {
    const char = this.source[this.position];
    this.position++;
    this.column++;
    return char;
  }

  /**
   * Add token to list
   */
  private addToken(type: TokenType, value: string): void {
    this.tokens.push({
      type,
      value,
      line: this.line,
      column: this.column - value.length,
      raw: value,
    });
  }
}
