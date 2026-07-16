# Responsive UX/UI Portfolio

Portfolio de Patricia Rivera — React 18 + Vite + Tailwind CSS v4. Diseño
original en [Figma](https://www.figma.com/design/cTKKMPP5Ym4Slvz9CVXt0J/Responsive-UX-UI-Portfolio).

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # build de producción a dist/
npm run preview    # servir el build de producción
npm run typecheck  # chequeo de tipos (tsc --noEmit)
npm run lint       # ESLint
npm run format     # Prettier
```

## Arquitectura

```
src/
  main.tsx               # entry point
  styles/                # Tailwind v4 (@theme), tokens y keyframes custom
  app/
    App.tsx              # shell: useRouter + switch de páginas + Suspense
    router.ts            # router propio: paths, history, deep-links
    content/
      site.ts            # ★ TODO el contenido editable: links, skills,
                         #   stats, timeline, URLs de contacto/CV/social
      case-studies.ts    # config por estudio (altura de frame, URL de demo)
    components/          # NavBar, Footer, iconos, primitivas, helpers
    sections/            # secciones del home: Hero, SkillsMarquee,
                         # CaseStudies, About, Timeline, Contact
    pages/
      HomePage.tsx       # compone las secciones
      CaseStudyPage.tsx  # layout compartido de los 3 case studies
      case-studies/      # rutas lazy delgadas (una por estudio)
    assets/              # imágenes webp + paths SVG de iconos
  imports/               # ⚠ código GENERADO por Figma Make — no editar a
                         #   mano (ver src/imports/README.md)
```

### Para editar contenido

Los textos de enlaces, skills, stats, la timeline de experiencia y las URLs
de contacto viven en [`src/app/content/site.ts`](src/app/content/site.ts) —
un solo archivo, sin tocar componentes. La prosa de cada sección vive en su
archivo de `src/app/sections/`.

### Código generado

Los frames desktop de los case studies (`src/imports/`) son exports de
Figma Make: se regeneran desde Figma, nunca se editan a mano, y están
excluidos de ESLint/Prettier. Cada uno carga en su propio chunk (lazy) para
no pesar en la carga inicial del home.

### Routing

Router propio de ~100 líneas en [`src/app/router.ts`](src/app/router.ts)
(el sitio tiene 4 páginas estáticas; una librería sería más superficie que
el problema). Usa paths reales (`/case-study/cove`) con fallback SPA vía
`public/_redirects`.
