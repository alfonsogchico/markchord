# Contributing to MarkChord

¡Gracias por tu interés en contribuir! 🎵

## 🚀 Cómo contribuir

### Reportar bugs

1. Busca en [Issues](https://github.com/alfonsogchico/markchord/issues) si ya existe
2. Si no, crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Versión del plugin/parser
   - Ejemplo de código MarkChord que falla

### Proponer mejoras

1. Abre un [Discussion](https://github.com/alfonsogchico/markchord/discussions)
2. Explica el caso de uso
3. Propón la sintaxis si aplica

### Enviar código

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Haz commits descriptivos
4. Asegúrate que compila: `npm run build`
5. Push: `git push origin feature/mi-feature`
6. Abre un Pull Request

## 📁 Estructura del proyecto

```
markchord/
├── packages/
│   ├── parser/           # Parser TypeScript
│   └── obsidian-plugin/  # Plugin para Obsidian
├── docs/                 # Especificaciones
├── examples/             # Canciones ejemplo
└── README.md
```

## 🛠️ Setup de desarrollo

```bash
# Clonar
git clone https://github.com/alfonsogchico/markchord.git
cd markchord

# Instalar dependencias
npm install

# Compilar parser
cd packages/parser
npm run dev

# Compilar plugin (en otra terminal)
cd packages/obsidian-plugin
npm run dev
```

## 📝 Estilo de código

- TypeScript estricto
- Nombres descriptivos
- Comentarios JSDoc en funciones públicas
- Tests para nuevas features

## 🧪 Tests

```bash
cd packages/parser
npm test
```

## 📚 Documentación

Al agregar features, actualiza:
- README.md correspondiente
- Especificación en `docs/` si cambia sintaxis
- Ejemplos en `examples/`

## ❓ Preguntas

- [Discussions](https://github.com/alfonsogchico/markchord/discussions) para dudas generales
- [Issues](https://github.com/alfonsogchico/markchord/issues) para bugs

## 📄 Licencia

Al contribuir, aceptas que tu código se licencie bajo CC-BY-SA-4.0.

---

**¡Gracias por hacer MarkChord mejor!** 🎸🎹🎤
