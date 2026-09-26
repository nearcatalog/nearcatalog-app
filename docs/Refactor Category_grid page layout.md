# UI/UX Task: Refactor Category/Grid Page Layout
Blend the grid structure of "Soladex" with our "NEAR Cyber-Legion" design system.

## 1. Top Section (Category Header & Featured Project)
- **Remove the Tag Cloud:** Completely remove the large block of category tags (DeFi, Infrastructure, etc.) from the top of the grid. 
- **Header:** Keep the Category Title (e.g., "NEAR Intents") and the paragraph description, but constrain the max-width to `800px` and center it for better readability.
- **Featured Project (Optional but recommended):** Add a full-width or large 2-column card right below the description to highlight a top project in this category. Style it with a glowing neon green border (`1px solid #00FFA3`).

## 2. Main Project Grid (3-Column Layout)
- **Grid Structure:** Change the current 4-column grid to a 3-column grid (`grid-template-columns: repeat(3, 1fr); gap: 24px;`). This gives the text inside the cards more breathing room.

## 3. Refactor Project Card Anatomy (Inside the Grid)
- Change the internal layout of the project cards to match a horizontal-header approach:
  - **Top Row (Flexbox):** - Left side: Project Logo (Square, `0px` border-radius, `48x48px`).
    - Right side (Flex column): Project Title (bold, sharp) and the Tags right below it.
  - **Tags Styling:** Convert tags from solid pill shapes to minimalist text. Use Monospace font (`10px` or `12px`), with NO background color, just text color (`#A1A1AA`) or a very subtle `1px solid #333` outline.
  - **Bottom Row:** The short description text underneath the Top Row. Set line-clamp to 3 lines.
- **Cyberpunk Styling for Cards:** - Background: Transparent or `#050505`.
  - Border: `1px solid #222`.
  - Hover State: `border-color: #00FFA3; box-shadow: 0 0 10px rgba(0, 255, 163, 0.2); cursor: pointer;`