# Proyecto FINDE – Plataforma de Descubrimiento Local (Lit + JS)

Este proyecto es una aplicación web desarrollada con **Lit (Web Components)** y **JavaScript Vanilla**, enfocada en el descubrimiento de lugares, experiencias y negocios locales.

FINDE permite a los usuarios explorar nuevas opciones de **recreación, entretenimiento, gastronomía, cultura y bienestar**, facilitando la conexión entre personas y negocios locales mediante una experiencia intuitiva, visual y personalizada.

La aplicación está diseñada bajo una arquitectura modular basada en **componentes reutilizables**, lo que permite escalar funcionalidades como filtros dinámicos, categorías, mapas interactivos y contenido multimedia.

Se prioriza una experiencia fluida mediante el uso de:
- Renderizado eficiente con Lit
- Consumo de APIs (lugares, usuarios, recomendaciones)
- Gestión de estado ligera en frontend
- Integración con mapas y geolocalización

Además, FINDE busca ser una plataforma donde los negocios puedan **promocionarse**, mostrando:
- Información relevante (costos, horarios, ubicación)
- Propuesta de valor
- Contenido visual (imágenes, videos)

El objetivo es construir un ecosistema digital que impulse el descubrimiento local y aumente la visibilidad de negocios.

Para el desarrollo se opta por una estructura clara y escalable, permitiendo crecimiento hacia funcionalidades como recomendaciones inteligentes, favoritos, reseñas y analítica.

```sh
components/ → Componentes pequeños y reutilizables (UI).
views/ → Secciones grandes de la interfaz.
pages/ → Pantallas completas asociadas a rutas.
router/ → Lógica de navegación y renderizado de páginas.
services/ → lógica y datos.
```
---

## Instalación y ejecución
```sh
cd nombre-del-proyecto
npm install
npm run dev
```

### Clonar el repositorio
- Abre tu terminal y ejecuta:

```sh
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
```

- Clonar rama develop:
```sh
git checkout -b develop origin/develop
```

- Instalar dependencias:
```sh
npm install
```

- Ejecutar el proyecto en modo desarrollo:
```sh
npm run dev
```

---

## Tecnologías utilizadas
![Lit](https://img.shields.io/badge/Lit-Element-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Vite](https://img.shields.io/badge/Vite-Bundler-purple)
![ChanceJs](https://chancejs.com/index.html)

- **Lit (LitElement)** → Componentes web reactivos
- **JavaScript (Vanilla)** → Lógica principal de la aplicación
- **HTML5** → Estructura
- **CSS3** → Estilos y layout
- **Vite** → Entorno de desarrollo y bundling
- **ChanceJs** → Random names