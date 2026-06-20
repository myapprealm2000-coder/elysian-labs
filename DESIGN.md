# Design Brief — Elysian Labs Ad Creator Studio

**Tone**: Premium creative platform. Refined minimalism with glassmorphism, layered depth, blurred dark backgrounds. Professional SaaS aesthetic — focused, dense, no wasted space. Three-panel studio layout inspired by Canva, Figma, and CapCut.

**Differentiation**: Glassmorphic panels with backdrop-blur (16px) + layered shadows create depth. Cobalt + Emerald accents for interactive states. Ad Creator uses fullscreen three-panel layout (280px left sidebar + flexible center canvas + 320px right properties) with top 56px toolbar. All panels float with premium spacing. Editor UI (Inter font) is information-dense and professional.

## Palette

| Token | OKLCH | Hex | Purpose |
|-------|-------|-----|----------|
| Background | 0.087 0.008 240 | #070B14 | Fullscreen matte dark canvas |
| Foreground | 0.98 0 0 | #FAFAFA | Pure white text, highest contrast |
| Card | 0.11 0.006 240 | #0F172A | Elevated UI sections, panels |
| Primary | 0.38 0.15 270 | #2563EB | Cobalt buttons, selection handles, depth cues |
| Accent | 0.65 0.17 150 | #22C55E | Emerald active states, highlights, validation |
| Secondary | 0.98 0 0 | #FAFAFA | White text, UI labels |
| Muted | 0.18 0.004 240 | #1F293A | Subtle UI elements, reduced-contrast copy |
| Popover | 0.115 0.005 240 | #111827 | Secondary panel backgrounds, dropdowns |
| Destructive | 0.52 0.22 25 | #DC2626 | Red warnings, destructive actions, delete |

## Ad Creator Three-Panel Layout

| Zone | Dimensions | Treatment | Purpose |
|------|------------|-----------|----------|
| Toolbar | 56px height, full width | glass-panel, flex row, Inter font | Project title, undo/redo, zoom, AI, export |
| Left Sidebar | 280px width, collapsible | glass-sidebar, 11 icon+label tabs | Templates, AI Generator, Campaigns, Assets, Analytics, Brand Kit, AI Copywriter, AI Video Ads, AI Images, Export, Help |
| Canvas Area | Flexible center | Floating white (0.95 L), shadow-glass-lg, grid background | Live ad preview, drag-drop ad elements, multi-device mockup |
| Right Properties | 320px width | glass-panel, tabbed (Colors, Typography, CTA, Branding, Layout) | Dynamic property controls, sliders, color picker, presets |
| Bottom (Optional) | 120px height, optional | glass-panel (video editor only) | Timeline/waveform for video mode |

## Typography

| Layer | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | Plus Jakarta Sans | 2xl–4xl | Headings, hero section, CTA buttons |
| Body | Plus Jakarta Sans | base–lg | Copy, descriptions, UI labels, sidebars |
| Editor | Inter | sm–base | Ad Creator UI, dense controls, property labels |
| Mono | GeistMono | xs–sm | Code snippets, technical metadata |

## Editor Layouts

**Thumbnail Creator (Canva-like)**: Fullscreen grid. Top: toolbar (56px, glass-panel with project title, undo/redo, zoom, export). Left: sidebar (280px, glass-sidebar, collapsible sections: Templates, Uploads, Text, Elements, Images, Brand with searchable assets). Center: floating white canvas (focal point, shadow-glass-lg, grid guides, resize handles, selection bounding box, multi-select). Right: panel (320px, glass-panel, tabs: Layers/Properties/Templates with layer thumbnails, sliders, dropdowns, toggles, color picker). Dense spacing, no empty zones.

**Video Editor (CapCut-like)**: Fullscreen split. Top: toolbar (56px, glass-panel). Left: effects library (240px, glass-sidebar, searchable). Center: video preview (16:9 focal point, white background). Bottom: timeline (120px, waveform + tracks, scrubber). Right: properties (280px, glass-panel). All panels use glassmorphism + editor fonts.

## Editor UI Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Toolbar | glass-panel (0.12 L / 65% blur), 56px height, flex row, Inter font | Project title, controls, export |
| Left Sidebar | glass-sidebar (0.12 L / 60% blur), 280px width, editor-scroll-smooth | Templates, Uploads, Text, Elements, Images, Brand |
| Canvas Area | Floating white (0.95 L) with shadow-glass-lg, centered, grid background | Drag-drop elements, resize, multi-select |
| Right Panel | glass-panel, 320px width, tabs (Layers/Properties), editor-scroll-smooth | Layer thumbnails, properties, color picker |
| Bottom Timeline | glass-panel, 120px height, waveform + tracks (video editor only) | Scrubber, playhead, track editing |



## Spacing & Rhythm

- **Grid**: 8px base unit. Scale: 8, 12, 16, 24, 32, 48, 64px.
- **Toolbar**: 56px height, 1rem padding, flex row with gap-2 (0.5rem).
- **Sidebar Tabs**: 16px padding. Icon 24px, label sm font (0.875rem), gap 8px. Hover: full-width highlight.
- **Canvas**: 24px gutter from edges. Grid guides 16px. Selection handles 6px radius cobalt.
- **Properties**: 16px padding per section. Sliders 12px height, thumb 16px cobalt. Color preview 32px circle.
- **Spacing Scale**: Never compress below 8px. Never waste space—every zone is information-dense.

## Ad Creator Component Patterns

| Component | Treatment | Behavior |
|-----------|-----------|----------|
| Tab Button | glass-panel (0.14 L / 40% blur), 8px radius | Hover: 0.16 L / 60%, cobalt glow. Active: cobalt (0.38 L) with glow shadow |
| Canvas | Floating white (0.95 L), shadow-glass-lg, 8px radius | Always focal. Hover: maintains glow. Selection: emerald outline + cobalt handles |
| Panel | glass-panel (0.12 L / 65% blur), 8px radius | Hover: 0.15 L / 80%, cobalt glow. Scroll: custom smooth thumb |
| Button (Primary) | Gradient (cobalt → emerald), shadow-glass-lg | Hover: intensify glow. Active: scale -1px. Disabled: 0.5 opacity |
| Button (Secondary) | glass-panel, 0.18 L / 50% blur | Hover: brighten + cobalt glow. Active: scale -1px |
| Input | glass-panel, 0.14 L / 40% blur | Focus: cobalt ring + shadow-glass-md. Placeholder: muted |
| Slider | Cobalt track, emerald thumb | Focus: emerald glow. Drag: smooth, snappy |
| Color Picker | glass-panel, 0.12 L / 60% blur | Gradient preview, hex input, alpha slider |

## Motion & Animation

| Animation | Timing | Usage |
|-----------|--------|-------|
| Smooth Transition | 0.25s cubic-bezier(0.4 0 0.2 1) | All interactive elements |
| Panel Float | 2s ease-in-out infinite | Subtle float on sidebar/properties |
| Hover Glow | 0.3s ease-out | Button/tab hover, emerges accent glow |
| Canvas Focus | 1.5s ease-out | Multi-click select, outline animates |
| Export Pulse | 2.5s infinite | Export button on hover/active |
| Tab Slide | 0.4s ease-out | Tab change, panel slide in |

## Editor Constraints

- **Radii**: 8px (0.5rem) everywhere. Refined, consistent, modern.
- **Shadows**: Only glass-shadow-* on panels, canvas-glow on selection. No ambient shadows on text.
- **Colors**: Pure OKLCH values. Cobalt (0.38 L / 270 H) primary. Emerald (0.65 L / 150 H) secondary. No desaturation.
- **Fonts**: Plus Jakarta Sans global, Inter editor-only. Switch seamlessly via font-family.
- **Glass**: Backdrop-blur(16px) on all panels. 60–65% opacity. Borders: 1px solid, 0.2–0.3 opacity.
- **No Decoration**: Clarity through layers. No gradients on text. No excessive glow. Depth via shadows and opacity.


## Signature Detail

Ad Creator UI uses glassmorphic panels (backdrop-blur 16px, 60–65% opacity) with layered shadows to create floating depth. Floating white canvas (shadow-glass-lg) is the visual focal point. Left sidebar and right properties panels flank the canvas with subtle panel-float animation. Top toolbar contains all project controls. On hover, panels brighten to 0.15 L and emit cobalt-accented box-shadow. Active states use emerald glow. No decoration—clarity through composition. Information-dense spacing (8–16px padding per zone). All controls use Inter font for editor clarity. This aesthetic signals "professional creative platform—serious tool, not a toy."
