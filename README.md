# 🪐 Aitor Portfolio V2



![Status](https://img.shields.io/badge/Status-Operational-success?style=for-the-badge)
![Stack](https://img.shields.io/badge/Built%20With-Astro%20%7C%20React%20%7C%20Three.js-blueviolet?style=for-the-badge)

---

Esta es la segunda versión de mi portafolio personal. Rediseñado desde cero para abandonar las plantillas genéricas y ofrecer una experiencia de usuario inmersiva, performante y con carácter.

## ⚡ Tech Stack (The Engine)

El proyecto está construido sobre una arquitectura moderna orientada al rendimiento:

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Core** | [Astro](https://astro.build) | Framework principal. HTML estático por defecto = Velocidad luz. |
| **UI Logic** | [React](https://react.dev) | Para las "islas" de interactividad y componentes complejos. |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com) | Sistema de diseño utilitario para una UI consistente. |
| **3D / Visuals** | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | Renderizado del fondo estelar sin bloquear el hilo principal. |
| **Iconografía** | [Lucide React](https://lucide.dev) | Iconos vectoriales ligeros y limpios. |
| **Tipografía** | Space Grotesk + Inter | Combinación técnica y legible. |

## 🚀 Características Clave

*   **🌌 Fondo Estelar Interactivo:** Un sistema de partículas 3D optimizado que reacciona suavemente sin drenar la batería del usuario.
*   **🎛️ Diseño "Mission Control":** Estética inspirada en la NASA de los 70 y el estilo tipográfico suizo.
*   **🍱 Bento Grid Layout:** Presentación modular de habilidades y biografía.
*   **✨ Micro-interacciones:** Hovers reactivos, cursores personalizados y transiciones suaves.
*   **🎨 Color System:** Uso intencional del "International Orange" (`#FF5500`) sobre "Space Black" (`#050505`).

## 🛠️ Instalación y Despegue

Sigue estos pasos para ejecutar el centro de comando en tu máquina local:

```bash
# 1. Clonar el repositorio
git clone https://https://github.com/aitorTD/aitor-porfolio.git

# 2. Entrar en la nave
cd aitor-porfolio

# 3. Instalar dependencias
npm install

# 4. Iniciar motores (Servidor de desarrollo)
npm run dev
```

La consola de control estará disponible en `http://localhost:4321`

## 📂 Estructura del Proyecto

```text
src/
├── components/
│   ├── BentoGrid.astro   # Grid modular (Sobre mí + Skills)
│   ├── Footer.astro      # Terminal de contacto ("Ready to Launch")
│   ├── Projects.astro    # Tarjetas de proyectos
│   └── StarField.jsx     # Componente React/Three.js del fondo
├── layouts/
│   └── Layout.astro      # Base HTML, fuentes y estilos globales
└── pages/
    └── index.astro       # Página principal y orquestación
```

## 🎨 Personalización

Si haces un fork de este proyecto, aquí tienes dónde tocar:

*   **Datos Personales:** Edita `src/components/BentoGrid.astro`.
*   **Proyectos:** Edita el array `projects` en `src/components/Projects.astro`.
*   **Email:** Actualiza la variable `email` en `src/components/Footer.astro`.

### Colores

El naranja principal (`#FF5500`) está aplicado manualmente en varios componentes para asegurar el contraste. Busca y reemplaza si quieres cambiar tu "color de misión".

## 🚢 Despliegue

Este proyecto está optimizado para **Vercel** o **Netlify**.

1.  Conecta tu repositorio de GitHub.
2.  El framework se detectará automáticamente como **Astro**.
3.  Pulsa **Deploy**.

---

<div align="center">
  <p>Diseñado y desarrollado por Aitor. All Systems Operational.</p>
</div>
