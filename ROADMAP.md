# 🗺️ MarkChord Roadmap

> Hoja de ruta del proyecto MarkChord - Formato de texto plano para acordes

---

## 📊 Estado del Proyecto

**Versión actual:** v1.0.0
**Última actualización:** 2025-10-21
**Estado general:** ✅ Funcional - En desarrollo activo

### Componentes principales

| Componente | Estado | Versión | Notas |
|------------|--------|---------|-------|
| **Parser TypeScript** | ✅ Funcional | v1.0.0 | Parsea MarkChord estándar y Quick mode |
| **Plugin Obsidian** | ✅ Funcional | v2.0.0 | Syntax highlighting completo con regex |
| **Especificación** | ✅ Completa | v1.4 | MarkChord estándar documentado |
| **Quick Mode Spec** | ✅ Completa | v1.0 | Modo ultrarrápido documentado |
| **Documentación** | ✅ Completa | - | README, specs, cheat sheets |
| **Tests** | ❌ Pendiente | - | Sin tests unitarios aún |
| **CLI** | ❌ Pendiente | - | No implementado |
| **Integración Parser↔Plugin** | ⚠️ Parcial | - | Parser no usado en plugin aún |

---

## ✅ Completado

### Core del proyecto
- [x] Especificación MarkChord estándar v1.4
- [x] Especificación Quick mode v1.0
- [x] Quick CheatSheet de referencia
- [x] Parser TypeScript completo (Lexer + Parser)
- [x] AST tipado completo
- [x] Detección automática de Quick mode
- [x] Plugin Obsidian con syntax highlighting
- [x] Soporte para comentarios de compás, línea y sección
- [x] Coloreado de acordes por tipo (mayor, menor, dim, aug, dom, sus)
- [x] Repeat markers (`|:` y `:|`)
- [x] Tema claro/oscuro
- [x] Settings configurables en Obsidian
- [x] Ejemplo: Wonderwall (examples/wonderwall.md)
- [x] Estructura de monorepo con npm workspaces
- [x] README principal con documentación
- [x] Guía de setup (SETUP.md)
- [x] Guía de contribución (CONTRIBUTING.md)
- [x] Repositorio en GitHub

---

## 🎯 Roadmap por Fases

### 📌 FASE 1: Validación y Testing (ACTUAL)
**Prioridad:** 🔴 Alta
**Objetivo:** Asegurar que el parser Quick→MarkChord funciona correctamente

#### 1.1 Testing del Parser Quick Mode
- [ ] **Diseñar suite de tests para Quick mode**
  - [ ] Tests de parsing de acordes literales (c, cm, cd, cM, etc.)
  - [ ] Tests de parsing de acordes Nashville (1, 1m, 1d, 1M, etc.)
  - [ ] Tests de secciones Quick (_i, _v1, _c, etc.)
  - [ ] Tests de repeticiones (x2, x3, referencias)
  - [ ] Tests de comentarios de compás en Quick
  - [ ] Tests de múltiples acordes por compás (c-g, c..g, etc.)
  - [ ] Tests de silencios (`.`)
  - [ ] Tests de indicaciones especiales (!, ^, >>, --)

#### 1.2 Verificación del Formato de Salida
- [ ] **Verificar que la salida cumple especificación v1.4**
  - [ ] Alineación correcta de barras `|`
  - [ ] Espaciado mínimo (1 espacio antes/después de acordes)
  - [ ] Cálculo correcto de ancho de celdas
  - [ ] Comentarios de compás alineados sobre `|`
  - [ ] Comentarios de línea (`''`) correctos
  - [ ] Espaciado vertical entre secciones
  - [ ] Metadatos expandidos correctamente (@q → @quick, @k → @key)

#### 1.3 Documentar Características Soportadas
- [ ] **Crear matriz de compatibilidad Quick→MarkChord**
  - [ ] Documentar qué características del estándar Quick se convierten
  - [ ] Documentar limitaciones conocidas
  - [ ] Documentar casos edge que fallan
  - [ ] Crear ejemplos antes/después de conversión

#### 1.4 Tests del Parser Estándar
- [ ] **Tests básicos de MarkChord estándar**
  - [ ] Tests de parsing de secciones
  - [ ] Tests de grids y medidas
  - [ ] Tests de acordes y tipos
  - [ ] Tests de comentarios (todos los tipos)
  - [ ] Tests de metadatos
  - [ ] Tests de repeat markers

---

### 📌 FASE 2: Reformateo y Herramientas
**Prioridad:** 🟡 Media
**Objetivo:** Herramientas para formatear y limpiar archivos MarkChord

#### 2.1 Función de Reformateo Automático
- [ ] **Implementar formateador de MarkChord**
  - [ ] Función `formatMarkChord(source: string): string`
  - [ ] Parsear → Recalcular alineaciones → Regenerar texto
  - [ ] Respetar modo de layout (@layout fluid/section/grid)
  - [ ] Preservar comentarios y metadatos
  - [ ] Normalizar espaciado vertical

#### 2.2 Integración en Plugin Obsidian
- [ ] **Comando "Format MarkChord Block"**
  - [ ] Detectar bloque markchord activo
  - [ ] Aplicar reformateo
  - [ ] Actualizar editor con texto formateado
  - [ ] Shortcut de teclado (Ctrl+Shift+F)

#### 2.3 Validador de Sintaxis
- [ ] **Implementar linter para MarkChord**
  - [ ] Detectar errores de alineación
  - [ ] Detectar acordes mal formados
  - [ ] Detectar comentarios desalineados
  - [ ] Sugerencias de corrección
  - [ ] Integrar en plugin como warnings

---

### 📌 FASE 3: Conversión Quick ↔ Standard
**Prioridad:** 🟡 Media
**Objetivo:** Convertir bidireccionalmente entre modos

#### 3.1 Conversor Quick → MarkChord
- [ ] **Implementar `quickToStandard(source: string): string`**
  - [ ] Expandir etiquetas de sección (_i → ## Intro, _v1 → ## Verse 1, etc.)
  - [ ] Convertir acordes espaciados a formato con barras
  - [ ] Calcular alineación según especificación
  - [ ] Expandir metadatos abreviados (@q → @quick, @k → @key)
  - [ ] Preservar comentarios y convertir posiciones
  - [ ] Aplicar `@layout section` por defecto

#### 3.2 Conversor MarkChord → Quick (opcional)
- [ ] **Implementar `standardToQuick(source: string): string`**
  - [ ] Comprimir secciones (## Intro → _i)
  - [ ] Remover barras y espaciado
  - [ ] Abreviar metadatos
  - [ ] Convertir a minúsculas (opcional)

#### 3.3 Integración en Plugin
- [ ] **Comandos de conversión en Obsidian**
  - [ ] "Convert to Standard MarkChord"
  - [ ] "Convert to Quick Mode"
  - [ ] Shortcuts de teclado

---

### 📌 FASE 4: Ejemplos y Contenido
**Prioridad:** 🟢 Media-Baja
**Objetivo:** Crear biblioteca de ejemplos para documentación y testing

#### 4.1 Más Ejemplos de Canciones
- [ ] **Crear 10-15 ejemplos variados**
  - [ ] Pop: Wonderwall ✅, Let It Be, Hey Jude, etc.
  - [ ] Rock: Hotel California, Stairway to Heaven, etc.
  - [ ] Jazz: Autumn Leaves, Blue Bossa, All The Things You Are
  - [ ] Blues: 12-bar blues variations
  - [ ] Bossa Nova: Girl from Ipanema, Desafinado
  - [ ] Canciones en español: ejemplos latinos

#### 4.2 Ejemplos por Característica
- [ ] **Ejemplos didácticos**
  - [ ] Ejemplo de comentarios de compás
  - [ ] Ejemplo de comentarios de línea
  - [ ] Ejemplo de repeat markers
  - [ ] Ejemplo de Nashville numbers
  - [ ] Ejemplo de Quick mode
  - [ ] Ejemplo de slash chords
  - [ ] Ejemplo de acordes complejos (extensions, alterations)

---

### 📌 FASE 5: CLI y Automatización
**Prioridad:** 🟢 Media-Baja
**Objetivo:** Herramienta de línea de comandos

#### 5.1 CLI Básico
- [ ] **Crear paquete `@markchord/cli`**
  - [ ] Comando `markchord validate <file>`
  - [ ] Comando `markchord format <file>`
  - [ ] Comando `markchord convert --to=standard <file>`
  - [ ] Comando `markchord convert --to=quick <file>`
  - [ ] Flag `--output` para escribir resultado
  - [ ] Flag `--check` para dry-run

#### 5.2 Transposición Automática
- [ ] **Implementar transposición de acordes**
  - [ ] Función `transpose(chord: string, semitones: number): string`
  - [ ] Función `transposeDocument(source: string, semitones: number): string`
  - [ ] Respetar metadato `@transp`
  - [ ] Comando CLI `markchord transpose --from=C --to=G <file>`
  - [ ] Integrar en plugin Obsidian

#### 5.3 Batch Processing
- [ ] **Procesar múltiples archivos**
  - [ ] Comando `markchord format *.md`
  - [ ] Comando `markchord validate **/*.md`
  - [ ] Reportes de errores agregados

---

### 📌 FASE 6: Exportación y Renderizado
**Prioridad:** 🔵 Baja
**Objetivo:** Exportar a formatos visuales

#### 6.1 Exportación a HTML
- [ ] **Renderizar MarkChord a HTML**
  - [ ] Templates HTML con CSS
  - [ ] Preservar coloreado de acordes
  - [ ] Responsive design
  - [ ] Opción de dark/light theme
  - [ ] Comando CLI `markchord export --to=html <file>`

#### 6.2 Exportación a PDF
- [ ] **Generar PDFs desde MarkChord**
  - [ ] Integración con puppeteer o similar
  - [ ] Templates profesionales para lead sheets
  - [ ] Opciones de tamaño de página (A4, Letter, etc.)
  - [ ] Comando CLI `markchord export --to=pdf <file>`

#### 6.3 Plantillas de Estilos
- [ ] **Sistema de templates configurables**
  - [ ] Plantillas para PDFs (Jazz, Pop, Classical, etc.)
  - [ ] Plantillas de coloreado para plugin
  - [ ] Editor de themes en Obsidian settings
  - [ ] Exportar/importar themes personalizados
  - [ ] Galería de themes comunitarios

---

### 📌 FASE 7: Web y Tutorial Interactivo
**Prioridad:** 🔵 Baja
**Objetivo:** Sitio web oficial con tutorial

#### 7.1 Sitio Web Oficial
- [ ] **Crear markchord.dev (o similar)**
  - [ ] Landing page con features
  - [ ] Documentación completa online
  - [ ] Especificaciones navegables
  - [ ] Ejemplos interactivos
  - [ ] Descarga de releases
  - [ ] Links a GitHub y comunidad

#### 7.2 Playground Interactivo
- [ ] **Editor online de MarkChord**
  - [ ] Editor con syntax highlighting en tiempo real
  - [ ] Preview renderizado lado a lado
  - [ ] Conversión Quick ↔ Standard en vivo
  - [ ] Transposición interactiva
  - [ ] Compartir snippets (URLs cortas)
  - [ ] Exportar a PDF/HTML desde la web

#### 7.3 Tutorial Interactivo
- [ ] **Curso paso a paso**
  - [ ] Lección 1: Conceptos básicos
  - [ ] Lección 2: Secciones y grids
  - [ ] Lección 3: Comentarios
  - [ ] Lección 4: Quick mode
  - [ ] Lección 5: Nashville numbers
  - [ ] Ejercicios con feedback automático
  - [ ] Certificado de completitud

---

### 📌 FASE 8: Comunidad y Distribución
**Prioridad:** 🔵 Baja
**Objetivo:** Publicar en registros oficiales

#### 8.1 Publicación en npm
- [ ] **Publicar `@markchord/parser`**
  - [ ] Setup de npm registry
  - [ ] CI/CD para releases automáticas
  - [ ] Versionado semántico
  - [ ] Changelog automático
  - [ ] Badges en README (npm version, downloads, etc.)

#### 8.2 Publicación en Obsidian Community Plugins
- [ ] **Publicar plugin oficialmente**
  - [ ] Cumplir requisitos de Obsidian
  - [ ] Review process
  - [ ] Listado en Obsidian Community Plugins
  - [ ] Actualizaciones automáticas para usuarios

#### 8.3 Comunidad y Soporte
- [ ] **Canales de comunicación**
  - [ ] Discord server o Telegram group
  - [ ] GitHub Discussions activas
  - [ ] Twitter/X para anuncios
  - [ ] Newsletter mensual (opcional)

---

## 🔬 Investigación y Futuro

### Ideas en Exploración

- **VSCode Extension**: Syntax highlighting para VSCode
- **Vim/Neovim Plugin**: Soporte para editores vim
- **Mobile App**: App nativa para iOS/Android
- **Real-time Collaboration**: Edición colaborativa de lead sheets
- **Audio Playback**: Reproducir progresiones con MIDI
- **Chord Suggestions**: IA para sugerir progresiones
- **Setlist Manager**: Organizar sets de canciones
- **Integración con servicios**: Ultimate Guitar, ChordPro, etc.
- **API REST**: Servicio de conversión y validación online

---

## 📈 Métricas de Progreso

### Global
- **Total de tareas:** ~120
- **Completadas:** ~35 (29%)
- **En progreso:** Fase 1 - Testing
- **Siguiente hito:** Parser validado y testeado

### Por Fase
| Fase | Completado | Progreso |
|------|------------|----------|
| Fase 1: Testing | 0/20 | ░░░░░░░░░░ 0% |
| Fase 2: Reformateo | 0/12 | ░░░░░░░░░░ 0% |
| Fase 3: Conversión | 0/10 | ░░░░░░░░░░ 0% |
| Fase 4: Ejemplos | 1/15 | █░░░░░░░░░ 7% |
| Fase 5: CLI | 0/15 | ░░░░░░░░░░ 0% |
| Fase 6: Exportación | 0/12 | ░░░░░░░░░░ 0% |
| Fase 7: Web | 0/15 | ░░░░░░░░░░ 0% |
| Fase 8: Distribución | 0/10 | ░░░░░░░░░░ 0% |

---

## 🤝 Cómo Contribuir

Si quieres ayudar con alguna tarea del roadmap:

1. **Revisa las issues** en GitHub marcadas con etiquetas de prioridad
2. **Comenta en la issue** que te interesa para coordinar
3. **Lee CONTRIBUTING.md** para guía de desarrollo
4. **Haz un fork** y trabaja en tu rama
5. **Abre un PR** referenciando la tarea del roadmap

---

## 📅 Changelog del Roadmap

### 2025-10-21
- ✨ Creación del ROADMAP inicial
- 🎯 Definición de 8 fases principales
- 📊 Identificación de ~120 tareas
- 🔴 Prioridad en Fase 1: Testing y validación

---

## 📄 Licencia

Este roadmap es parte del proyecto MarkChord.
**Licencia:** Creative Commons BY-SA 4.0

---

**MarkChord** - *Write chords, not charts* 🎸🎹🎤
