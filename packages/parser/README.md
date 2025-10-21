# @markchord/parser

TypeScript parser for MarkChord chord sheet format.

## Installation

```bash
npm install @markchord/parser
```

## Usage

```typescript
import { parseMarkChord } from '@markchord/parser';

const source = `
# Wonderwall - Oasis
@key Em
@layout section

## Intro   | Em7 | G | Dsus4 | A7sus4 |
`;

const result = parseMarkChord(source);

if (result.success) {
  console.log(result.document);
} else {
  console.error(result.errors);
}
```

## API

### `parseMarkChord(source: string, options?: ParserOptions): ParseResult`

Parse MarkChord source text into an AST.

**Parameters:**
- `source`: MarkChord source text
- `options`: Parser options (optional)
  - `mode`: `'standard' | 'quick'` - Parser mode (default: auto-detect)
  - `strict`: `boolean` - Enable strict parsing (default: false)
  - `preserveWhitespace`: `boolean` - Preserve whitespace in output (default: true)

**Returns:** `ParseResult` object with:
- `success`: `boolean` - Whether parsing succeeded
- `document`: `MarkChordDocument` - Parsed AST (if successful)
- `errors`: `ParserError[]` - List of parse errors

### AST Structure

The parser generates an Abstract Syntax Tree (AST) with the following structure:

```typescript
interface MarkChordDocument {
  type: 'Document';
  title?: TitleNode;
  metadata: MetadataNode[];
  sections: SectionNode[];
  raw: string;
}
```

See [ast.ts](src/ast.ts) for complete type definitions.

## Examples

### Basic parsing

```typescript
import { parseMarkChord } from '@markchord/parser';

const source = `
# My Song
@key C

## Verse    | C | G | Am | F |
## Chorus   | F | G | C  | C |
`;

const { document } = parseMarkChord(source);

console.log(document.title?.text); // "My Song"
console.log(document.metadata[0].key); // "key"
console.log(document.sections.length); // 2
```

### Quick mode

```typescript
const quickSource = `
@quick
@key C

_v1 c g am f
_c f g c c
`;

const result = parseMarkChord(quickSource, { mode: 'quick' });
```

### Error handling

```typescript
const invalidSource = `
# Song with error
## Broken section | C | G |
Invalid chord: XYZ123
`;

const result = parseMarkChord(invalidSource);

if (!result.success) {
  result.errors.forEach(error => {
    console.error(`Line ${error.line}: ${error.message}`);
  });
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test
```

## License

CC-BY-SA-4.0
