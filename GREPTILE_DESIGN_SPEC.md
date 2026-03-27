# Greptile Design Spec — Pixel-Perfect Analysis

## Colors (extracted from source)

```css
/* Background */
--background: #F5F4F0  /* warm cream */
--card-bg: rgba(245,244,240,0.8)

/* Green palette */
--greptile-green: #2D7A4F  /* primary accent - for xBPP use #3ECFA5 */
--greptile-dark-green: #1F5C3B  /* buttons */

/* Text */
--text-primary: #1A1A1A
--text-secondary: #6B6B6B
--text-tertiary: #9B9B9B

/* Borders */
--border: #E5E5E5
--border-dashed: dashed 1px #E5E5E5
```

## Typography

```css
/* Fonts */
font-family: Inter, sans-serif;  /* body */
font-family: GeistMono, monospace;  /* labels, code */
font-family: 'TASA Orbiter', sans-serif;  /* display headings */

/* Section labels */
.section-label {
  font-family: GeistMono;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--greptile-green);
}

/* Format: [ LABEL ] */
span.font-mono { "[ " + text + " ]" }

/* Headings */
h1: ~48px, font-weight: medium
h2: ~32px, font-weight: medium  
```

## Layout

```css
/* Container */
max-width: 1500px
padding: 0 32px (sm:16px md:32px lg:96px xl:128px)

/* Borders */
border-x border-border  /* left + right borders on main content */

/* Section spacing */
section-wrapper: py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
```

## Components

### 1. Section Header
```jsx
<div className="text-base uppercase tracking-widest font-light mb-2 text-greptile-green">
  <span className="font-mono">[ SECTION_NAME ]</span>
</div>
<h2 className="text-primary">Main Heading</h2>
<p className="text-tertiary font-mono mt-2">Subtitle text</p>
```

### 2. Card with Corner Squares
```jsx
<figure className="relative border border-border p-3 bg-card-bg/80">
  {/* Corner squares */}
  <div className="absolute top-0 left-0 w-2 h-2 bg-border" />
  <div className="absolute top-0 right-0 w-2 h-2 bg-border" />
  <div className="absolute bottom-0 left-0 w-2 h-2 bg-border" />
  <div className="absolute bottom-0 right-0 w-2 h-2 bg-border" />
  {/* Content */}
</figure>
```

### 3. Button with Line Animation
```jsx
<button className="bg-greptile-dark-green text-white px-4 py-2 rounded-md font-mono relative overflow-hidden group">
  {/* Horizontal lines that animate on hover */}
  <div className="absolute inset-0 pointer-events-none">
    {[8,16,24,32,40,48,56,64].map(top => (
      <div 
        className="absolute left-0 h-[1px] w-0 bg-white/15 group-hover:w-full transition-all duration-500"
        style={{ top, transitionDelay: `${top * 3.75}ms` }}
      />
    ))}
  </div>
  <span className="relative z-10">Button Text</span>
</button>
```

### 4. Horizontal Rule
```jsx
<hr className="border-border w-full" />
```

### 5. Dashed Border Box
```jsx
<div className="border-t border-b border-dashed border-border px-4 py-8">
  {/* Optional inner dashed borders */}
  <div className="absolute top-0 -left-8 -right-8 border-t border-dashed border-border" />
</div>
```

## Hero Section Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [ NAVBAR ]                                     Log in  Try │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  The AI Code              ┌─────────────────────┐          │
│  Reviewer                 │                     │          │
│                           │   🦅 CROW ANIMATION │          │
│  AI AGENTS THAT CATCH...  │                     │          │
│                           └─────────────────────┘          │
│  [Try For Free]  [See Docs]                                │
│                                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐                                   │
│  │ ★★★★│ │Gartner│ │ ...│  (social proof badges)           │
│  └─────┘ └─────┘ └─────┘                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                         ───                                 │
├─────────────────────────────────────────────────────────────┤
│  [ SECTION LABEL ]                                          │
│                                                             │
│  Main Heading Here.                                         │
│  Subtitle text in mono font...                              │
│                                                             │
│  ┌────────────────┐  ┌────────────────┐                    │
│  │ Feature Card 1 │  │ Feature Card 2 │                    │
│  └────────────────┘  └────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## xBPP Color Mapping

| Greptile          | xBPP              |
|-------------------|-------------------|
| greptile-green    | #3ECFA5 (teal)    |
| greptile-dark-green | #2D8A7A         |
| background        | #EDEDEA           |
| text-primary      | #1E2D2D           |

## Key Animations

1. **Lottie Mascot** — interactive crow in hero
2. **Network Diagram** — D3/Canvas node visualization  
3. **Button hover** — progressive line fill
4. **Scroll reveal** — opacity + translateY on intersection
5. **Floating circles** — background decoration with float animation
