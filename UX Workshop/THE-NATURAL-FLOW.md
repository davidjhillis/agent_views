# ShowPilot - The Natural Flow

**File**: `showpilot-flow.html` (NOW OPEN)

---

## ✅ The 4 Use Cases

1. **CHATBOT** - Right-docked guide (helps while browsing)
2. **GREETER** - Center stage welcome (takes focus)
3. **EXPLAINER** - Shows content + chat side-by-side
4. **VIEWER** - Full immersive content experience

---

## 🎯 The Flow (Position to Position)

### Starting Point: User Clicks Badge

**Choice**: Opens as **CHATBOT** (right) or **GREETER** (center)
- Default: **CHATBOT** (right-docked, 400×600px)

---

## 📍 FROM RIGHT (Chatbot Mode)

**Controls Visible**: ⬍⬍ Tall | ⬤ Center | ➖ Minimize

### Path 1: Stay Right, Grow Tall
- User clicks **Tall** control (↕ icon)
- Widget: **CHATBOT** → **TALL**
- Size: 400×600 → 400×(full height)
- Use case: More chat history, guide stays on right while user browses
- **Available next**: Center | Minimize

### Path 2: Move to Center
- User clicks **Center** control (⬤ icon)
- Widget: **CHATBOT** → **GREETER**
- Position: Right → Center screen
- Size: 400×600 → 560×680
- Use case: AI takes center stage to present/greet
- **Available next**: Expand | Fullscreen | Dock Right | Minimize

---

## 📍 FROM CENTER (Greeter Mode)

**Controls Visible**: ⤢ Expand | ⛶ Fullscreen | ▯ Dock Right | ➖ Minimize

### Path 1: Expand (Show Content)
- User clicks **Expand** control (⤢ icon) OR AI shows content
- Widget: **GREETER** → **EXPLAINER**
- Size: 560×680 → 920×720
- Layout: 1 column → 2 columns (content | chat)
- Use case: Show video/PDF alongside chat
- **Available next**: Fullscreen | Dock Right | Minimize

### Path 2: Go Fullscreen
- User clicks **Fullscreen** control (⛶ icon)
- Widget: **GREETER** → **VIEWER**
- Size: 560×680 → Full viewport
- Layout: 1 column → 3 columns (playlist | content | chat)
- Use case: Full immersive content experience
- **Available next**: Dock Right | Minimize

### Path 3: Dock Right (Become Guide)
- User clicks **Dock Right** control (▯ icon)
- Widget: **GREETER** → **CHATBOT**
- Position: Center → Right
- Use case: Go back to guide mode
- **Available next**: Tall | Center | Minimize

---

## 📍 FROM EXPLAINER (Content + Chat)

**Controls Visible**: ⛶ Fullscreen | ▯ Dock Right | ➖ Minimize

### Path 1: Go Fullscreen
- User clicks **Fullscreen** control
- Widget: **EXPLAINER** → **VIEWER**
- Size: 920×720 → Full viewport
- Layout: 2 columns → 3 columns (adds playlist)
- Use case: Full immersive experience with playlist
- **Available next**: Dock Right | Minimize

### Path 2: Dock Right
- User clicks **Dock Right** control
- Widget: **EXPLAINER** → **CHATBOT**
- Position: Center → Right
- Content closes, back to chat-only guide
- **Available next**: Tall | Center | Minimize

---

## 📍 FROM VIEWER (Fullscreen)

**Controls Visible**: ▯ Dock Right | ➖ Minimize

### Path 1: Dock Right
- User clicks **Dock Right** control
- Widget: **VIEWER** → **CHATBOT**
- Content closes, returns to right-docked guide
- **Available next**: Tall | Center | Minimize

### Path 2: Minimize
- User clicks **Minimize** control
- Widget: **VIEWER** → **MINIMIZED**
- Collapses to floating badge

---

## 🔄 The Natural Progression

### Typical User Journey:

```
1. Click badge
   ↓
2. CHATBOT (right, 400×600)
   - "Hi, I'm Alex. I can guide you..."
   - Stays on right while user browses site

   User wants more → Click "Product Demo"
   ↓
3. EXPLAINER (center, 920×720)
   - Automatically moves to center
   - Shows video | chat side-by-side

   User engaged → Wants bigger view
   ↓
4. VIEWER (fullscreen)
   - Playlist | Video | Chat
   - Full immersive experience

   Done viewing → Continue browsing
   ↓
5. CHATBOT (right, 400×600)
   - Click "Dock Right"
   - Back to guide mode
```

---

## 🎮 How Header Controls Adapt

### RIGHT Mode (Chatbot/Tall):
**Shows**: Tall | Center | Minimize
- **Tall** = Grow vertically, stay on right
- **Center** = Move to center stage
- **Minimize** = Collapse to badge

### CENTER Mode (Greeter):
**Shows**: Expand | Fullscreen | Dock Right | Minimize
- **Expand** = Show content alongside chat
- **Fullscreen** = Full viewer with playlist
- **Dock Right** = Return to right-docked guide
- **Minimize** = Collapse to badge

### CENTER Mode (Explainer):
**Shows**: Fullscreen | Dock Right | Minimize
- **Fullscreen** = Full viewer with playlist
- **Dock Right** = Close content, return to guide
- **Minimize** = Collapse to badge

### FULLSCREEN Mode (Viewer):
**Shows**: Dock Right | Minimize
- **Dock Right** = Exit content, return to guide
- **Minimize** = Collapse to badge

---

## 💡 The Intelligence

### When AI Shows Content:
```javascript
function showContent() {
    const currentMode = widget.getAttribute('data-mode');

    if (currentMode === 'chatbot' || currentMode === 'tall') {
        // From right: Move to center and show content
        setMode('explainer');
    } else if (currentMode === 'greeter') {
        // From center greeting: Expand to show content
        setMode('explainer');
    } else if (currentMode === 'explainer') {
        // From explainer: Go fullscreen
        setMode('viewer');
    }
}
```

The widget **intelligently transitions** based on current position:
- **Right → Center Explainer** (so content is visible)
- **Center → Explainer** (expand to show content)
- **Explainer → Viewer** (go fullscreen)

---

## 🎨 The Design Logic

### RIGHT-DOCKED = Guide/Assistant
- **Small footprint** - doesn't block content
- **Persistent** - stays while user browses
- **Can grow tall** - for more chat history
- **Can move to center** - when it needs focus

### CENTER = Presenter/Host
- **Takes focus** - for greetings, presentations
- **Can expand** - to show content
- **Can go fullscreen** - for immersion
- **Can dock right** - to get out of the way

### Sizes Match Purpose:
- **Chatbot**: 400×600 (compact guide)
- **Tall**: 400×full (more history)
- **Greeter**: 560×680 (friendly welcome)
- **Explainer**: 920×720 (content + chat)
- **Viewer**: Fullscreen (immersive)

---

## 🧪 Test The Flow (File Is Open!)

1. **Click floating badge** → Opens as **Chatbot** (right)

2. **From Chatbot, try**:
   - Click **Tall** icon (↕) → Grows full height
   - Click **Center** icon (⬤) → Moves to center

3. **From Center, try**:
   - Click "Product Demo" → Auto-expands to **Explainer**
   - Click **Fullscreen** icon (⛶) → Goes fullscreen **Viewer**

4. **From Explainer/Viewer, try**:
   - Click **Dock Right** icon (▯) → Returns to **Chatbot**

5. **Always available**:
   - Click **Minimize** icon (➖) → Collapses to badge

---

## ✨ The Magic

**It's not about having all controls always visible.**

**It's about showing the RIGHT controls for the CURRENT position.**

- Right → Can grow tall or move center
- Center → Can expand or go fullscreen or dock right
- Fullscreen → Can dock right to get out of the way

**Each control moves you ONE STEP in the natural flow.**

---

**This is the natural UX that guides users through the experience!**
