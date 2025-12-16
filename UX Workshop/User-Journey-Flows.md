# ShowPilot User Journey Flows
## Visual Flow Maps for Key User Scenarios

---

## 🎯 Flow 1: First-Time Visitor → Content Engagement

```
┌──────────────┐
│   Landing    │ User lands on site
│   Page       │
└──────┬───────┘
       │ Widget pulses (3s)
       ↓
┌──────────────┐
│ User Clicks  │ "Chat with Alex"
│   Widget     │
└──────┬───────┘
       │ Modal opens (300ms fade)
       ↓
┌──────────────────────────────────────────┐
│  ONBOARDING STATE                        │
│  ┌────────────────────────────────────┐  │
│  │ Hi! I'm Alex, your Acme guide.    │  │
│  │ I can show videos, demos, tours.  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  🎥 See a 2-minute product demo          │ ← User clicks
│  🎯 Create a personalized journey        │
│  💬 Ask me anything                      │
│  📅 Book time with our team              │
└──────────────┬───────────────────────────┘
               │ Click "See demo"
               ↓
┌──────────────────────────────────────────┐
│  LOADING STATE (800ms)                   │
│  ⏳ Loading product demo...              │
└──────────────┬───────────────────────────┘
               │ Expands to split-screen (500ms)
               ↓
┌────────────────────────┬─────────────────┐
│  CONTENT VIEWING       │  CHAT PANEL     │
│  ┌──────────────────┐  │  🤖 Alex        │
│  │                  │  │  "This 2-min    │
│  │  [Video Player]  │  │  demo shows..." │
│  │                  │  │                 │
│  │  [▶️ Playing]    │  │  💬 Questions:  │
│  │                  │  │  • Pricing?     │
│  │  00:42 / 02:30   │  │  • Features?    │
│  └──────────────────┘  │  • Book demo?   │
└────────────┬───────────┴─────────────────┘
             │ Video completes
             ↓
┌──────────────────────────────────────────┐
│  🎉 Great! What's next?                  │
│                                          │
│  📅 Book a personalized consultation     │ ← 40% click here
│  🎯 Explore advanced features            │ ← 30% click here
│  💬 Ask me questions                     │ ← 20% type question
│  📧 Email me more info                   │ ← 10% click here
└──────────────────────────────────────────┘

SUCCESS METRICS:
✅ 85% watch >80% of video
✅ 40% book meeting after video
✅ 30% continue exploring
✅ 3.2 avg content items per session
```

---

## 🎯 Flow 2: Journey-Driven Experience

```
┌──────────────┐
│ User Opens   │ "What brings you here?"
│   Widget     │
└──────┬───────┘
       │ Clicks "Create personalized journey"
       ↓
┌──────────────────────────────────────────┐
│  JOURNEY QUALIFICATION - Step 1 of 3     │
│  What best describes your role?          │
│                                          │
│  👔 Sales/Business Development           │
│  📊 Marketing                            │ ← User selects
│  👨‍💼 Executive/Leadership                 │
│  💻 Technical/IT                         │
└──────────────┬───────────────────────────┘
               │ Transition 200ms
               ↓
┌──────────────────────────────────────────┐
│  JOURNEY QUALIFICATION - Step 2 of 3     │
│  ✅ Marketing role                       │
│                                          │
│  What's your main goal today?            │
│                                          │
│  🔍 Understanding the product            │
│  🎯 Evaluating for purchase              │ ← User selects
│  💡 Getting ideas/inspiration            │
│  🤝 Ready to talk to sales               │
└──────────────┬───────────────────────────┘
               │ One more question...
               ↓
┌──────────────────────────────────────────┐
│  JOURNEY QUALIFICATION - Step 3 of 3     │
│  ✅ Marketing role                       │
│  ✅ Evaluating for purchase              │
│                                          │
│  Team size?                              │
│  ○ Solo (1)                              │
│  ○ Small (2-10)                          │
│  ● Medium (11-50)                        │ ← User selects
│  ○ Large (51+)                           │
└──────────────┬───────────────────────────┘
               │ AI builds custom playlist
               ↓
┌──────────────────────────────────────────┐
│  YOUR PERSONALIZED JOURNEY               │
│  📋 Tailored for: Marketing Team Lead    │
│      evaluating for 11-50 person team    │
│                                          │
│  1️⃣ Product Overview (2:30) 🎥          │
│  2️⃣ Marketing Use Cases (4:15) 🎥       │
│  3️⃣ ROI Calculator (Interactive) 🎮      │
│  4️⃣ Team Pricing Guide 📄                │
│                                          │
│  Total time: ~12 minutes                 │
│                                          │
│  🚀 Start My Journey                     │ ← User clicks
└──────────────┬───────────────────────────┘
               │ Expands to journey mode
               ↓
┌──┬────────────────────────┬──────────────┐
│J │  CONTENT VIEWER        │  CHAT        │
│O │  ┌──────────────────┐  │  🤖 Alex     │
│U │  │                  │  │  "First up:  │
│R │  │  [Video Playing] │  │  product     │
│N │  │                  │  │  overview"   │
│E │  │  Item 1 of 4     │  │              │
│Y │  └──────────────────┘  │  Progress:   │
│  │                        │  ━●━━━━ 25%  │
│✅│  Up Next (Auto: 5s):   │              │
│▶️│  Marketing Use Cases   │  Skip ahead? │
│⏸️│                        │  [Next Item] │
│⏸️│  [⏸️ Pause Journey]    │              │
└──┴────────────┬───────────┴──────────────┘
                │ Auto-advances through journey
                ↓
┌──────────────────────────────────────────┐
│  🎉 JOURNEY COMPLETE!                    │
│                                          │
│  Great job! You completed your           │
│  personalized marketing journey.         │
│                                          │
│  📅 Schedule consultation               │ ← 65% click
│  📧 Email me journey + transcript       │ ← 25% click
│  🎯 Explore advanced features           │ ← 10% click
└──────────────────────────────────────────┘

SUCCESS METRICS:
✅ 80% complete full journey
✅ 65% book meeting after journey
✅ 12:47 avg journey completion time
✅ 4.8 avg engagement score
```

---

## 🎯 Flow 3: Quick Question → Meeting Booking

```
┌──────────────┐
│ User Opens   │ Already exploring site
│   Widget     │
└──────┬───────┘
       │ Types question
       ↓
┌──────────────────────────────────────────┐
│  YOU: "What pricing plans do you offer?" │
└──────┬───────────────────────────────────┘
       │ AI analyzes intent
       ↓
┌──────────────────────────────────────────┐
│  🤖 ALEX: ⠿⠿⠿ Typing...                 │
└──────┬───────────────────────────────────┘
       │ 800ms delay (realistic)
       ↓
┌──────────────────────────────────────────┐
│  🤖 ALEX:                                │
│  We have three pricing tiers. Would you  │
│  like me to show you our pricing guide   │
│  or watch a quick overview video?        │
│                                          │
│  ┌─────────────┐  ┌────────────────┐    │
│  │📄 Show Guide│  │🎥 Watch Video  │    │ ← User clicks
│  └─────────────┘  └────────────────┘    │    Guide
└──────────────┬───────────────────────────┘
               │ Transitions to split-screen
               ↓
┌────────────────────────┬─────────────────┐
│  PRICING GUIDE (PDF)   │  CHAT           │
│  ┌──────────────────┐  │  🤖 Alex        │
│  │                  │  │  "Page 3 has    │
│  │  [PDF Viewer]    │  │  team pricing"  │
│  │                  │  │                 │
│  │  Page 1 of 4     │  │  💡 Questions:  │
│  │                  │  │  • Enterprise?  │
│  │  Sections:       │  │  • Free trial?  │
│  │  ✅ Overview     │  │                 │
│  │  ⏸️ Features     │  │  Or:            │
│  │  ⏸️ Pricing ←    │  │  📅 Discuss     │
│  │  ⏸️ FAQs         │  │     pricing     │
│  └──────────────────┘  │                 │
└────────────┬───────────┴─────────────────┘
             │ User: "I need to discuss pricing for a team"
             ↓
┌──────────────────────────────────────────┐
│  🤖 ALEX:                                │
│  Perfect! Let me connect you with Sarah  │
│  from our team. She specializes in team  │
│  pricing and can answer all your         │
│  questions.                              │
│                                          │
│  📅 Book a 15-minute pricing call        │ ← User clicks
└──────────────┬───────────────────────────┘
               │ Transitions to booking flow
               ↓
┌──────────────────────────────────────────┐
│  MEETING BOOKING                         │
│  Schedule with Sarah Chen                │
│                                          │
│  What would you like to discuss?         │
│  ✅ Pricing & team plans                 │ ← Pre-selected
│  ☐ Technical questions                   │    based on
│  ☐ Custom integrations                   │    context
│                                          │
│  📅 SELECT TIME:                         │
│                                          │
│  Tomorrow, Dec 14                        │
│  ┌──────┐ ┌──────┐ ┌──────┐             │
│  │10:00 │ │11:30 │ │ 2:00 │             │ ← User selects
│  │  AM  │ │  AM  │ │  PM  │             │    10:00 AM
│  └──────┘ └──────┘ └──────┘             │
└──────────────┬───────────────────────────┘
               │ Quick form
               ↓
┌──────────────────────────────────────────┐
│  CONFIRM BOOKING                         │
│  ✅ Sarah Chen - Pricing Specialist      │
│  ✅ Tomorrow, 10:00 AM PST               │
│                                          │
│  Your details:                           │
│  Name: [John Smith              ]        │ ← Pre-filled
│  Email: [john@company.com       ]        │    from chat
│  Company: [Acme Corp            ]        │    context
│                                          │
│  📅 Confirm Booking                      │ ← User clicks
└──────────────┬───────────────────────────┘
               │ Booking confirmed
               ↓
┌──────────────────────────────────────────┐
│  🎉 MEETING BOOKED!                      │
│                                          │
│  ✅ Confirmed with Sarah Chen            │
│  📅 Tomorrow, Dec 14 at 10:00 AM PST     │
│  🔗 Google Meet link sent to email       │
│                                          │
│  Sarah will receive:                     │
│  • Your pricing questions                │
│  • Pricing guide you viewed              │
│  • Your chat transcript                  │
│                                          │
│  Want to prepare?                        │
│  🎥 Watch team features overview         │
│  📄 View case studies                    │
└──────────────────────────────────────────┘

SUCCESS METRICS:
✅ 2:15 avg time from question to booking
✅ 42% conversion rate (question → meeting)
✅ 95% meeting show-up rate
✅ Context passed to sales (100%)
```

---

## 🎯 Flow 4: Returning Visitor

```
┌──────────────┐
│ User Returns │ 2 days later
│  to Site     │
└──────┬───────┘
       │ Widget recognizes user
       ↓
┌──────────────────────────────────────────┐
│  [Avatar shows notification badge]       │
│  "Welcome back! Continue where you       │
│   left off"                              │
└──────┬───────────────────────────────────┘
       │ User clicks
       ↓
┌──────────────────────────────────────────┐
│  RETURNING VISITOR STATE                 │
│  ┌────────────────────────────────────┐  │
│  │ 👋 Welcome back, John!             │  │
│  │                                    │  │
│  │ Last time you watched our Product  │  │
│  │ Tour (2:15 of 3:42 completed)      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Ready to continue?                      │
│                                          │
│  ▶️ Continue Product Tour (1:27 left)   │ ← 60% click
│  🆕 See what's new (2 updates)          │ ← 25% click
│  📅 You have a meeting tomorrow at 10am │ ← 10% click
│  🔄 Start fresh                         │ ← 5% click
└──────────────┬───────────────────────────┘
               │ User continues tour
               ↓
┌────────────────────────┬─────────────────┐
│  VIDEO RESUMES         │  CHAT           │
│  ┌──────────────────┐  │  🤖 Alex        │
│  │                  │  │  "Picking up    │
│  │  [Resuming at    │  │  where you left │
│  │   02:15]         │  │  off..."        │
│  │                  │  │                 │
│  │  02:15 / 03:42   │  │  ✅ Watched:    │
│  │  ━━━━━━●━━━      │  │  • Intro        │
│  │                  │  │  • Features     │
│  └──────────────────┘  │                 │
│                        │  ⏳ Next:       │
│  You left off at:      │  • Integrations │
│  "Integration features"│  • Pricing      │
└────────────────────────┴─────────────────┘

PERSONALIZATION FEATURES:
✅ Saves exact video timestamp
✅ Remembers conversation context
✅ Shows new content since last visit
✅ Displays upcoming meetings
✅ Suggests next logical step
```

---

## 🎯 Flow 5: Deep Link from Marketing Campaign

```
┌──────────────────┐
│ Email Campaign   │ User clicks email link:
│ "See our new     │ yoursite.com?showpilot=roi-calculator
│  ROI calculator" │
└────────┬─────────┘
         │ URL parameter triggers
         ↓
┌──────────────────────────────────────────┐
│  DEEP LINK STATE                         │
│  Widget auto-opens (no click needed)     │
│  ⏳ Loading ROI Calculator...            │
└──────────────┬───────────────────────────┘
               │ Content pre-loads
               ↓
┌────────────────────────┬─────────────────┐
│  ROI CALCULATOR        │  CHAT           │
│  ┌──────────────────┐  │  🤖 Alex        │
│  │                  │  │  "Hi! I pulled  │
│  │  [Interactive    │  │  up our ROI     │
│  │   Calculator]    │  │  calculator     │
│  │                  │  │  for you."      │
│  │  Your inputs:    │  │                 │
│  │  Team size: [__] │  │  💡 Try it:     │
│  │  Content/mo: [_] │  │  Enter your     │
│  │                  │  │  team details   │
│  │  Estimated ROI:  │  │                 │
│  │  Calculating...  │  │  Questions?     │
│  └──────────────────┘  │  I'm here!      │
└────────────┬───────────┴─────────────────┘
             │ User completes calculator
             ↓
┌──────────────────────────────────────────┐
│  📊 YOUR ESTIMATED ROI                   │
│                                          │
│  💰 Potential savings: $47,000/year      │
│  ⏱️ Time saved: 520 hours/year           │
│  📈 Efficiency gain: 35%                 │
│                                          │
│  Want to explore how to achieve this?    │
│                                          │
│  📅 Discuss your results with our team   │ ← 55% click
│  📧 Email me these results               │ ← 30% click
│  🎥 See case study with similar results  │ ← 15% click
└──────────────────────────────────────────┘

DEEP LINK BENEFITS:
✅ Zero friction - no navigation needed
✅ Immediate value delivery
✅ Pre-qualified users from campaigns
✅ Higher conversion (55% vs 40% organic)
✅ Attribution tracking built-in
```

---

## 🎯 Flow 6: Human Handoff (Complex Question)

```
┌──────────────┐
│ User in      │ "Can you integrate with our
│ Chat Mode    │  custom CRM via API?"
└──────┬───────┘
       │ AI detects complexity
       ↓
┌──────────────────────────────────────────┐
│  🤖 ALEX:                                │
│  That's a great question about custom    │
│  integrations! Let me connect you with   │
│  Sarah from our team—she's our           │
│  integration expert and can give you     │
│  specific details.                       │
│                                          │
│  🔄 Connecting you now...                │
└──────────────┬───────────────────────────┘
               │ Handoff initiated
               ↓
┌──────────────────────────────────────────┐
│  TRANSFERRING TO HUMAN                   │
│  ┌────────────────────────────────────┐  │
│  │ Sarah Chen                         │  │
│  │ Solutions Engineer                 │  │
│  │                                    │  │
│  │ Reviewing your conversation...     │  │
│  │ [⠿⠿⠿ Usually responds <1 min]     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Sarah will see:                         │
│  ✅ Your question about custom CRM API   │
│  ✅ Your chat history                    │
│  ✅ Content you've viewed                │
└──────────────┬───────────────────────────┘
               │ Human joins (45 seconds)
               ↓
┌──────────────────────────────────────────┐
│  [Avatar transitions: Alex → Sarah]      │
│                                          │
│  👤 SARAH CHEN (Human)       11:23 AM    │
│  Hi! I saw you're asking about custom    │
│  CRM integrations. Great question!       │
│                                          │
│  We support custom API integrations.     │
│  What CRM system are you using?          │
└──────────────┬───────────────────────────┘
               │ Natural conversation continues
               ↓
┌──────────────────────────────────────────┐
│  Conversation continues...               │
│                                          │
│  SARAH: "I can set up a technical demo   │
│         to show you exactly how this     │
│         works with your CRM."            │
│                                          │
│  📅 Book technical integration demo      │
│  📄 View API documentation               │
│  🎥 Watch integration overview           │
└──────────────────────────────────────────┘

HANDOFF FEATURES:
✅ Context preserved (no repeat questions)
✅ Right expert assigned automatically
✅ Seamless transition (user barely notices)
✅ Fallback if human unavailable
✅ Conversation history passed to CRM
```

---

## 📊 Conversion Funnel Overview

```
┌─────────────────────────────────────────────────┐
│  100 Visitors Land on Site                      │
└───────────────────┬─────────────────────────────┘
                    │ 45% engage widget
                    ↓
┌─────────────────────────────────────────────────┐
│  45 Users Open ShowPilot                        │
└───────────────────┬─────────────────────────────┘
                    │ 80% take suggested action
                    ↓
┌─────────────────────────────────────────────────┐
│  36 Users View Content or Start Journey         │
└───────────────────┬─────────────────────────────┘
                    │ 70% complete content
                    ↓
┌─────────────────────────────────────────────────┐
│  25 Users Complete Content/Journey              │
└───────────────────┬─────────────────────────────┘
                    │ 40% take conversion action
                    ↓
┌─────────────────────────────────────────────────┐
│  10 Users Book Meeting or Submit Form           │
│  = 10% overall conversion rate                  │
│  = 400% improvement vs traditional chatbot      │
└─────────────────────────────────────────────────┘

KEY IMPROVEMENT DRIVERS:
✅ Personality & Trust (+50% engagement)
✅ Suggested Actions (+35% action rate)
✅ Visual Content (+60% completion)
✅ Journey System (+45% time on site)
✅ Smart Context (+80% meeting quality)
```

---

## 🎨 Critical UX Principles Applied

### 1. **Progressive Disclosure**
- Don't overwhelm: Start simple, reveal complexity as needed
- Example: Journey selector shows 3 questions, not 10

### 2. **Persistent Guidance**
- Never leave users wondering: Always show "what's next"
- Example: Suggested questions in every state

### 3. **Contextual Intelligence**
- Remember everything: Use conversation history to personalize
- Example: Pre-filled meeting topics from viewed content

### 4. **Visual Priority**
- Show, don't tell: Lead with content, not conversation
- Example: Auto-launch video in split-screen

### 5. **Frictionless Conversion**
- Remove barriers: Pre-fill, suggest, streamline
- Example: 2-field meeting booking vs 8-field form

### 6. **Seamless Transitions**
- Smooth animations: No jarring state changes
- Example: 500ms expansion to split-screen

---

*These flows transform ShowPilot from a generic chatbot into an intelligent content concierge that guides users through personalized visual experiences.*
