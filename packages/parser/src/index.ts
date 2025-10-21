/**
 * @markchord/parser
 * TypeScript parser for MarkChord chord sheet format
 * 
 * @version 1.0.0
 * @author Alfonso G. Chico
 * @license CC-BY-SA-4.0
 */

// Export main parser
export { Parser, parseMarkChord } from './parser';

// Export lexer
export { Lexer, TokenType } from './lexer';
export type { Token } from './lexer';

// Export AST types
export type {
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
  BeatCommentItem,
  SectionCommentNode,
  RepeatNode,
  LayoutMode,
  ParserOptions,
  ParserError,
  ParseResult,
  SectionContentNode,
  MeasureContentNode,
} from './ast';
