# 🎵 MarkChord

> Formato de texto plano para escribir acordes con legibilidad perfecta

[![License](https://img.shields.io/badge/license-CC%20BY--SA%204.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-purple)](https://obsidian.md)

**MarkChord** es un formato textual inspirado en **Markdown** y **ChordPro**, diseñado para escribir guiones de acordes (*lead sheets*, *jazz charts*) legibles y perfectamente alineados en texto plano.

## ✨ Features

- 📝 **Sintaxis clara**: Inspirada en Markdown, fácil de aprender
- ⚡ **Modo Quick**: Captura ultrarrápida de acordes mientras escuchas música
- 🎼 **Modo Nashville**: Análisis armónico con números romanos
- 🎨 **Syntax Highlighting**: Plugin completo para Obsidian
- 🔧 **Parser TypeScript**: Librería reutilizable y tipada
- 📱 **Multiplataforma**: Funciona en desktop y móvil
- 🎯 **Sin dependencias**: Solo necesitas un editor de texto

## 🚀 Quick Start

### Ejemplo básico

```markchord
# Wonderwall - Oasis
@key Em
@layout section

## Intro            | Em7 | G    | Dsus4 | A7sus4 |

## Verse 1         | Em7 | G    | Dsus4 | A7sus4 |
                    | Em7 | G    | Dsus4 | A7sus4 |

## Chorus          | C   | D    | Em    | Em     |
                    | C   | D    | Em    | Em     |
```

### Modo Quick (ultrarrápido)

```markchord
@key Em
@quick

_i em7 g dsus4 a7sus4 x2
_v1 em7 g dsus4 a7sus4 x2
_c c d em em x4
```

## 📦 Instalación

### Plugin para Obsidian

1. Descarga la última release desde [Releases](https://github.com/alfonsogchico/markchord/releases)
2. Extrae en tu carpeta `.obsidian/plugins/markchord-highlight/`
3. Activa el plugin en Settings → Community plugins
4. ¡Listo! Crea un bloque con ` ```markchord `

### Parser TypeScript (npm)

```bash
npm install @markchord/parser
```

```typescript
import { parseMarkChord } from '@markchord/parser';

const source = `
# My Song
@key C
## Verse | C | G | Am | F |
`;

const ast = parseMarkChord(source);
console.log(ast);
```

## 📚 Documentación

- **[Especificación completa v1.4](docs/MarkChord_Especificacion_v1_4.md)** - Sintaxis completa de MarkChord
- **[MarkChord Quick v1.0](docs/MarkChord_Quick_v1_0.md)** - Modo ultrarrápido
- **[Quick CheatSheet](docs/MarkChord_Quick_CheatSheet.md)** - Referencia rápida

## 🎯 Casos de uso

- ✅ Transcribir canciones mientras las escuchas
- ✅ Crear lead sheets para ensayos
- ✅ Análisis armónico con números romanos
- ✅ Compartir acordes en texto plano
- ✅ Versionar acordes con Git
- ✅ Escribir setlists y songbooks

## 🛠️ Desarrollo

Este repositorio es un monorepo con:

- **`packages/parser/`** - Parser TypeScript
- **`packages/obsidian-plugin/`** - Plugin para Obsidian
- **`docs/`** - Especificaciones y documentación
- **`examples/`** - Canciones de ejemplo

### Setup local

```bash
# Clonar repo
git clone https://github.com/alfonsogchico/markchord.git
cd markchord

# Instalar dependencias
npm install

# Compilar parser
cd packages/parser
npm run build

# Compilar plugin
cd ../obsidian-plugin
npm run dev
```

### Arquitectura

```
┌─────────────────────┐
│   Obsidian Plugin   │  ← UI y highlighting
└──────────┬──────────┘
           │ usa
           ▼
┌─────────────────────┐
│   @markchord/parser │  ← Parser TypeScript
│   (Lexer + Parser)  │
└─────────────────────┘
           │ genera
           ▼
┌─────────────────────┐
│    AST (Abstract    │  ← Árbol sintáctico
│   Syntax Tree)      │
└─────────────────────┘
```

## 🤝 Contribuir

¡Contribuciones bienvenidas! 

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

## 📄 Licencia

**Creative Commons BY-SA 4.0**

- ✅ Uso comercial permitido
- ✅ Modificaciones permitidas
- ✅ Compartir adaptaciones bajo la misma licencia
- ✅ Dar crédito al autor

## 🙏 Créditos

Creado por **Alfonso G. Chico** ([@alfonsogchico](https://github.com/alfonsogchico))

Inspirado en:
- **Markdown** - John Gruber
- **ChordPro** - Comunidad ChordPro
- **Nashville Number System** - Tradición musical

## 🔗 Links

- 🌐 [Repositorio GitHub](https://github.com/alfonsogchico/markchord)
- 📖 [Documentación completa](docs/)
- 🐛 [Reportar bugs](https://github.com/alfonsogchico/markchord/issues)
- 💬 [Discusiones](https://github.com/alfonsogchico/markchord/discussions)

---

**MarkChord** - *Write chords, not charts* 🎸🎹🎤
