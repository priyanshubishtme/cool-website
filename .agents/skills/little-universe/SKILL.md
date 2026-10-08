---
name: little-universe
description: Build or maintain Priyanshu Bisht's explorable portfolio town. Use when changing its landmarks, portfolio content, routes, bus navigation, reading panels, accessibility, responsive behavior, or visual direction.
---

# Priyanshu's Little Universe

Treat the portfolio as two interfaces sharing one source of truth: an explorable illustrated foothill town and an immediately usable conventional portfolio.

## Product rules

- Keep Projects, About, Notes, Books, Contact, and Résumé reachable without avatar movement.
- Make landmarks clearly labelled. Atmosphere must never obscure navigation.
- Keep reading content in semantic HTML rather than canvas.
- Open content through real routes and ensure refresh, browser Back, Escape, and focus restoration work.
- Treat bus travel and environmental motion as optional decoration. Skip animation under `prefers-reduced-motion`.
- Preserve an ordinary mobile path with touch targets at least 44×44 px.
- Keep sound off by default.

## Visual rules

- Build one coherent warm foothill maker town using forest teal, meadow green, paper cream, walnut, amber, and a restrained red accent.
- Use original shallow-isometric or three-quarter illustrations. Do not copy Hack Club, Harry Potter, Spider-Man, or unrelated asset packs.
- Use a characterful display face only for headings and signs; use a highly readable sans-serif for body copy.
- Keep parchment texture subtle enough for WCAG AA text contrast.

## Content integrity

Use only verified profile material. Never invent books, notes, screenshots, demos, repository links, metrics, results, booking links, visitor activity, or project outcomes.

Known honest states:

- Books: show “My reading shelf is coming soon” until real titles and takeaways arrive.
- Notes: show an explicit empty state until real published writing arrives.
- Résumé: do not offer a fake download before `/resume.pdf` exists.
- Webathon 2.0: do not assign a rank until the conflict between “second runner-up” and “2nd position” is resolved.
- Project demos: distinguish decorative portfolio animation from actual product evidence.
- Chat: label it “Portfolio guide,” never live chat or Priyanshu himself. Say “Open email draft,” never “Message sent.”

Use `priyanshubisht.me@gmail.com` as the public contact email.

## Change workflow

1. Inspect `index.html`, `style.css`, and `script.js` before editing.
2. Keep content and routes centralized rather than duplicating facts across scene and panels.
3. Test the direct route, close behavior, browser Back, keyboard flow, reduced motion, desktop, and approximately 390 px mobile.
4. Confirm the page remains useful if decorative scene assets or motion fail.
5. Note missing real-world inputs instead of filling gaps with placeholders presented as facts.
