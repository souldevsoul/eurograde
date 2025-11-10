# EUROGRADE - Brand Identity & Implementation Guide

## Brand Overview
**Market:** Europe (EU)
**Tone:** Precision documentation authority
**Positioning:** Technical certification service for European car auctions

## Brand Identity

### Color Palette
- **Primary:** Deep Blue `#0E1B3D`
- **Secondary:** Steel/Graphite `#2B2F36`
- **Accent:** Technical Grey `#4A5568`
- **Background:** Cool White `#F8FAFC`

### Typography
- **Primary:** Inter (all weights)
- **Secondary:** Space Grotesk (headings only)
- **NO other fonts allowed** - maintains technical precision

### Visual Style
- Blueprint studio aesthetic
- Precision engineering lens
- Technical / neutral home variation
- Tighter spacing
- Heavier table UI
- Geometric sans serif
- Squared cards
- TÜV-like badges

## Image Generation Prompts

### Hero Image Prompt
```
"Executive business sedan photographed in precision engineering studio, controlled softbox + rimlight technical lighting, deep blue palette EU tone, medium format Phase One IQ4 energy, Cooke S4i microcontrast, no branding, no plates, no text, neutral technical editorial, subtle European skyline blur depth, cinematic 16:9."
```

### Report Card Image Prompt
```
"Isometric blueprint-style render of a sedan with soft line art overlays marking panels (hood, fenders, doors, bumpers), cool monochrome deep-blue look, annotated hotspots as abstract dots (no text), clean white background, suitable for UI card 1200×800."
```

### Landing Page Banner Prompt
```
"Minimalist sedan silhouette wireframe in deep blue (#0E1B3D), abstract background, high contrast but low visual noise, sized for 1920×400."
```

### Global Negative Prompt
```
"no logos, no license plates, no people, no cartoon style, no toy plastic look, no unrealistic CG lighting, no text overlays, no watermark, no stretched proportions, no extreme fisheye"
```

## Design Modifications from Boxcar Base

### Layout Changes
1. Use the most **technical/neutral** home page variation
2. Tighten spacing throughout (reduce padding by 15-20%)
3. Implement **heavier table UI** with borders and grid lines
4. Add subtle geometric patterns as background overlays
5. Convert rounded corners to **squared corners** (border-radius: 0 or max 4px)

### Component Adjustments
- **Cards:** Square corners, subtle borders, no shadows (use 1px borders instead)
- **Buttons:** Rectangular with sharp corners, deep blue primary
- **Forms:** Grid-based layouts with technical precision
- **Tables:** Heavy borders, alternating row colors, technical data presentation
- **Icons:** Line-based, technical/engineering style
- **Badges:** TÜV-certification style (shield shapes, geometric)

### Color Application
```css
:root {
  --primary: #0E1B3D;
  --secondary: #2B2F36;
  --accent: #4A5568;
  --background: #F8FAFC;
  --text-primary: #1A202C;
  --text-secondary: #4A5568;
  --border: #CBD5E0;
}
```

## Content Tone & Copy

### Messaging
- "Precision Vehicle Assessment for European Markets"
- "Technical Documentation Authority"
- "Certified Pre-Auction Analysis"
- "Engineering-Grade Reports"

### Voice Guidelines
- Formal and professional
- Technical terminology welcome
- Neutral, authoritative tone
- Focus on precision, accuracy, certification
- Avoid emotional/marketing language
- Use data-driven statements

## Core Functionality

### Request Flow
1. User pastes European auction link (AutoScout24, Mobile.de, etc.)
2. System scrapes listing via Firecrawl
3. OpenAI structured extraction of vehicle data
4. Perplexity comps search (European market focus)
5. Generate fair value + safe bid estimate
6. User pays service fee (€49 remote / €169 on-site)
7. Optional 20% deposit for delegated bidding
8. PDF report generation with technical specs

### Supported Platforms
- AutoScout24
- Mobile.de
- European auction houses
- Other EU-based listings

### Pricing (EUR)
- **Remote Assessment:** €49 (48h SLA) / €89 (24h) / €129 (same-day)
- **On-Site Pre-Purchase:** €169 (48h) / €209 (24h)
- **Sourcing Service:** €59 + 20% deposit
- **Deposit:** 20% of max bid (refundable per outcome)

## Technical Implementation Priorities

### Phase 1 - Brand Identity
- [ ] Update color variables in CSS/Tailwind config
- [ ] Implement Inter + Space Grotesk font stack
- [ ] Convert all border-radius to 0-4px max
- [ ] Add geometric background patterns
- [ ] Create TÜV-style badge components
- [ ] Generate hero images using prompts above

### Phase 2 - Layout Refinement
- [ ] Tighten spacing (reduce padding/margins)
- [ ] Implement heavy table UI with borders
- [ ] Update card components (square, bordered)
- [ ] Refine button styles (rectangular, sharp)
- [ ] Add technical grid overlays

### Phase 3 - Content & Copy
- [ ] Update all copy to technical/neutral tone
- [ ] Translate to English (primary) + German
- [ ] Create technical glossary
- [ ] Write precision-focused CTAs
- [ ] Add certification language

### Phase 4 - Core Features
- [ ] EU auction platform integrations
- [ ] EUR currency handling
- [ ] European market comps (Perplexity)
- [ ] Technical report templates
- [ ] EU-specific legal disclaimers

### Phase 5 - Advanced Features
- [ ] German language support (i18n)
- [ ] VIN validation (European format)
- [ ] EU emissions standards data
- [ ] TÜV/inspection history integration
- [ ] European shipping cost calculator

## File Structure Priority

```
eurograde/
├── app/
│   ├── layout.js          # Update with EUROGRADE branding
│   ├── page.js            # Hero section with technical styling
│   ├── globals.css        # Color variables, typography
│   └── ...
├── components/
│   ├── common/
│   │   ├── Header.js      # Logo, navigation
│   │   └── Footer.js      # Technical footer
│   ├── home/
│   │   ├── Hero.js        # Precision engineering hero
│   │   └── Features.js    # Technical features grid
│   └── ...
├── public/
│   ├── images/
│   │   ├── hero-eurograde.jpg    # Generated from prompt
│   │   ├── logo-eurograde.svg
│   │   └── ...
└── ...
```

## Next Steps
1. Run `npm install` or `yarn install`
2. Update color scheme in `globals.css` and Tailwind config
3. Generate brand images using provided prompts
4. Implement typography (Inter + Space Grotesk)
5. Modify components to squared/technical style
6. Update copy to technical tone
7. Test layout with tighter spacing
8. Set up EU auction platform scrapers

## Resources
- Boxcar Template: Original Next.js base
- Font: Inter (Google Fonts), Space Grotesk (Google Fonts)
- Image Generation: Use prompts above with Midjourney/DALL-E/Stable Diffusion
- Icons: Lucide React (line-based, technical style)
