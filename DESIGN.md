# Tony Mu Portfolio — Design Specification

## Last Updated: 2026-04-14

---

## Overview

Personal brand website for Tony Mu — property advisor and digital builder based in Malaysia.

**Core role of the site:** Trust confirmation page. Visitors arrive from WhatsApp shares or business cards (semi-warm traffic), scan quickly to confirm "this person is legit", then contact via WhatsApp.

**Slogan:** 买房不着急，记得找托尼 / Don't rush into buying — talk to Tony first.

**Positioning:** Property advisory as main line, tech/digital as superpower (not a separate business).

---

## Target Audience

| Segment | What they want from the site | Behavior |
|---------|------------------------------|----------|
| Property buyers/investors | "Is this person legit?" + contact info | Stay 10-30s, scan quickly, WhatsApp |
| Business owners (need digital) | See portfolio + proof of capability | Stay longer, look at work samples |

**Traffic source:** WhatsApp shares, business card links (semi-warm, already know who Tony is)

**Languages:** EN / ZH / MS — all equally important, none should feel like a translation.

---

## Page Flow

```
Hero → About → Services (2) → Portfolio → Life & Work (IG Feed) → WhatsApp Contact
```

- Testimonials: REMOVED until real client reviews are available
- Blog: Navigation link retained, not displayed on homepage

---

## Section Specifications

### Hero
- Name: Tony Mu (large)
- Slogan: prominent position, the main memory hook
- Tagline: "Property advisor. Tech builder. Straight talker." (and equivalents)
- Primary CTA: Chat on WhatsApp
- Secondary CTA: See what I do (scroll down)
- No "Hello, I'm" greeting — wasted space for semi-warm traffic

### About
- **Photos:** 2-3 images in carousel/crossfade (work scene + lifestyle)
  - Work: at property site or at computer
  - Life: casual, approachable
  - Formal headshot: reserve for Hero background or OG image
- **Copy:** Story-style, not resume-style. Explains how tech background led to property advisory.
- **Stats:** 2 real numbers only
  - 100+ Clients Served
  - 5+ Property Projects

### Services
- **2 cards only** (not 3)
  - Property Advisory (primary, larger emphasis)
  - Digital Solutions (secondary, supporting)
- No "Tech Consulting" — merged into Digital Solutions

### Portfolio
- Real project screenshots and property materials
- Property projects + tech projects mixed

### Life & Work (IG Feed) — NEW
- **Source:** Instagram Business/Creator API
- **Format:** Horizontal carousel/swiper
- **Content:** Latest posts + reels auto-pulled
- **Interaction:**
  - Click to enlarge images
  - Inline video playback for reels
- **CTA:** "Follow @xxx on Instagram" at the end
- **Purpose:** Make the site feel alive — visitor sees recent activity, not a dead page

### WhatsApp Contact
- QR code + button
- Casual tone: "Let's Talk" / "聊聊？" / "Jom Borak"
- Sets expectation: "usually reply within a few hours"
- Pre-filled message: casual, not corporate

---

## Visual Style

### Color Palette
- **Background:** Warm white / off-white (~`#faf8f5` range, not pure `#ffffff`)
- **Text:** Warm dark gray (not pure black `#0a0a0a`)
- **Accent/Buttons:** Warm brown / dark khaki — low-key, trustworthy
- **Overall feel:** Comfortable cafe, not law firm

### Typography
- Clean, modern sans-serif
- Hierarchy: large name → medium slogan → body text
- Generous spacing, not cramped

### Photography
- Real photos only — no stock, no placeholders in production
- Warm tones preferred, consistent editing style

---

## Animation & Motion

**Principle: Restrained. Every animation serves a purpose.**

| Element | Animation |
|---------|-----------|
| Sections on scroll | Fade-in + slight upward movement |
| IG carousel | Natural swipe/slide |
| About photos | Crossfade transition |
| Page load | No splash screen, no loading animation |

**Not doing:** Particles, 3D effects, parallax, heavy motion graphics.

---

## Instagram Integration

### Technical Requirements
- Instagram Business or Creator account required
- Use Instagram Basic Display API or Graph API
- Auto-fetch latest 9-12 posts
- Cache on server side to avoid rate limits
- Fallback: if API fails, section hides gracefully (not an error state)

### Display
- Horizontal carousel
- Show image + short caption on hover/tap
- Reels: show thumbnail, play inline on tap
- Last item: "Follow" CTA card

---

## Non-Goals (Explicitly Not Doing)

- Xiaohongshu (小红书) auto-integration — no public API
- Newsletter / email subscription
- Dedicated property listing pages
- Heavy animations (particles, 3D, parallax)
- Fake testimonials or placeholder social proof
- Blog content on homepage

---

## Decision Log

| # | Decision | Alternatives Considered | Rationale |
|---|----------|------------------------|-----------|
| 1 | No Xiaohongshu integration | Manual updates | No public API, maintenance cost not worth it |
| 2 | IG auto-pull + embed + follow CTA | Link only | Has API, makes site feel alive |
| 3 | Balanced approach (Plan 2) | Minimal (Plan 1) / Full content hub (Plan 3) | IG auto-fills content, no extra content production needed |
| 4 | IG feed as horizontal carousel | Grid / Masonry | Mobile-friendly, better for short-attention visitors, lighter page rhythm |
| 5 | About: 2-3 photo carousel | Single photo | Multi-faceted authenticity, stronger IP |
| 6 | Warm color palette | Black-white minimal / Bold modern | Matches "no rush" approachable persona — professional but not cold |
| 7 | Restrained animations | Heavy motion | Doesn't fit persona, property clients don't need it |
| 8 | Remove Testimonials until real data | Keep fake data | Fake reviews contradict "straight talker" IP |
