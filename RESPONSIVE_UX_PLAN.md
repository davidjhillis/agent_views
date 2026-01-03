# Responsive UX Optimization Plan
## ShowPilot Agent - Multi-Device Experience Design

---

## Executive Summary

This document outlines the comprehensive UX strategy for optimizing the ShowPilot agent experience across desktop, tablet, and mobile viewports. As a website overlay agent (similar to Intercom/Drift), the design must adapt intelligently to each form factor while maintaining usability and brand consistency.

---

## Current State Analysis

### Existing Implementation
- **6 Agent Positions**: Chat Button, Site Agent, Focus Box, Skyscraper, Command Center, Experience Viewer
- **Device Selector**: Present but non-functional (only sets CSS class, no viewport changes)
- **Fixed Dimensions**: All positions use pixel-based widths (440px, 580px, 900px, 960px)
- **No Responsive CSS**: No media queries or adaptive layouts currently implemented

### Technical Gaps
1. ❌ Device selector doesn't resize demo viewport
2. ❌ No touch-optimized UI for mobile
3. ❌ No adaptive layouts per form factor
4. ❌ Fixed pixel widths break on small screens
5. ❌ No keyboard/input considerations for mobile

---

## Viewport Strategy

### Desktop (1280px+)
**Primary Use Case**: Full-featured experience with maximum content density

**Specifications**:
- Demo viewport: `1440px × 900px`
- Widget dimensions: Original pixel values maintained
- Interaction: Mouse/trackpad hover states
- Layout: Side-by-side content + chat (Command Center, Experience Viewer)

**Optimizations**:
- Full multi-column layouts
- Rich hover interactions
- Expanded chat history visible
- Playlist panel shown in Experience Viewer

---

### Tablet (768px - 1024px)
**Primary Use Cases**:
- iPad Pro/Air in landscape (1024px × 768px)
- iPad/Mini in portrait (768px × 1024px)

**Specifications**:
- Demo viewport: `834px × 1194px` (iPad Air portrait)
- Touch targets: Minimum 44px × 44px
- Interaction: Touch-first (no hover dependence)
- Layout: Adaptive to orientation

**Optimizations**:
- Collapse multi-column to single-column in portrait
- Larger tap targets for buttons/controls
- Simplified header controls (fewer buttons)
- Auto-hide elements when keyboard appears
- Focus management for input fields

**Orientation Handling**:
```
Portrait Mode (768px wide):
- Full-screen takeovers (Focus Box, Command Center)
- Stacked layouts (chat above content viewer)
- Bottom sheet patterns for actions

Landscape Mode (1024px wide):
- Side-by-side allowed (Experience Viewer)
- Skyscraper adapts to 360px width
- Persistent pill button for quick access
```

---

### Mobile (375px - 428px)
**Primary Use Cases**:
- iPhone 13/14/15 (390px × 844px)
- iPhone Pro Max (428px × 926px)
- Android flagship (393px × 851px)

**Specifications**:
- Demo viewport: `390px × 844px` (iPhone 14/15 standard)
- Touch targets: 48px × 48px minimum (WCAG AAA)
- Interaction: Thumb-zone optimized
- Layout: Single-column only

**Critical Optimizations**:

#### 1. **Full-Screen Takeovers**
All agent positions should occupy full viewport when active:
```css
@media (max-width: 767px) {
  #showpilot-widget[data-position]:not([data-position="chat-button"]) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    border-radius: 0;
  }
}
```

#### 2. **Chat Interface Mobile Patterns**

**Input Area**:
- Sticky bottom positioning (accounts for mobile keyboard)
- Safe area insets for iPhone notch/home indicator
- Auto-resize textarea (max 5 lines before scroll)
- Quick action buttons above keyboard

```css
.chat-input {
  padding-bottom: env(safe-area-inset-bottom, 20px);
  position: sticky;
  bottom: 0;
  background: white;
}
```

**Message Bubbles**:
- Wider bubbles (85% width max, not 70%)
- Larger font size (16px minimum to prevent zoom)
- Increased line-height (1.5 for readability)
- Generous padding (16px vertical)

**Thumb Zone Optimization**:
```
Screen divided into 3 zones:
┌─────────────────┐
│   Hard Reach    │ ← Header (minimize/close)
├─────────────────┤
│  Natural Reach  │ ← Scrollable content
├─────────────────┤
│   Easy Reach    │ ← Input + send button
└─────────────────┘
```

#### 3. **Position-Specific Mobile Adaptations**

**Chat Button** (Entry Point):
- Increase to 64px × 64px (from 56px)
- Bottom: 16px (closer to thumb)
- Right: 16px
- Add haptic feedback on tap

**Site Agent** (Center Low Rectangle):
```
Desktop: 900px wide, center bottom
Mobile:  Full width, bottom sheet pattern
         - Draggable handle at top
         - Swipe down to dismiss
         - Max height: 85vh (allow peek at page)
```

**Focus Box** (Center Midsize):
```
Desktop: 580px × 680px centered modal
Mobile:  Full screen with header
         - Back button top-left
         - Progress indicator if multi-step
         - Swipe gestures for navigation
```

**Skyscraper** (Right Panel):
```
Desktop: 440px right-docked panel
Tablet:  360px right-docked panel (landscape only)
Mobile:  FULL SCREEN ONLY
         - No side panel on narrow viewports
         - Slide-in animation from right
         - Close button top-left (thumb reach)
```

**Command Center** (Full Height Center):
```
Desktop: 960px × calc(100vh - 48px) centered
Tablet:  Full screen with status bar
Mobile:  Full screen native app pattern
         - Tab bar navigation at bottom
         - Content fills space between header/tabs
         - No shadows/borders (edge-to-edge)
```

**Experience Viewer** (Content + Chat):
```
Desktop: Full screen with side playlist
Tablet:  Collapsible playlist drawer
Mobile:  Stacked vertical layout:
         ┌──────────────┐
         │ Video/Content│ ← 40vh
         ├──────────────┤
         │ Chat         │ ← 60vh
         └──────────────┘
         - Swipeable panels
         - Minimize content to floating PIP
```

#### 4. **Mobile Interaction Patterns**

**Gestures**:
- Swipe down to dismiss modals
- Swipe left/right for multi-step flows
- Pull to refresh chat history
- Long-press for message actions

**Keyboard Handling**:
```javascript
// Auto-scroll to keep input visible
window.visualViewport.addEventListener('resize', () => {
  if (window.visualViewport.height < window.innerHeight) {
    // Keyboard is visible
    document.querySelector('.chat-input').scrollIntoView();
  }
});
```

**Loading States**:
- Skeleton screens (not spinners)
- Optimistic UI updates
- Inline error recovery

---

## Implementation Architecture

### Phase 1: Viewport Simulation System

Create a viewport container that simulates device screens:

```html
<div class="demo-viewport-wrapper">
  <div class="demo-viewport" data-device="desktop">
    <!-- Existing page content -->
    <div class="page-backdrop"></div>
    <div id="showpilot-widget">...</div>
  </div>
</div>
```

```css
.demo-viewport-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e5e7eb;
  padding: 40px 20px;
}

.demo-viewport {
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Desktop Viewport */
.demo-viewport[data-device="desktop"] {
  width: 1440px;
  height: 900px;
  border-radius: 12px;
}

/* Tablet Viewport (iPad Air portrait) */
.demo-viewport[data-device="tablet"] {
  width: 834px;
  height: 1194px;
  border-radius: 24px; /* iPad rounded corners */
  border: 8px solid #1f2937; /* Device bezel */
}

/* Mobile Viewport (iPhone 14) */
.demo-viewport[data-device="mobile"] {
  width: 390px;
  height: 844px;
  border-radius: 48px; /* iPhone rounded corners */
  border: 12px solid #1f2937; /* Device bezel */
}

/* Add notch for mobile */
.demo-viewport[data-device="mobile"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 30px;
  background: #1f2937;
  border-radius: 0 0 16px 16px;
  z-index: 999999;
}
```

### Phase 2: Responsive Widget CSS

```css
/* ============================================
   MOBILE OPTIMIZATIONS (375px - 767px)
   ============================================ */

@media (max-width: 767px) {

  /* All positions become full-screen except chat button */
  #showpilot-widget[data-position]:not([data-position="chat-button"]) {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    transform: none !important;
  }

  /* Chat button - larger and lower */
  #showpilot-widget[data-position="chat-button"] .pill-button {
    width: 64px !important;
    height: 64px !important;
    bottom: 16px !important;
    right: 16px !important;
    font-size: 18px;
  }

  /* Widget header - mobile optimized */
  .widget-header {
    padding: 12px 16px !important;
    padding-top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
  }

  .header-avatar {
    width: 36px !important;
    height: 36px !important;
  }

  .header-info h3 {
    font-size: 16px !important;
  }

  .header-status {
    font-size: 12px !important;
  }

  /* Hide some header controls on mobile */
  .control-expand,
  .control-fullscreen,
  .control-right {
    display: none !important;
  }

  /* Larger tap targets for remaining controls */
  .control-btn {
    width: 44px !important;
    height: 44px !important;
  }

  /* Messages - optimized for mobile */
  .message {
    margin-bottom: 16px !important;
  }

  .message-bubble {
    max-width: 85% !important;
    padding: 16px !important;
    font-size: 16px !important; /* Prevent zoom on input focus */
    line-height: 1.5 !important;
  }

  /* Chat input - keyboard-aware */
  .chat-input {
    padding: 12px 16px !important;
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px) !important;
    position: sticky !important;
    bottom: 0 !important;
  }

  .chat-input textarea {
    font-size: 16px !important; /* Prevent iOS zoom */
    padding: 12px !important;
    min-height: 48px !important;
  }

  .send-btn {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
  }

  /* Experience Viewer - vertical stack */
  #showpilot-widget[data-position="content-viewer"] .content-viewer {
    height: 40vh !important;
  }

  #showpilot-widget[data-position="content-viewer"] .chat-container {
    height: 60vh !important;
  }

  .playlist-panel {
    display: none !important; /* Hide on mobile, show in drawer */
  }

  /* Playlist toggle button for mobile */
  .mobile-playlist-toggle {
    display: block !important;
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom, 0px) + 80px);
    right: 16px;
    width: 56px;
    height: 56px;
    background: var(--theme-700);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  /* Bottom sheet for Site Agent */
  #showpilot-widget[data-position="center-low-rectangle"] {
    height: auto !important;
    max-height: 85vh !important;
    border-radius: 24px 24px 0 0 !important;
    bottom: 0 !important;
    top: auto !important;
  }

  /* Add drag handle */
  #showpilot-widget[data-position="center-low-rectangle"]::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: #cbd5e1;
    border-radius: 2px;
    z-index: 10;
  }
}

/* ============================================
   TABLET OPTIMIZATIONS (768px - 1024px)
   ============================================ */

@media (min-width: 768px) and (max-width: 1024px) {

  /* Skyscraper - narrower on tablet */
  #showpilot-widget[data-position="skyscraper"] {
    width: 360px !important;
  }

  /* Command Center - respect tablet dimensions */
  #showpilot-widget[data-position="full-height-center"] {
    width: 90vw !important;
    max-width: 700px !important;
  }

  /* Touch targets - minimum 44px */
  .control-btn {
    width: 44px !important;
    height: 44px !important;
  }

  .pill-button {
    min-width: 160px !important;
    height: 56px !important;
    font-size: 16px !important;
  }

  /* Messages - slightly wider */
  .message-bubble {
    max-width: 80% !important;
    padding: 14px 16px !important;
  }

  /* Experience Viewer - collapsible playlist */
  .playlist-panel {
    width: 280px !important;
  }

  .playlist-toggle {
    display: block !important; /* Show toggle button */
  }

  /* Landscape vs Portrait handling */
  @media (orientation: portrait) {
    /* Full-screen modals in portrait */
    #showpilot-widget[data-position="center-midsize-square"],
    #showpilot-widget[data-position="full-height-center"] {
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      border-radius: 0 !important;
    }

    /* Stack content viewer */
    #showpilot-widget[data-position="content-viewer"] .content-viewer {
      height: 45vh !important;
    }

    #showpilot-widget[data-position="content-viewer"] .chat-container {
      height: 55vh !important;
    }
  }

  @media (orientation: landscape) {
    /* Side-by-side allowed in landscape */
    #showpilot-widget[data-position="content-viewer"] .playlist-panel {
      display: block !important;
    }
  }
}

/* ============================================
   DESKTOP OPTIMIZATIONS (1025px+)
   ============================================ */

@media (min-width: 1025px) {
  /* Original desktop styles maintained */
  /* Hover states active */
  /* Full feature set available */
}

/* ============================================
   SAFE AREA INSETS (iPhone notch/home bar)
   ============================================ */

@supports (padding: env(safe-area-inset-top)) {
  .widget-header {
    padding-top: calc(env(safe-area-inset-top) + 20px) !important;
  }

  .chat-input {
    padding-bottom: calc(env(safe-area-inset-bottom) + 20px) !important;
  }

  .pill-button {
    bottom: calc(env(safe-area-inset-bottom) + 24px) !important;
  }
}
```

### Phase 3: Enhanced JavaScript Device Switching

```javascript
// Enhanced setDevice function with viewport simulation
function setDevice(device) {
  // Update body class
  document.body.className = `device-${device}`;

  // Update viewport container
  const viewport = document.querySelector('.demo-viewport');
  if (viewport) {
    viewport.setAttribute('data-device', device);
  }

  // Update active button
  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Adjust widget for device context
  const widget = document.getElementById('showpilot-widget');
  const position = widget.getAttribute('data-position');

  // Force full-screen for certain positions on mobile
  if (device === 'mobile' && position !== 'chat-button') {
    widget.classList.add('mobile-fullscreen');
  } else {
    widget.classList.remove('mobile-fullscreen');
  }

  // Disable skyscraper on mobile (UX constraint)
  if (device === 'mobile' && position === 'skyscraper') {
    alert('Skyscraper view is not recommended on mobile. Switching to Focus Box.');
    demoFocusBox();
  }

  // Handle content viewer layout changes
  if (position === 'content-viewer') {
    adjustContentViewerLayout(device);
  }

  // Log analytics
  console.log(`Device switched to: ${device}`);
}

// Adjust content viewer layout based on device
function adjustContentViewerLayout(device) {
  const viewer = document.querySelector('.content-viewer');
  const chat = document.querySelector('.chat-container');
  const playlist = document.querySelector('.playlist-panel');

  if (device === 'mobile') {
    // Vertical stack
    viewer.style.height = '40vh';
    chat.style.height = '60vh';
    playlist.style.display = 'none';

    // Add playlist drawer toggle
    if (!document.querySelector('.mobile-playlist-toggle')) {
      addMobilePlaylistToggle();
    }
  } else if (device === 'tablet') {
    // Depends on orientation
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    if (isPortrait) {
      viewer.style.height = '45vh';
      chat.style.height = '55vh';
      playlist.style.display = 'none';
    } else {
      viewer.style.height = '100%';
      chat.style.height = '100%';
      playlist.style.display = 'block';
    }
  } else {
    // Desktop - original layout
    viewer.style.height = '';
    chat.style.height = '';
    playlist.style.display = 'block';
  }
}

// Add mobile playlist toggle drawer
function addMobilePlaylistToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'mobile-playlist-toggle';
  toggle.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
    </svg>
  `;
  toggle.onclick = () => {
    // Show playlist in bottom drawer
    const drawer = document.querySelector('.mobile-playlist-drawer');
    drawer.classList.toggle('open');
  };
  document.body.appendChild(toggle);
}

// Keyboard visibility handling for mobile
if ('visualViewport' in window) {
  window.visualViewport.addEventListener('resize', () => {
    const viewport = window.visualViewport;
    const input = document.querySelector('.chat-input');

    if (viewport.height < window.innerHeight * 0.75) {
      // Keyboard is likely visible
      input.style.position = 'absolute';
      input.style.bottom = `${window.innerHeight - viewport.height}px`;

      // Scroll active input into view
      const activeInput = document.activeElement;
      if (activeInput && activeInput.tagName === 'TEXTAREA') {
        activeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Keyboard hidden
      input.style.position = 'sticky';
      input.style.bottom = '0';
    }
  });
}

// Touch gesture support for mobile
if ('ontouchstart' in window) {
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;

    // Swipe down to dismiss (for modals)
    if (swipeDistance < -100) {
      const widget = document.getElementById('showpilot-widget');
      const position = widget.getAttribute('data-position');

      if (position !== 'chat-button') {
        closeWidget(); // Dismiss modal
      }
    }
  }
}
```

---

## UX Best Practices Summary

### Mobile-First Principles
1. ✅ **Touch targets**: Minimum 48px × 48px (WCAG AAA)
2. ✅ **Font sizes**: 16px minimum to prevent auto-zoom
3. ✅ **Thumb zones**: Critical actions in bottom 40% of screen
4. ✅ **Safe areas**: Account for notches and home indicators
5. ✅ **Keyboard handling**: Adjust layout when keyboard appears
6. ✅ **Gestures**: Swipe to dismiss, pull to refresh
7. ✅ **Full-screen**: No cramped panels on small screens

### Tablet Adaptations
1. ✅ **Orientation-aware**: Different layouts for portrait/landscape
2. ✅ **Collapsible panels**: Drawers for secondary content
3. ✅ **Touch-first**: No hover-dependent interactions
4. ✅ **Generous spacing**: Avoid accidental taps
5. ✅ **Progressive disclosure**: Show more detail as space allows

### Desktop Optimizations
1. ✅ **Hover states**: Rich interactions with cursor
2. ✅ **Multi-column**: Utilize horizontal space
3. ✅ **Keyboard shortcuts**: Power user features
4. ✅ **Dense layouts**: More content visible
5. ✅ **Persistent panels**: Playlist, settings always visible

---

## Position-Specific Recommendations

### 1. Chat Button (Entry Point)
- **Mobile**: 64px, bottom-right, 16px margins
- **Tablet**: 60px, same positioning
- **Desktop**: 56px original size

### 2. Site Agent (Center Low Rectangle)
- **Mobile**: Bottom sheet (swipeable, 85vh max)
- **Tablet**: Full-width bottom sheet or centered modal
- **Desktop**: 900px centered rectangle

### 3. Focus Box
- **Mobile**: Full screen with back button
- **Tablet**: Full screen in portrait, centered in landscape
- **Desktop**: 580px × 680px centered modal

### 4. Skyscraper
- **Mobile**: **NOT RECOMMENDED** - Switch to Focus Box
- **Tablet**: 360px right panel (landscape only)
- **Desktop**: 440px right panel

### 5. Command Center
- **Mobile**: Full screen native app pattern
- **Tablet**: Full screen with bottom tabs
- **Desktop**: 960px centered with rich layout

### 6. Experience Viewer
- **Mobile**: Vertical stack (40/60 split) + drawer
- **Tablet**: Adaptive (stacked portrait, side-by-side landscape)
- **Desktop**: Full split-screen with playlist

---

## Accessibility Considerations

### Touch Accessibility
- Minimum target size: 48px × 48px
- Spacing between targets: 8px minimum
- Hit area extends beyond visual boundary

### Visual Accessibility
- High contrast text (4.5:1 minimum)
- Focus indicators for keyboard navigation
- Text scales with user preferences
- No information conveyed by color alone

### Motion Accessibility
- Respect `prefers-reduced-motion`
- Disable auto-playing videos for motion-sensitive users
- Provide static alternatives to animations

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Strategy

### Device Testing Matrix
| Device | Viewport | Orientation | Priority |
|--------|----------|-------------|----------|
| iPhone 14 | 390 × 844 | Portrait | P0 |
| iPhone 14 Pro Max | 428 × 926 | Portrait | P0 |
| iPad Air | 834 × 1194 | Portrait | P0 |
| iPad Air | 1194 × 834 | Landscape | P1 |
| Desktop | 1440 × 900 | N/A | P0 |
| Desktop | 1920 × 1080 | N/A | P1 |

### Test Scenarios
1. ✅ Device switching animates smoothly
2. ✅ All positions render correctly per device
3. ✅ Touch targets are appropriately sized
4. ✅ Keyboard doesn't obscure input
5. ✅ Gestures work as expected
6. ✅ Text remains readable at all sizes
7. ✅ No horizontal scrolling on mobile
8. ✅ Safe areas respected on iPhone
9. ✅ Transitions respect motion preferences
10. ✅ Focus management works with keyboard

---

## Performance Considerations

### Mobile Performance
- Lazy load images/videos
- Use CSS transforms for animations (GPU-accelerated)
- Debounce scroll/resize events
- Minimize JavaScript execution
- Use `will-change` sparingly

### Bundle Size
- Separate desktop/mobile CSS (code splitting)
- Inline critical CSS
- Load device-specific features conditionally

---

## Next Steps

### Phase 1: Foundation (Week 1)
- [ ] Implement viewport wrapper system
- [ ] Add device switching CSS
- [ ] Test basic responsive behavior
- [ ] Validate on real devices

### Phase 2: Mobile Optimization (Week 2)
- [ ] Full-screen transformations
- [ ] Keyboard handling
- [ ] Touch gestures
- [ ] Safe area insets
- [ ] Mobile-specific features

### Phase 3: Tablet Refinement (Week 3)
- [ ] Orientation handling
- [ ] Touch target optimization
- [ ] Collapsible panels
- [ ] Progressive disclosure
- [ ] Tablet-specific layouts

### Phase 4: Polish & Testing (Week 4)
- [ ] Cross-device testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User testing
- [ ] Documentation

---

## Success Metrics

### Usability
- ✅ All touch targets meet 48px minimum
- ✅ No horizontal scrolling on any device
- ✅ Input fields never obscured by keyboard
- ✅ Smooth 60fps animations
- ✅ WCAG AA compliance minimum

### User Satisfaction
- ✅ < 2% bounce rate from mobile users
- ✅ Equal engagement across devices
- ✅ No "pinch-to-zoom" required
- ✅ Positive feedback on mobile experience

---

## Conclusion

This responsive UX strategy transforms ShowPilot from a desktop-focused overlay into a truly multi-device agent experience. By implementing device-aware viewports, touch-optimized interactions, and adaptive layouts, we ensure users have an optimal experience regardless of their form factor.

**Key Principles**:
- Mobile requires full-screen, thumb-optimized design
- Tablet balances between mobile simplicity and desktop density
- Desktop leverages space for rich, multi-column layouts
- Accessibility and performance are non-negotiable

**Implementation Priority**: Mobile-first CSS, progressive enhancement for tablet/desktop, real device testing throughout.
