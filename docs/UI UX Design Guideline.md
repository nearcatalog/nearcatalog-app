# UI/UX Design Guideline: "NEAR Cyber-Legion" Theme

## 1. Core Aesthetic & Concept
- **Style:** Cyberpunk, Web3 Native, Terminal-inspired, Hacker aesthetic.
- **Vibe:** High-contrast, sharp, mechanical, glowing, data-centric.
- **Overall Rule:** Remove ALL soft drop-shadows, large border-radiuses, and friendly SaaS aesthetics. Replace with sharp edges, 1px solid borders, monospaced data, and neon glows.

## 2. Color Palette (CSS Variables mapping)
- `--bg-base`: `#050505` (Deepest black for the main body background. Do NOT use light grays).
- `--bg-surface`: `#0D0D0D` or `rgba(0, 255, 163, 0.03)` (For cards and containers).
- `--accent-primary`: `#00FFA3` (NEAR Neon Green - Use for active states, primary buttons, links, and glows).
- `--accent-secondary`: `#8A2BE2` (Deep Purple) or `#FF8C00` (Cyber Orange) sparingly for badges/ranks.
- `--text-primary`: `#FFFFFF` (High contrast text).
- `--text-secondary`: `#888888` or `#A1A1AA` (Muted text for descriptions).
- `--border-default`: `#222222` or `#333333` (Subtle 1px lines).
- `--border-active`: `#00FFA3` (Glowing green).
- `--error/alert`: `#FF3333` (Neon red for negative numbers/alerts).

## 3. Typography
- **Headings (H1-H6):** Use a bold, geometric sans-serif (e.g., 'Space Grotesk', 'Inter', or 'Orbitron'). Keep letter-spacing slightly tight. Uppercase preferred for section headers.
- **Body Text:** Clean sans-serif (e.g., 'Inter').
- **Data, Tags, Prices, & Code (CRITICAL):** MUST use a Monospace font (e.g., 'Fira Code', 'JetBrains Mono', 'Space Mono'). All numbers (Market Cap, Token Price, 24h Vol) must be monospaced to mimic a terminal.

## 4. UI Components & Geometry

### 4.1. Borders & Shapes
- **Border Radius:** Strictly `0px` to `4px` maximum. Everything must be boxy and sharp.
- **Borders:** Use `1px solid var(--border-default)` for all cards, containers, and dividers.
- **Advanced (Optional):** Use CSS `clip-path` to create chamfered (cut-off) corners on primary call-to-action buttons or main wrapper containers.

### 4.2. Hover States & Glow Effects
- **Rule:** Elements should remain stealthy (dark/muted) until interacted with.
- **Hover Effect:** When hovering over interactive elements (Project Cards, Buttons, Links), transition the border to `--accent-primary` and add a neon glow.
- **CSS Glow Example:** `box-shadow: 0 0 10px rgba(0, 255, 163, 0.4), inset 0 0 5px rgba(0, 255, 163, 0.1);`

### 4.3. Buttons & Tags
- **Buttons:** Outlined by default. Transparent background, neon green text, and neon green 1px border. On hover: fill background with neon green and change text to black.
- **Stylistic choice:** Add square brackets to button text for a terminal feel (e.g., `[ SUBMIT PROJECT ]`).
- **Tags/Categories:** Convert current pill-shaped tags to sharp rectangles. Use monospace font for the tag text.

### 4.4. Project Cards (e.g., Rhea Finance, IronClaw)
- Remove the current solid gray background.
- Apply a `1px solid #333` border.
- On hover, the entire card border glows green, and the project title text-shadow glows lightly.

## 5. Specific Layout Instructions for NearCatalog
- **Top Bar / Navigation:** Add a 1px solid bottom border (`#222`). Keep it extremely clean. Active states should have a 1px neon green line under them.
- **Search Bar:** Square input box. Change placeholder text to monospace font. Blinking terminal cursor (`_`) on focus if possible.
- **Project Detail Page:** Token contract addresses, token metrics, and social links should be styled like command-line outputs. Social link buttons should be full-width rectangular outlines.