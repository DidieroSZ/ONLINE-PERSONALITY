# Proyecto Fantasy Realms – Generador de Personajes y Reinos Fantásticos (Lit + JS)

Este proyecto es una aplicación web desarrollada con **Lit (Web Components)** y **JavaScript Vanilla**, enfocada en la generación y personalización de personajes inspirados en universos de fantasía.

Fantasy Realms permite a los usuarios explorar distintos **reinos fantásticos**, cada uno con su propia identidad visual, historia, cultura, estadísticas y esencia narrativa. A partir de estas selecciones, la aplicación genera personajes únicos con atributos, equipamiento, clases y elementos RPG dinámicos.

La aplicación está diseñada bajo una arquitectura modular basada en **componentes reutilizables**, permitiendo una experiencia altamente visual e interactiva mediante vistas independientes para:
* Selección de reinos
* Información narrativa y visual
* Visualización de estadísticas

Se prioriza una experiencia inmersiva utilizando:
* Renderizado eficiente con Lit
* Consumo de APIs externas para generación de personajes y datos RPG
* Gestión reactiva de estado en frontend
* Animaciones avanzadas con GSAP

Cada reino cuenta con:
* Lore e historia propia
* Capital y territorio
* Colores temáticos
* Frases o lemas distintivos
* Identidad visual personalizada

Además, los personajes generados incluyen:
* Clases y atributos
* Equipamiento y estadísticas
* Rasgos y habilidades
* Información narrativa dinámica

El objetivo es construir una experiencia interactiva que combine:
* worldbuilding
* personalización RPG
* generación procedural
* diseño visual fantasy

Todo bajo una estructura escalable que permita incorporar futuras funcionalidades como:
* generación de usernames fantasy
* creación de facciones
* mapas interactivos
* sistemas de inventario
* progresión de personajes
* generación de historias mediante IA
* multiversos y reinos conectados
* perfiles persistentes y coleccionables


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
![Chance](https://img.shields.io/badge/Chance-JS-F62440)
![Set](https://img.shields.io/badge/Set-API-black)

- **Lit (LitElement)** → Componentes web reactivos
- **JavaScript (Vanilla)** → Lógica principal de la aplicación
- **HTML5** → Estructura
- **CSS3** → Estilos y layout
- **Vite** → Entorno de desarrollo y bundling
- **ChanceJs** → Random names
- **Set** → API para: RPG Stats
