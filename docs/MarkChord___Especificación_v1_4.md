# ðŸ“˜ EspecificaciÃ³n oficial de MarkChord (v1.4)

## 1. Objetivo

**MarkChord** es un formato textual inspirado en **Markdown** y **ChordPro**, diseÃ±ado para escribir **guiones de acordes** (tambiÃ©n llamados *chordgrids*, *lead sheets* o *jazz charts*) legibles y perfectamente alineados en **texto plano**, sin necesidad de software de notaciÃ³n.

Su propÃ³sito es facilitar:
- la **escritura rÃ¡pida** y coherente de estructuras armÃ³nicas;
- la **legibilidad sin renderizado**;
- la **alineaciÃ³n visual precisa** de compases, comentarios y secciones;
- y la futura **automatizaciÃ³n** de tareas como transposiciÃ³n, renderizado, anÃ¡lisis o exportaciÃ³n.

Los archivos MarkChord estÃ¡n pensados para su uso en **Obsidian**, aunque el formato es independiente de la plataforma.

---

## 2. Estructura general

Un documento **MarkChord** se organiza en un bloque de cÃ³digo con lenguaje `markchord`:

```markchord
# TÃ­tulo de la canciÃ³n
@key C
@time 4/4
@layout section

                     'voz      'break
## Estrofa           |  Am7    |  Dm7b5  |  G7#9  |  Cmaj7  |

                    ''comentario de lÃ­nea
## Puente            |  Fmaj7  |  G7     |  Cmaj7 |  %  |

/ comentario de secciÃ³n
```

### Tipos de comentario

| SÃ­mbolo | Tipo | DescripciÃ³n |
|----------|------|-------------|
| `'comentario` | **Comentario de compÃ¡s** | Se coloca directamente **encima del compÃ¡s** (`|`) que comenta. |
| `''comentario` | **Comentario de lÃ­nea** | Se coloca **encima de toda la lÃ­nea de compases**, alineado con el primer compÃ¡s o en el margen izquierdo. |
| `/comentario` | **Comentario de secciÃ³n** | Se coloca **en la columna izquierda**, alineado con el encabezado o el primer bloque de la secciÃ³n. |

### Reglas de alineaciÃ³n

- **Columna izquierda:**  
  Su ancho base = longitud de la etiqueta de secciÃ³n mÃ¡s larga **+ 5 espacios**.  
  Los **comentarios de secciÃ³n (`/`)** se alinean con esta misma columna.

---

## 3. Tipos de lÃ­nea

| Tipo de lÃ­nea | Sintaxis | DescripciÃ³n |
|----------------|-----------|-------------|
| **TÃ­tulo** | `# Nombre` | Nombre del tema. Solo uno por bloque. |
| **Metadato** | `@clave valor` | InformaciÃ³n musical o tÃ©cnica (ej.: `@key C`, `@time 4/4`, `@layout section`). |
| **Comentario de lÃ­nea** | `''comentarioâ€¦` | Nota general o indicaciÃ³n de secciÃ³n. Alineado con el primer compÃ¡s de la lÃ­nea que comenta o en el margen izquierdo. |
| **Comentario de compÃ¡s** | `'texto` | Comentario asociado a un compÃ¡s. Cada `'` se coloca directamente sobre el `|` del compÃ¡s que comenta. |
| **Comentario de secciÃ³n / lateral** | `/comentario` | Comentario de bloque o estructura. Se coloca en el margen izquierdo, alineado con el encabezado de la secciÃ³n. |
| **SecciÃ³n + grid** | `## Nombre  |  Acorde  |  Acorde  | â€¦ |` | Inicia una secciÃ³n con un nombre y una lÃ­nea de acordes. Pueden seguirle mÃ¡s lÃ­neas de grid y comentarios. |

---

## 4. Reglas de alineaciÃ³n

### 4.1 Columna izquierda
- **Ancho base:** longitud de la etiqueta de secciÃ³n mÃ¡s larga + **5 espacios**.  
- Los comentarios de secciÃ³n (`/comentario`) se alinean con esta misma columna.

### 4.2 Espaciado vertical

- Dejar **una lÃ­nea en blanco** entre:
  - Dos lÃ­neas consecutivas de grids (compases)
  - Metadatos y el primer encabezado de secciÃ³n
  - Una secciÃ³n y otra (despuÃ©s del Ãºltimo grid de la secciÃ³n anterior)
  
- **NO** dejar lÃ­nea en blanco entre:
  - Un comentario de lÃ­nea (`''`) y su grid inmediatamente posterior
  - Un comentario de compÃ¡s y su grid inmediatamente posterior
  - Un encabezado `##` y su primer grid

- Ejemplo correcto:
  ```markchord
  ## Estrofa        | C  | %  | G  | %  |
  
                    '    '    '    'rell
                    | C  | %  | Dm | G  |
  
  ## Estribillo     | F  | G  | C  | %  |
  ```

### 4.3 Celdas de compÃ¡s y cÃ¡lculo de ancho

#### Sintaxis bÃ¡sica
- Cada acorde o sÃ­mbolo se escribe entre barras `|`, con **un espacio antes y despuÃ©s**:
  ```
  | Am7 | Dm7b5 | G7#9 | Cmaj7 |
  ```

#### CÃ¡lculo del ancho de celda

El **ancho de cada compÃ¡s** (celda) se determina por el **mÃ¡ximo** entre:

**a) Longitud del acorde + espaciado mÃ­nimo**
   - 1 espacio **antes** del acorde
   - El texto del acorde
   - 1 espacio **despuÃ©s** del acorde

**b) Longitud del comentario de compÃ¡s (si existe) + espaciado mÃ­nimo**
   - El texto del comentario (sin contar el `'`, que va sobre el `|`)
   - 1 espacio despuÃ©s (solo si hay mÃ¡s comentarios o celdas despuÃ©s)

**El ancho final es el mayor de ambos valores.**

#### Ejemplos explicados

**Ejemplo 1: Acorde mÃ¡s largo que comentario**
```
'Go
| Cmaj7#11 | %  |
```
- Acorde `Cmaj7#11`: 1 espacio + 9 caracteres + 1 espacio = **11 caracteres**
- Comentario `Go`: 2 caracteres + 1 espacio = **3 caracteres** (el `'` no cuenta)
- **Ancho de celda**: 11 caracteres (determinado por el acorde)

**Ejemplo 2: Comentario mÃ¡s largo que acorde**
```
'--dc#5b9
| C  |
```
- Acorde `C`: 1 espacio + 1 carÃ¡cter + 1 espacio = **3 caracteres**
- Comentario `--dc#5b9`: 8 caracteres + 1 espacio = **9 caracteres** (el `'` no cuenta)
- **Ancho de celda**: 9 caracteres (determinado por el comentario)

**Ejemplo 3: Comentario vacÃ­o**
```
'
| C  |
```
- Acorde `C`: 1 espacio + 1 carÃ¡cter + 1 espacio = **3 caracteres**
- Comentario vacÃ­o: 0 caracteres + 1 espacio = **1 carÃ¡cter** (solo el espacio mÃ­nimo)
- **Ancho de celda**: 3 caracteres (determinado por el acorde)

**Ejemplo 4: CompÃ¡s sin comentario**
```
| Dm7 |
```
- Acorde `Dm7`: 1 espacio + 3 caracteres + 1 espacio = **5 caracteres**
- Sin comentario
- **Ancho de celda**: 5 caracteres (determinado solo por el acorde)

#### Relleno con espacios

Una vez determinado el ancho de la celda:
- El espacio sobrante se aÃ±ade **a la derecha** del contenido, nunca a la izquierda
- Esto mantiene la alineaciÃ³n de las barras `|` verticales

**Ejemplo de relleno correcto:**
```
'^  '   'Go!
| C | % | G | % |
```
- Primera celda: `C` (3 chars con espacios)
- Tercera celda: `G` (3 chars con espacios) â†’ ancho determinado por `Go!` (3 chars, sin espacio final porque es el Ãºltimo)

**Ejemplo INCORRECTO (relleno a la izquierda):**
```
'^  '   'Go!
|  C | % |  G | % |
```
âŒ Los acordes no deben estar pegados a la barra derecha

#### Nota sobre caracteres no monoespaciados

âš ï¸ **LimitaciÃ³n importante**: Los emojis y caracteres especiales Unicode (como â›”, ðŸŽµ, etc.) **no son monoespaciados** en la mayorÃ­a de fuentes y editores, lo que causa **desalineaciÃ³n visual**.

**Problema:**
```
'â›”     '    'Go!
| C    | %  | G   | %  |
```
En muchos editores, el emoji â›” ocupa mÃ¡s de un carÃ¡cter de ancho, desalineando todo.

**Recomendaciones:**
- Usar caracteres ASCII para comentarios crÃ­ticos: `'!`, `'^`, `'>>`, `'--`, etc.
- Si se usan emojis, verificar la alineaciÃ³n en el editor especÃ­fico (Obsidian, VSCode, etc.)
- Considerar usar abreviaturas textuales en lugar de emojis para mÃ¡xima portabilidad

**Alternativas monoespaciadas:**
```
'!      '    'Go!
| C    | %  | G   | %  |

'^      '    'Go!
| C    | %  | G   | %  |

'>>     '    'Go!
| C    | %  | G   | %  |
```

#### En modo `@layout grid`

En este modo, el cÃ¡lculo se realiza para **toda la columna vertical**:
1. Se calcula el ancho necesario para cada compÃ¡s de la columna
2. Se toma el **mÃ¡ximo** de todos ellos
3. Todas las celdas de esa columna usan ese ancho

**Ejemplo:**
```markchord
@layout grid

              '^       '    'Go!
## Estrofa    | C      | %  | G   | %  |

              '        '--3n'    'rell
              | Cmaj13 | %  | G   | Am  |
```

Ancho de la primera columna:
- LÃ­nea 1: mÃ¡x(3 chars para `C`, 2 chars para `^`) = 3 caracteres
- LÃ­nea 2: mÃ¡x(8 chars para `Cmaj13`, 1 char para `'` vacÃ­o) = 8 caracteres
- **Ancho final de columna**: 8 caracteres (todas las celdas de esa columna)

#### Resumen de reglas

1. **Cada celda** calcula su ancho segÃºn su contenido (acorde + comentario)
2. El `'` de los comentarios de compÃ¡s **no cuenta** en el ancho (va sobre el `|`)
3. El **espacio sobrante** siempre va a la derecha
4. El espacio despuÃ©s del Ãºltimo comentario de la lÃ­nea es **opcional**
5. En `@layout grid`, el ancho se calcula **por columna completa**
6. El espaciado mÃ­nimo es: `| texto |` (siempre un espacio antes y despuÃ©s)
7. **Evitar emojis** para comentarios crÃ­ticos debido a problemas de monoespaciado

### 4.4 Comentarios

#### Comentario de compÃ¡s (`'`)
- Se coloca **directamente encima** del sÃ­mbolo `|` del compÃ¡s que comenta
- Debe estar **perfectamente alineado verticalmente** con el `|` correspondiente
- Ejemplo correcto:
  ```
  '^   '    'Go!
  | C  | %  | G  | %  |
  ```
- Ejemplo INCORRECTO (desalineado):
  ```
  '^  'Go!
  | C  | %  | G  | %  |
  ```

#### Comentario de lÃ­nea (`''`)
- Se coloca **en una lÃ­nea independiente** antes del grid que comenta
- Se alinea con la **columna de inicio de los compases** (no con la columna izquierda)
- **NUNCA** se mezcla con comentarios de compÃ¡s (`'`) en la misma lÃ­nea
- Ejemplo:
  ```
  ''voz!!
  | F  | G  | C  | %  |
  ```

#### Comentario de secciÃ³n (`/`)
- Se coloca en la **columna izquierda**, alineado con los encabezados `##`
- Sirve para anotar bloques o estructuras completas
- **NO** debe usarse para comentar grids individuales (usar `''` en su lugar)
- Ejemplo INCORRECTO: `/ voz!!  | F | G |...` 
- Ejemplo CORRECTO: `''voz!!` en lÃ­nea aparte

#### Reglas generales
- Los comentarios vacÃ­os se escriben como `'` sin texto
- Mantener la alineaciÃ³n vertical es **obligatorio** para la legibilidad
- En modo `@layout grid`, todos los comentarios deben respetar la cuadrÃ­cula global

#### 4.4.1 PosiciÃ³n de los comentarios de compÃ¡s: Â¿Por quÃ© encima?

Los comentarios de compÃ¡s (`'`) se colocan **siempre encima** de la lÃ­nea de acordes por razones musicales y cognitivas:

1. **AnticipaciÃ³n musical**: Las indicaciones deben leerse ANTES de ejecutar el compÃ¡s
2. **Coherencia con notaciÃ³n**: Las dinÃ¡micas y articulaciones se escriben sobre el pentagrama
3. **Flujo de lectura natural**: Primero lees la instrucciÃ³n, luego el acorde
4. **Ensayos efectivos**: Facilita la comunicaciÃ³n durante la prÃ¡ctica

**Correcto:**
```markchord
'!   '>>  'bd
| F  | G  | Am | %  |
```
ðŸŽµ Lectura: "Stop en F, arranca fuerte en G, solo bajo+baterÃ­a en Am"

**Incorrecto:**
```markchord
| F  | G  | Am | %  |
'!   '>>  'bd
```
âŒ Lectura: "ToquÃ© F... ah, tenÃ­a que parar" (demasiado tarde)

### 4.5 Sin tabulaciones
- Cualquier `\t` se convierte en espacios.  
  MarkChord **no permite tabs**: todo el alineado es con espacios.

### 4.6 Errores comunes a evitar

1. **DesalineaciÃ³n de comentarios de compÃ¡s**
   - âŒ `'texto` no alineado con `|`
   - âœ… Cada `'` debe estar exactamente sobre un `|`

2. **Falta de espaciado vertical**
   - âŒ Grids consecutivos sin lÃ­nea en blanco
   - âœ… Siempre una lÃ­nea vacÃ­a entre grids

3. **Uso incorrecto de `/` para comentar grids**
   - âŒ `/ comentario | C | G |...`
   - âœ… `''comentario` en lÃ­nea aparte o `'` sobre compases

4. **Mezclar `''` y `'` en la misma lÃ­nea**
   - âŒ `''texto '` juntos
   - âœ… Usar solo uno de los dos tipos por lÃ­nea

5. **Comentarios de secciÃ³n mal alineados**
   - âŒ `/comentario` alineado con los compases
   - âœ… `/comentario` alineado con `##` en columna izquierda

6. **Relleno de espacios a la izquierda**
   - âŒ `|    C |` (acorde pegado a la derecha)
   - âœ… `| C    |` (acorde pegado a la izquierda, relleno a la derecha)

---

## 5. Modos de alineaciÃ³n (`@layout`)

| Modo | DescripciÃ³n |
|------|--------------|
| `@layout fluid` *(por defecto)* | Cada lÃ­nea se alinea de forma independiente. Ideal para escritura rÃ¡pida o borradores. |
| `@layout section` | Todas las lÃ­neas entre dos encabezados `##` comparten la misma columna inicial de compases. |
| `@layout grid` *(experimental)* | Alinea **todos los compases verticalmente** en todo el bloque, calculando el ancho mÃ¡ximo de cada celda (tipo tablatura o cuadrÃ­cula completa). |

---

## 6. GramÃ¡tica resumida

```ebnf
Block            := ("# " Title)? Metadata* Section+
Metadata         := "@" Key Value
Section          := SectionHeader LineGroup+
SectionHeader    := "##" Name Grid
LineGroup        := (LineComment | BeatCommentLine | SectionComment)* Grid
Grid             := "|" Cell ("|" Cell)* "|"
Cell             := Text?
LineComment      := "''" Text
BeatCommentLine  := BeatToken (Space+ BeatToken)*
BeatToken        := ("''" | "'") Text?
SectionComment   := "/" Text
```

**Reglas adicionales:**
- Cada `BeatToken` se alinea con el compÃ¡s (`|`) en su misma columna.
- Si hay huecos intermedios, se insertan `'` vacÃ­os.
- No se completan celdas despuÃ©s del Ãºltimo comentario real.

---

## 7. Ejemplo completo

```markchord
# Cuando brille el sol
@interpretes Melocos
@key C
@layout section

                     '^   'Go!
## Estrofa           | C  | %  | G  | %  | Dm | G  | C   | %  |

                     '    '    '    '    '    '    '    'rell
                     | C  | %  | G  | %  | Dm | G  | Am  | %  |

                     | F  | G  | C  | %  |

                     '     '    '    '--cb'a
## Estribillo        |: G  | %  | C  | %  | Am | F  | G   | C   | %  :| x2

## Solo              |: C  | %  | G  | %  | Dm | G  | Am  | %  :| x2

''voz!!              | F  | G  | C  | %  |
```

---

## 8. GuÃ­a de caracteres recomendados para comentarios

Dado que los emojis y caracteres Unicode no monoespaciados causan problemas de alineaciÃ³n, esta secciÃ³n proporciona **alternativas ASCII** para marcar situaciones musicales comunes en los comentarios de compÃ¡s.

### 8.1 Control de tempo y paradas

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `!` | Parada sÃºbita / Stop | `'!` |
| `!!` | Parada enfÃ¡tica | `'!!` |
| `#` | Fermata / CalderÃ³n | `'#` |
| `^` | Acento / Hit | `'^` |
| `^^` | Acento fuerte | `'^^` |
| `><` | Parada y ataque | `'><` |
| `[]` | Silencio / Break completo | `'[]` |
| `--` | Rallentando / Frenando | `'--` |
| `==` | Tiempo mantenido / A tempo | `'==` |

**Ejemplos en contexto:**
```markchord
              '!   '    '><
## Puente     | F  | G  | C   | %  |

              '#        '^^
## Final      | Cmaj7  | G7sus4  |
```

### 8.2 ReanudaciÃ³n y arranques

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `>` | ContinÃºa / Arranca | `'>` |
| `>>` | Arranca fuerte | `'>>` |
| `>>>` | Arranca muy fuerte / ExplosiÃ³n | `'>>>` |
| `>!` | Arranca sÃºbito | `'>!` |
| `Go` | Comienza (textual) | `'Go` |
| `Go!` | Comienza con Ã©nfasis | `'Go!` |
| `+` | Suma instrumentos / Entra | `'+` |
| `++` | Tutti / Todos entran | `'++` |

**Ejemplos en contexto:**
```markchord
              '!   '>>  '    '
## Estribillo | Am | F  | C  | G  |

              'Go!
## Verso      | Dm | %  | %  | %  |
```

### 8.3 Patrones rÃ­tmicos

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `.` | Staccato / Corto | `'...` |
| `_` | Legato / Sostenido | `'___` |
| `-.` | Negra-corchea-corchea | `'-.` |
| `-..` | Negra-tres corcheas | `'-..` |
| `.-.` | Corchea-negra-corchea | `'.-. ` |
| `~` | Tresillo | `'~` |
| `~~` | Swing / Shuffle | `'~~` |
| `///` | TrÃ©molo / Rasgado rÃ¡pido | `'///` |
| `\\\` | TrÃ©molo descendente | `'\\\` |

**Ejemplos en contexto:**
```markchord
              '~~  '    '-.  '
## Swing      | C  | Am | F  | G  |

              '... '
## Staccato   | Dm | G7 | C  | %  |
```

### 8.4 Fills y adornos

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `*` | Fill genÃ©rico | `'*` |
| `**` | Fill grande | `'**` |
| `***` | Fill muy elaborado | `'***` |
| `~*` | Fill con tresillo | `'~*` |
| `*>` | Fill que conduce | `'*>` |
| `f` | Fill (textual) | `'f` |
| `roll` | Redoble | `'roll` |
| `rell` | Relleno/Fill (castellano) | `'rell` |
| `fill` | Fill (explÃ­cito) | `'fill` |

**Ejemplos en contexto:**
```markchord
              '    '    '    '**
## Verso      | C  | Am | F  | G   |

              'rell
              | C  | %  | %  | %   |
```

### 8.5 InstrumentaciÃ³n y texturas

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `b` | Solo bajo | `'b` |
| `d` | Solo baterÃ­a | `'d` |
| `bd` | Bajo + baterÃ­a | `'bd` |
| `g` | Solo guitarra | `'g` |
| `k` | Solo teclado/keys | `'k` |
| `v` | Solo voz | `'v` |
| `vb` | Voz + bajo | `'vb` |
| `-b` | Sin bajo | `'-b` |
| `-d` | Sin baterÃ­a | `'-d` |
| `@` | Todos / Full band | `'@` |
| `o` | Orquesta / Arreglo | `'o` |

**Ejemplos en contexto:**
```markchord
              'bd  '    '@
## Intro      | Am | Dm | G   | C  |

              'v        '-d
## Puente     | F  | %  | Em  | %  |
```

### 8.6 Indicaciones de forma y navegaciÃ³n

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `ds` | Dal Segno | `'ds` |
| `dc` | Da Capo | `'dc` |
| `->` | Ir a / Conduce a | `'->` |
| `<-` | Viene de | `'<-` |
| `x2` | Repetir 2 veces | `'x2` |
| `x3` | Repetir 3 veces | `'x3` |
| `1x` | Primera vez | `'1x` |
| `2x` | Segunda vez | `'2x` |
| `[coda]` | Coda | `'[coda]` |
| `{fine}` | Fine / Final | `'{fine}` |

**Ejemplos en contexto:**
```markchord
              '    '    'dc  'x2
## Estribillo | G  | C  | Am  | F   |

              '[coda]
## Coda       | C  | %  | %   | %   |
```

### 8.7 DinÃ¡micas y expresiÃ³n

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `pp` | Pianissimo | `'pp` |
| `p` | Piano | `'p` |
| `mp` | Mezzo piano | `'mp` |
| `mf` | Mezzo forte | `'mf` |
| `f` | Forte | `'f` |
| `ff` | Fortissimo | `'ff` |
| `<` | Crescendo | `'<` |
| `>` | Decrescendo | `'>` |
| `<<` | Crescendo fuerte | `'<<` |
| `>>` | Decrescendo fuerte | `'>>` |

**Ejemplos en contexto:**
```markchord
              'pp  '<   'f   '>
## DinÃ¡mico   | Am | F  | C  | G  |
```

### 8.8 Indicaciones de tonalidad y modulaciÃ³n

| SÃ­mbolo | Significado | Ejemplo |
|---------|-------------|---------|
| `#` | Subir medio tono | `'#` |
| `##` | Subir tono completo | `'##` |
| `b` | Bajar medio tono | `'b` |
| `bb` | Bajar tono completo | `'bb` |
| `->C` | ModulaciÃ³n a C | `'->C` |
| `=>D` | Cambio a D | `'=>D` |

**Ejemplos en contexto:**
```markchord
              '    '    '#
## Puente     | F  | G  | A   | %  |

              '->D
## Estribillo | D  | %  | %   | %  |
```

### 8.9 Combinaciones Ãºtiles

Puedes combinar sÃ­mbolos para crear indicaciones mÃ¡s especÃ­ficas:

| CombinaciÃ³n | Significado | Ejemplo |
|-------------|-------------|---------|
| `'!>` | Parada y arranca | `'!>` |
| `'bd*` | Fill de bajo y baterÃ­a | `'bd*` |
| `'--dc` | Rallentando y Da Capo | `'--dc` |
| `'^^@` | Acento fuerte tutti | `'^^@` |
| `'v...` | Voz staccato | `'v...` |
| `'~~*` | Fill con swing | `'~~*` |
| `'#->` | Fermata que conduce | `'#->` |

**Ejemplo completo con combinaciones:**
```markchord
# Ejemplo avanzado
@key C
@layout section

              '!   '>>  'bd  '
## Intro      | Am | F  | C  | G  |

              '~~  '    '*>  'Go!
              | Am | F  | C  | G   |

              'v   '-d  '    'rell
## Verso      | F  | %  | Em | Am  |

              '@   '^^  '!   '#->
## Final      | F  | C  | G  | C   |
```

### 8.10 Convenciones de proyecto

Se recomienda crear tu propio "diccionario" de sÃ­mbolos y mantenerlo consistente en todos tus documentos MarkChord. Puedes documentarlo en un archivo `SIMBOLOS.md` en tu proyecto:

```markdown
# Mi diccionario MarkChord

- `!` â†’ Stop
- `>>` â†’ Arranca fuerte  
- `bd` â†’ Solo bajo + baterÃ­a
- `rell` â†’ Fill/relleno
- `v` â†’ Solo voz
- `#` â†’ Fermata
- etc.
```

---

## 9. Historial de versiones

### v1.4 (2025-10-18)
- âœ¨ **Nueva secciÃ³n 8**: GuÃ­a completa de caracteres ASCII recomendados para comentarios
- ðŸ“ **Ampliada secciÃ³n 4.3**: ExplicaciÃ³n detallada del cÃ¡lculo de ancho de celdas
- ðŸ“ **Ampliada secciÃ³n 4.4**: Reglas mejoradas sobre comentarios con justificaciÃ³n de posicionamiento
- ðŸ“ **Nueva subsecciÃ³n 4.4.1**: JustificaciÃ³n de por quÃ© los comentarios van encima
- ðŸ“ **Ampliada secciÃ³n 4.2**: ClarificaciÃ³n sobre espaciado vertical
- ðŸ“ **Nueva secciÃ³n 4.6**: Lista de errores comunes a evitar
- âš ï¸ **Advertencia aÃ±adida**: Problemas con emojis y caracteres no monoespaciados
- ðŸŽ¯ **Ejemplos corregidos**: Todos los ejemplos revisados para precisiÃ³n

### v1.3 (anterior)
- EspecificaciÃ³n base con sintaxis, gramÃ¡tica y ejemplos

---

## 10. Licencia y contribuciones

Este formato estÃ¡ en desarrollo activo. Se aceptan sugerencias y mejoras a travÃ©s de issues o pull requests en el repositorio del proyecto.

**Licencia**: Creative Commons BY-SA 4.0

---

*Documento generado: 2025-10-18*  
*VersiÃ³n: 1.4*  
*Estado: Draft*
