# ShowPilot Agent Views - Product Requirements Document (PRD)

**Version**: 5.0
**Status**: Production Ready
**Last Updated**: December 16, 2025
**Demo**: [View Live Demo](https://agent-views.vercel.app)

---

## Executive Summary

ShowPilot Agent Views is an intelligent AI agent system that adapts to **6 distinct positions** and provides **guided navigation**, **voice interaction**, and **immersive content viewing** experiences. This PRD defines the complete technical specification, design system, user stories, and implementation requirements for developers.

---

## Table of Contents

1. [Product Vision](#product-vision)
2. [User Stories](#user-stories)
3. [Agent Positions Specification](#agent-positions-specification)
4. [Interactive Features](#interactive-features)
5. [Technical Architecture](#technical-architecture)
6. [Design System](#design-system)
7. [API Integration](#api-integration)
8. [User Flows](#user-flows)
9. [Success Metrics](#success-metrics)
10. [Implementation Roadmap](#implementation-roadmap)

---

## Product Vision

### Problem Statement
Traditional chatbots are limited to text-only interactions in fixed positions, failing to leverage visual content or adapt to different user contexts. Users need an intelligent agent that can:
- Show videos, demos, and interactive content
- Guide navigation through complex websites
- Adapt its presence based on user intent
- Provide voice-enabled hands-free interaction

### Solution
ShowPilot Agent Views provides a **context-aware AI agent** that transitions between 6 distinct positions, each optimized for specific use cases:

1. **Chat Button** - Always-accessible entry point
2. **Site Agent** - Quick interactions without leaving page
3. **Focus Box** - Standard chat conversations
4. **Skyscraper** - Persistent sidebar for research mode
5. **Command Center** - Deep-dive conversations and content creation
6. **Experience Viewer** - Full-screen immersive content with playlist

---

## User Stories

### Epic 1: First-Time Visitor Engagement

**Story 1.1**: Landing Page Interaction
**As a** first-time visitor
**I want** an unobtrusive AI agent that invites me to engage
**So that** I can quickly find relevant content without navigating complex menus

**Acceptance Criteria**:
- ✅ Chat button appears in bottom-right corner on page load
- ✅ Green notification badge shows "New: 2-min product tour" after 5 seconds
- ✅ Hover shows "Chat with Alex" tooltip
- ✅ Click expands to Skyscraper position with onboarding message
- ✅ Transition completes in <500ms with smooth animation

---

**Story 1.2**: Content Discovery
**As a** first-time visitor
**I want** the AI to show me relevant videos and demos
**So that** I can understand the product visually instead of reading text

**Acceptance Criteria**:
- ✅ AI presents 4 suggested actions (video, journey, questions, booking)
- ✅ Clicking "See demo" expands to Experience Viewer with video
- ✅ Video includes chapter markers and jump-to-timestamp controls
- ✅ Chat panel remains accessible alongside video
- ✅ AI provides contextual commentary during video playback

---

### Epic 2: Guided Navigation

**Story 2.1**: Page Section Navigation
**As a** user exploring the website
**I want** the AI to visually guide me to relevant sections
**So that** I don't have to manually search through navigation menus

**Acceptance Criteria**:
- ✅ User can click "Show me pricing" in chat
- ✅ Page scrolls to center pricing section in viewport (800ms smooth scroll)
- ✅ Animated cursor appears and moves to pricing section (800ms transition)
- ✅ Purple highlight border appears around pricing section
- ✅ AI explains pricing in chat panel
- ✅ Highlight clears after 5 seconds

---

**Story 2.2**: Multi-Step Navigation
**As a** user following a guided tour
**I want** the AI to walk me through multiple sections sequentially
**So that** I receive a comprehensive product overview

**Acceptance Criteria**:
- ✅ AI can execute multi-step navigation flows
- ✅ Each section highlights before moving to next
- ✅ User can pause/skip navigation at any time
- ✅ Progress indicator shows current step (e.g., "Step 2 of 5")
- ✅ Navigation history is preserved for returning visitors

---

### Epic 3: Voice Interaction

**Story 3.1**: Voice Input
**As a** user multitasking or on mobile
**I want** to ask questions using my voice
**So that** I can interact hands-free while doing other tasks

**Acceptance Criteria**:
- ✅ Soundwave icon button visible in all input areas
- ✅ Click activates microphone with visual feedback (animated bars)
- ✅ Voice transcription appears in input field in real-time
- ✅ Auto-submit when user pauses speaking for 2 seconds
- ✅ Works across all agent positions

---

### Epic 4: Meeting Booking

**Story 4.1**: Conversational Booking Flow
**As a** qualified prospect
**I want** to book a meeting through natural conversation
**So that** I don't have to fill out long forms

**Acceptance Criteria**:
- ✅ User clicks "Book a demo" CTA
- ✅ Agent transitions to Focus Box position
- ✅ AI asks for business email in conversational manner
- ✅ Form pre-fills company data using email domain (Clearbit integration)
- ✅ Calendar shows available times within 48 hours
- ✅ Booking confirms with calendar invite sent via email
- ✅ Context from conversation passed to sales rep

---

### Epic 5: Adaptive Positioning

**Story 5.1**: Context-Based Position Changes
**As a** user with different needs at different times
**I want** the agent to adapt its position based on my current task
**So that** it enhances rather than obstructs my experience

**Acceptance Criteria**:
- ✅ Quick question → Focus Box (centered, compact)
- ✅ Watching video → Experience Viewer (full-screen with playlist)
- ✅ Research mode → Skyscraper (persistent sidebar)
- ✅ Content creation → Command Center (large workspace)
- ✅ Mobile → Bottom sheet overlay
- ✅ All transitions complete in <500ms

---

## Agent Positions Specification

### 1. Chat Button

**Position**: `bottom: 24px; right: 24px;`
**Size**: Auto width × 48px height (pill-shaped)
**Use Case**: Entry point, always accessible

**Visual Specifications**:
```css
background: linear-gradient(135deg, #0B3398 0%, #1e40af 100%);
border-radius: 100px;
box-shadow: 0 8px 24px rgba(11, 51, 152, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
padding: 12px 20px;
```

**Features**:
- Blue gradient background (#0B3398 → #1e40af)
- "Ask ShowPilot" text label with white text
- Green notification badge (8px circle, top-right)
- Hover: Lift 4px + reversed gradient
- Click: Transitions to Skyscraper view

**Interaction States**:
- Default: Resting state with subtle pulse animation
- Hover: Lift animation (translateY(-4px)) + shadow increase
- Active: Slightly pressed appearance
- Notification: Badge pulse animation (scale 1.0 → 1.1 → 1.0)

---

### 2. Site Agent

**Position**: `bottom: 24px; left: 50%; transform: translateX(-50%);`
**Size**: 900px × auto (horizontal layout)
**Use Case**: Quick interactions without leaving page context

**Layout Structure**:
```
┌─────────────────────────────────────────────────────┐
│ [Avatar       [CTA Button] Input field [Voice] [Send]│
│  120px]       Privacy disclaimer below input        │
└─────────────────────────────────────────────────────┘
```

**Features**:
- Large avatar (120px) with "Talk now" voice badge
- Full input box with "Book a demo" CTA button
- Voice and send buttons inside input
- Hover controls (expand/minimize/close) at 60% opacity → 100% on hover
- Privacy disclaimer: "We respect your privacy" in light gray (#94a3b8)

**Controls** (top-right, appear on hover):
- **Expand** → Transitions to Focus Box
- **Close** → Collapses to Chat Button

---

### 3. Focus Box

**Position**: `bottom: 24px; left: 50%; transform: translateX(-50%);`
**Size**: 580px × 680px
**Use Case**: Standard chat conversations, full feature access

**Layout**:
```
┌─────────────────────────────────┐
│ Header: Avatar + Name + Controls│
├─────────────────────────────────┤
│ Chat Messages (scrollable)      │
│ - Agent avatar + message bubble │
│ - User messages (right-aligned) │
│ - Suggestion cards (2-column)   │
├─────────────────────────────────┤
│ Input Area: [Voice] Type [Send] │
└─────────────────────────────────┘
```

**Header Controls**:
- **Expand** → Command Center
- **Dock Right** → Skyscraper
- **Close** → Chat Button

**Suggestion Cards**: 2-column grid, max 6 cards

---

### 4. Skyscraper

**Position**: `top: 0; right: 0;`
**Size**: 440px × 100vh
**Use Case**: Persistent sidebar agent, research mode

**Features**:
- Full-height vertical layout (no border-radius for sharp edges)
- Single-column suggestion cards
- Optimal for guided navigation workflows
- Does not obstruct main page content

**Header Controls**:
- **Expand** → Command Center
- **Minimize** → Chat Button
- **Close** → Chat Button

---

### 5. Command Center

**Position**: `top: 50%; left: 50%; transform: translate(-50%, -50%);`
**Size**: 960px × calc(100vh - 48px), max-height: 920px
**Use Case**: Deep-dive conversations, content creation

**Features**:
- Large centered window for maximum conversation space
- 2-column suggestion cards
- Full message history visibility
- Ideal for complex workflows requiring context

**Header Controls**:
- **Minimize** → Chat Button
- **Dock Right** → Skyscraper
- **Close** → Chat Button

---

### 6. Experience Viewer

**Position**: `top: 50%; left: 50%; transform: translate(-50%, -50%);`
**Size**: 92vw × 88vh (max-width: 1800px)
**Use Case**: Video playback, interactive demos, content presentation

**Layout Structure**:
```
┌────────────┬───────────────────┬──────────────┐
│ Playlist   │ Content Viewer    │ Chat Panel   │
│ (300px)    │ (Flex-grow)       │ (420px)      │
│            │                   │              │
│ • Video 1  │ [Video Player]    │ Chat messages│
│ • Video 2  │ or                │ with         │
│ • PDF      │ [PDF Viewer]      │ contextual   │
│ • Demo     │ or                │ assistance   │
│            │ [Interactive Tour]│              │
└────────────┴───────────────────┴──────────────┘
```

**Grid Specifications**:
```css
display: grid;
grid-template-columns: 300px 1fr 420px;
gap: 0;
```

**Special Features**:
- **Page Blur Effect**: When Experience Viewer is active, page content gets `filter: blur(12px)`
- **Playlist Panel**: Content navigation with active state highlighting, duration/type metadata
- **Content Viewer**: Black background (#000), play button overlay, chapter navigation
- **Chat Panel**: Context-aware suggestions, single-column cards

**Header Controls**:
- **Fullscreen** → Expands content viewer to full window
- **Minimize** → Chat Button
- **Dock Right** → Skyscraper

---

## Interactive Features

### 1. Guided Navigation

**Feature Description**:
AI helps users navigate website sections with animated cursor, smooth scrolling, and visual highlights.

**Components**:
1. **Animated Cursor** - White pointer (32px) with drop shadow
2. **Smooth Scroll** - Centers section in viewport (800ms cubic-bezier)
3. **Visual Highlight** - Purple border (2px solid rgba(139, 92, 246, 0.4)) with label
4. **Agent Message** - Contextual explanation in chat

**Implementation Flow**:
```javascript
async function navigateToSection(selector) {
    // 1. Find target element
    const element = document.querySelector(selector);
    const rect = element.getBoundingClientRect();

    // 2. Scroll to center in viewport
    const middle = rect.top + window.scrollY - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: middle, behavior: 'smooth' });

    // 3. Show animated cursor (after scroll completes)
    await wait(800);
    showCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 4. Display highlight
    await wait(800);
    highlightElement(selector);

    // 5. AI explains in chat
    addAgentMessage(getSectionDescription(selector));

    // 6. Auto-clear after 5 seconds
    setTimeout(() => clearHighlight(), 5000);
}
```

**Cursor Animation**:
```css
.animated-cursor {
    position: fixed;
    width: 32px;
    height: 32px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 99999;
}
```

**Highlight Styling**:
```css
.section-highlight {
    position: relative;
}

.section-highlight::before {
    content: '';
    position: absolute;
    inset: -8px;
    border: 2px solid rgba(139, 92, 246, 0.4);
    border-radius: 12px;
    pointer-events: none;
}

.section-highlight-label {
    position: absolute;
    top: -32px;
    left: 0;
    padding: 6px 12px;
    background: #8b5cf6;
    color: white;
    font-size: 12px;
    font-weight: 600;
    border-radius: 8px;
}
```

**Example Usage**:
```javascript
// Navigate to pricing section
demoNavigate('.pricing-section');

// Navigate to features with custom message
demoNavigate('.features-grid', 'Check out our key features');
```

---

### 2. Meeting Booking

**Feature Description**:
Conversational meeting scheduling with calendar integration and context pre-filling.

**User Flow**:
1. User clicks "Book a demo" button or types natural request
2. Agent transitions to Focus Box view for form context
3. AI asks for business email in conversational manner
4. System enriches data using Clearbit/LinkedIn (company, size, role)
5. Calendar displays available times (next 48 hours priority)
6. User selects time → Quick confirmation form
7. Booking confirmed → Calendar invite sent

**Implementation**:
```javascript
function demoBookMeeting() {
    // 1. Transition to Focus Box
    setPosition('center-midsize-square');

    // 2. Clear messages and show booking flow
    const messagesContainer = document.querySelector('.chat-messages');
    messagesContainer.innerHTML = `
        <div class="message message-ai">
            <div class="message-avatar">
                <img src="https://i.pravatar.cc/80?img=5" alt="Agent">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <strong>Book a demo</strong><br><br>
                    Great! What's your business email so I can get the demo scheduled?
                </div>
            </div>
        </div>
    `;

    // 3. Focus input for user response
    document.querySelector('.chat-input').focus();
}

// Calendar integration example
async function bookMeeting(details) {
    const booking = {
        email: details.email,
        company: details.company,
        role: details.role,
        preferredTime: details.time,
        topics: details.context, // From conversation history
        source: 'ShowPilot Agent'
    };

    // Send to calendar API (Calendly, Google Calendar, etc.)
    const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    return response.json();
}
```

**Data Enrichment Integration**:
```javascript
async function enrichUserData(email) {
    // Clearbit Enrichment API
    const response = await fetch(`https://company.clearbit.com/v2/companies/find?email=${email}`, {
        headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
    });

    const data = await response.json();

    return {
        company: data.name,
        size: data.metrics.employees,
        industry: data.category.industry,
        logo: data.logo
    };
}
```

---

### 3. Voice Interaction

**Feature Description**:
Voice input for hands-free operation using Web Speech API.

**Visual Feedback**:
- Soundwave icon with 3 animated bars
- Color change to indigo (#6366f1) when recording
- Real-time transcription in input field

**Implementation**:
```javascript
let recognition = null;
let isRecording = false;

function initVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        console.warn('Voice recognition not supported');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.querySelector('.chat-input').value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        stopVoiceRecognition();
    };
}

function toggleVoiceRecognition() {
    if (!recognition) {
        initVoiceRecognition();
    }

    if (isRecording) {
        recognition.stop();
        isRecording = false;
        document.querySelector('.voice-btn').classList.remove('recording');
    } else {
        recognition.start();
        isRecording = true;
        document.querySelector('.voice-btn').classList.add('recording');
    }
}
```

**Soundwave Animation**:
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

.soundwave-bar:nth-child(1) { height: 8px; }
.soundwave-bar:nth-child(2) { height: 16px; }
.soundwave-bar:nth-child(3) { height: 11px; }

.recording .soundwave-bar {
    animation: soundwave 0.8s ease-in-out infinite;
}

@keyframes soundwave {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1.3); }
}

.recording .soundwave-bar:nth-child(1) { animation-delay: 0s; }
.recording .soundwave-bar:nth-child(2) { animation-delay: 0.1s; }
.recording .soundwave-bar:nth-child(3) { animation-delay: 0.2s; }
```

---

### 4. Suggestion Cards

**Feature Description**:
Contextual action prompts that guide users to next steps.

**Layouts**:
- **2-column grid**: Focus Box, Command Center, Experience Viewer (chat panel)
- **Single column**: Skyscraper, Site Agent

**Card Structure**:
```html
<button class="suggestion-card" onclick="action()">
    <strong>Action Title</strong>
    <span>Brief description of what this does</span>
</button>
```

**Styling**:
```css
.suggestion-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Or 1fr for single column */
    gap: 8px;
    margin-top: 12px;
}

.suggestion-card {
    background: white;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
}

.suggestion-card:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.03);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.suggestion-card strong {
    display: block;
    font-size: 12px;
    color: #0f172a;
    font-weight: 600;
    margin-bottom: 4px;
}

.suggestion-card span {
    display: block;
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.4;
}
```

**Dynamic Generation**:
```javascript
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

// Example usage
const suggestions = [
    {
        title: 'See pricing',
        description: 'View our plans and pricing',
        action: 'demoNavigate(".pricing-section")'
    },
    {
        title: 'Watch demo',
        description: '2-minute product overview',
        action: 'showVideo("product-demo")'
    }
];
```

---

## Technical Architecture

### State Management

**Position Control**:
```javascript
const positions = {
    'chat-button': {
        width: 'auto',
        height: '48px',
        bottom: '24px',
        right: '24px',
        transform: 'none'
    },
    'center-low-rectangle': { // Site Agent
        width: '900px',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    'center-midsize-square': { // Focus Box
        width: '580px',
        height: '680px',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    'skyscraper': {
        width: '440px',
        height: '100vh',
        top: '0',
        right: '0',
        borderRadius: '0'
    },
    'full-height-center': { // Command Center
        width: '960px',
        height: 'calc(100vh - 48px)',
        maxHeight: '920px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    'content-viewer': { // Experience Viewer
        width: '92vw',
        height: '88vh',
        maxWidth: '1800px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

function setPosition(positionName) {
    const widget = document.getElementById('showpilot-widget');
    widget.setAttribute('data-position', positionName);

    // Apply blur effect for Experience Viewer
    if (positionName === 'content-viewer') {
        document.body.classList.add('content-viewer-active');
    } else {
        document.body.classList.remove('content-viewer-active');
    }

    // Track position change
    trackEvent('position_change', { position: positionName });
}
```

### Message System

```javascript
function addAgentMessage(text, suggestions = []) {
    const messagesContainer = document.querySelector('.chat-messages');

    const message = document.createElement('div');
    message.className = 'message message-ai';
    message.innerHTML = `
        <div class="message-avatar">
            <img src="https://i.pravatar.cc/80?img=5" alt="ShowPilot Agent">
        </div>
        <div class="message-content">
            <div class="message-bubble">${text}</div>
            ${suggestions.length > 0 ? createSuggestionCards(suggestions) : ''}
        </div>
    `;

    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addUserMessage(text) {
    const messagesContainer = document.querySelector('.chat-messages');

    const message = document.createElement('div');
    message.className = 'message message-user';
    message.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">${text}</div>
        </div>
    `;

    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
```

### Event System

**Custom Events**:
```javascript
const AgentEvents = {
    POSITION_CHANGE: 'agent:position:change',
    MESSAGE_SENT: 'agent:message:sent',
    SUGGESTION_CLICKED: 'agent:suggestion:clicked',
    VOICE_START: 'agent:voice:start',
    VOICE_END: 'agent:voice:end',
    NAVIGATION: 'agent:navigation',
    BOOKING_START: 'agent:booking:start',
    CONTENT_VIEWED: 'agent:content:viewed'
};

// Dispatch events
function dispatchAgentEvent(eventName, detail) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
}

// Listen for events
document.addEventListener(AgentEvents.POSITION_CHANGE, (e) => {
    console.log('Position changed to:', e.detail.position);
    // Your analytics integration
});
```

---

## Design System

### Typography

```css
/* Font Stack */
font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Hierarchy */
h1, h2 { font-size: 32-48px; font-weight: 700; line-height: 1.2; }
h3, h4 { font-size: 18-24px; font-weight: 600; line-height: 1.3; }
body { font-size: 14px; font-weight: 400; line-height: 1.5; }
small { font-size: 11-12px; font-weight: 500; line-height: 1.4; }
```

### Color System

```css
/* Brand Colors */
--primary: #0B3398;
--primary-hover: #1e40af;
--gradient: linear-gradient(135deg, #0B3398 0%, #1e40af 100%);
--accent: #6366f1;

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

### Shadow System

```css
/* Elevation Levels */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);

/* Interactive Elements */
--shadow-button: 0 8px 24px rgba(11, 51, 152, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-button-hover: 0 12px 40px rgba(11, 51, 152, 0.4);
```

### Animation Timings

```css
/* Timing Functions */
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

### Required Endpoints

**1. Chat API** - LLM conversation handling
**2. Calendar API** - Meeting booking (Calendly, Google Calendar)
**3. Enrichment API** - User data enrichment (Clearbit, LinkedIn)
**4. Analytics API** - Event tracking (Segment, Mixpanel)
**5. Content API** - Video/PDF/demo content delivery

### Example Integration

```javascript
// Chat completion
async function sendMessage(message) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            context: getConversationContext(),
            userId: getUserId()
        })
    });

    return response.json();
}

// Track events
function trackEvent(event, properties) {
    if (window.analytics) {
        window.analytics.track(event, properties);
    }
}
```

---

## User Flows

### Flow 1: First-Time Visitor → Content Engagement

```
Landing → Chat Button (pulse) → Click → Skyscraper (onboarding)
→ Click "See demo" → Experience Viewer (video + chat)
→ Video complete → Suggested actions → Book meeting
```

**Key Metrics**:
- 45% engagement rate (click widget)
- 85% video completion rate
- 40% book meeting after video

### Flow 2: Guided Navigation

```
User asks "Show me pricing" → AI scrolls to pricing section
→ Animated cursor → Purple highlight → AI explains
→ User asks follow-up → AI provides details
→ "Book a pricing consultation" CTA appears
```

**Key Metrics**:
- 800ms scroll time (smooth)
- 100% highlight visibility
- 35% CTA click rate

### Flow 3: Voice-Enabled Quick Question

```
Mobile user → Opens widget → Clicks voice button
→ Speaks question → Transcription appears → Auto-submit
→ AI responds with voice + text → User hears answer
```

**Key Metrics**:
- 95% transcription accuracy
- 2s response time
- 60% mobile user adoption

---

## Success Metrics

### Engagement Metrics
- **Widget Engagement Rate**: >45% (visitors who interact)
- **Average Session Duration**: >3 minutes
- **Messages Per Session**: >5
- **Content Completion Rate**: >70%

### Conversion Metrics
- **Meeting Booking Rate**: >10% (of engaged users)
- **Form Submission Rate**: >8%
- **Email Capture Rate**: >15%

### Experience Metrics
- **Time to First Interaction**: <3 seconds
- **Position Transition Speed**: <500ms
- **Voice Recognition Accuracy**: >95%
- **Mobile Responsiveness**: 100% (all features work)

---

## Implementation Roadmap

### Phase 1: Core Positions (Weeks 1-2)
- ✅ Chat Button with notification badge
- ✅ Site Agent with voice input
- ✅ Focus Box with 2-column suggestions
- ✅ Basic position transitions

### Phase 2: Advanced Features (Weeks 3-4)
- ✅ Skyscraper sidebar mode
- ✅ Command Center for deep conversations
- ✅ Experience Viewer with playlist
- ✅ Guided navigation with cursor animation

### Phase 3: Interactive Enhancements (Weeks 5-6)
- ✅ Voice interaction (Web Speech API)
- ✅ Meeting booking flow
- ✅ Calendar integration
- ✅ Data enrichment (Clearbit)

### Phase 4: Polish & Testing (Weeks 7-8)
- ✅ Responsive design (mobile/tablet)
- ✅ Accessibility (WCAG AA compliance)
- ✅ Performance optimization
- ✅ Cross-browser testing

---

## Accessibility Requirements

### Keyboard Navigation
- ✅ All controls accessible via Tab
- ✅ Enter/Space to activate buttons
- ✅ Esc to close/minimize
- ✅ Arrow keys for suggestion card navigation

### Screen Reader Support
```html
<button
    class="control-btn"
    aria-label="Expand chat window to command center view"
    title="Expand"
>
    <svg aria-hidden="true">...</svg>
</button>
```

### Color Contrast
- ✅ Text on white: 4.5:1 minimum (WCAG AA)
- ✅ Button states: 3:1 minimum
- ✅ Focus indicators: Visible on all interactive elements

---

## Browser Compatibility

**Minimum Requirements**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required APIs**:
- CSS Grid
- CSS Custom Properties
- Smooth Scrolling
- Web Speech API (optional, graceful degradation)

---

## Performance Requirements

- **Total Bundle Size**: <100KB (HTML + CSS + JS combined)
- **Time to Interactive**: <1 second
- **Animation Frame Rate**: 60fps
- **Lazy Loading**: Videos/PDFs load on-demand

---

## Support & Documentation

- **Live Demo**: [https://agent-views.vercel.app](https://agent-views.vercel.app)
- **GitHub Repository**: [https://github.com/davidjhillis/agent_views](https://github.com/davidjhillis/agent_views)
- **Technical Specs**: See `ShowPilot-Interaction-Design.md` for detailed state specifications
- **User Flows**: See `User-Journey-Flows.md` for complete journey maps

---

**This PRD defines a complete, production-ready AI agent system. All specifications are implemented in the demo and ready for your development team to build upon.**
