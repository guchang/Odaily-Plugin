# Changelog

## 0.1.7

- Fix background image tiling instead of covering full area
- Fix background overlay not scrolling with content

## 0.1.5

- Fix dark mode default background not showing when no custom background is set
- Fix background overlay not covering full scrollable area
- Remove card gradient overlay for cleaner look
- Restore yellow tint on note patch in dark mode with background

## 0.1.4

- Fix modal not closing on Enter key press
- Fix extra blank line when appending memos

## 0.1.3

- Fix all Obsidian plugin review lint errors and warnings
- Upgrade minAppVersion to 1.8.7 for API compatibility
- Replace inline styles with CSS classes
- Replace `innerHTML` with safe SVG insertion
- Replace `localStorage` with `getLanguage()` for i18n
- Replace deprecated `activeLeaf` API
- Use `activeDocument` and `window.setTimeout` for popout compatibility
- Use `setCssProps` for dynamic styles
- Remove `builtin-modules` dependency
- Use `Setting.setHeading()` in settings page

## 0.1.1

- Add Chinese/English bilingual i18n support
- Language auto-detects from Obsidian settings

## 0.1.0 (Initial Release)

- Odaily Home View with Liquid Glass design
- Action cards: Quick Note, New Document, Todo List
- Quick Switcher integration
- Recent files panel
- Custom light/dark backgrounds (vault images, URLs, CSS)
- Odaily Sidebar with calendar week/month view
- Daily memos with `#memo` tag and timestamp support
- Today's documents list
- Task management with 1-second undo confirmation
- Completed tasks section with completion timestamps
- Tag filtering for tasks
- Configurable todo file path and append position
- Ribbon icons and commands for home and sidebar
- Automatic empty-tab replacement
