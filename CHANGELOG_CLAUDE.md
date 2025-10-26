# MarkChord - Registro de Cambios por Claude

Este archivo contiene un resumen de todos los cambios realizados por Claude en el proyecto MarkChord para referencia en futuros hilos.

---

## 2025-10-26 - Fix Chord Detection and CSS Specificity

### Corrección final de highlighting y conversión

**Problema detectado:** Después de restaurar CSS v1.0.4, quedaban dos issues críticos:
1. Los acordes con espacios después de `|` no se detectaban correctamente (ej: `| Am7 |` vs `|Am7|`)
2. Los acordes dentro de líneas de sección se veían en azul por herencia de color

**Archivos modificados:**
- `packages/obsidian-plugin/src/main.ts` - Fix en `highlightChordLine()`
- `packages/obsidian-plugin/styles.css` - Selectores adicionales para override

### Cambios técnicos

#### Fix 1: Detección de acordes con espacios (main.ts:712)

**Problema:** El código checkeaba `char !== ' '` para detectar inicio de acorde, fallando con formato `| Am7 |`

**Antes:**
```typescript
if (isAfterBar && char !== ' ') {
  // Detectar acorde
}
```

**Después:**
```typescript
if (isAfterBar && /[A-G0-9]/.test(char)) {
  // Detectar acorde solo si empieza con nota musical
}
```

**Resultado:** Ahora detecta acordes correctamente en ambos formatos:
- `|Am7|C|Dm7|` ✅
- `| Am7 | C | Dm7 |` ✅

#### Fix 2: Override de color en secciones (styles.css:95-101)

**Problema:** `.markchord-section` tiene `color: #1976D2` (azul) que se heredaba a los spans de acordes

**Solución:** Agregar selectores específicos con mayor especificidad

**CSS agregado:**
```css
.markchord-section .markchord-chord,
.markchord-section .markchord-chord-major,
.markchord-section .markchord-chord-minor,
.markchord-section .markchord-chord-dim,
.markchord-section .markchord-chord-aug,
.markchord-section .markchord-chord-sus,
.markchord-section .markchord-chord-dom {
  color: #43A047 !important;
  font-weight: 400;
}
```

**Resultado:** Acordes se ven en verde incluso dentro de líneas de sección

### Verificación final

**Estado confirmado por usuario:**
- ✅ Conversión Quick→Standard preserva comentarios correctamente
- ✅ Acordes se ven en verde en Reading View: `rgb(67, 160, 71)` = `#43A047`
- ✅ Comentarios de compás alineados correctamente
- ✅ No hay compases en blanco insertados
- ✅ No hay `'` vacíos después del último comentario

**Nota importante:** El syntax highlighting funciona en Reading View (comportamiento normal de plugins de Obsidian). Para highlighting en Edit Mode se requeriría una extensión de CodeMirror 6, que está fuera del scope actual.

### Commits de esta sesión

```bash
6ce73b0 - Fix chord detection to work with spaces after bar symbols
db1321f - Add specific CSS rules to override section blue color for chords
```

---

## 2025-10-22 (Update 2) - Restore Correct CSS v1.0.4

### Corrección de estilos

**Problema detectado:** El CSS v1.2.0 que restauré anteriormente no era el correcto. El usuario tenía la versión v1.0.4 FINAL que funcionaba correctamente.

**Archivos actualizados:**
- `packages/obsidian-plugin/styles.css` - Restaurado a v1.0.4 FINAL
- `packages/obsidian-plugin/src/styles-reference.css` - Actualizado a v1.0.4 FINAL

**Diferencias clave en v1.0.4 FINAL:**
- `line-height: 1.8` (vs 1.4 en v1.2.0) - Mejor espaciado vertical
- `margin-bottom: -0.4em` en comentarios - Ajuste visual fino
- Todas las reglas de alineación vertical con `!important`
- Ajuste posicional de comentarios con `top: 0.12em`

**Colores confirmados:**
- Comentarios: #FF8A65 (light) / #FFB74D (dark) - Naranja/salmón
- Acordes: #43A047 (light) / #81C784 (dark) - Verde para TODOS los tipos

---

## 2025-10-22 - Quick to Standard Converter + Fix Styles

### Plugin de Obsidian (packages/obsidian-plugin)

#### ✅ Funcionalidad de Conversión Quick → Standard

**Archivo modificado:** `src/main.ts`

- **Nuevo comando:** "Convert Quick to Standard" disponible en la paleta de comandos
- **Funciones agregadas:**
  - `convertQuickToStandardCommand()` - Handler del comando
  - `findMarkChordBlock()` - Encuentra el bloque markchord donde está el cursor
  - `convertQuickToStandard()` - Conversor principal
  - `parseQuickChordLine()` - Parser de líneas Quick mode
  - `expandMetadataKey()` - Expande metadatos abreviados (k→key, tm→time, etc.)
  - `normalizeChord()` - Normaliza acordes (uppercase, maj7, etc.)
  - `generateStandardFormat()` - Genera formato Standard alineado
  - `formatGridLine()` - Formatea líneas de grilla con celdas

- **Características:**
  - Detecta bloques Quick mode (con `@quick`, `@q` o secciones `_v1`, `_c`, etc.)
  - Convierte secciones abreviadas: `_i`, `_v1`, `_c`, `_pc`, `_b`, `_s`, `_m`, `_o`, `_k`
  - Soporta atajos de acordes: `c-d-em`, puntos `.` para espacios
  - Maneja repeticiones con `x2`, `x4`, etc.
  - Auto-calcula anchos de columna para alineación perfecta
  - Expande nombres de sección (Intro, Verse 1, Chorus, etc.)

**Uso:**
1. Colocar cursor dentro de un bloque markchord con sintaxis Quick
2. Abrir paleta de comandos (Cmd/Ctrl+P)
3. Ejecutar "Convert Quick to Standard"

#### ✅ Corrección de Estilos CSS

**Archivo actualizado:** `styles.css` (v1.2.0 CLEAN)

- **Estilos base:**
  - Fuente monoespaciada: JetBrains Mono, Fira Code, SF Mono prioritarias
  - Line-height reducido a 1.4 para mejor densidad vertical
  - Border-left con color #667eea para indicador visual

- **Clases de acordes (todos en verde):**
  - `.markchord-chord-major` - Acordes mayores (#43A047 light / #81C784 dark)
  - `.markchord-chord-minor` - Acordes menores
  - `.markchord-chord-dim` - Acordes disminuidos
  - `.markchord-chord-aug` - Acordes aumentados
  - `.markchord-chord-sus` - Acordes suspendidos
  - `.markchord-chord-dom` - Acordes dominantes

- **Comentarios (salmón/naranja):**
  - `.markchord-comment-beat` - Comentarios de compás (') (#FF8A65 light / #FFB74D dark)
  - `.markchord-comment-text` - Texto de comentarios
  - `.markchord-comment-line` - Comentarios de línea ('')
  - `.markchord-comment-section` - Comentarios de sección (/)

- **Otros elementos:**
  - `.markchord-symbol-discrete` - Símbolos (#, ##, @, etc.) con opacity 0.2
  - `.markchord-bar` - Barras `|` en gris (#757575)
  - `.markchord-repeat` - Repeticiones `:|` y `|:` en naranja (#F4511E)
  - `.markchord-meta-*` - Metadatos en morado (#9C27B0)
  - `.markchord-section-name` - Nombres de sección en azul (#1976D2)

- **Tema oscuro completo** con variantes de color para todos los elementos

**Problema resuelto:**
- ✅ Comentarios de compás ahora visibles en naranja/salmón
- ✅ Todos los acordes en verde sin importar el tipo
- ✅ Alineación perfecta con fuente monoespaciada

#### 📦 Archivos de distribución

**Archivos generados para instalación en Obsidian:**

```
packages/obsidian-plugin/
├── main.js          (18 KB - con conversión)
├── manifest.json    (323 bytes)
└── styles.css       (completo con todos los estilos)
```

**Instalación:**
1. Copiar estos 3 archivos a: `{vault}/.obsidian/plugins/markchord-highlight/`
2. Recargar Obsidian (Cmd/Ctrl+R) o reactivar plugin

---

## Archivos modificados en este hilo

### Código fuente
- `packages/obsidian-plugin/src/main.ts` - +301 líneas (conversión Quick→Standard)
- `packages/obsidian-plugin/styles.css` - Reemplazado con versión completa v1.2.0

### Configuración
- `package-lock.json` - Agregado para dependency tracking
- `manifest.json` - Creado (versión 2.0.0)

### Commits realizados

```bash
4433b6a - Add Quick to Standard conversion feature to Obsidian plugin
dac180a - Add package-lock.json for dependency management
```

---

## Comandos útiles para referencia

### Compilar el plugin
```bash
cd ~/proyectos/markchord/packages/obsidian-plugin
npm install
npm run build
```

### Actualizar desde GitHub
```bash
cd ~/proyectos/markchord
git fetch --all
git pull origin {branch-name}
```

### Ver tamaño de archivos compilados
```bash
ls -lh ~/proyectos/markchord/packages/obsidian-plugin/main.js
# Debería mostrar ~18 KB (con conversión) vs ~10 KB (sin conversión)
```

---

## Estado actual del proyecto

### ✅ Funcionalidades completadas
- Syntax highlighting completo para MarkChord Standard
- Syntax highlighting para MarkChord Quick
- Conversión Quick → Standard con comando
- Estilos CSS completos (light + dark theme)
- Comentarios de compás, línea y sección
- Acordes con colores diferenciados por tipo
- Metadatos y secciones estilizados

### 🔄 Pendientes (según ROADMAP.md)
- Testing del parser TypeScript
- Conversión bidireccional (Standard → Quick)
- Auto-formatting tools
- Export a HTML/PDF
- CLI tools
- Publicación en npm y Obsidian Community Plugins

---

## Problemas conocidos y soluciones

### ❌ "Los colores de los acordes se ven mal"
**Causa:** styles.css incompleto o sin clases específicas
**Solución:** Usar styles.css v1.2.0 CLEAN con todas las clases de acordes

### ❌ "No aparecen los comentarios de compás"
**Causa:** Falta clase `.markchord-comment-beat` en CSS
**Solución:** Actualizar a styles.css completo

### ❌ Error al hacer git pull: "archivos sin seguimiento serán sobrescritos"
**Causa:** package-lock.json local no trackeado
**Solución:** `rm package-lock.json` antes de pull

---

## Estructura del proyecto

```
markchord/
├── packages/
│   ├── obsidian-plugin/        # Plugin para Obsidian
│   │   ├── src/
│   │   │   └── main.ts         # Código fuente TypeScript
│   │   ├── main.js             # Compilado (18 KB)
│   │   ├── manifest.json       # Metadata del plugin
│   │   ├── styles.css          # Estilos completos
│   │   ├── package.json
│   │   └── esbuild.config.mjs
│   └── parser/                 # Parser TypeScript (pendiente integración)
├── docs/                       # Documentación MarkChord
├── examples/                   # Ejemplos de canciones
├── ROADMAP.md                  # Plan de desarrollo
├── README.md
└── package.json
```

---

## Notas para próximos hilos

1. **Symlink configurado:** El plugin en Obsidian está enlazado con symlink a `~/proyectos/markchord/packages/obsidian-plugin/`

2. **Workflow de desarrollo:**
   - Editar `src/main.ts` o `styles.css`
   - Ejecutar `npm run build`
   - Recargar en Obsidian (Cmd/Ctrl+R)

3. **Ramas importantes:**
   - `claude/update-plugin-version-011CUMxQg17BUfxLGrx9e3Lm` - Versión con conversión (ACTUAL)
   - `claude/fix-chord-display-011CULwk2ADiULGbvtetFuA3` - Estilos CSS completos
   - `main` - Rama principal

4. **Versión del plugin:** 2.0.0

---

**Última actualización:** 2025-10-22
**Claude session ID:** 011CUMxQg17BUfxLGrx9e3Lm
