# ShowPilot Control Icons Reference

Quick reference for which control icons appear in each agent position.

---

## Control Icons (Max 3 per Position)

### Icon Designs (from screenshot)

**Minimize** `—`
- Horizontal line
- Reduces prominence while keeping agent available

**Expand** `⤢`
- Diagonal arrows pointing outward
- Increases prominence or enters immersive mode

**Dock Right** `→|`
- Arrow pointing to vertical line
- Moves agent to right-side Skyscraper mode

**Close** `×`
- X symbol
- Exits current view to lower engagement state

**Back** `←`
- Left arrow
- Navigate within playlists (Content Viewer only)

---

## Position-Specific Controls

### 1. Chat Button
**Controls**: None (click to open)

### 2. Center Low Rectangle
**Controls** (3):
1. **Expand** → Center Midsize Square
2. **Minimize** → Chat Button
3. **Close** → Chat Button

### 3. Center Midsize Square
**Controls** (3):
1. **Expand** → Full Height Center
2. **Right** → Skyscraper
3. **Close** → Chat Button

### 4. Skyscraper
**Controls** (3):
1. **Expand** → Full Height Center
2. **Minimize** → Center Low Rectangle
3. **Close** → Chat Button

### 5. Full Height Center
**Controls** (3):
1. **Minimize** → Center Midsize Square
2. **Right** → Skyscraper
3. **Close** → Center Low Rectangle

### 6. Content Viewer
**Controls** (3):
1. **Close** → Previous Position
2. **Minimize** → Skyscraper
3. **Back** → Playlist Navigation

---

## Control Logic Summary

### Minimize Behavior
- **Center Low Rectangle** → Chat Button
- **Skyscraper** → Center Low Rectangle
- **Full Height Center** → Center Midsize Square
- **Content Viewer** → Skyscraper

### Expand Behavior
- **Center Low Rectangle** → Center Midsize Square
- **Center Midsize Square** → Full Height Center
- **Skyscraper** → Full Height Center

### Dock Right Behavior
- **Center Midsize Square** → Skyscraper
- **Full Height Center** → Skyscraper
- **Content Viewer** → Skyscraper

### Close Behavior
- **Center Low Rectangle** → Chat Button
- **Center Midsize Square** → Chat Button
- **Skyscraper** → Chat Button
- **Full Height Center** → Center Low Rectangle
- **Content Viewer** → Previous Position (or default)

---

## Visual Reference

```
POSITION 1: CHAT BUTTON
┌──────┐
│  AI  │  No controls (click to open)
└──────┘

POSITION 2: CENTER LOW RECTANGLE
┌────────────────────────────────┐
│ Alex         [Expand] [Min] [X]│
├────────────────────────────────┤
│ Hello! I'm Alex...             │
└────────────────────────────────┘

POSITION 3: CENTER MIDSIZE SQUARE
┌────────────────────────────────┐
│ Alex    [Expand] [Right] [X]   │
├────────────────────────────────┤
│                                │
│   Chat messages...             │
│   Suggestion cards             │
│                                │
└────────────────────────────────┘

POSITION 4: SKYSCRAPER
┌──────────────────┐
│ [Exp] [Min] [X]  │
├──────────────────┤
│                  │
│  Chat panel      │
│  (full height)   │
│                  │
└──────────────────┘

POSITION 5: FULL HEIGHT CENTER
┌────────────────────────────────┐
│ Alex       [Min] [Right] [X]   │
├────────────────────────────────┤
│                                │
│   Immersive chat experience    │
│   Multi-step workflows         │
│                                │
└────────────────────────────────┘

POSITION 6: CONTENT VIEWER
┌──────┬────────────────┬────────┐
│[Back]│   [Min] [X]    │        │
├──────┼────────────────┼────────┤
│ Play │                │        │
│ list │    Content     │  Chat  │
│      │                │        │
└──────┴────────────────┴────────┘
```

---

## Implementation Code

### CSS for Control Visibility

```css
/* Center Low Rectangle: Expand, Minimize, Close */
#showpilot-widget[data-position="center-low-rectangle"] .control-expand,
#showpilot-widget[data-position="center-low-rectangle"] .control-minimize,
#showpilot-widget[data-position="center-low-rectangle"] .control-close {
    display: flex;
}

/* Center Midsize Square: Expand, Right, Close */
#showpilot-widget[data-position="center-midsize-square"] .control-expand,
#showpilot-widget[data-position="center-midsize-square"] .control-right,
#showpilot-widget[data-position="center-midsize-square"] .control-close {
    display: flex;
}

/* Skyscraper: Expand, Minimize, Close */
#showpilot-widget[data-position="skyscraper"] .control-expand,
#showpilot-widget[data-position="skyscraper"] .control-minimize,
#showpilot-widget[data-position="skyscraper"] .control-close {
    display: flex;
}

/* Full Height Center: Minimize, Right, Close */
#showpilot-widget[data-position="full-height-center"] .control-minimize,
#showpilot-widget[data-position="full-height-center"] .control-right,
#showpilot-widget[data-position="full-height-center"] .control-close {
    display: flex;
}

/* Content Viewer: Close, Minimize, Back */
#showpilot-widget[data-position="content-viewer"] .control-close,
#showpilot-widget[data-position="content-viewer"] .control-minimize,
#showpilot-widget[data-position="content-viewer"] .control-back {
    display: flex;
}
```

### JavaScript Transition Functions

```javascript
function minimize() {
    const currentPos = widget.getAttribute('data-position');

    if (currentPos === 'center-low-rectangle') {
        setPosition('chat-button');
    } else if (currentPos === 'skyscraper') {
        setPosition('center-low-rectangle');
    } else if (currentPos === 'full-height-center') {
        setPosition('center-midsize-square');
    } else if (currentPos === 'content-viewer') {
        setPosition('skyscraper');
    }
}

function expand() {
    const currentPos = widget.getAttribute('data-position');

    if (currentPos === 'center-low-rectangle') {
        setPosition('center-midsize-square');
    } else if (currentPos === 'center-midsize-square') {
        setPosition('full-height-center');
    } else if (currentPos === 'skyscraper') {
        setPosition('full-height-center');
    }
}

function dockRight() {
    const currentPos = widget.getAttribute('data-position');

    if (currentPos === 'center-midsize-square' ||
        currentPos === 'full-height-center' ||
        currentPos === 'content-viewer') {
        setPosition('skyscraper');
    }
}

function close() {
    const currentPos = widget.getAttribute('data-position');

    if (currentPos === 'center-low-rectangle') {
        setPosition('chat-button');
    } else if (currentPos === 'center-midsize-square') {
        setPosition('chat-button');
    } else if (currentPos === 'skyscraper') {
        setPosition('chat-button');
    } else if (currentPos === 'full-height-center') {
        setPosition('center-low-rectangle');
    } else if (currentPos === 'content-viewer') {
        setPosition(previousPosition || 'center-midsize-square');
    }
}
```

---

## Key Design Principles

✅ **Maximum 3 controls** - Ensures clarity and prevents overwhelm

✅ **Contextual controls** - Only show relevant actions for current position

✅ **Consistent icons** - Same icons across all positions

✅ **Progressive disclosure** - Controls guide natural user flow

✅ **Escape routes** - Always provide way to minimize or close

---

**Last Updated**: December 15, 2025
