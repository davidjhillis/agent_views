# ShowPilot Design System Specifications
## Implementation-Ready Design Specs

---

## 🎨 Color System

### Primary Palette
```css
/* Brand Colors (Client-Customizable) */
--sp-primary-500: #4F46E5;           /* Indigo - Main brand */
--sp-primary-600: #4338CA;           /* Indigo - Hover state */
--sp-primary-700: #3730A3;           /* Indigo - Active state */
--sp-primary-400: #6366F1;           /* Indigo - Light accent */
--sp-primary-300: #818CF8;           /* Indigo - Lighter */

/* AI Agent Colors */
--sp-ai-500: #8B5CF6;                /* Purple - AI persona */
--sp-ai-600: #7C3AED;                /* Purple - Hover */
--sp-ai-gradient: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);

/* Semantic Colors */
--sp-success: #10B981;               /* Green - Success states */
--sp-warning: #F59E0B;               /* Amber - Warning states */
--sp-error: #EF4444;                 /* Red - Error states */
--sp-info: #3B82F6;                  /* Blue - Info states */

/* Neutral Palette */
--sp-gray-50: #F9FAFB;               /* Backgrounds */
--sp-gray-100: #F3F4F6;              /* Subtle backgrounds */
--sp-gray-200: #E5E7EB;              /* Borders */
--sp-gray-300: #D1D5DB;              /* Disabled elements */
--sp-gray-400: #9CA3AF;              /* Placeholders */
--sp-gray-500: #6B7280;              /* Secondary text */
--sp-gray-600: #4B5563;              /* Primary text */
--sp-gray-700: #374151;              /* Headings */
--sp-gray-800: #1F2937;              /* Dark text */
--sp-gray-900: #111827;              /* Darkest */

/* White & Black */
--sp-white: #FFFFFF;
--sp-black: #000000;
```

### Usage Guidelines
```css
/* Backgrounds */
.widget-background { background: var(--sp-white); }
.chat-background { background: var(--sp-gray-50); }
.content-background { background: var(--sp-gray-900); }

/* Text */
.text-primary { color: var(--sp-gray-900); }
.text-secondary { color: var(--sp-gray-600); }
.text-disabled { color: var(--sp-gray-400); }

/* Borders */
.border-default { border-color: var(--sp-gray-200); }
.border-focus { border-color: var(--sp-primary-500); }

/* Buttons */
.btn-primary {
  background: var(--sp-primary-500);
  color: var(--sp-white);
}
.btn-primary:hover {
  background: var(--sp-primary-600);
}
```

---

## 📐 Spacing Scale

### Base Unit: 4px
```css
--sp-spacing-0: 0;
--sp-spacing-1: 4px;     /* 0.25rem */
--sp-spacing-2: 8px;     /* 0.5rem */
--sp-spacing-3: 12px;    /* 0.75rem */
--sp-spacing-4: 16px;    /* 1rem */
--sp-spacing-5: 20px;    /* 1.25rem */
--sp-spacing-6: 24px;    /* 1.5rem */
--sp-spacing-8: 32px;    /* 2rem */
--sp-spacing-10: 40px;   /* 2.5rem */
--sp-spacing-12: 48px;   /* 3rem */
--sp-spacing-16: 64px;   /* 4rem */
--sp-spacing-20: 80px;   /* 5rem */
```

### Component Spacing
```css
/* Message Bubbles */
.message-padding: var(--sp-spacing-4) var(--sp-spacing-5);
.message-gap: var(--sp-spacing-3);

/* Content Viewer */
.viewer-padding: var(--sp-spacing-6);
.viewer-header: var(--sp-spacing-4);

/* Widget Container */
.widget-padding: var(--sp-spacing-6);
.widget-gap: var(--sp-spacing-4);
```

---

## 📝 Typography

### Font Family
```css
--sp-font-sans: 'Inter', -apple-system, BlinkMacSystemFont,
                'Segoe UI', 'Roboto', 'Helvetica Neue', Arial,
                sans-serif;
--sp-font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
```

### Font Sizes
```css
--sp-text-xs: 12px;      /* 0.75rem - Labels, captions */
--sp-text-sm: 14px;      /* 0.875rem - Body small */
--sp-text-base: 16px;    /* 1rem - Body default */
--sp-text-lg: 18px;      /* 1.125rem - Emphasized text */
--sp-text-xl: 20px;      /* 1.25rem - Subheadings */
--sp-text-2xl: 24px;     /* 1.5rem - Headings */
--sp-text-3xl: 30px;     /* 1.875rem - Large headings */
```

### Font Weights
```css
--sp-font-normal: 400;
--sp-font-medium: 500;
--sp-font-semibold: 600;
--sp-font-bold: 700;
```

### Line Heights
```css
--sp-leading-tight: 1.25;   /* Headings */
--sp-leading-normal: 1.5;   /* Body text */
--sp-leading-relaxed: 1.75; /* Comfortable reading */
```

### Typography Classes
```css
/* Headings */
.heading-1 {
  font-size: var(--sp-text-3xl);
  font-weight: var(--sp-font-bold);
  line-height: var(--sp-leading-tight);
  color: var(--sp-gray-900);
}

.heading-2 {
  font-size: var(--sp-text-2xl);
  font-weight: var(--sp-font-semibold);
  line-height: var(--sp-leading-tight);
  color: var(--sp-gray-900);
}

/* Body Text */
.body-large {
  font-size: var(--sp-text-lg);
  line-height: var(--sp-leading-normal);
  color: var(--sp-gray-700);
}

.body-default {
  font-size: var(--sp-text-base);
  line-height: var(--sp-leading-normal);
  color: var(--sp-gray-700);
}

.body-small {
  font-size: var(--sp-text-sm);
  line-height: var(--sp-leading-normal);
  color: var(--sp-gray-600);
}

/* Labels */
.label {
  font-size: var(--sp-text-sm);
  font-weight: var(--sp-font-medium);
  color: var(--sp-gray-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Captions */
.caption {
  font-size: var(--sp-text-xs);
  color: var(--sp-gray-500);
  line-height: var(--sp-leading-normal);
}
```

---

## 🎭 Components

### 1. Widget Badge (Minimized State)

#### Desktop
```css
.widget-badge {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: var(--sp-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 9999;
}

.widget-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.widget-badge-avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin: 8px;
}

.widget-badge-status {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  background: var(--sp-success);
  border: 2px solid var(--sp-white);
  border-radius: 6px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.widget-badge-notification {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--sp-error);
  color: var(--sp-white);
  font-size: var(--sp-text-xs);
  font-weight: var(--sp-font-semibold);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

#### Mobile
```css
@media (max-width: 767px) {
  .widget-badge {
    bottom: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
  }

  .widget-badge-avatar {
    width: 40px;
    height: 40px;
  }
}
```

---

### 2. Widget Modal (Expanded)

#### Desktop
```css
.widget-modal {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 480px;
  max-height: 720px;
  background: var(--sp-white);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12),
              0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Header */
.widget-header {
  padding: var(--sp-spacing-4) var(--sp-spacing-5);
  border-bottom: 1px solid var(--sp-gray-200);
  background: var(--sp-white);
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-3);
}

.widget-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  flex-shrink: 0;
}

.widget-header-info {
  flex: 1;
  min-width: 0;
}

.widget-header-title {
  font-size: var(--sp-text-base);
  font-weight: var(--sp-font-semibold);
  color: var(--sp-gray-900);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.widget-header-subtitle {
  font-size: var(--sp-text-sm);
  color: var(--sp-gray-500);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-2);
}

.widget-header-actions {
  display: flex;
  gap: var(--sp-spacing-2);
}

.widget-header-action {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--sp-gray-500);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease;
}

.widget-header-action:hover {
  background: var(--sp-gray-100);
  color: var(--sp-gray-700);
}

/* Body */
.widget-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-spacing-6);
  background: var(--sp-gray-50);
}

/* Footer (Input Area) */
.widget-footer {
  padding: var(--sp-spacing-4) var(--sp-spacing-5);
  border-top: 1px solid var(--sp-gray-200);
  background: var(--sp-white);
}
```

#### Tablet
```css
@media (max-width: 1023px) {
  .widget-modal {
    width: 420px;
    max-height: 640px;
  }
}
```

#### Mobile
```css
@media (max-width: 767px) {
  .widget-modal {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
    animation: slideUpMobile 0.3s ease-out;
  }

  @keyframes slideUpMobile {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
}
```

---

### 3. Message Bubbles

#### AI Message
```css
.message-ai {
  display: flex;
  gap: var(--sp-spacing-3);
  margin-bottom: var(--sp-spacing-4);
  align-items: flex-start;
}

.message-ai-avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  flex-shrink: 0;
  background: var(--sp-ai-gradient);
}

.message-ai-content {
  max-width: 75%;
}

.message-ai-bubble {
  background: var(--sp-white);
  color: var(--sp-gray-900);
  padding: var(--sp-spacing-3) var(--sp-spacing-4);
  border-radius: 16px 16px 16px 4px;
  font-size: var(--sp-text-base);
  line-height: var(--sp-leading-normal);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-ai-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-2);
  margin-top: var(--sp-spacing-1);
  padding-left: var(--sp-spacing-4);
}

.message-ai-name {
  font-size: var(--sp-text-sm);
  font-weight: var(--sp-font-medium);
  color: var(--sp-gray-700);
}

.message-ai-time {
  font-size: var(--sp-text-xs);
  color: var(--sp-gray-500);
}
```

#### User Message
```css
.message-user {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--sp-spacing-4);
}

.message-user-bubble {
  background: var(--sp-primary-500);
  color: var(--sp-white);
  padding: var(--sp-spacing-3) var(--sp-spacing-4);
  border-radius: 16px 16px 4px 16px;
  max-width: 75%;
  font-size: var(--sp-text-base);
  line-height: var(--sp-leading-normal);
}

.message-user-meta {
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-2);
  justify-content: flex-end;
  margin-top: var(--sp-spacing-1);
  padding-right: var(--sp-spacing-4);
}

.message-user-time {
  font-size: var(--sp-text-xs);
  color: var(--sp-gray-500);
}

.message-user-status {
  width: 16px;
  height: 16px;
  color: var(--sp-success);
}
```

#### Typing Indicator
```css
.message-typing {
  display: flex;
  gap: var(--sp-spacing-3);
  align-items: center;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: var(--sp-spacing-3) var(--sp-spacing-4);
  background: var(--sp-white);
  border-radius: 16px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: var(--sp-gray-400);
  border-radius: 50%;
  animation: typingDot 1.4s infinite;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingDot {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
```

---

### 4. Buttons

#### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-spacing-2);
  padding: var(--sp-spacing-3) var(--sp-spacing-5);
  background: var(--sp-primary-500);
  color: var(--sp-white);
  font-size: var(--sp-text-base);
  font-weight: var(--sp-font-medium);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-primary:hover {
  background: var(--sp-primary-600);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:active {
  background: var(--sp-primary-700);
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-primary:disabled {
  background: var(--sp-gray-300);
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  padding: var(--sp-spacing-3) var(--sp-spacing-5);
  background: var(--sp-white);
  color: var(--sp-gray-700);
  border: 1px solid var(--sp-gray-300);
  border-radius: 8px;
  font-size: var(--sp-text-base);
  font-weight: var(--sp-font-medium);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-secondary:hover {
  background: var(--sp-gray-50);
  border-color: var(--sp-gray-400);
  transform: translateY(-1px);
}
```

#### Suggestion Button
```css
.btn-suggestion {
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-3);
  width: 100%;
  padding: var(--sp-spacing-4) var(--sp-spacing-5);
  background: var(--sp-white);
  color: var(--sp-gray-900);
  border: 1px solid var(--sp-gray-200);
  border-radius: 12px;
  font-size: var(--sp-text-base);
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-suggestion:hover {
  background: var(--sp-primary-50);
  border-color: var(--sp-primary-200);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.btn-suggestion-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.btn-suggestion-text {
  flex: 1;
}
```

---

### 5. Input Field

```css
.input-container {
  position: relative;
  display: flex;
  gap: var(--sp-spacing-2);
  padding: var(--sp-spacing-3);
  background: var(--sp-white);
  border: 1px solid var(--sp-gray-200);
  border-radius: 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input-container:focus-within {
  border-color: var(--sp-primary-500);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-field {
  flex: 1;
  padding: var(--sp-spacing-2);
  border: none;
  background: transparent;
  font-size: var(--sp-text-base);
  color: var(--sp-gray-900);
  outline: none;
  resize: none;
  max-height: 120px;
}

.input-field::placeholder {
  color: var(--sp-gray-400);
}

.input-actions {
  display: flex;
  gap: var(--sp-spacing-2);
  align-items: flex-end;
}

.input-action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--sp-gray-500);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.input-action-btn:hover {
  background: var(--sp-gray-100);
  color: var(--sp-gray-700);
}

.input-send-btn {
  background: var(--sp-primary-500);
  color: var(--sp-white);
}

.input-send-btn:hover {
  background: var(--sp-primary-600);
}

.input-send-btn:disabled {
  background: var(--sp-gray-300);
  cursor: not-allowed;
}
```

---

### 6. Split-Screen Layout

```css
.split-screen {
  display: grid;
  grid-template-columns: 70fr 30fr;
  height: 720px;
  background: var(--sp-white);
  border-radius: 16px;
  overflow: hidden;
  animation: expandSplit 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes expandSplit {
  from { grid-template-columns: 0fr 100fr; }
  to { grid-template-columns: 70fr 30fr; }
}

.split-screen-content {
  background: var(--sp-gray-900);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.split-screen-chat {
  background: var(--sp-white);
  border-left: 1px solid var(--sp-gray-200);
  display: flex;
  flex-direction: column;
}

/* With Journey Sidebar */
.split-screen-with-journey {
  grid-template-columns: 20fr 60fr 20fr;
}

.journey-sidebar {
  background: var(--sp-gray-50);
  border-right: 1px solid var(--sp-gray-200);
  overflow-y: auto;
  padding: var(--sp-spacing-4);
}
```

---

### 7. Content Viewer

```css
.content-viewer {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--sp-gray-900);
}

.content-viewer-header {
  padding: var(--sp-spacing-4);
  background: rgba(0, 0, 0, 0.5);
  color: var(--sp-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
}

.content-viewer-title {
  font-size: var(--sp-text-lg);
  font-weight: var(--sp-font-semibold);
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-2);
}

.content-viewer-actions {
  display: flex;
  gap: var(--sp-spacing-2);
}

.content-viewer-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Video Player */
.video-player {
  width: 100%;
  height: 100%;
  background: #000;
}

/* PDF Viewer */
.pdf-viewer {
  width: 100%;
  height: 100%;
  background: var(--sp-white);
  overflow-y: auto;
}

.pdf-page {
  max-width: 100%;
  margin: 0 auto;
  padding: var(--sp-spacing-6);
}

/* Interactive Tour */
.tour-viewer {
  width: 100%;
  height: 100%;
  background: var(--sp-white);
  position: relative;
}

.tour-hotspot {
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--sp-primary-500);
  border-radius: 50%;
  animation: pulse 2s infinite;
  cursor: pointer;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(79, 70, 229, 0);
  }
}
```

---

### 8. Journey Progress

```css
.journey-item {
  padding: var(--sp-spacing-3);
  margin-bottom: var(--sp-spacing-2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: var(--sp-spacing-3);
  cursor: pointer;
  transition: background 0.15s ease;
}

.journey-item:hover {
  background: var(--sp-gray-100);
}

.journey-item-status {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--sp-text-sm);
}

.journey-item-completed {
  color: var(--sp-success);
}

.journey-item-current {
  color: var(--sp-primary-500);
}

.journey-item-pending {
  color: var(--sp-gray-400);
}

.journey-item-content {
  flex: 1;
  min-width: 0;
}

.journey-item-title {
  font-size: var(--sp-text-sm);
  font-weight: var(--sp-font-medium);
  color: var(--sp-gray-900);
  margin: 0 0 var(--sp-spacing-1) 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.journey-item-duration {
  font-size: var(--sp-text-xs);
  color: var(--sp-gray-500);
}

.journey-progress-bar {
  width: 100%;
  height: 4px;
  background: var(--sp-gray-200);
  border-radius: 2px;
  overflow: hidden;
  margin-top: var(--sp-spacing-4);
}

.journey-progress-fill {
  height: 100%;
  background: var(--sp-primary-500);
  transition: width 0.3s ease;
}
```

---

## ⚡ Animations & Transitions

### Standard Transitions
```css
/* Duration */
--sp-duration-fast: 0.15s;
--sp-duration-normal: 0.3s;
--sp-duration-slow: 0.5s;

/* Easing */
--sp-ease-in: cubic-bezier(0.4, 0, 1, 1);
--sp-ease-out: cubic-bezier(0, 0, 0.2, 1);
--sp-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--sp-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Loading States
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--sp-gray-200);
  border-top-color: var(--sp-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--sp-gray-200) 25%,
    var(--sp-gray-100) 50%,
    var(--sp-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Breakpoints */
--sp-screen-sm: 640px;    /* Mobile landscape */
--sp-screen-md: 768px;    /* Tablet portrait */
--sp-screen-lg: 1024px;   /* Tablet landscape */
--sp-screen-xl: 1280px;   /* Desktop */

/* Media Queries */
@media (max-width: 767px) {
  /* Mobile styles */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

---

## ♿ Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--sp-primary-500);
  outline-offset: 2px;
}

button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--sp-primary-500);
  outline-offset: 2px;
}
```

### ARIA Labels
```html
<!-- Widget Badge -->
<button
  class="widget-badge"
  aria-label="Open ShowPilot assistant"
  aria-expanded="false"
>
  <img src="avatar.png" alt="Alex, your ShowPilot guide" />
</button>

<!-- Message -->
<div
  class="message-ai"
  role="article"
  aria-label="Message from Alex"
>
  <div class="message-ai-bubble">
    Hello! How can I help?
  </div>
</div>

<!-- Input Field -->
<textarea
  class="input-field"
  placeholder="Type your message..."
  aria-label="Chat message input"
  rows="1"
></textarea>
```

### Keyboard Navigation
```css
/* Ensure tab order makes sense */
.widget-modal {
  /* Focus trap when modal is open */
}

/* Skip to main content */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--sp-primary-500);
  color: var(--sp-white);
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## 🎯 Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Set up CSS variables for colors, spacing, typography
- [ ] Create base button components
- [ ] Build message bubble components
- [ ] Implement widget badge (minimized state)

### Phase 2: Core Interface (Week 2)
- [ ] Build widget modal container
- [ ] Create header with avatar and controls
- [ ] Implement chat message list
- [ ] Build input field with actions

### Phase 3: Advanced Features (Week 3)
- [ ] Implement split-screen layout
- [ ] Build content viewer (video, PDF, tour)
- [ ] Create journey sidebar and progress
- [ ] Add all animations and transitions

### Phase 4: Polish (Week 4)
- [ ] Responsive breakpoints and mobile optimization
- [ ] Accessibility audit and fixes
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Cross-browser testing

---

*These specifications provide everything needed for pixel-perfect implementation of the ShowPilot UX design.*
