/**
 * MarkChord AST (Abstract Syntax Tree) Type Definitions
 * v1.0.0
 */

/**
 * Root node of a MarkChord document
 */
export interface MarkChordDocument {
  type: 'Document';
  title?: TitleNode;
  metadata: MetadataNode[];
  sections: SectionNode[];
  raw: string;
}

/**
 * Title node (# Title)
 */
export interface TitleNode {
  type: 'Title';
  text: string;
  line: number;
}

/**
 * Metadata node (@key value)
 */
export interface MetadataNode {
  type: 'Metadata';
  key: string;
  value: string;
  line: number;
}

/**
 * Section node (## Name)
 */
export interface SectionNode {
  type: 'Section';
  name: string;
  content: SectionContentNode[];
  line: number;
}

/**
 * Content that can appear in a section
 */
export type SectionContentNode = 
  | GridNode 
  | LineCommentNode 
  | BeatCommentNode 
  | SectionCommentNode;

/**
 * Grid/chord line (| C | G | Am | F |)
 */
export interface GridNode {
  type: 'Grid';
  measures: MeasureNode[];
  line: number;
}

/**
 * Single measure (cell between |)
 */
export interface MeasureNode {
  type: 'Measure';
  content: MeasureContentNode[];
}

/**
 * Content within a measure
 */
export type MeasureContentNode = ChordNode | PercentNode | EmptyNode;

/**
 * Chord (e.g., C, Am7, G7#9)
 */
export interface ChordNode {
  type: 'Chord';
  root: string;
  quality?: string;
  extensions?: string;
  alterations?: string;
  bass?: string;
  raw: string;
}

/**
 * Percent symbol (%)
 */
export interface PercentNode {
  type: 'Percent';
}

/**
 * Empty measure content
 */
export interface EmptyNode {
  type: 'Empty';
}

/**
 * Line comment (''comment)
 */
export interface LineCommentNode {
  type: 'LineComment';
  text: string;
  line: number;
}

/**
 * Beat comment ('comment aligned with measure)
 */
export interface BeatCommentNode {
  type: 'BeatComment';
  comments: BeatCommentItem[];
  line: number;
}

export interface BeatCommentItem {
  text: string;
  column: number;
}

/**
 * Section comment (/comment)
 */
export interface SectionCommentNode {
  type: 'SectionComment';
  text: string;
  line: number;
}

/**
 * Repeat marker
 */
export interface RepeatNode {
  type: 'Repeat';
  direction: 'start' | 'end';
  line: number;
}

/**
 * Layout mode
 */
export type LayoutMode = 'fluid' | 'section' | 'grid';

/**
 * Parser options
 */
export interface ParserOptions {
  mode?: 'standard' | 'quick';
  strict?: boolean;
  preserveWhitespace?: boolean;
}

/**
 * Parser error
 */
export interface ParserError {
  message: string;
  line: number;
  column: number;
  code: string;
}

/**
 * Parse result
 */
export interface ParseResult {
  success: boolean;
  document?: MarkChordDocument;
  errors: ParserError[];
}
