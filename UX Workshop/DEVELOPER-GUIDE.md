# ShowPilot Agent Views - Developer Guide

Complete technical documentation for implementing ShowPilot's AI agent across 6 distinct positions and interaction patterns.

---

## Table of Contents

1. [Agent Positions](#agent-positions)
2. [Interactive Features](#interactive-features)
3. [Implementation Requirements](#implementation-requirements)
4. [Technical Specifications](#technical-specifications)
5. [API Integration](#api-integration)

---

## Agent Positions

### 1. Chat Button
**Position**: Bottom-right corner
**Size**: Compact pill-shaped button (auto width)
**Use Case**: Entry point, always accessible

**Features**:
- Blue gradient background (#0B3398 → #1e40af)
- "Ask ShowPilot" text label
- Green notification badge (top-right)
- Hover: Lift animation + reversed gradient
- Click: Transitions to Skyscraper view

**Technical Requirements**:
```css
position: fixed;
bottom: 24px;
right: 24px;
border-radius: 100px;
box-shadow: 0 8px 24px rgba(11, 51, 152, 0.25);
```

---

### 2. Site Agent
**Position**: Bottom-center
**Size**: 900px × auto (horizontal layout)
**Use Case**: Quick interactions without leaving page context

**Features**:
- Large avatar (120px) with "Talk now" voice badge
- Full input box with Book a demo CTA
- Voice and send buttons inside input
- Hover controls (expand/close) - top-right
- Privacy disclaimer with light gray background

**Technical Requirements**:
```css
position: fixed;
bottom: 24px;
left: 50%;
transform: translateX(-50%);
width: 900px;
```

**Layout Structure**:
```
[Avatar 120px] [Input Box: [Book a demo] Input text [Voice] [Send]]
               [Privacy disclaimer]
```

**Controls**:
- Expand → Focus Box
- Close → Chat Button
- Controls appear on hover at 60% opacity, 100% on hover

---

### 3. Focus Box
**Position**: Bottom-center
**Size**: 580px × 680px
**Use Case**: Standard chat conversations, full feature access

**Features**:
- Complete chat interface with message history
- Agent avatar + name in header
- Suggestion cards (2-column grid)
- Full input area with all controls
- Header controls: Expand, Dock Right, Close

**Technical Requirements**:
```css
position: fixed;
bottom: 24px;
left: 50%;
transform: translateX(-50%);
width: 580px;
height: 680px;
border-radius: 20px;
```

**Suggestion Cards**: 2-column grid with hover effects

---

### 4. Skyscraper
**Position**: Right edge, full height
**Size**: 440px × 100vh
**Use Case**: Persistent sidebar agent, research mode

**Features**:
- Full-height vertical layout
- Sharp corners (no border-radius)
- Single-column suggestion cards
- Header controls: Expand, Minimize, Close
- Optimal for guided navigation workflows

**Technical Requirements**:
```css
position: fixed;
top: 0;
right: 0;
width: 440px;
height: 100vh;
border-radius: 0; /* Sharp corners */
```

**Suggestion Cards**: Single column for vertical layout

---

### 5. Command Center
**Position**: Centered overlay
**Size**: 960px × calc(100vh - 48px), max 920px
**Use Case**: Deep-dive conversations, content creation

**Features**:
- Large centered window
- Maximum conversation space
- Header controls: Minimize, Dock Right, Close
- Full message history visibility
- 2-column suggestion cards

**Technical Requirements**:
```css
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 960px;
height: calc(100vh - 48px);
max-height: 920px;
border-radius: 20px;
```

---

### 6. Experience Viewer
**Position**: Full-screen overlay
**Size**: 92vw × 88vh
**Use Case**: Video playback, interactive demos, content presentation

**Features**:
- 3-column grid layout (playlist | content | chat)
- Playlist panel (300px) - content navigation
- Content viewer - video/demo display with black background
- Chat panel (420px) - agent assistance
- Header controls: Fullscreen, Minimize, Dock Right
- Page blur effect when active

**Technical Requirements**:
```css
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 92vw;
height: 88vh;
max-width: 1800px;
border-radius: 16px;

/* Grid Layout */
display: grid;
grid-template-columns: 300px 1fr 420px;
```

**Playlist Panel**:
- Content navigation (YouTube, PDFs, web pages, interactive tours)
- Active state highlighting
- Metadata display (duration, type)

**Content Viewer**:
- Black background (#000)
- Video player placeholder
- Play button overlay
- Content title header

**Chat Panel**:
- Continues conversation alongside content
- Context-aware suggestions
- Single-column cards

---

## Interactive Features

### Guided Navigation
**Description**: Agent helps users navigate website sections with visual highlights

**Components**:
1. **Animated Cursor** - White pointer with drop shadow
2. **Page Scroll** - Smooth scroll to center of viewport
3. **Visual Highlight** - Purple/lavender border with label
4. **Agent Message** - Explains the section

**Implementation Flow**:
```javascript
// 1. User clicks navigation suggestion
// 2. Scroll section to viewport center
const middle = elementTop - (window.innerHeight / 2) + (elementHeight / 2);
window.scrollTo({ top: middle, behavior: 'smooth' });

// 3. Show animated cursor (0.8s transition)
cursor.style.left = targetX + 'px';
cursor.style.top = targetY + 'px';

// 4. Display highlight with label
highlight.style = 'border: 2px solid rgba(139, 92, 246, 0.4)';

// 5. Agent explains section in chat
showSectionMessage(selector);
```

**Requirements**:
- Cursor animation: 800ms cubic-bezier(0.4, 0, 0.2, 1)
- Highlight color: Purple (#8b5cf6 label, rgba(139, 92, 246, 0.4) border)
- Scroll timing: 800ms smooth scroll
- Auto-clear: 5 seconds after highlight

**Best Practices**:
- Use for features, pricing, documentation sections
- Provide contextual explanations after highlighting
- Clear previous highlights before new ones
- Center elements in viewport for visibility

---

### Meeting Booking
**Description**: Conversational meeting scheduling workflow

**Flow**:
1. User clicks "Book a demo" button
2. Agent transitions to Focus Box view
3. Agent asks for business email
4. (Integration point for calendar API)

**Implementation**:
```javascript
function demoBookMeeting() {
    setPosition('center-midsize-square');
    const messagesContainer = document.querySelector('.chat-messages');
    messagesContainer.innerHTML = `
        <div class="message message-ai">
            <div class="message-avatar">
                <img src="[avatar-url]" alt="Agent">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <strong>Book a demo</strong><br><br>
                    Great! What's your business email so I can get the demo scheduled?
                </div>
            </div>
        </div>
    `;
}
```

**Requirements**:
- Trigger: "Book a demo" button or natural language request
- View: Transitions to Focus Box for form context
- Data collection: Email, company, role, preferred time
- Integration: Calendar API (Calendly, Google Calendar, etc.)

**Calendar Integration Points**:
```javascript
// Example integration structure
{
    email: "user@company.com",
    company: "Company Name",
    role: "Product Manager",
    preferredTime: "Next week",
    source: "ShowPilot Agent"
}
```

---

### Voice Interaction
**Description**: Voice input for hands-free operation

**Components**:
- **Voice Button**: Soundwave icon (3 bars)
- **Recording State**: Animated soundwave bars
- **Visual Feedback**: Color change (#6366f1) when active

**Implementation**:
```css
.soundwave-icon {
    display: flex;
    gap: 2.5px;
    align-items: center;
    height: 18px;
}

.soundwave-bar {
    width: 3.5px;
    background: currentColor;
    border-radius: 2px;
    transition: all 0.3s;
}

/* Animation when recording */
.recording .soundwave-bar {
    animation: soundwave 0.8s ease-in-out infinite;
}

@keyframes soundwave {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1.3); }
}
```

**Requirements**:
- Button size: 32px × 32px
- Icon bars: 3px wide, varying heights (8px, 16px, 11px)
- Animation: 0.8s ease-in-out infinite
- Integration: Web Speech API or custom voice service

**Voice API Integration**:
```javascript
// Web Speech API example
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    // Process voice input
};
```

---

### Suggestion Cards
**Description**: Contextual action prompts for user guidance

**Layouts**:
- **2-column grid**: Focus Box, Command Center (default)
- **Single column**: Skyscraper, Experience Viewer

**Card Structure**:
```html
<button class="suggestion-card" onclick="action()">
    <strong>Action Title</strong>
    <span>Description text</span>
</button>
```

**Styling Requirements**:
```css
.suggestion-card {
    background: white;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.suggestion-card:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.03);
    transform: translateY(-2px);
}

.suggestion-card strong {
    font-size: 12px;
    color: #0f172a;
    font-weight: 600;
}

.suggestion-card span {
    font-size: 11px;
    color: #94a3b8;
}
```

**Best Practices**:
- Max 4-6 suggestions per screen
- Clear action-oriented titles
- Descriptive subtitles
- Context-appropriate ordering

---

## Implementation Requirements

### Browser Compatibility
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- CSS Grid support required
- CSS Custom Properties support
- Smooth scrolling API

### Performance
- **Total file size**: ~100KB (HTML + CSS + JS combined)
- **Load time**: < 1 second
- **Animation frame rate**: 60fps
- **No external dependencies**: Pure vanilla JavaScript

### Responsive Breakpoints
```css
/* Desktop (default) */
@media (min-width: 1024px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
    /* Reduce widths by 20% */
    .site-agent { width: 720px; }
    .focus-box { width: 464px; }
}

/* Mobile */
@media (max-width: 767px) {
    /* Full-width layouts */
    .site-agent { width: calc(100vw - 32px); }
    .focus-box { width: calc(100vw - 32px); }
}
```

### Accessibility
- **Keyboard navigation**: All controls accessible via Tab
- **ARIA labels**: All interactive elements labeled
- **Color contrast**: WCAG AA compliant (4.5:1 minimum)
- **Focus indicators**: Visible focus states on all controls
- **Screen reader**: Semantic HTML structure

```html
<!-- Example ARIA implementation -->
<button
    class="control-btn control-expand"
    onclick="expand()"
    title="Expand"
    aria-label="Expand chat window"
>
    <svg aria-hidden="true">...</svg>
</button>
```

---

## Technical Specifications

### Typography
```css
font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Hierarchy */
h1, h2: 32-48px, font-weight: 700
Body: 14px, font-weight: 400
Small: 11-12px, font-weight: 500
```

### Color System
```css
/* Brand */
--primary: #0B3398;
--primary-hover: #1e40af;
--gradient: linear-gradient(135deg, #0B3398 0%, #1e40af 100%);

/* Neutrals */
--text-dark: #0f172a;
--text-medium: #475569;
--text-light: #64748b;
--text-muted: #94a3b8;

/* Backgrounds */
--bg-white: #ffffff;
--bg-light: #f8f9fa;
--bg-lighter: #f1f5f9;

/* Borders */
--border-light: #e2e8f0;
--border-medium: #cbd5e1;

/* States */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
```

### Shadows
```css
/* Elevation system */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);

/* Interactive */
--shadow-button: 0 8px 24px rgba(11, 51, 152, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-button-hover: 0 12px 40px rgba(11, 51, 152, 0.4);
```

### Animations
```css
/* Timing functions */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Durations */
--duration-fast: 0.2s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--duration-scroll: 0.8s;
```

---

## API Integration

### Position Control
```javascript
// Set agent position
function setPosition(position) {
    const widget = document.getElementById('showpilot-widget');
    widget.setAttribute('data-position', position);

    // Handle blur effect for Experience Viewer
    if (position === 'content-viewer') {
        document.body.classList.add('content-viewer-active');
    } else {
        document.body.classList.remove('content-viewer-active');
    }
}

// Available positions
const positions = [
    'chat-button',           // Chat Button
    'center-low-rectangle',  // Site Agent
    'center-midsize-square', // Focus Box
    'skyscraper',           // Skyscraper
    'full-height-center',   // Command Center
    'content-viewer'        // Experience Viewer
];
```

### Message System
```javascript
// Add AI message to chat
function addAgentMessage(text, suggestions = []) {
    const messagesContainer = document.querySelector('.chat-messages');

    const message = document.createElement('div');
    message.className = 'message message-ai';
    message.innerHTML = `
        <div class="message-avatar">
            <img src="[avatar-url]" alt="Agent">
        </div>
        <div class="message-content">
            <div class="message-bubble">${text}</div>
            ${suggestions.length > 0 ? createSuggestionCards(suggestions) : ''}
        </div>
    `;

    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Suggestion cards structure
function createSuggestionCards(suggestions) {
    return `
        <div class="suggestion-cards">
            ${suggestions.map(s => `
                <button class="suggestion-card" onclick="${s.action}">
                    <strong>${s.title}</strong>
                    <span>${s.description}</span>
                </button>
            `).join('')}
        </div>
    `;
}
```

### Event Hooks
```javascript
// Custom events for integration
const AgentEvents = {
    POSITION_CHANGE: 'agent:position:change',
    MESSAGE_SENT: 'agent:message:sent',
    SUGGESTION_CLICKED: 'agent:suggestion:clicked',
    VOICE_START: 'agent:voice:start',
    VOICE_END: 'agent:voice:end',
    NAVIGATION: 'agent:navigation',
    BOOKING_START: 'agent:booking:start'
};

// Listen for position changes
document.addEventListener(AgentEvents.POSITION_CHANGE, (e) => {
    console.log('Position changed to:', e.detail.position);
    // Your integration code
});

// Dispatch custom events
function dispatchAgentEvent(eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
}
```

---

## Quick Start

### Minimal Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Include showpilot-styles.css -->
</head>
<body>
    <!-- Agent container -->
    <div id="showpilot-widget" data-position="chat-button">
        <!-- Agent components -->
    </div>

    <!-- Include showpilot-agent.js -->
    <script>
        // Initialize agent
        ShowPilot.init({
            apiKey: 'your-api-key',
            agentId: 'your-agent-id',
            position: 'chat-button'
        });
    </script>
</body>
</html>
```

---

## Support

For implementation questions or feature requests:
- **Documentation**: [github.com/davidjhillis/agent_views](https://github.com/davidjhillis/agent_views)
- **Demo**: `showpilot-v5-refined.html`

---

**Last Updated**: December 15, 2025
**Version**: 5.0
**Status**: Production Ready
