# 🚀 MarkChord - Guía de Setup Completa

## 📦 Contenido del paquete

Acabas de recibir el proyecto completo MarkChord con:
- ✅ Parser TypeScript funcional
- ✅ Plugin de Obsidian mejorado
- ✅ Documentación completa
- ✅ Ejemplos de canciones
- ✅ Estructura lista para GitHub

---

## 1️⃣ Crear el repositorio en GitHub

### Opción A: Desde la web de GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `markchord`
3. Descripción: `Plain text format for writing chord sheets with perfect readability`
4. **Público** (recomendado) o Privado
5. ❌ NO inicialices con README, .gitignore ni licencia (ya los tenemos)
6. Click en **"Create repository"**

### Opción B: Desde GitHub CLI

```bash
gh repo create markchord --public --description "Plain text format for writing chord sheets"
```

---

## 2️⃣ Subir el proyecto a GitHub

### Paso 1: Descomprimir el archivo

```bash
# En tu carpeta de proyectos
tar -xzf markchord.tar.gz
cd markchord
```

### Paso 2: Inicializar Git y subir

```bash
# Inicializar Git
git init

# Añadir archivos
git add .

# Primer commit
git commit -m "🎉 Initial commit - MarkChord v1.0.0

- Parser TypeScript completo
- Plugin Obsidian con syntax highlighting
- Documentación specs v1.4 y Quick v1.0
- Ejemplos y estructura monorepo"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/alfonsogchico/markchord.git

# Subir (puede pedirte credenciales)
git branch -M main
git push -u origin main
```

---

## 3️⃣ Instalar dependencias

```bash
# En la raíz del proyecto
npm install

# Instalar en parser
cd packages/parser
npm install

# Instalar en plugin
cd ../obsidian-plugin
npm install
```

---

## 4️⃣ Compilar el parser

```bash
cd packages/parser

# Compilar una vez
npm run build

# O modo watch (recompila al guardar)
npm run dev
```

Esto genera la carpeta `dist/` con el parser compilado.

---

## 5️⃣ Compilar el plugin de Obsidian

```bash
cd packages/obsidian-plugin

# Compilar una vez
npm run build

# O modo watch (recompila al guardar)
npm run dev
```

Esto genera `main.js` que usa Obsidian.

---

## 6️⃣ Instalar el plugin en Obsidian

### Método 1: Desarrollo local

```bash
# Desde packages/obsidian-plugin/
# Copiar a tu vault de Obsidian
cp -r . "/ruta/a/tu/vault/.obsidian/plugins/markchord-highlight/"

# Ejemplo en Mac:
cp -r . "$HOME/Documents/MyVault/.obsidian/plugins/markchord-highlight/"

# Ejemplo en Windows (desde Git Bash):
cp -r . "/c/Users/TuUsuario/Documents/MyVault/.obsidian/plugins/markchord-highlight/"
```

### Método 2: Symlink (recomendado para desarrollo)

```bash
# Crear symlink desde tu vault al proyecto
ln -s "$(pwd)" "/ruta/a/tu/vault/.obsidian/plugins/markchord-highlight"
```

### Activar en Obsidian

1. Abre Obsidian
2. Settings → Community plugins
3. Desactiva "Safe mode" si está activo
4. Busca "MarkChord Syntax Highlighting"
5. Actívalo

---

## 7️⃣ Probar que funciona

### Crear nota de prueba en Obsidian

Crea una nota nueva y pega:

````markdown
# Prueba MarkChord

```markchord
# Wonderwall - Oasis
@key Em
@layout section

## Intro   | Em7 | G | Dsus4 | A7sus4 |
## Verse   | Em7 | G | Dsus4 | A7sus4 |
```
````

Deberías ver **colores** en el bloque!

### Probar el parser (opcional)

```bash
cd packages/parser
node -e "
const { parseMarkChord } = require('./dist/index.js');
const result = parseMarkChord('# Test\n@key C\n## Intro | C | G |');
console.log(JSON.stringify(result, null, 2));
"
```

---

## 8️⃣ Workflow recomendado

### Para desarrollo del parser:

```bash
cd packages/parser
npm run dev  # Deja corriendo en una terminal
```

### Para desarrollo del plugin:

```bash
cd packages/obsidian-plugin
npm run dev  # Deja corriendo en otra terminal
```

Cada vez que guardes cambios, se recompila automáticamente.  
En Obsidian: `Ctrl+R` (o `Cmd+R` en Mac) para recargar el plugin.

---

## 9️⃣ Publicar releases

### Cuando quieras publicar una versión:

```bash
# Actualizar versiones
cd packages/obsidian-plugin
# Editar manifest.json - cambiar "version"

# Commit y tag
git add .
git commit -m "Release v1.2.3"
git tag v1.2.3
git push && git push --tags
```

### Crear release en GitHub:

1. Ve a https://github.com/alfonsogchico/markchord/releases/new
2. Tag: `v1.2.3`
3. Title: `MarkChord v1.2.3`
4. Description: Changelog
5. Adjunta estos archivos:
   - `packages/obsidian-plugin/main.js`
   - `packages/obsidian-plugin/manifest.json`
   - `packages/obsidian-plugin/styles.css`

---

## 🔧 Comandos útiles

```bash
# Limpiar todo
npm run clean

# Compilar todo
npm run build

# Linter
npm run lint

# Ver estructura
tree -I node_modules
```

---

## ❓ Troubleshooting

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Plugin no aparece en Obsidian
- Verifica que los archivos estén en `.obsidian/plugins/markchord-highlight/`
- Debe haber: `main.js`, `manifest.json`, `styles.css`
- Reinicia Obsidian completamente

### Cambios no se reflejan
- Recarga el plugin: `Ctrl+R` (Windows/Linux) o `Cmd+R` (Mac)
- O desactiva y reactiva el plugin en Settings

### Parser no compila
```bash
cd packages/parser
rm -rf dist node_modules
npm install
npm run build
```

---

## 📚 Próximos pasos

1. ✅ **Ahora**: Subir a GitHub y compilar
2. 🎨 **Después**: Probar el plugin en Obsidian
3. 🧪 **Luego**: Escribir tests para el parser
4. 🚀 **Futuro**: Publicar en Obsidian Community Plugins

---

## 🆘 Ayuda

- **Issues**: https://github.com/alfonsogchico/markchord/issues
- **Discussions**: https://github.com/alfonsogchico/markchord/discussions
- **Docs**: Ver `docs/` en el repo

---

**¡Listo para empezar!** 🎸

Cualquier duda, revisa `CONTRIBUTING.md` o abre un issue.
