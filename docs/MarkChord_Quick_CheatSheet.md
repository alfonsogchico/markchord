# ðŸ“‹ MarkChord Quick - Cheat Sheet

GuÃ­a de referencia rÃ¡pida para escritura ultrarrÃ¡pida de acordes.

---

## ðŸŽ¯ Concepto bÃ¡sico

**MarkChord Quick** = Captura rÃ¡pida de acordes sin barras `|` ni alineaciÃ³n obligatoria.

```markchord
# Mi canciÃ³n
@k C
@q

_v1 c g am f x2
_c dm g c c
```

---

## âš¡ Sintaxis ultra-rÃ¡pida

### SeparaciÃ³n de compases
```markchord
c g am f        # 4 compases separados
```

### Dos acordes en un compÃ¡s
```markchord
c-g am-f        # 2 compases, 2 acordes cada uno
```

### Timing especÃ­fico
```markchord
c..g            # C en tiempo 1, G en tiempo 4
c...g           # C al inicio, G al final
```

### Tres o mÃ¡s acordes por compÃ¡s
```markchord
c-g-am          # 3 acordes divididos equitativamente
```

### Silencios
```markchord
. . c g         # 2 compases vacÃ­os, luego C y G
```

---

## ðŸ·ï¸ Etiquetas de secciÃ³n

| CÃ³digo | EspaÃ±ol | InglÃ©s |
|--------|---------|--------|
| `_i` | Intro | Intro |
| `_v1` `_v2` | Estrofa 1, 2 | Verse 1, 2 |
| `_c` | Estribillo | Chorus |
| `_pc` | Pre-estribillo | Pre-chorus |
| `_b` | Puente | Bridge |
| `_s` | Solo | Solo |
| `_m` | Medio | Middle 8 |
| `_o` | Outro | Outro |
| `_k` | Coda | Coda |

**Etiquetas personalizadas:** Usa cualquier cÃ³digo que quieras (`_intro`, `_breakdown`, `_x`)

---

## ðŸŽµ NotaciÃ³n de acordes

### Triadas bÃ¡sicas
```markchord
c               # C mayor
cm              # C menor
c+              # C aumentado
co              # C disminuido (tambiÃ©n cdim)
```

### SÃ©ptimas - â­ USAR LETRAS
```markchord
cd              # C7 (dominante)
cM              # Cmaj7 â­
cm7             # Cm7
co7             # Cdim7
```

### Extensiones
```markchord
cM9             # Cmaj9
cd9             # C9
cm9             # Cm9
cd11            # C11
cd13            # C13
```

### Suspendidos
```markchord
csus4           # Csus4
csus2           # Csus2
c7sus4          # C7sus4
```

### Alteraciones
```markchord
cd#5            # C7#5
cdb9            # C7b9
cd#9            # C7#9
```

### Slash chords
```markchord
c/e             # C/E
g/b             # G/B
```

---

## ðŸŽ¼ Regla mnemotÃ©cnica de calidades

| Letra | Significado | Ejemplo |
|-------|-------------|---------|
| `d` | **d**ominante (7 menor) | `cd` = C7 |
| `M` | **M**ajor (7 mayor) | `cM` = Cmaj7 |
| `m` | **m**enor | `cm` = Cm |
| `o` | disminuid**o** | `co` = Cdim |
| `+` | aumentado | `c+` = Caug |

---

## ðŸ”¢ Modo Nashville

Activa con `@nashville` o `@n` para anÃ¡lisis armÃ³nico con nÃºmeros.

### Sintaxis Nashville
```markchord
@k C
@n
@q

_v1 1 4 5d 1            # I IV V7 I
_c 6m 4 1 5d            # VIm IV I V7
```

### Calidades Nashville

| CÃ³digo | Significado | Ejemplo en C |
|--------|-------------|--------------|
| `1` | I mayor | C |
| `1m` | I menor | Cm |
| `1d` | I7 (dominante) | C7 |
| `1M` | Imaj7 | Cmaj7 |
| `1m7` | Im7 | Cm7 |
| `1o7` | Idim7 | Cdim7 |
| `1s4` | Isus4 | Csus4 |

### Alteraciones Nashville
```markchord
b7              # bVII
#4              # #IV
b3m             # bIIIm
```

### âš ï¸ Regla de ambigÃ¼edad
```markchord
57              # V seguido de VII (dos acordes)
5d              # V7 (un acorde con sÃ©ptima)
5M              # Vmaj7 (un acorde con sÃ©ptima mayor)
```

**Para sÃ©ptimas, siempre usa letra: `5d`, `1M`, etc.**

---

## ðŸ” Repeticiones

### Al final de lÃ­nea
```markchord
c g am f x2     # Repite esa lÃ­nea 2 veces
```

### Referencia a secciÃ³n
```markchord
_v1 c g am f
_c dm g c c
_v1             # Repite verse 1 completo
_v1 x2          # Repite verse 1 dos veces
```

### LÃ­neas mÃºltiples
```markchord
_v1 c g am f
    dm g c c x2  # x2 al final aplica a toda la secciÃ³n
```

---

## ðŸ’¬ Comentarios

### Comentarios de compÃ¡s
```markchord
'hit c 'break g am f
```
â†’ "hit" sobre C, "break" sobre G

### Comentarios vacÃ­os
```markchord
' c ' g 'fill am f
```

---

## ðŸŽ›ï¸ Indicaciones especiales

| SÃ­mbolo | Significado |
|---------|-------------|
| `!` | Stop/Hit |
| `^` | Acento |
| `>>` | Arranque fuerte |
| `--` | Rallentando |
| `>` | ContinÃºa |
| `[]` | Break/Silencio |
| `#` | Fermata |

**Ejemplo:**
```markchord
_c ! f >> g c c
```

---

## ðŸ“ Metadatos

### Formato completo
```markchord
@key C          # Tonalidad original
@time 4/4       # MÃ©trica
@transp G       # Tono transpuesto
@tempo 120      # BPM
@quick          # Activa modo Quick
@nashville      # Activa modo Nashville
```

### Atajos rÃ¡pidos âš¡
```markchord
@k C            # key
@tm 4/4         # time
@tr G           # transp
@bpm 120        # tempo
@q              # quick
@n              # nashville
```

### Metadatos personalizados
```markchord
@interpretes The Beatles
@album Revolver
@year 1966
@capo 2
```

---

## ðŸ“Š Ejemplo completo

```markchord
# Hotel California - Eagles
@k Bm
@tr Am
@q

_i am e7 g d f c dm e7 x2
_v1 am e7 g d f c dm e7 x2
_c g d f#7 bm g d em f#7
_v2
_c
_v1 'como_intro x2
_s 'outro am e7 g d f c dm e7 x5
```

---

## ðŸ”„ ConversiÃ³n Quick â†” EstÃ¡ndar

### Quick (captura rÃ¡pida)
```markchord
@k C
@q
_v1 'hit c c g-am f f x2
```

### EstÃ¡ndar (documento final)
```markchord
@key C
@layout section

                  'hit
## Verse 1        | C  | C  | G  Am | F  | F  |

                  'hit
                  | C  | C  | G  Am | F  | F  |
```

---

## âœ… Casos de uso

### âœ… Usar Quick para:
- âœ… Capturar acordes mientras escuchas mÃºsica
- âœ… Bocetos rÃ¡pidos de ideas
- âœ… AnÃ¡lisis armÃ³nico con Nashville
- âœ… Trabajo personal/borradores
- âœ… Compartir progresiones simples

### âŒ NO usar Quick para:
- âŒ Partituras finales para mÃºsicos
- âŒ Documentos con ritmos complejos
- âŒ Lead sheets profesionales
- âŒ Cuando necesitas alineaciÃ³n visual precisa

---

## ðŸ’¡ Tips y trucos

### Velocidad mÃ¡xima
1. **Usa minÃºsculas** â†’ No necesitas Shift
2. **Atajos de metadatos** â†’ `@k` en vez de `@key`
3. **CÃ³digos cortos** â†’ `_v1` en vez de `_verso1`
4. **Nashville para anÃ¡lisis** â†’ `1 4 5` mÃ¡s rÃ¡pido que `c f g`

### MinÃºsculas vs MayÃºsculas
```markchord
c g am f        âš¡âš¡âš¡ MÃ¡s rÃ¡pido (recomendado)
C G Am F        âš¡âš¡  MÃ¡s lento pero mÃ¡s legible
```

**Ambos son vÃ¡lidos**, pero minÃºsculas es el espÃ­ritu Quick.

### LÃ­neas mÃºltiples pertenecen a Ãºltima etiqueta
```markchord
_v1 c g am f
    dm g c c     # â† Sigue siendo parte de _v1
_c f g c c       # â† Nueva secciÃ³n (Chorus)
```

---

## ðŸŽ¸ Ejemplos rÃ¡pidos por gÃ©nero

### Pop/Rock bÃ¡sico
```markchord
@k G
@q
_v1 1 5 6m 4 x2
_c 6m 4 1 5
```

### Blues 12 compases
```markchord
@k C
@n
@q
_blues 1d 1d 1d 1d
       4d 4d 1d 1d
       5d 4d 1d 5d
```

### Jazz II-V-I
```markchord
@k C
@n
@q
_turnaround 2m7 5d 1M 1M
```

### ProgresiÃ³n pachelbel
```markchord
@k D
@q
_a d a bm f#m g d g a x2
```

---

## ðŸ”— Recursos

- **EspecificaciÃ³n completa:** MarkChord_Quick_v1.0.md
- **MarkChord estÃ¡ndar:** MarkChord_EspecificaciÃ³n_v1.4.md
- **VersiÃ³n:** 1.0 (2025-10-21)
- **Licencia:** Creative Commons BY-SA 4.0

---

## ðŸŽ¯ Resumen de 10 segundos

```markchord
# Quick = acordes ultrarrÃ¡pidos
@k C
@q

_v1 c g am f x2    # minÃºsculas, sin barras
_c dm g c c        # etiquetas con _
_v1                # referencias simples
```

**Regla de oro:** MinÃºsculas + Espacios + Sin barras = Velocidad mÃ¡xima ðŸš€

---

*MarkChord Quick v1.0 - Cheat Sheet*  
*Imprime o guarda para referencia rÃ¡pida*
