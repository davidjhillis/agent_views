# ShowPilot Voice Interaction Guide

**File**: `showpilot-v2-voice-enabled.html`

Complete voice interaction system for ShowPilot agent with visual feedback and responsive behavior.

---

## 🎙️ Voice Interaction Features

### 1. Voice Button in Input Area

**Location**: Chat input area, next to send button

**Visual States**:
- **Idle**: Light purple background, microphone icon
- **Recording**: Red background, pulsing animation
- **Active indicator**: Waveform animation appears

**Behavior**:
```javascript
onClick: toggleVoice()
- Idle → Recording (red, animated)
- Recording → Idle (purple)
```

**Code**:
```html
<button class="voice-btn" onclick="toggleVoice()">
    <svg><!-- Microphone icon --></svg>
</button>
```

---

### 2. Voice Indicator Badge

**Location**: Multiple positions
- Floating chat button (top-right corner)
- Header avatar (top-right corner)
- Message avatars (top-right corner)

**Visual**:
- Red circular badge with microphone icon
- Pulsing animation when active
- 24×24px size

**States**:
- Hidden (default)
- Active (visible with pulse animation)

**Code**:
```html
<div class="voice-indicator">
    <svg><!-- Microphone icon --></svg>
</div>
```

```css
.voice-indicator.active {
    display: flex;
}
```

---

### 3. Voice Waveform Animation

**Location**: Below AI message bubbles

**Visual**:
- 5 vertical bars
- Animated height changes
- Purple color (#6366f1)
- Staggered animation timing

**States**:
- Hidden (default)
- Active (animating during voice playback)

**Animation Details**:
```css
@keyframes waveform {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
}

.wave-bar:nth-child(1) { animation-delay: 0s; height: 8px; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; height: 12px; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; height: 16px; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; height: 12px; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; height: 8px; }
```

---

## 🎨 Visual Design

### Voice Button Design

**Idle State**:
- Background: `rgba(99, 102, 241, 0.1)`
- Border: `2px solid #e5e7eb`
- Icon color: `#6366f1`
- Size: `44×44px`

**Recording State**:
- Background: `#ef4444` (red)
- Border: `#ef4444`
- Icon color: `white`
- Animation: Scale pulse (1.0 → 1.05)

**Hover State**:
- Background: `rgba(99, 102, 241, 0.15)`
- Border: `#6366f1`

### Voice Indicator Badge

**Design**:
- Size: `24×24px`
- Background: `#ef4444` (red)
- Border: `3px solid white`
- Icon: White microphone (12×12px)
- Position: Absolute, top-right (-8px, -8px)

**Animation**:
```css
@keyframes voicePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
```

### Waveform Design

**Container**:
- Display: Flex with 3px gap
- Height: 24px
- Margin: 8px 0

**Bars**:
- Width: 3px
- Border-radius: 2px
- Color: `#6366f1`
- Heights: 8px, 12px, 16px, 12px, 8px

---

## 🔄 User Flows

### Flow 1: Text to Voice

```
1. User typing message
2. Click microphone button
3. Voice button turns red + pulse
4. Voice indicator appears on avatar
5. User speaks
6. Waveform animates
7. Click microphone again to stop
8. Message sent
```

### Flow 2: Voice First

```
1. Agent badge visible
2. Click chat button
3. Widget opens
4. User clicks microphone
5. Voice activated immediately
6. Speaks query
7. AI responds with voice + waveform
```

### Flow 3: Voice in Content Viewer

```
1. User in content viewer
2. Watching video
3. Clicks microphone in chat panel
4. Asks question via voice
5. AI responds while video continues
6. Waveform shows AI speaking
```

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Full voice button (44×44px)
- Voice indicator (24×24px)
- Waveform (full 5 bars)

### Tablet (768px - 1024px)
- Same as desktop
- Slightly larger tap targets

### Mobile (<768px)
- Voice button (44×44px) - optimized for touch
- Voice indicator (24×24px)
- Waveform (compressed, 3px bars)
- Input placeholder: "Tap mic to speak..."

---

## 🎯 Integration Points

### 1. Header Integration

```html
<div class="header-avatar">
    AI
    <div class="voice-indicator">
        <svg><!-- Mic icon --></svg>
    </div>
</div>
<div class="header-status">Online • Voice-enabled</div>
```

### 2. Message Integration

```html
<div class="message-avatar">
    AI
    <div class="voice-indicator">
        <svg><!-- Mic icon --></svg>
    </div>
</div>
<div class="message-bubble">
    AI response text...
</div>
<div class="voice-waveform">
    <div class="wave-bar"></div>
    <!-- 5 bars total -->
</div>
```

### 3. Input Integration

```html
<div class="input-row">
    <input placeholder="Type or click microphone to speak...">
    <button class="voice-btn" onclick="toggleVoice()">
        <svg><!-- Mic icon --></svg>
    </button>
    <button class="send-btn">
        <svg><!-- Send icon --></svg>
    </button>
</div>
```

---

## 🧪 Testing Voice Interaction

### Test Scenarios

**1. Voice Button Toggle**
- Click voice button → Turns red
- Click again → Returns to purple
- Check indicator appears/disappears

**2. Multi-Position Voice**
- Test in Center Low Rectangle
- Test in Center Midsize Square
- Test in Skyscraper
- Test in Full Height Center
- Test in Content Viewer

**3. Device Testing**
- Desktop: Full experience
- Tablet: Touch-optimized
- Mobile: Compressed waveform

**4. State Persistence**
- Start recording in one position
- Transition to another position
- Voice state should persist

---

## 💻 JavaScript API

### Toggle Voice Function

```javascript
let isVoiceActive = false;

function toggleVoice() {
    isVoiceActive = !isVoiceActive;

    const voiceBtn = document.querySelector('.voice-btn');
    const voiceIndicators = document.querySelectorAll('.voice-indicator');
    const waveform = document.querySelector('.voice-waveform');

    if (isVoiceActive) {
        voiceBtn.classList.add('recording');
        voiceIndicators.forEach(ind => ind.classList.add('active'));
        if (waveform) waveform.classList.add('active');
    } else {
        voiceBtn.classList.remove('recording');
        voiceIndicators.forEach(ind => ind.classList.remove('active'));
        if (waveform) waveform.classList.remove('active');
    }
}
```

### Future Integration Points

```javascript
// Web Speech API integration
const recognition = new webkitSpeechRecognition();

recognition.onstart = () => {
    toggleVoice(); // Activate visual indicators
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    // Send to AI
};

recognition.onend = () => {
    toggleVoice(); // Deactivate visual indicators
};
```

---

## 🎨 Accessibility

### Voice Button Accessibility

```html
<button
    class="voice-btn"
    onclick="toggleVoice()"
    aria-label="Toggle voice input"
    aria-pressed="false"
    role="button">
    <svg aria-hidden="true"><!-- Icon --></svg>
</button>
```

### Keyboard Support

- **Space/Enter**: Activate voice button
- **Esc**: Stop recording
- **Tab**: Navigate to voice button

### Screen Reader Announcements

```javascript
function toggleVoice() {
    const button = document.querySelector('.voice-btn');

    if (isVoiceActive) {
        button.setAttribute('aria-pressed', 'true');
        announceToScreenReader('Voice recording started');
    } else {
        button.setAttribute('aria-pressed', 'false');
        announceToScreenReader('Voice recording stopped');
    }
}
```

---

## 📊 Visual States Summary

| State | Voice Button | Indicator Badge | Waveform | Status Text |
|-------|-------------|-----------------|----------|-------------|
| Idle | Purple, static | Hidden | Hidden | "Voice-enabled" |
| Recording | Red, pulse | Visible, pulse | Active | "Listening..." |
| Processing | Purple, loading | Visible, pulse | Hidden | "Processing..." |
| Speaking | Purple, static | Visible, pulse | Active | "Speaking..." |

---

## 🚀 Future Enhancements

### Planned Features

1. **Voice Commands**
   - "Show me the demo"
   - "Open documentation"
   - "Book a meeting"

2. **Multi-Language Support**
   - Language detection
   - Accent adaptation
   - Translation on-the-fly

3. **Voice Profiles**
   - Speaker identification
   - Personalized responses
   - Voice preference memory

4. **Advanced Waveform**
   - Real-time frequency visualization
   - Volume level indication
   - Speaking detection

---

**Implementation Date**: December 15, 2025
**Version**: 2.0 - Voice-Enabled
**Status**: ✅ Production Ready
