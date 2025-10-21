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
**Objetivo:** Asegurar que el parser puede LEER correctamente Quick mode y MarkChord estándar

> **Nota importante:** Esta fase se enfoca en validar que el parser **LEE** correctamente el código y genera el AST (árbol sintáctico). La **conversión de AST a texto formateado** se implementará en Fase 4.

#### 1.1 Testing del Parser Quick Mode (Lectura/Parsing)
- [ ] **Diseñar suite de tests para Quick mode**
  - [ ] Tests de parsing de acordes literales (c, cm, cd, cM, etc.)
  - [ ] Tests de parsing de acordes Nashville (1, 1m, 1d, 1M, etc.)
  - [ ] Tests de secciones Quick (_i, _v1, _c, etc.)
  - [ ] Tests de repeticiones (x2, x3, referencias)
  - [ ] Tests de comentarios de compás en Quick
  - [ ] Tests de múltiples acordes por compás (c-g, c..g, etc.)
  - [ ] Tests de silencios (`.`)
  - [ ] Tests de indicaciones especiales (!, ^, >>, --)
  - [ ] Verificar que el AST generado es correcto

#### 1.2 Tests del Parser Estándar (Lectura/Parsing)
- [ ] **Tests básicos de MarkChord estándar**
  - [ ] Tests de parsing de secciones
  - [ ] Tests de grids y medidas
  - [ ] Tests de acordes y tipos
  - [ ] Tests de comentarios (todos los tipos)
  - [ ] Tests de metadatos
  - [ ] Tests de repeat markers
  - [ ] Verificar que el AST generado es correcto

#### 1.3 Documentar Características del Parser
- [ ] **Crear matriz de compatibilidad del parser**
  - [ ] Documentar qué características de Quick mode puede parsear
  - [ ] Documentar qué características de Standard puede parsear
  - [ ] Documentar limitaciones conocidas
  - [ ] Documentar casos edge que fallan
  - [ ] Crear ejemplos de código → AST

---

### 📌 FASE 2: Exportación PDF/HTML para Uso en Vivo
**Prioridad:** 🟡 Media-Alta
**Objetivo:** Generar PDFs y HTML listos para usar en ensayos y conciertos

#### 2.1 Exportación a HTML
- [ ] **Renderizar MarkChord a HTML**
  - [ ] Templates HTML con CSS optimizado para lectura
  - [ ] Preservar coloreado de acordes
  - [ ] Responsive design (desktop + tablet)
  - [ ] Opción de dark/light theme
  - [ ] Tamaño de fuente ajustable para uso en vivo
  - [ ] Modo "pantalla completa" sin distracciones
  - [ ] Comando CLI `markchord export --to=html <file>`
  - [ ] Integración en plugin Obsidian

#### 2.2 Exportación a PDF
- [ ] **Generar PDFs desde MarkChord**
  - [ ] Integración con puppeteer o similar
  - [ ] **Templates optimizados para uso en vivo:**
    - [ ] Template "Live Performance" (fuente grande, alto contraste)
    - [ ] Template "Rehearsal" (anotaciones, espacios para notas)
    - [ ] Template "Professional Lead Sheet" (formato estándar jazz)
  - [ ] Opciones de tamaño de página (A4, Letter, Tabloid)
  - [ ] Orientación landscape/portrait
  - [ ] Comando CLI `markchord export --to=pdf <file>`
  - [ ] Integración en plugin Obsidian

#### 2.3 Sistema de Plantillas de Estilos
- [ ] **Templates configurables para PDF/HTML**
  - [ ] **Estilos para uso en vivo:**
    - [ ] "Stage View" - Alto contraste, fuente XXL, mínimo clutter
    - [ ] "Rehearsal Room" - Espaciado generoso, fácil anotación
    - [ ] "Jazz Standard" - Formato tradicional lead sheet
    - [ ] "Pop/Rock Chart" - Formato moderno, visual limpio
  - [ ] **Estilos para coloreado:**
    - [ ] Theme "High Contrast" (blanco/negro)
    - [ ] Theme "Colorblind Friendly"
    - [ ] Theme "Classic Jazz" (tonos tierra)
    - [ ] Theme "Modern Dark" (fondo oscuro)
  - [ ] Editor de themes en Obsidian settings
  - [ ] Exportar/importar themes personalizados como JSON
  - [ ] Galería de themes comunitarios
  - [ ] Preview en tiempo real de themes

#### 2.4 Funcionalidades para Uso en Vivo
- [ ] **Mejoras específicas para performance**
  - [ ] Modo "Setlist" - Navegación entre canciones
  - [ ] Auto-scroll configurable
  - [ ] Marcadores de tiempo/tempo visual
  - [ ] Exportar setlist completo a PDF único
  - [ ] Generación de QR codes para compartir rápido

---

### 📌 FASE 3: Reformateo y Herramientas de Edición
**Prioridad:** 🟡 Media
**Objetivo:** Herramientas para formatear y limpiar archivos MarkChord

#### 3.1 Función de Reformateo Automático
- [ ] **Implementar formateador de MarkChord**
  - [ ] Función `formatMarkChord(source: string): string`
  - [ ] Parsear → Recalcular alineaciones → Regenerar texto
  - [ ] Respetar modo de layout (@layout fluid/section/grid)
  - [ ] Preservar comentarios y metadatos
  - [ ] Normalizar espaciado vertical
  - [ ] Opciones de estilo configurable

#### 3.2 Integración en Plugin Obsidian
- [ ] **Comando "Format MarkChord Block"**
  - [ ] Detectar bloque markchord activo
  - [ ] Aplicar reformateo
  - [ ] Actualizar editor con texto formateado
  - [ ] Shortcut de teclado (Ctrl+Shift+F)
  - [ ] Formato automático al guardar (opcional)

#### 3.3 Validador de Sintaxis
- [ ] **Implementar linter para MarkChord**
  - [ ] Detectar errores de alineación
  - [ ] Detectar acordes mal formados
  - [ ] Detectar comentarios desalineados
  - [ ] Sugerencias de corrección
  - [ ] Integrar en plugin como warnings
  - [ ] Quick fixes automáticos

---

### 📌 FASE 4: Conversión Quick ↔ Standard
**Prioridad:** 🟡 Media
**Objetivo:** Convertir bidireccionalmente entre modos

> **Nota importante:** Esta fase implementa la **GENERACIÓN de texto formateado** desde el AST. A diferencia de Fase 1 (que valida la lectura), aquí se crea la función que toma el AST y produce texto MarkChord correctamente formateado.

#### 4.1 Generador de MarkChord Estándar (AST → Texto)
- [ ] **Implementar `generateStandard(ast: MarkChordDocument): string`**
  - [ ] Calcular alineación de columnas según especificación v1.4
  - [ ] Espaciado mínimo (1 espacio antes/después de acordes)
  - [ ] Cálculo correcto de ancho de celdas
  - [ ] Alinear comentarios de compás sobre `|`
  - [ ] Posicionar comentarios de línea (`''`) correctamente
  - [ ] Aplicar espaciado vertical entre secciones
  - [ ] Respetar modo de layout (@layout fluid/section/grid)

#### 4.2 Conversor Quick → MarkChord Estándar
- [ ] **Implementar `quickToStandard(source: string): string`**
  - [ ] Parsear Quick mode → AST
  - [ ] Expandir etiquetas de sección (_i → ## Intro, _v1 → ## Verse 1)
  - [ ] Convertir acordes espaciados a formato con barras
  - [ ] Expandir metadatos abreviados (@q → @quick, @k → @key)
  - [ ] Preservar comentarios y convertir posiciones
  - [ ] Aplicar `@layout section` por defecto
  - [ ] Usar `generateStandard()` para output final

#### 4.3 Conversor MarkChord → Quick (opcional)
- [ ] **Implementar `standardToQuick(source: string): string`**
  - [ ] Comprimir secciones (## Intro → _i)
  - [ ] Remover barras y espaciado
  - [ ] Abreviar metadatos
  - [ ] Convertir a minúsculas (opcional)

#### 4.4 Testing de Conversión
- [ ] **Validar que la salida cumple especificación v1.4**
  - [ ] Tests de alineación correcta de barras `|`
  - [ ] Tests de espaciado mínimo
  - [ ] Tests de comentarios alineados
  - [ ] Tests de expansión de metadatos
  - [ ] Tests de conversión round-trip (Quick→Standard→Quick)
  - [ ] Crear ejemplos antes/después de conversión

#### 4.5 Integración en Plugin
- [ ] **Comandos de conversión en Obsidian**
  - [ ] "Convert to Standard MarkChord"
  - [ ] "Convert to Quick Mode"
  - [ ] "Format MarkChord Block" (usa el generador)
  - [ ] Shortcuts de teclado

---

### 📌 FASE 5: Ejemplos y Contenido
**Prioridad:** 🟢 Media-Baja
**Objetivo:** Crear biblioteca de ejemplos para documentación y testing

#### 5.1 Más Ejemplos de Canciones
- [ ] **Crear 10-15 ejemplos variados**
  - [ ] Pop: Wonderwall ✅, Let It Be, Hey Jude, etc.
  - [ ] Rock: Hotel California, Stairway to Heaven, etc.
  - [ ] Jazz: Autumn Leaves, Blue Bossa, All The Things You Are
  - [ ] Blues: 12-bar blues variations
  - [ ] Bossa Nova: Girl from Ipanema, Desafinado
  - [ ] Canciones en español: ejemplos latinos

#### 5.2 Ejemplos por Característica
- [ ] **Ejemplos didácticos**
  - [ ] Ejemplo de comentarios de compás
  - [ ] Ejemplo de comentarios de línea
  - [ ] Ejemplo de repeat markers
  - [ ] Ejemplo de Nashville numbers
  - [ ] Ejemplo de Quick mode
  - [ ] Ejemplo de slash chords
  - [ ] Ejemplo de acordes complejos (extensions, alterations)

---

### 📌 FASE 6: CLI y Automatización
**Prioridad:** 🟢 Media-Baja
**Objetivo:** Herramienta de línea de comandos

#### 6.1 CLI Básico
- [ ] **Crear paquete `@markchord/cli`**
  - [ ] Comando `markchord validate <file>`
  - [ ] Comando `markchord format <file>`
  - [ ] Comando `markchord convert --to=standard <file>`
  - [ ] Comando `markchord convert --to=quick <file>`
  - [ ] Flag `--output` para escribir resultado
  - [ ] Flag `--check` para dry-run

#### 6.2 Transposición Automática
- [ ] **Implementar transposición de acordes**
  - [ ] Función `transpose(chord: string, semitones: number): string`
  - [ ] Función `transposeDocument(source: string, semitones: number): string`
  - [ ] Respetar metadato `@transp`
  - [ ] Comando CLI `markchord transpose --from=C --to=G <file>`
  - [ ] Integrar en plugin Obsidian

#### 6.3 Batch Processing
- [ ] **Procesar múltiples archivos**
  - [ ] Comando `markchord format *.md`
  - [ ] Comando `markchord validate **/*.md`
  - [ ] Reportes de errores agregados

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
- **Total de tareas:** ~132
- **Completadas:** ~35 (27%)
- **En progreso:** Fase 1 - Testing
- **Siguiente hito:** Parser validado y testeado
- **Siguiente prioridad alta:** Exportación PDF/HTML para uso en vivo

### Por Fase
| Fase | Completado | Progreso |
|------|------------|----------|
| Fase 1: Testing | 0/18 | ░░░░░░░░░░ 0% |
| Fase 2: Exportación PDF/HTML | 0/25 | ░░░░░░░░░░ 0% |
| Fase 3: Reformateo | 0/12 | ░░░░░░░░░░ 0% |
| Fase 4: Conversión | 0/22 | ░░░░░░░░░░ 0% |
| Fase 5: Ejemplos | 1/15 | █░░░░░░░░░ 7% |
| Fase 6: CLI | 0/15 | ░░░░░░░░░░ 0% |
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

### 2025-10-21 (v2)
- 🔄 **Reorganización de prioridades:**
  - ⬆️ Exportación PDF/HTML elevada a Fase 2 (Media-Alta)
  - Añadidas plantillas específicas para uso en vivo
  - Añadidos templates para ensayos y performances
- 📝 **Aclaraciones importantes:**
  - Fase 1: Testing del parser (lectura → AST)
  - Fase 4: Implementación de conversión (AST → texto formateado)
  - Añadida nota explicativa sobre la diferencia entre parsing y generación
- ✨ **Nuevas funcionalidades en Fase 2:**
  - Modo "Stage View" para uso en vivo
  - Auto-scroll configurable
  - Exportar setlist completo
  - QR codes para compartir
- 📊 Total de tareas actualizado: ~132 (era ~120)

### 2025-10-21 (v1)
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
