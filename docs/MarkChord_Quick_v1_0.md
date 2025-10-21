# ðŸ“˜ MarkChord Quick - EspecificaciÃ³n v1.0

## 1. Objetivo

**MarkChord Quick** (tambiÃ©n llamado **QuickChord**) es un modo de escritura ultrarrÃ¡pida para capturar progresiones de acordes en tiempo real mientras escuchas mÃºsica. Es la versiÃ³n "taquigrÃ¡fica" de MarkChord, diseÃ±ada para:

- **Captura instantÃ¡nea** de acordes sin interrumpir la escucha
- **MÃ­nimo tecleo** (sin barras `|`, sin alineaciÃ³n, sin mayÃºsculas obligatorias)
- **MÃ¡xima velocidad** con sintaxis minimalista
- **ConversiÃ³n posterior** a MarkChord completo (opcional)

Piensa en Quick como **tomar apuntes en clase**: rÃ¡pido, abreviado, funcional. Luego puedes "pasarlo a limpio" en MarkChord estÃ¡ndar si necesitas mÃ¡s detalle visual.

---

## 2. ActivaciÃ³n del modo Quick

### Forma explÃ­cita
```markchord
@quick          # metadato largo
@q              # atajo
```

### DetecciÃ³n automÃ¡tica
El modo Quick se activa **automÃ¡ticamente** si el parser detecta:
- Etiquetas de secciÃ³n con `_` (ej: `_i`, `_v1`, `_c`)
- Acordes en minÃºsculas sin barras `|`

**Ejemplo auto-detectado:**
```markchord
# My Song
@k C

_i c am f g
_v1 c am f g x2
```
â†’ El parser sabe que es Quick sin necesidad de `@q`

---

## 3. Sintaxis bÃ¡sica

### 3.1 Estructura de acordes

```markchord
# Compases separados por espacios
c g am f        â†’ 4 compases de 1 acorde cada uno

# Dos acordes en un compÃ¡s: guion
c-g am-f        â†’ 2 compases, cada uno con 2 acordes (mitad y mitad)

# Acorde en tiempo especÃ­fico: puntos
c..g            â†’ C en tiempo 1, G en tiempo 4 (en 4/4)
c...g           â†’ C en tiempo 1, G en Ãºltimo tiempo

# Tres o mÃ¡s acordes por compÃ¡s
c-g-am          â†’ 3 acordes en un compÃ¡s (divididos equitativamente)
```

### 3.2 Etiquetas de secciÃ³n

```markchord
_i              â†’ Intro
_v1             â†’ Verse 1 / Estrofa 1
_v2             â†’ Verse 2 / Estrofa 2
_c              â†’ Chorus / Estribillo
_pc             â†’ Pre-chorus / Pre-estribillo
_b              â†’ Bridge / Puente
_s              â†’ Solo
_m              â†’ Middle 8 / Medio
_o              â†’ Outro
_k              â†’ Coda
```

**Etiquetas personalizadas permitidas:**
```markchord
_intro          â†’ libre, descriptiva
_estribillo     â†’ en espaÃ±ol
_breakdown      â†’ tÃ©rminos musicales
_x              â†’ cÃ³digos propios
```

### 3.3 LÃ­neas mÃºltiples

Las lÃ­neas de acordes pertenecen a la **Ãºltima etiqueta declarada** hasta que aparezca una nueva:

```markchord
_v1 c g am f
    c g f f x2
_c dm am em em
   f g c c
```

Equivale a:
- **Verse 1:** 2 lÃ­neas (x2 se aplica a toda la secciÃ³n)
- **Chorus:** 2 lÃ­neas

### 3.4 Repeticiones

```markchord
# Al final de lÃ­nea: repite esa lÃ­nea
c g am f x2     â†’ esa lÃ­nea 2 veces

# En etiqueta sola: repite toda la secciÃ³n previa
_v1 c g am f x2
_c dm g c c
_v1 x2          â†’ repite verse 1 completo

# En etiqueta con acordes: repite esa lÃ­nea dentro de la secciÃ³n
_c dm g c c x3  â†’ esta lÃ­nea 3 veces
```

### 3.5 Comentarios de compÃ¡s

Los comentarios se colocan **antes** del acorde que comentan, usando `'`:

```markchord
'hit c 'break g am f
```
â†’ "hit" sobre C, "break" sobre G

**Comentarios vacÃ­os** (para mantener alineaciÃ³n visual):
```markchord
' c ' g 'fill am f
```

### 3.6 Silencios

```markchord
. . c g         â†’ 2 compases vacÃ­os, luego C y G
c . . g         â†’ C, 2 silencios, G
```

### 3.7 Indicaciones especiales

```markchord
!               â†’ Stop/Hit
^               â†’ Acento
>>              â†’ Arranque fuerte
--              â†’ Rallentando
```

**Ejemplo:**
```markchord
_c ! f >> g c c
```

---

## 4. NotaciÃ³n de acordes

### 4.1 Acordes literales (estÃ¡ndar)

Todos los acordes en **minÃºsculas** por defecto (mÃ¡s rÃ¡pido, sin Shift):

```markchord
# Triadas
c               â†’ C mayor
cm              â†’ C menor
c+              â†’ C aumentado
co              â†’ C disminuido (tambiÃ©n cdim)

# SÃ©ptimas - USAR LETRA PARA CALIDAD
cd              â†’ C7 (dominante)
cM              â†’ Cmaj7 â­
cm7             â†’ Cm7
co7             â†’ Cdim7

# Extensiones
cM9             â†’ Cmaj9
cd9             â†’ C9
cm9             â†’ Cm9
cd11            â†’ C11
cd13            â†’ C13

# Suspendidos
csus4           â†’ Csus4
csus2           â†’ Csus2
c7sus4          â†’ C7sus4

# Alteraciones
cd#5            â†’ C7#5
cdb9            â†’ C7b9
cd#9            â†’ C7#9

# Slash chords
c/e             â†’ C/E
g/b             â†’ G/B
```

**Regla mnemotÃ©cnica:**
- `d` = dominante (sÃ©ptima menor)
- `M` = Major (sÃ©ptima mayor)
- `m` = menor
- `o` = disminuido
- `+` = aumentado

### 4.2 Modo Nashville (anÃ¡lisis armÃ³nico)

Activar con `@nashville` o `@n`:

```markchord
@k C
@n
@q

# NÃºmeros romanos con letras para calidad
_v1 1 4 5d 1            â†’ I IV V7 I
_c 6m 4 1 5d            â†’ VIm IV I V7
_b 4 5d 3m 6m           â†’ IV V7 IIIm VIm
    2m 5d 1M 1M         â†’ IIm7 V7 Imaj7 Imaj7
```

**Sintaxis Nashville:**
```markchord
# Triadas
1               â†’ I mayor
1m              â†’ I menor
1+              â†’ I aumentado
1o              â†’ I disminuido

# SÃ©ptimas - USAR LETRA PARA CALIDAD
1d              â†’ I7 (dominante) â­
1M              â†’ Imaj7 â­
1m7             â†’ Im7
1o7             â†’ Idim7

# Extensiones
1M9             â†’ Imaj9
1d9             â†’ I9
1d11            â†’ I11
1d13            â†’ I13

# Suspendidos
1s4             â†’ Isus4
1s2             â†’ Isus2

# Alteraciones
b7              â†’ bVII
#4              â†’ #IV
b3m             â†’ bIIIm
```

**Ejemplos:**

Blues en I:
```markchord
@k C
@n
@q

_blues 1d 1d 1d 1d
       4d 4d 1d 1d
       5d 4d 1d 5d
```

Jazz II-V-I:
```markchord
@k C
@n
@q

_turnaround 2m7 5d 1M 1M
```

Pop moderno (Iâ€“Vâ€“VImâ€“IV):
```markchord
@k G
@n
@q

_v 1 5 6m 4 x2
_c 1 5 6m 4 x2
```

**Regla de ambigÃ¼edad:**
- `57` = V seguido de VII (dos acordes, dos compases)
- `5d` = V7 (un acorde con sÃ©ptima dominante)
- `5M` = Vmaj7 (un acorde con sÃ©ptima mayor)

---

## 5. Metadatos

### 5.1 Metadatos estÃ¡ndar

```markchord
# Formato largo (explÃ­cito)
@key C                  # tonalidad original
@time 4/4               # mÃ©trica
@transp G               # tono transpuesto
@tempo 120              # BPM
@layout section         # layout (raro en Quick)
@quick                  # activa modo Quick
@nashville              # activa modo Nashville

# Atajos (rÃ¡pido)
@k C                    # tonalidad
@tm 4/4                 # mÃ©trica
@tr G                   # transposiciÃ³n
@bpm 120                # tempo
@l section              # layout
@q                      # quick
@n                      # nashville
```

### 5.2 Metadatos personalizados

```markchord
@interpretes The Beatles
@album Revolver
@year 1966
@capo 2
@tuning DADGAD
```

---

## 6. Ejemplos completos

### 6.1 Ejemplo bÃ¡sico: Wonderwall - Oasis

```markchord
# Wonderwall - Oasis
@k Em
@q

_i em7 g dsus4 a7sus4 x2
_v1 em7 g dsus4 a7sus4 x2
_c c d em em
   c d em em
   c d em em
   c d g g
_v2
_c
_o 'fade em7 g dsus4 a7sus4 x4
```

### 6.2 Ejemplo con comentarios: All Of Me - John Legend

```markchord
# All Of Me - John Legend
@k Ab
@tr G
@q
@bpm 120

_i 'piano em7 c g d x2
_v1 em7 c g d
    em7 c g d
_c 'build c d em7 em7
   c d 'hit g g
_v2
_c
_b 'breakdown 'sparse em7 em7 c c
   'build g g d d
_c x2
_o 'fade em7 c g d x4
```

### 6.3 Ejemplo Nashville: 12-bar Blues

```markchord
# Blues in C
@k C
@n
@q

_blues 1d 1d 1d 1d
       4d 4d 1d 1d
       5d 4d 1d 5d
```

### 6.4 Ejemplo complejo: Hotel California

```markchord
# Hotel California - Eagles
@k Bm
@tr Am
@tm 4/4
@q

_i am e7 g d f c dm e7 x2
_v1 am e7 g d f c dm e7 x2
_c g d f#7 bm g d em f#7
_v2
_c
_v1 'como_intro x2
_s 'outro am e7 g d f c dm e7 x5
```

### 6.5 Ejemplo con timing: Come Together - Beatles

```markchord
# Come Together - The Beatles
@k Dm
@q

_i dm dm dm dm
_v1 dm dm dm dm x4
_c 'walk a-g f-e dm dm
   a-g f-e d d
_v2
_s dm..g dm..g x8
_c
_o 'ritard dm..a dm dm
```

### 6.6 Ejemplo jazz: Giant Steps - Coltrane

```markchord
# Giant Steps - John Coltrane
@k Bb
@tm 4/4
@q
@bpm 286

_a bM7 d7 gM7 bb7 ebM7 am7 d7
   gM7 bb7 ebM7 f#7 bM7 fm7 bb7
   ebM7 am7 d7 gM7 c#m7 f#7
   bM7 fm7 bb7 ebM7 c#m7 f#7
```

### 6.7 Ejemplo con mÃºltiples acordes por compÃ¡s

```markchord
# Blackbird - The Beatles
@k G
@q

_i g a7 g/b g x2
_v1 g a7 g/b g c-c#o d-d#o em-eb
    d-c#o c-cm g/b-a7 c-g a7-g/b g
_v2 g a7 g/b g c-c#o d-d#o em-eb
    d-c#o c-cm g/b-a7 c-g a7-d7sus4 g
_b f-em dm-c bb-c f-em dm-c bb-a7
   d7-d7sus4 g
_v1
_o g a7 g/b g x4 'fade
```

---

## 7. GramÃ¡tica formal (EBNF)

```ebnf
QuickDoc       := Header Body
Header         := Title? Metadata*
Body           := Section+

Title          := "#" Text Newline
Metadata       := "@" MetaKey Value? Newline
MetaKey        := "key" | "k" | "time" | "tm" | "transp" | "tr" 
                | "tempo" | "bpm" | "quick" | "q" 
                | "nashville" | "n" | "layout" | "l" | Identifier

Section        := SectionDef | SectionRef
SectionDef     := SectionLabel ChordLine+
SectionRef     := SectionLabel Repeat? Newline
SectionLabel   := "_" Code Newline

ChordLine      := (Comment | Measure)+ Repeat? Newline
Measure        := Chord ("-" Chord)* ("." Chord)?
                | "."
                | Special

Chord          := Root Alteration? Quality?
Root           := [a-g] | [1-7]
Alteration     := "#" | "b" | "##" | "bb"
Quality        := "m" | "d" | "M" | "o" | "+" 
                | "m7" | "o7" | "M9" | "d9" | "d11" | "d13"
                | "sus4" | "sus2" | "7sus4"
                | "d#5" | "db9" | "d#9" | ...

Comment        := "'" Text?
Special        := "!" | "^" | ">>" | "--" | ...
Repeat         := "x" Number
Code           := [a-z0-9]+
Text           := [^\n]+
Number         := [0-9]+
Newline        := "\n"
```

---

## 8. Reglas y convenciones

### 8.1 Casos de uso

âœ… **Usar Quick para:**
- Capturar acordes mientras escuchas mÃºsica
- Bocetos rÃ¡pidos de ideas
- Compartir progresiones sin formato
- AnÃ¡lisis armÃ³nico con Nashville
- Trabajo personal/borradores

âŒ **NO usar Quick para:**
- Partituras finales para mÃºsicos
- Documentos con ritmos complejos
- Lead sheets profesionales
- Cuando necesitas alineaciÃ³n visual precisa

â†’ Para estos casos, convierte a MarkChord estÃ¡ndar

### 8.2 ConversiÃ³n a MarkChord estÃ¡ndar

Un script puede expandir automÃ¡ticamente Quick â†’ MarkChord:

**Quick:**
```markchord
@k C
@q

_v1 'hit c c g-am f f x2
_c dm am em em
```

**â†’ MarkChord:**
```markchord
@key C
@layout section

                  'hit
## Verse 1        | C  | C  | G  Am | F  | F  |

                  'hit
                  | C  | C  | G  Am | F  | F  |

## Chorus         | Dm | Am | Em | Em |
```

### 8.3 Espaciado y formato

- **Sin alineaciÃ³n obligatoria:** Escribe libremente
- **Un espacio entre acordes:** MÃ­nimo recomendado para legibilidad
- **LÃ­neas en blanco opcionales:** Entre secciones si ayuda a la claridad
- **Sin tabs:** Solo espacios (como MarkChord estÃ¡ndar)

### 8.4 MayÃºsculas vs minÃºsculas

**Recomendado:** MinÃºsculas para velocidad
```markchord
c g am f        âœ… mÃ¡s rÃ¡pido
C G Am F        âš ï¸  mÃ¡s lento (requiere Shift)
```

**Permitido:** MayÃºsculas si prefieres
```markchord
C G Am F        âœ… vÃ¡lido, mÃ¡s legible para algunos
```

**El parser acepta ambos**, pero minÃºsculas es el espÃ­ritu Quick.

### 8.5 Compatibilidad

Quick es **100% compatible** con MarkChord estÃ¡ndar:
- Mismo sistema de metadatos
- Mismos comentarios
- Mismo tÃ­tulo y estructura bÃ¡sica
- Solo difiere en sintaxis de acordes (sin `|`)

**Puedes mezclar** en el mismo documento:
```markchord
@k C
@q

_i c g am f

## Verso detallado
                  'hit
                  | C  | G  | Am | F  |
```

---

## 9. CÃ³digos de secciÃ³n recomendados

### 9.1 EstÃ¡ndar internacional

| CÃ³digo | EspaÃ±ol | InglÃ©s | Uso |
|--------|---------|--------|-----|
| `_i` | Intro | Intro | IntroducciÃ³n |
| `_v1`, `_v2`... | Estrofa 1, 2... | Verse 1, 2... | Estrofas |
| `_c` | Estribillo | Chorus | Estribillo/coro |
| `_pc` | Pre-estribillo | Pre-chorus | Antes del estribillo |
| `_b` | Puente | Bridge | SecciÃ³n contrastante |
| `_s` | Solo | Solo | Solo instrumental |
| `_m` | Medio | Middle 8 | SecciÃ³n intermedia |
| `_o` | Outro | Outro | Final |
| `_k` | Coda | Coda | Coda final |

### 9.2 CÃ³digos adicionales comunes

| CÃ³digo | Significado |
|--------|-------------|
| `_t` | TransiciÃ³n |
| `_r` | RefrÃ¡n |
| `_d` | Desarrollo |
| `_bd` | Breakdown |
| `_bu` | Build-up |
| `_h` | Hook |
| `_rl` | Relleno/Fill |
| `_drop` | Drop |

### 9.3 Etiquetas personalizadas

**Totalmente vÃ¡lido crear las tuyas:**
```markchord
_intro
_estribillo
_puente_loco
_solo_piano
_final_epico
_x
_parte_a
```

**RecomendaciÃ³n:** Usa cÃ³digos cortos estÃ¡ndar para compartir, etiquetas largas para uso personal.

---

## 10. ComparaciÃ³n Quick vs EstÃ¡ndar

| Aspecto | MarkChord Quick | MarkChord EstÃ¡ndar |
|---------|-----------------|-------------------|
| **PropÃ³sito** | Captura rÃ¡pida | Documento final |
| **Velocidad** | âš¡âš¡âš¡ MÃ¡xima | âš¡ Media |
| **AlineaciÃ³n** | No requerida | Obligatoria |
| **Barras `\|`** | No | SÃ­ |
| **MayÃºsculas** | Opcionales | Recomendadas |
| **Legibilidad** | Buena | Excelente |
| **Uso tÃ­pico** | Borradores, apuntes | Partituras, compartir |
| **ConversiÃ³n** | â†’ EstÃ¡ndar | â† Quick |

---

## 11. Herramientas y ecosistema

### 11.1 Flujo de trabajo recomendado

```
1. CAPTURA (Quick)
   â†“
   Escribes: _i c g am f
   
2. OPCIONAL: REFINADO (EstÃ¡ndar)
   â†“
   Conviertes a formato con barras y alineaciÃ³n
   
3. COMPARTIR
   â†“
   Quick para mÃºsicos familiarizados
   EstÃ¡ndar para documentaciÃ³n formal
```

### 11.2 Herramientas futuras

- **markchord-cli:** Conversor Quick â†” EstÃ¡ndar
- **markchord-parser:** Validador y linter
- **markchord-transpose:** Transpositor automÃ¡tico
- **Obsidian plugin:** Syntax highlighting y preview

---

## 12. Ejemplos del mundo real

### 12.1 SesiÃ³n de captura real

```markchord
# Escuchando Spotify - 2025-10-21

## Sweet Child O' Mine - Guns N' Roses
@k D
@q
_i d c g d x4
_v1 d c g d x4
_c a c d d a c g g x2
_v2
_c
_s d c g d x8
_o 'ritard d c g d

## Smells Like Teen Spirit - Nirvana
@k F
@q
_i f bb ab db x4 'quiet
_v1 f bb ab db x4
_c f bb ab db x4 'loud
_v2
_c
_b ab db f f x2
_c x2
_o f

## Wonderwall - Oasis
@k Em
@q
_i em7 g dsus4 a7sus4 x2
_v1 em7 g dsus4 a7sus4 x2
_c c d em em c d em em c d em em c d g g
_v2
_c
```

### 12.2 AnÃ¡lisis armÃ³nico de standards de jazz

```markchord
# Blue Bossa - Kenny Dorham
@k Cm
@n
@q

_a 1m 1m 4m 4m
   b3d b3d 1m 1m
   b2M b2M b5d b5d
   1m 4m 1m 5d

# Autumn Leaves - Joseph Kosma
@k Gm
@n
@q

_a 2m 5d 1M 4M
   7o 3d 6m 6m
   2m 5d 1M 4M
   7o 3d 6m 6m
   7o 3d 6m 6m
   2m 5d 1M 4M
   7o 3d 6m 6m 2m
   5d 6m 6m 6m
```

---

## 13. Preguntas frecuentes (FAQ)

**Q: Â¿Puedo usar mayÃºsculas en Quick?**  
A: SÃ­, pero minÃºsculas es mÃ¡s rÃ¡pido. El parser acepta ambas.

**Q: Â¿CÃ³mo escribo un acorde de 7 en modo Nashville sin confusiÃ³n?**  
A: Usa letra: `5d` = V7, nunca `57` (que son dos acordes: V y VII).

**Q: Â¿Puedo mezclar Quick y MarkChord estÃ¡ndar?**  
A: SÃ­, son compatibles. Puedes tener secciones Quick y secciones estÃ¡ndar en el mismo documento.

**Q: Â¿QuÃ© pasa si no pongo `@q`?**  
A: Si usas etiquetas `_`, el parser lo detecta automÃ¡ticamente.

**Q: Â¿CÃ³mo indico un compÃ¡s vacÃ­o?**  
A: Con un punto: `. . c g` (2 compases vacÃ­os, luego C y G).

**Q: Â¿Puedo usar emojis en comentarios?**  
A: SÃ­, pero cuidado con la alineaciÃ³n. ASCII es mÃ¡s portable.

**Q: Â¿Quick reemplaza a MarkChord estÃ¡ndar?**  
A: No, son complementarios. Quick = borrador, EstÃ¡ndar = documento final.

---

## 14. Historial de versiones

### v1.0 (2025-10-21)
- ðŸŽ‰ Primera versiÃ³n oficial de MarkChord Quick
- âœ¨ Sintaxis ultrarrÃ¡pida sin barras `|`
- âœ¨ Modo Nashville con letras para calidad (`1d`, `1M`)
- âœ¨ Metadatos `@quick` / `@q`
- âœ¨ DetecciÃ³n automÃ¡tica de modo Quick
- âœ¨ CÃ³digos de secciÃ³n estÃ¡ndar (`_i`, `_v1`, `_c`, etc.)
- âœ¨ Sistema de repeticiones (`x2`, referencias)
- âœ¨ Comentarios de compÃ¡s integrados
- ðŸ“š GramÃ¡tica EBNF completa
- ðŸ“š Ejemplos del mundo real
- ðŸ“š Cheat sheet de referencia

---

## 15. Licencia y contribuciones

Este formato estÃ¡ en desarrollo activo. Se aceptan sugerencias y mejoras a travÃ©s de issues o pull requests en el repositorio del proyecto.

**Licencia:** Creative Commons BY-SA 4.0

---

## 16. Recursos adicionales

- **MarkChord EstÃ¡ndar:** EspecificaciÃ³n v1.4
- **Repositorio:** [github.com/user/markchord]
- **Comunidad:** [discord/telegram]
- **DocumentaciÃ³n:** [markchord.dev]

---

*Documento generado: 2025-10-21*  
*VersiÃ³n: 1.0*  
*Estado: Estable*  
*Autor: Comunidad MarkChord*
