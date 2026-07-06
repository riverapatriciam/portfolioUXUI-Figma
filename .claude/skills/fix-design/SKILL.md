---
name: fix-design
description: Use this skill whenever Patricia wants to fix a visual, layout, spacing, color, or animation mismatch between the live portfolio site and its Figma design in this repo — e.g. "esto no se ve bien en desktop", "el card no coincide con Figma", "faltan los blobs detrás del mockup", "corrige el spacing en tablet", "esto quedó mal". Trigger on both precise bug reports and vague "esto está mal" complaints about how the site looks — the skill's job is to turn a vague complaint into a precise, verified fix. Always read LEARNINGS.md in this skill's folder first and apply its conventions before asking anything already answered there.
---

# Fix Design

Patricia is going through the live portfolio and comparing it against Figma, section by section, finding mismatches. There will be many of these corrections in a row this session — the goal isn't just to fix each one, but to get faster at fixing the next one by remembering what this one taught you.

## 0. Read what you already know

Before asking Patricia anything, read `LEARNINGS.md` next to this file. It holds standing conventions discovered in previous corrections — breakpoint tokens, color/spacing tokens, which files are actually live vs. legacy Figma exports, recurring root causes. If it already answers "dónde" or "por qué" for the kind of issue being reported, don't re-ask — just state your assumption briefly and move on.

## 1. Ask what's needed — skip what you already know

If Patricia's message doesn't already answer these, ask (in Spanish, since that's how this workflow runs):

- **¿Qué diseño está mal?** — qué componente, sección o página.
- **¿Dónde está mal?** — mobile / tablet / desktop, o una sección específica.
- **¿Por qué está mal?** — qué diferencia exactamente (espaciado, color, elemento faltante, animación, tamaño...). Si tiene un screenshot del diseño esperado o el CSS/spec de Figma, pídeselo — es la fuente de verdad, mejor que adivinar.
- **¿Cómo lo corrijo?** — el resultado esperado: valores exactos si los tiene, o "que se vea como esta captura".

Ask these as free-form questions (plain text), not multiple choice — these answers are usually pasted CSS, screenshots, or open descriptions, and forcing them into fixed options loses information. Only ask what isn't already answered: if she already dropped a screenshot and said "el card de desktop no tiene el blur detrás", you already have qué/dónde/por qué — just confirm "cómo" if it isn't obvious from the screenshot.

## 2. Find the live code before touching anything

This repo keeps two kinds of things under `src/imports/`:
- **Legacy raw Figma exports** (e.g. `Home/`, single-breakpoint dumps) — pixel-perfect, kept for reference only, not rendered anywhere live.
- **The hand-rebuilt responsive component actually in use** (e.g. `Home-1/index.tsx`) — plain Tailwind breakpoints, this is what real visitors see.

Check `src/app/App.tsx` (and the relevant `src/app/*.tsx` page wrapper, e.g. `CaseStudy*.tsx`) to confirm which import is actually wired up before editing — editing a legacy export is invisible to Patricia and wastes the correction. `LEARNINGS.md` has a map of what's live as of the last correction, but re-check App.tsx if anything seems off — files get renamed or swapped over time.

## 3. Fix it, then look at it

After editing, verify visually with the preview tools rather than declaring done — this is a design task, so a clean diff or passing lint proves nothing. Use `preview_start` (config already exists at `.claude/launch.json`, port 5173), navigate/scroll to the relevant section, and `preview_resize` to the breakpoint(s) actually affected. `LEARNINGS.md` has this project's real breakpoint widths — use those rather than generic 375/768/1440 guesses, since this repo's `md`/`lg` tokens don't fire at the usual Tailwind defaults. Screenshot and compare against what Patricia described or pasted. If she gave you a before/after pair, match your result to the "after" one, not just to the abstract spec.

Check the *other* breakpoints too after a fix — a change scoped to one breakpoint shouldn't silently affect the others, and it's cheap to confirm with one more resize + screenshot. Catching a regression now is much cheaper than Patricia finding it later.

## 4. Feed what you learned back into LEARNINGS.md

This is the part that makes each correction faster than the last. After the fix is verified, update `LEARNINGS.md` — but as a *living reference*, not a changelog:

- If this correction confirms an existing entry, leave it alone.
- If it reveals a new standing convention (a token, a breakpoint mapping, a recurring root cause, a naming pattern), add it to the relevant section or fold it into an existing note.
- If it contradicts an existing entry (the old note was wrong or stale), correct it in place — don't leave both the old and new note side by side.

Do not log "fixed X on 2026-07-06" — that's a git commit message, not a learning. The test for whether something belongs in `LEARNINGS.md`: would knowing it *before* the next correction save a question or a wrong guess? If yes, it belongs; if it's just narration of what happened, leave it out.

Keep entries short and organized under the existing headers rather than growing a long flat list — merge related notes together as they accumulate, so the file stays a quick read, not an archive.
