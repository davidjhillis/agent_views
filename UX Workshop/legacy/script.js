// ShowPilot UX Prototype JavaScript

// ===== State Management =====
const AppState = {
    currentState: 'minimized', // minimized, onboarding, chat, journey, content, meeting
    previousState: null,
    isExpanded: false,
    messages: [],
    journeyData: {
        role: null,
        goal: null,
        teamSize: null
    }
};

// ===== DOM Elements =====
const elements = {
    widgetBadge: document.getElementById('widgetBadge'),
    widgetModal: document.getElementById('widgetModal'),
    widgetBody: document.getElementById('widgetBody'),
    widgetFooter: document.getElementById('widgetFooter'),
    minimizeBtn: document.getElementById('minimizeBtn'),
    expandBtn: document.getElementById('expandBtn'),
    closeBtn: document.getElementById('closeBtn'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    attachBtn: document.getElementById('attachBtn'),

    // States
    onboardingState: document.getElementById('onboardingState'),
    chatState: document.getElementById('chatState'),
    journeyState: document.getElementById('journeyState'),
    contentState: document.getElementById('contentState'),
    meetingState: document.getElementById('meetingState'),

    // Other
    floatingCTA: document.getElementById('floatingCTA'),
    messagesContainer: document.getElementById('messagesContainer')
};

// ===== Helper Functions =====
function hideAllStates() {
    Object.keys(elements).forEach(key => {
        if (key.endsWith('State')) {
            elements[key].classList.add('hidden');
        }
    });
}

function showState(stateName) {
    hideAllStates();
    const stateElement = elements[`${stateName}State`];
    if (stateElement) {
        stateElement.classList.remove('hidden');
        AppState.previousState = AppState.currentState;
        AppState.currentState = stateName;
    }
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message-user' : 'message-ai';

    if (isUser) {
        messageDiv.innerHTML = `
            <div class="message-user-bubble">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-ai-avatar">
                <div class="avatar-placeholder small">A</div>
            </div>
            <div class="message-ai-content">
                <div class="message-ai-bubble">${text}</div>
                <div class="message-ai-meta">
                    <span class="message-ai-name">Alex</span>
                    <span class="message-ai-time">Just now</span>
                </div>
            </div>
        `;
    }

    elements.messagesContainer.appendChild(messageDiv);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-ai typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-ai-avatar">
            <div class="avatar-placeholder small">A</div>
        </div>
        <div class="typing-dots">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    elements.messagesContainer.appendChild(typingDiv);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;

    return typingDiv;
}

function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
}

// ===== Widget Controls =====
function openWidget() {
    elements.widgetBadge.classList.add('hidden');
    elements.widgetModal.classList.remove('hidden');
    AppState.isExpanded = true;

    // Remove notification badge
    const notification = elements.widgetBadge.querySelector('.widget-badge-notification');
    if (notification) {
        notification.style.display = 'none';
    }
}

function closeWidget() {
    elements.widgetModal.classList.add('hidden');
    elements.widgetBadge.classList.remove('hidden');
    AppState.isExpanded = false;
    AppState.currentState = 'minimized';
}

function minimizeWidget() {
    closeWidget();
}

// ===== Event Handlers =====

// Widget Badge Click
elements.widgetBadge.addEventListener('click', () => {
    openWidget();
    if (AppState.currentState === 'minimized') {
        showState('onboarding');
    }
});

// Close Button
elements.closeBtn.addEventListener('click', closeWidget);

// Minimize Button
elements.minimizeBtn.addEventListener('click', minimizeWidget);

// Send Message
function sendMessage() {
    const text = elements.messageInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    elements.messageInput.value = '';

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        removeTypingIndicator(typingIndicator);

        // Simple response logic
        if (text.toLowerCase().includes('pricing') || text.toLowerCase().includes('price')) {
            addMessage("We have three pricing tiers. Would you like me to show you our pricing guide or watch a quick overview video?");

            // Show floating CTA
            elements.floatingCTA.classList.remove('hidden');
        } else if (text.toLowerCase().includes('demo')) {
            addMessage("Great! I can show you our 2-minute product demo. Ready to watch?");
            setTimeout(() => {
                showState('content');
            }, 1000);
        } else {
            addMessage("That's a great question! I can help you with that. Would you like me to:<br><br>• Show you a video<br>• Share documentation<br>• Connect you with our team");
        }
    }, 1200);
}

elements.sendBtn.addEventListener('click', sendMessage);

elements.messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Auto-resize textarea
elements.messageInput.addEventListener('input', () => {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
});

// ===== Suggestion Button Handlers =====

// Onboarding Suggestions
document.querySelectorAll('#onboardingState .btn-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;

        switch(action) {
            case 'showDemo':
                showState('content');
                break;
            case 'createJourney':
                showState('journey');
                break;
            case 'askAnything':
                showState('chat');
                addMessage("Great! I'm here to answer any questions you have. What would you like to know?");
                break;
            case 'bookMeeting':
                showState('meeting');
                break;
        }
    });
});

// Journey Role Selection
document.querySelectorAll('#journeyState .btn-suggestion[data-role]').forEach(btn => {
    btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        AppState.journeyData.role = role;

        // Show next question
        const journeyQualification = document.querySelector('.journey-qualification');
        journeyQualification.innerHTML = `
            <div class="message-ai">
                <div class="message-ai-avatar">
                    <div class="avatar-placeholder small">A</div>
                </div>
                <div class="message-ai-content">
                    <div class="message-ai-bubble">
                        ✅ ${btn.querySelector('.btn-suggestion-text').textContent}<br><br>
                        <strong>What's your main goal today?</strong>
                    </div>
                </div>
            </div>

            <div class="suggestions-container">
                <button class="btn-suggestion" data-goal="understanding">
                    <span class="btn-suggestion-icon">🔍</span>
                    <span class="btn-suggestion-text">Understanding the product</span>
                </button>
                <button class="btn-suggestion" data-goal="evaluating">
                    <span class="btn-suggestion-icon">🎯</span>
                    <span class="btn-suggestion-text">Evaluating for purchase</span>
                </button>
                <button class="btn-suggestion" data-goal="ideas">
                    <span class="btn-suggestion-icon">💡</span>
                    <span class="btn-suggestion-text">Getting ideas/inspiration</span>
                </button>
                <button class="btn-suggestion" data-goal="sales">
                    <span class="btn-suggestion-icon">🤝</span>
                    <span class="btn-suggestion-text">Ready to talk to sales</span>
                </button>
            </div>
        `;

        // Add event listeners to new buttons
        document.querySelectorAll('[data-goal]').forEach(goalBtn => {
            goalBtn.addEventListener('click', () => {
                handleGoalSelection(goalBtn.dataset.goal);
            });
        });
    });
});

function handleGoalSelection(goal) {
    AppState.journeyData.goal = goal;

    // Show journey preview
    const journeyQualification = document.querySelector('.journey-qualification');
    journeyQualification.innerHTML = `
        <div class="message-ai">
            <div class="message-ai-avatar">
                <div class="avatar-placeholder small">A</div>
            </div>
            <div class="message-ai-content">
                <div class="message-ai-bubble">
                    🎉 Perfect! I've created a journey tailored for you.<br>
                    (Total time: ~12 minutes)
                </div>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <p class="suggestions-label">Your Journey:</p>

            <div class="btn-suggestion" style="margin-bottom: 12px; cursor: default;">
                <span class="btn-suggestion-icon">1️⃣ 🎥</span>
                <div>
                    <div class="btn-suggestion-text">Product Overview (2:30)</div>
                    <div style="font-size: 12px; color: var(--sp-gray-500);">Quick intro to core capabilities</div>
                </div>
            </div>

            <div class="btn-suggestion" style="margin-bottom: 12px; cursor: default;">
                <span class="btn-suggestion-icon">2️⃣ 🎥</span>
                <div>
                    <div class="btn-suggestion-text">Marketing Use Cases (4:15)</div>
                    <div style="font-size: 12px; color: var(--sp-gray-500);">Real examples from marketing teams</div>
                </div>
            </div>

            <div class="btn-suggestion" style="margin-bottom: 12px; cursor: default;">
                <span class="btn-suggestion-icon">3️⃣ 🎮</span>
                <div>
                    <div class="btn-suggestion-text">ROI Calculator (Interactive)</div>
                    <div style="font-size: 12px; color: var(--sp-gray-500);">Estimate impact for your team</div>
                </div>
            </div>

            <div class="btn-suggestion" style="margin-bottom: 20px; cursor: default;">
                <span class="btn-suggestion-icon">4️⃣ 📄</span>
                <div>
                    <div class="btn-suggestion-text">Pricing Guide</div>
                    <div style="font-size: 12px; color: var(--sp-gray-500);">Plans and options</div>
                </div>
            </div>

            <button class="btn-primary btn-full-width" id="startJourneyBtn">
                🚀 Start My Journey
            </button>
        </div>
    `;

    // Add event listener to start button
    document.getElementById('startJourneyBtn').addEventListener('click', () => {
        showState('content');
    });
}

// Quick Questions in Content View
document.querySelectorAll('.quick-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const chatMessages = document.getElementById('contentChatMessages');

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message-user';
        userMsg.innerHTML = `
            <div class="message-user-bubble">${btn.textContent}</div>
        `;
        chatMessages.appendChild(userMsg);

        // Add AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message-ai';
            aiMsg.innerHTML = `
                <div class="message-ai-avatar">
                    <div class="avatar-placeholder small">A</div>
                </div>
                <div class="message-ai-content">
                    <div class="message-ai-bubble">
                        Great question! Let me explain our pricing model...
                    </div>
                </div>
            `;
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    });
});

// Video Play Button
const videoPlayButton = document.querySelector('.video-play-button');
if (videoPlayButton) {
    videoPlayButton.addEventListener('click', () => {
        videoPlayButton.textContent = '⏸️';

        // Simulate video playing
        setTimeout(() => {
            const chatMessages = document.getElementById('contentChatMessages');
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message-ai';
            aiMsg.innerHTML = `
                <div class="message-ai-avatar">
                    <div class="avatar-placeholder small">A</div>
                </div>
                <div class="message-ai-content">
                    <div class="message-ai-bubble">
                        Notice the workflow automation at 0:42 - this is what makes us unique!
                    </div>
                </div>
            `;
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 3000);
    });
}

// Floating CTA
elements.floatingCTA.addEventListener('click', () => {
    showState('meeting');
    elements.floatingCTA.classList.add('hidden');
});

// ===== Demo Features =====

// Add some welcome animations
setTimeout(() => {
    const badge = elements.widgetBadge.querySelector('.widget-badge-notification');
    if (badge) {
        badge.style.animation = 'bounce 0.5s ease';
    }
}, 2000);

// Simulate notification after 5 seconds
setTimeout(() => {
    if (!AppState.isExpanded) {
        const notification = elements.widgetBadge.querySelector('.widget-badge-notification');
        if (notification) {
            notification.style.display = 'flex';
            notification.textContent = '1';
        }
    }
}, 5000);

// ===== Console Log for Demo =====
console.log('ShowPilot UX Prototype Loaded');
console.log('Current State:', AppState.currentState);
console.log('Try clicking the widget badge in the bottom right!');

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // ESC to close widget
    if (e.key === 'Escape' && AppState.isExpanded) {
        closeWidget();
    }

    // Alt + S to open widget (demo purposes)
    if (e.altKey && e.key === 's') {
        if (!AppState.isExpanded) {
            openWidget();
            showState('onboarding');
        }
    }
});

// ===== Accessibility =====
// Update ARIA attributes when widget state changes
function updateARIA() {
    elements.widgetBadge.setAttribute('aria-expanded', AppState.isExpanded);
}

// Call updateARIA whenever state changes
const originalShowState = showState;
showState = function(stateName) {
    originalShowState(stateName);
    updateARIA();
};

// ===== State Demonstrations =====
// You can call these functions from the console to demo different states

window.demoOnboarding = () => {
    openWidget();
    showState('onboarding');
    console.log('Showing onboarding state');
};

window.demoChat = () => {
    openWidget();
    showState('chat');
    addMessage("Great! I'm here to answer any questions you have. What would you like to know?");
    console.log('Showing chat state');
};

window.demoJourney = () => {
    openWidget();
    showState('journey');
    console.log('Showing journey selection state');
};

window.demoContent = () => {
    openWidget();
    showState('content');
    console.log('Showing content viewing state');
};

window.demoMeeting = () => {
    openWidget();
    showState('meeting');
    console.log('Showing meeting booking state');
};

console.log('Demo functions available:');
console.log('- demoOnboarding()');
console.log('- demoChat()');
console.log('- demoJourney()');
console.log('- demoContent()');
console.log('- demoMeeting()');
