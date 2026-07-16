# Código generado por Figma Make — no editar a mano

Todo lo que vive en `src/imports/` es un export de Figma Make: árboles de JSX
enormes y planos que replican pixel a pixel los frames de Figma. Se **regeneran**
desde Figma cuando el diseño cambia; nunca se editan manualmente.

Por eso este directorio está excluido de ESLint y Prettier (ver
`eslint.config.js` y `.prettierignore`).

## Qué consume la app de cada módulo

| Módulo | Exports usados por `src/app` |
| --- | --- |
| `CaseStudyAs/` | `default` (frame desktop 1024px), `CaseStudyAsMobile` |
| `CaseStudyCove/` | `default`, `CaseStudyCoveMobile` |
| `CaseStudyLuh/` | `default`, `CaseStudyLuhMobile` |

Los frames desktop se renderizan dentro de `src/app/components/FrameWrapper.tsx`
(escala uniforme del frame de 1024px); las variantes `*Mobile` son árboles
responsive nativos.

Los assets (`.png`, `.webp`, `svg-*.ts`) están co-ubicados con el `index.tsx`
que los importa y viajan juntos al regenerar.
