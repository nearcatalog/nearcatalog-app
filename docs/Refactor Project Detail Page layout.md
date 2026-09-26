# UI/UX Task: Refactor Project Detail Page Layout
Blend the structural layout of "Soladex" with our "NEAR Cyber-Legion" design system.

## 1. Top Header Block (Full Width)
- **Structure:** Create a top flex container. 
  - Left side: Square Project Avatar (0px radius), Project Title (H1, bold geometric), Monospace Tags, and a short text description.
  - Right side: Flex container aligned to the bottom/center right containing Social Icons (square outline buttons) and a primary Call-to-Action button styled as `[ LAUNCH APP ]` (neon green outline, sharp edges).

## 3. Main Body (Two-Column Layout)
- **Structure:** Implement a CSS Grid layout (e.g., `grid-template-columns: 7fr 3fr; gap: 32px;`).
- **Left Column (Main Content):** Contains long-form text, "What is...", and images. Headings should be uppercase and sharp. Images must have `1px solid #333` borders.
- **Right Column (Sticky HUD):** Make this column `position: sticky; top: 20px;`. Inside, place the Token Metrics (Price, Market Cap, 24h Vol) and the Token Contract Address. Style this entire sidebar column as a high-tech control panel (black background, neon green monospace numbers, tight spacing).

## 4. Mobile Responsiveness
- Below 768px, stack everything vertically: Header -> Main Content -> Token Metrics HUD. Ensure all borders remain 1px solid and corners remain sharp `0-4px`.