# ShowPilot - Unified Widget with User Controls

**File**: `showpilot-unified.html`

---

## ✅ NOW I Get It!

**ONE widget** with **header control buttons** that let users change position/size.

When the AI shows content, it **seamlessly transitions** the layout to show the content viewer.

---

## 🎛️ Header Control Buttons (6 Controls)

### 1. **Dock Left**
- Docks widget to bottom-left corner
- 420px × 650px chat window
- Icon: Split rectangle (left panel highlighted)

### 2. **Dock Right** (Default)
- Docks widget to bottom-right corner
- 420px × 650px chat window
- Icon: Split rectangle (right panel highlighted)

### 3. **Center**
- Centers widget on screen
- 480px × 700px (slightly larger)
- Icon: Rectangle with center dot

### 4. **Expand**
- Larger chat window
- 900px × 700px
- Bottom-right position
- Icon: Diagonal arrows outward

### 5. **Fullscreen**
- Takes entire viewport
- Shows 3-column layout (playlist | content | chat)
- Icon: Expand to corners

### 6. **Minimize**
- Collapses to floating badge
- Bottom-right corner
- 64px circle
- Icon: Horizontal line

---

## 🎬 The Seamless Transition

### User Flow:
1. **User opens widget** - Chat appears (position based on last setting)
2. **User clicks header icons** - Widget repositions/resizes instantly
3. **User asks for content** - Clicks "Product Demo" suggestion
4. **Widget automatically transitions**:
   - `data-view` changes from `chat` to `content`
   - Layout grid changes from `1fr` to `260px | 1fr | 380px`
   - Playlist slides in (left)
   - Content viewer appears (center)
   - Chat compresses to sidebar (right)
   - If not in fullscreen, auto-expands to fullscreen for best experience

### The Magic:
```javascript
function showContent() {
    // Transition to content view
    widget.setAttribute('data-view', 'content');

    // Auto-expand to fullscreen for best experience
    if (widget.getAttribute('data-state') === 'chat') {
        widget.setAttribute('data-state', 'fullscreen');
    }
}
```

All controlled by **CSS Grid** with smooth transitions:
```css
/* Chat only */
[data-view="chat"] .widget-content {
    grid-template-columns: 1fr;
}

/* Content viewer */
[data-view="content"] .widget-content {
    grid-template-columns: 260px 1fr 380px;
}
```

---

## 🎨 States & Positions

### States (How Big):
- `minimized` - Floating badge (64px circle)
- `chat` - Standard chat window (420px × 650px)
- `expanded` - Larger chat (900px × 700px)
- `fullscreen` - Entire viewport

### Positions (Where):
- `bottom-right` - Default floating position
- `bottom-left` - Alternative side
- `center` - Centered modal

### Views (What's Showing):
- `chat` - Just the chat panel
- `content` - Playlist | Content Viewer | Chat

---

## 🧪 How to Test (File Now Open)

**Click the floating badge** to open the widget.

### Test Header Controls:
1. **Dock Left** - Watch it move to left side
2. **Dock Right** - Watch it move to right side
3. **Center** - Watch it center on screen
4. **Expand** - Watch it grow larger
5. **Fullscreen** - Watch it fill viewport
6. **Minimize** - Watch it collapse to badge

### Test Content Transition:
1. Open widget (any position)
2. Click "Product Demo" suggestion card
3. **Watch the magic**:
   - Widget expands to fullscreen
   - Playlist slides in from left
   - Video viewer appears in center
   - Chat moves to right sidebar
   - All in smooth 400ms animation

---

## 💎 This IS "Seamless"

**User controls everything**:
- Click header icons → Widget repositions
- Ask for content → Widget transforms into viewer
- All smooth, no jarring transitions

**AI guides the experience**:
- Shows suggestion cards
- When user wants content, transitions layout
- Continues chatting in sidebar while content plays

---

## 🎯 The ShowPilot Difference

**Qualified**: User controls window position/size via header icons, shows video of AI agent

**ShowPilot**:
- User controls window position/size via header icons ✅
- AI shows YOUR product content (videos, PDFs, tours) ✅
- Seamless transition from chat → immersive content viewer ✅
- Chat continues in sidebar while content plays ✅

---

## 📊 Control States Summary

| Control | State | Position | Size | Grid |
|---------|-------|----------|------|------|
| **Minimize** | minimized | bottom-right | 64px circle | - |
| **Dock Left** | chat | bottom-left | 420×650 | `1fr` |
| **Dock Right** | chat | bottom-right | 420×650 | `1fr` |
| **Center** | chat | center | 480×700 | `1fr` |
| **Expand** | expanded | bottom-right | 900×700 | `1fr` |
| **Fullscreen** | fullscreen | fills viewport | 100% | `1fr` |
| **+ Content** | (any) | (stays same) | (stays same) | `260px\|1fr\|380px` |

---

## ✅ Key Features

1. **User-Controlled**: All positioning via header icons
2. **Persistent**: Position remembered across opens
3. **Adaptive**: Layout adapts when showing content
4. **Smooth**: 400ms transitions with cubic-bezier easing
5. **Intuitive**: Icons clearly show what each control does

---

**This is how it should work!**

User controls the widget via header icons.
AI controls the content view when showing videos/docs/tours.
Everything transitions smoothly.