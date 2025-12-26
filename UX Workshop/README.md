# Agent Views - ShowPilot with LiveAvatar Demo

Interactive demo showcasing ShowPilot's AI agent interface across 6 different positions with **Tavus LiveAvatar** integration.

## Features

### 6 Agent Positions
1. **Chat Button** - Compact pill-shaped button (bottom-right)
2. **Center Low Rectangle** - Horizontal input bar with avatar
3. **Center Midsize Square** - Medium-sized chat window
4. **Skyscraper** - Full-height sidebar (right edge)
5. **Full Height Center** - Large centered chat window
6. **Content Viewer** - Full-screen experience with playlist and video

### Interactive Demos

#### Book Meeting Flow
- Conversational booking interface
- Email collection workflow
- Natural language interaction

#### Page Navigation with Highlights
- Animated cursor guides user attention
- Smooth scroll to section center
- Visual highlights with purple borders
- AI agent explains each section

### Design Features

- **Modern UI** - Clean white background with soft shadows
- **Geist Font** - Professional typography from Google Fonts
- **Brand Color** - #0B3398 (ShowPilot blue)
- **Voice Interaction** - Soundwave icons and voice input
- **Responsive** - Desktop, tablet, and mobile views
- **Smooth Animations** - CSS transitions and transforms

### Tavus LiveAvatar Integration 🎥

- **Real-time AI Avatar** - Interactive digital human powered by Tavus
- **Voice Interaction** - Natural voice conversations with the avatar (Luna replica)
- **Technical Co-Pilot Persona** - AI assistant optimized for technical guidance
- **Toggle Control** - Enable/disable avatar in demo controls
- **Multiple Positions** - Avatar adapts to all 6 agent positions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Tavus API Key

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then add your Tavus API key:

```
TAVUS_API_KEY=your_api_key_here
```

Get your API key from: https://tavusapi.com

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

### 4. Using the Demo

- Use the **Demo Controls** panel (top-left) to switch between the 6 agent positions
- Click **Enable Avatar** to activate the Tavus LiveAvatar (Luna with Technical Co-Pilot persona)
- The avatar will appear in the chat interface with live video streaming and voice interaction
- Speak naturally - the avatar can see and hear you!

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tavus LiveAvatar API** - Real-time AI avatar conversations with Luna replica
- **Daily.co** - WebRTC video streaming platform (embedded via Tavus)
- **React 19** - Latest React with server components
- **Google Fonts (Geist)** - Professional typography

## Legacy Files

Original HTML/CSS/JS demos are preserved in the `/legacy` folder for reference.

## Credits

Built with ShowPilot's AI-powered product guidance platform.
