/**
 * MarkChord Parser
 * Converts tokens into AST
 */

import { Lexer, Token, TokenType } from './lexer';
import {
  MarkChordDocument,
  TitleNode,
  MetadataNode,
  SectionNode,
  GridNode,
  MeasureNode,
  ChordNode,
  PercentNode,
  EmptyNode,
  LineCommentNode,
  BeatCommentNode,
  SectionCommentNode,
  ParserOptions,
  ParseResult,
  ParserError,
  MeasureContentNode,
  SectionContentNode,
} from './ast';

export class Parser {
  private tokens: Token[] = [];
  private current: number = 0;
  private errors: ParserError[] = [];
  private options: ParserOptions;

  constructor(options: ParserOptions = {}) {
    this.options = {
      mode: options.mode || 'standard',
      strict: options.strict !== undefined ? options.strict : false,
      preserveWhitespace: options.preserveWhitespace !== undefined ? options.preserveWhitespace : true,
    };
  }

  /**
   * Parse source text into AST
   */
  parse(source: string): ParseResult {
    this.errors = [];
    this.current = 0;

    // Tokenize
    const lexer = new Lexer(source, this.options.mode);
    this.tokens = lexer.tokenize();

    try {
      const document = this.parseDocument(source);
      
      return {
        success: this.errors.length === 0,
        document,
        errors: this.errors,
      };
    } catch (error) {
      this.addError((error as Error).message, this.peek().line, this.peek().column, 'PARSE_ERROR');
      
      return {
        success: false,
        errors: this.errors,
      };
    }
  }

  /**
   * Parse entire document
   */
  private parseDocument(source: string): MarkChordDocument {
    const title = this.parseTitle();
    const metadata = this.parseMetadata();
    const sections = this.parseSections();

    return {
      type: 'Document',
      title,
      metadata,
      sections,
      raw: source,
    };
  }

  /**
   * Parse title (# Title)
   */
  private parseTitle(): TitleNode | undefined {
    if (this.check(TokenType.TITLE)) {
      const token = this.advance();
      const text = token.value.substring(1).trim(); // Remove #
      
      this.skipNewlines();
      
      return {
        type: 'Title',
        text,
        line: token.line,
      };
    }
    
    return undefined;
  }

  /**
   * Parse metadata lines (@key value)
   */
  private parseMetadata(): MetadataNode[] {
    const metadata: MetadataNode[] = [];

    while (this.check(TokenType.METADATA)) {
      const token = this.advance();
      const match = token.value.match(/^@(\w+)\s*(.*)$/);
      
      if (match) {
        metadata.push({
          type: 'Metadata',
          key: match[1],
          value: match[2].trim(),
          line: token.line,
        });
      }
      
      this.skipNewlines();
    }

    return metadata;
  }

  /**
   * Parse all sections
   */
  private parseSections(): SectionNode[] {
    const sections: SectionNode[] = [];

    while (!this.isAtEnd()) {
      if (this.check(TokenType.SECTION_HEADER)) {
        sections.push(this.parseSection());
      } else if (this.check(TokenType.QUICK_SECTION)) {
        sections.push(this.parseQuickSection());
      } else {
        this.advance(); // Skip unknown token
      }
    }

    return sections;
  }

  /**
   * Parse standard section (## Name)
   */
  private parseSection(): SectionNode {
    const token = this.advance();
    const nameMatch = token.value.match(/^##\s*(.+?)$/);
    const name = nameMatch ? nameMatch[1].trim() : '';
    
    this.skipWhitespace();
    
    const content: SectionContentNode[] = [];
    
    // Check if section header has chords on same line
    if (this.check(TokenType.BAR) || this.check(TokenType.REPEAT_START)) {
      const grid = this.parseGrid();
      content.push(grid);
    }
    
    this.skipNewlines();
    
    // Parse section content
    while (!this.isAtEnd() && !this.check(TokenType.SECTION_HEADER) && !this.check(TokenType.QUICK_SECTION)) {
      if (this.check(TokenType.LINE_COMMENT)) {
        content.push(this.parseLineComment());
      } else if (this.check(TokenType.BEAT_COMMENT)) {
        content.push(this.parseBeatComment());
      } else if (this.check(TokenType.SECTION_COMMENT)) {
        content.push(this.parseSectionComment());
      } else if (this.check(TokenType.BAR) || this.check(TokenType.REPEAT_START)) {
        content.push(this.parseGrid());
      } else if (this.check(TokenType.NEWLINE)) {
        this.advance();
      } else {
        break;
      }
    }

    return {
      type: 'Section',
      name,
      content,
      line: token.line,
    };
  }

  /**
   * Parse Quick mode section (_v1, _c, etc.)
   */
  private parseQuickSection(): SectionNode {
    const token = this.advance();
    const name = token.value.substring(1); // Remove _
    
    this.skipWhitespace();
    
    const content: SectionContentNode[] = [];
    
    // TODO: Parse Quick mode chords
    // For now, collect remaining tokens until next section
    
    this.skipNewlines();

    return {
      type: 'Section',
      name,
      content,
      line: token.line,
    };
  }

  /**
   * Parse chord grid line
   */
  private parseGrid(): GridNode {
    const line = this.peek().line;
    const measures: MeasureNode[] = [];

    // Skip initial bar or repeat
    if (this.check(TokenType.BAR) || this.check(TokenType.REPEAT_START)) {
      this.advance();
    }

    this.skipWhitespace();

    // Parse measures
    while (!this.isAtEnd() && !this.check(TokenType.NEWLINE)) {
      const measure = this.parseMeasure();
      measures.push(measure);

      // Skip bar or repeat
      if (this.check(TokenType.BAR) || this.check(TokenType.REPEAT_END)) {
        this.advance();
      }

      this.skipWhitespace();
    }

    this.skipNewlines();

    return {
      type: 'Grid',
      measures,
      line,
    };
  }

  /**
   * Parse single measure
   */
  private parseMeasure(): MeasureNode {
    const content: MeasureContentNode[] = [];

    this.skipWhitespace();

    while (!this.isAtEnd() && 
           !this.check(TokenType.BAR) && 
           !this.check(TokenType.REPEAT_END) &&
           !this.check(TokenType.NEWLINE)) {
      
      if (this.check(TokenType.CHORD)) {
        content.push(this.parseChord());
      } else if (this.check(TokenType.PERCENT)) {
        this.advance();
        content.push({ type: 'Percent' });
      } else if (this.check(TokenType.WHITESPACE)) {
        this.advance();
      } else {
        break;
      }
    }

    // If no content, it's an empty measure
    if (content.length === 0) {
      content.push({ type: 'Empty' });
    }

    return {
      type: 'Measure',
      content,
    };
  }

  /**
   * Parse chord
   */
  private parseChord(): ChordNode {
    const token = this.advance();
    const raw = token.value;

    // Parse chord components
    const match = raw.match(/^([A-G])([#b♯♭]*)([^\/]*)(?:\/(.+))?$/);
    
    if (!match) {
      return {
        type: 'Chord',
        root: raw,
        raw,
      };
    }

    const [, root, alterations, rest, bass] = match;

    // Determine quality and extensions
    let quality = '';
    let extensions = '';

    if (rest) {
      // Simple patterns
      if (rest === 'm' || rest === 'min' || rest === '-') {
        quality = 'minor';
      } else if (rest.includes('dim') || rest.includes('°')) {
        quality = 'diminished';
      } else if (rest.includes('aug') || rest.includes('+')) {
        quality = 'augmented';
      } else if (rest.includes('sus')) {
        quality = 'suspended';
      } else if (rest.match(/^7/)) {
        quality = 'dominant';
        extensions = rest;
      } else if (rest.includes('maj') || rest.includes('M')) {
        quality = 'major';
        extensions = rest;
      } else {
        extensions = rest;
      }
    }

    return {
      type: 'Chord',
      root,
      quality: quality || undefined,
      extensions: extensions || undefined,
      alterations: alterations || undefined,
      bass: bass || undefined,
      raw,
    };
  }

  /**
   * Parse line comment (''comment)
   */
  private parseLineComment(): LineCommentNode {
    const token = this.advance();
    const text = token.value.substring(2).trim(); // Remove ''
    
    this.skipNewlines();

    return {
      type: 'LineComment',
      text,
      line: token.line,
    };
  }

  /**
   * Parse beat comment line
   */
  private parseBeatComment(): BeatCommentNode {
    const line = this.peek().line;
    const comments: { text: string; column: number }[] = [];

    while (!this.isAtEnd() && this.check(TokenType.BEAT_COMMENT)) {
      const token = this.advance();
      const text = token.value.substring(1); // Remove '
      
      comments.push({
        text,
        column: token.column,
      });

      this.skipWhitespace();
    }

    this.skipNewlines();

    return {
      type: 'BeatComment',
      comments,
      line,
    };
  }

  /**
   * Parse section comment (/comment)
   */
  private parseSectionComment(): SectionCommentNode {
    const token = this.advance();
    const text = token.value.substring(1).trim(); // Remove /
    
    this.skipNewlines();

    return {
      type: 'SectionComment',
      text,
      line: token.line,
    };
  }

  // ============================================
  // Helper methods
  // ============================================

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private skipWhitespace(): void {
    while (this.check(TokenType.WHITESPACE)) {
      this.advance();
    }
  }

  private skipNewlines(): void {
    while (this.check(TokenType.NEWLINE)) {
      this.advance();
    }
  }

  private addError(message: string, line: number, column: number, code: string): void {
    this.errors.push({
      message,
      line,
      column,
      code,
    });
  }
}

/**
 * Convenience function to parse MarkChord source
 */
export function parseMarkChord(source: string, options?: ParserOptions): ParseResult {
  const parser = new Parser(options);
  return parser.parse(source);
}
