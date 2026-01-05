// ========================================
// ShowPilot V2 - Advanced Interaction System
// Layout Modes: center-chat, sidebar-chat, large-center, full-screen
// ========================================

class ShowPilotApp {
    constructor() {
        // State
        this.state = {
            mode: 'minimized', // minimized, large-center, sidebar-chat, center-chat, full-screen
            isOpen: false,
            currentView: 'chat', // chat, content
            messages: [],
            contentPlaying: false,
            isListening: false,
            isSpeaking: false,
            voiceEnabled: true
        };

        // Voice Recognition Setup
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.setupVoiceRecognition();

        // DOM Elements
        this.elements = {
            container: document.getElementById('showpilot'),
            floatingBadge: document.getElementById('floatingBadge'),
            badgeNotification: document.getElementById('badgeNotification'),
            widgetInterface: document.getElementById('widgetInterface'),
            minimizeBtn: document.getElementById('minimizeBtn'),
            closeBtn: document.getElementById('closeBtn'),
            layoutToggle: document.getElementById('layoutToggle'),
            layoutSelector: document.getElementById('layoutSelector'),
            messagesContainer: document.getElementById('messagesContainer'),
            messageInput: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendBtn'),
            attachBtn: document.getElementById('attachBtn'),
            contentViewer: document.getElementById('contentViewer'),
            contentCloseBtn: document.getElementById('contentCloseBtn'),
            videoPlayBtn: document.getElementById('videoPlayBtn'),
            floatingCTA: document.getElementById('floatingCTA'),
            suggestionsGrid: document.getElementById('suggestionsGrid'),
            sidebarLeft: document.getElementById('sidebarLeft'),
            sidebarRight: document.getElementById('sidebarRight')
        };

        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupKeyboardShortcuts();
        this.autoResizeTextarea();

        // Show notification after 3 seconds
        setTimeout(() => {
            if (!this.state.isOpen) {
                this.showNotification();
            }
        }, 3000);

        console.log('ShowPilot V2 initialized with voice support');
        console.log('Keyboard shortcuts: Esc (close), Alt+S (open), Alt+V (voice)');
        console.log('Voice commands enabled: Click microphone or press Alt+V to speak');
    }

    // ==== Voice Recognition Setup ====
    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.state.isListening = true;
                this.updateVoiceUI();
            };

            this.recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');

                if (event.results[0].isFinal) {
                    this.elements.messageInput.value = transcript;
                    this.sendMessage();
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.state.isListening = false;
                this.updateVoiceUI();
            };

            this.recognition.onend = () => {
                this.state.isListening = false;
                this.updateVoiceUI();
            };
        } else {
            console.warn('Speech recognition not supported in this browser');
            this.state.voiceEnabled = false;
        }
    }

    startVoiceInput() {
        if (this.recognition && !this.state.isListening) {
            this.recognition.start();
        }
    }

    stopVoiceInput() {
        if (this.recognition && this.state.isListening) {
            this.recognition.stop();
        }
    }

    speak(text) {
        if (!this.synthesis) return;

        // Cancel any ongoing speech
        this.synthesis.cancel();

        // Remove HTML tags from text
        const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            this.state.isSpeaking = true;
            this.updateVoiceUI();
        };

        utterance.onend = () => {
            this.state.isSpeaking = false;
            this.updateVoiceUI();
        };

        this.synthesis.speak(utterance);
    }

    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.state.isSpeaking = false;
            this.updateVoiceUI();
        }
    }

    updateVoiceUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceIndicator = document.getElementById('voiceIndicator');

        if (!voiceBtn) return;

        if (this.state.isListening) {
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i data-lucide="mic-off" class="icon"></i>';
            if (voiceIndicator) voiceIndicator.textContent = 'Listening...';
        } else if (this.state.isSpeaking) {
            voiceBtn.classList.remove('listening');
            voiceBtn.classList.add('speaking');
            voiceBtn.innerHTML = '<i data-lucide="volume-2" class="icon"></i>';
            if (voiceIndicator) voiceIndicator.textContent = 'Speaking...';
        } else {
            voiceBtn.classList.remove('listening', 'speaking');
            voiceBtn.innerHTML = '<i data-lucide="mic" class="icon"></i>';
            if (voiceIndicator) voiceIndicator.textContent = '';
        }

        lucide.createIcons();
    }

    // ==== Event Listeners ====
    attachEventListeners() {
        // Badge
        this.elements.floatingBadge?.addEventListener('click', () => this.open());

        // Header controls
        this.elements.minimizeBtn?.addEventListener('click', () => this.minimize());
        this.elements.closeBtn?.addEventListener('click', () => this.close());
        this.elements.layoutToggle?.addEventListener('click', () => this.toggleLayoutSelector());

        // Layout selector
        document.querySelectorAll('.layout-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.changeLayout(mode);
            });
        });

        // Message input
        this.elements.sendBtn?.addEventListener('click', () => this.sendMessage());
        this.elements.messageInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Voice input button
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn?.addEventListener('click', () => {
            if (this.state.isListening) {
                this.stopVoiceInput();
            } else if (this.state.isSpeaking) {
                this.stopSpeaking();
            } else {
                this.startVoiceInput();
            }
        });

        // Suggestion cards
        document.querySelectorAll('.suggestion-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleSuggestionClick(action);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Context question buttons
        document.querySelectorAll('.context-question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.currentTarget.querySelector('span').textContent;
                this.askQuestion(question);
            });
        });

        // Input suggestion chips
        document.querySelectorAll('.input-suggestion-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const text = e.currentTarget.querySelector('span').textContent;
                this.elements.messageInput.value = text;
                this.elements.messageInput.focus();
            });
        });

        // Content viewer
        this.elements.contentCloseBtn?.addEventListener('click', () => this.closeContent());
        this.elements.videoPlayBtn?.addEventListener('click', () => this.playVideo());

        // Floating CTA
        this.elements.floatingCTA?.addEventListener('click', () => {
            this.addMessage('I\'d like to schedule a consultation', true);
            this.respondToBooking();
        });

        // Click outside layout selector to close
        document.addEventListener('click', (e) => {
            if (!this.elements.layoutSelector.contains(e.target) &&
                !this.elements.layoutToggle.contains(e.target)) {
                this.elements.layoutSelector.classList.add('hidden');
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Esc to close
            if (e.key === 'Escape' && this.state.isOpen) {
                this.close();
            }

            // Alt+S to open/close
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                if (this.state.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            }

            // Alt+V for voice input
            if (e.altKey && e.key === 'v') {
                e.preventDefault();
                if (this.state.isOpen && this.state.voiceEnabled) {
                    if (this.state.isListening) {
                        this.stopVoiceInput();
                    } else {
                        this.startVoiceInput();
                    }
                }
            }

            // Cmd/Ctrl+K for quick actions (focus input)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (this.state.isOpen) {
                    this.elements.messageInput?.focus();
                }
            }
        });
    }

    autoResizeTextarea() {
        this.elements.messageInput?.addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
        });
    }

    // ==== State Management ====
    open() {
        this.state.isOpen = true;
        this.elements.floatingBadge?.classList.add('hidden');
        this.elements.widgetInterface?.classList.remove('hidden');
        this.changeLayout('center-chat');  // Start with centered, compact view
        this.hideNotification();
        this.elements.messageInput?.focus();

        // Reinitialize Lucide icons after showing widget
        setTimeout(() => lucide.createIcons(), 100);
    }

    close() {
        this.state.isOpen = false;
        this.elements.widgetInterface?.classList.add('hidden');
        this.elements.floatingBadge?.classList.remove('hidden');
        this.elements.layoutSelector?.classList.add('hidden');
        this.state.mode = 'minimized';
        this.elements.container?.setAttribute('data-mode', 'minimized');
    }

    minimize() {
        this.close();
    }

    changeLayout(mode) {
        this.state.mode = mode;
        this.elements.container?.setAttribute('data-mode', mode);

        // Update active state in selector
        document.querySelectorAll('.layout-option').forEach(option => {
            if (option.dataset.mode === mode) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        this.elements.layoutSelector?.classList.add('hidden');

        // Reinitialize icons after layout change
        setTimeout(() => lucide.createIcons(), 100);

        console.log(`Layout changed to: ${mode}`);
    }

    toggleLayoutSelector() {
        this.elements.layoutSelector?.classList.toggle('hidden');
    }

    // ==== Message Handling ====
    sendMessage() {
        const text = this.elements.messageInput?.value.trim();
        if (!text) return;

        this.addMessage(text, true);
        this.elements.messageInput.value = '';
        this.elements.messageInput.style.height = 'auto';

        // Simulate AI response
        this.showTypingIndicator();
        setTimeout(() => {
            this.removeTypingIndicator();
            this.respondToMessage(text);
        }, 1200);
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');

        if (isUser) {
            messageDiv.className = 'message-user';
            messageDiv.innerHTML = `
                <div class="message-bubble">
                    <p>${this.escapeHtml(text)}</p>
                </div>
            `;
        } else {
            messageDiv.className = 'message-ai';
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-shimmer"></div>
                    <span class="avatar-text">AI</span>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${text}
                    </div>
                    <div class="message-meta">
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            `;
        }

        // Hide suggestions grid if it exists
        if (this.elements.suggestionsGrid && !this.elements.suggestionsGrid.classList.contains('hidden')) {
            this.elements.suggestionsGrid.classList.add('hidden');
        }

        this.elements.messagesContainer?.appendChild(messageDiv);
        this.scrollToBottom();

        // Reinitialize icons
        setTimeout(() => lucide.createIcons(), 50);
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message-ai typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-shimmer"></div>
                <span class="avatar-text">AI</span>
            </div>
            <div class="message-content">
                <div class="message-bubble" style="width: fit-content;">
                    <span>●</span>
                    <span style="animation-delay: 0.2s">●</span>
                    <span style="animation-delay: 0.4s">●</span>
                </div>
            </div>
        `;
        this.elements.messagesContainer?.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typing = this.elements.messagesContainer?.querySelector('.typing-indicator');
        typing?.remove();
    }

    respondToMessage(userText) {
        const lowerText = userText.toLowerCase();
        let responseText = '';

        if (lowerText.includes('demo') || lowerText.includes('video')) {
            responseText = `
                <p><strong>Great choice!</strong> Our 2-minute demo shows our platform in action.</p>
                <p>Would you like me to show it now?</p>
            `;
            this.addMessage(responseText);
            this.speak("Great choice! Our 2-minute demo shows our platform in action. Would you like me to show it now?");
            setTimeout(() => {
                this.showContent();
            }, 1000);
        } else if (lowerText.includes('pricing') || lowerText.includes('price') || lowerText.includes('cost')) {
            responseText = `
                <p>We have flexible pricing plans to match your needs:</p>
                <p><strong>• Starter:</strong> $49/month<br>
                <strong>• Professional:</strong> $149/month<br>
                <strong>• Enterprise:</strong> Custom pricing</p>
                <p>Would you like to discuss which plan is right for you?</p>
            `;
            this.addMessage(responseText);
            this.speak("We have flexible pricing plans to match your needs. Starter is 49 dollars per month, Professional is 149 dollars per month, and Enterprise has custom pricing. Would you like to discuss which plan is right for you?");
            this.showFloatingCTA();
        } else if (lowerText.includes('meeting') || lowerText.includes('schedule') || lowerText.includes('book')) {
            this.respondToBooking();
        } else {
            responseText = `
                <p>Thanks for your question! I can help you with:</p>
                <p>• <strong>Product demos</strong> - See our platform in action<br>
                • <strong>Pricing information</strong> - Find the right plan<br>
                • <strong>Schedule a meeting</strong> - Talk to our team<br>
                • <strong>Documentation</strong> - Detailed guides</p>
                <p>What would you like to explore?</p>
            `;
            this.addMessage(responseText);
            this.speak("Thanks for your question! I can help you with product demos, pricing information, scheduling a meeting, or documentation. What would you like to explore?");
        }
    }

    respondToBooking() {
        const responseText = `
            <p><strong>Perfect!</strong> I'd love to connect you with our team.</p>
            <p>Our next available slots are:</p>
            <p>• Tomorrow at 10:00 AM<br>
            • Tomorrow at 2:00 PM<br>
            • Friday at 11:00 AM</p>
            <p>Which time works best for you?</p>
        `;
        this.addMessage(responseText);
        this.speak("Perfect! I'd love to connect you with our team. Our next available slots are tomorrow at 10 AM, tomorrow at 2 PM, or Friday at 11 AM. Which time works best for you?");
    }

    // ==== Suggestion Handling ====
    handleSuggestionClick(action) {
        switch(action) {
            case 'show-demo':
                this.addMessage('I\'d like to see the product demo', true);
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.removeTypingIndicator();
                        this.addMessage('<p><strong>Excellent!</strong> Let me show you our 2-minute product demo.</p>');
                        setTimeout(() => this.showContent(), 800);
                    }, 1000);
                }, 500);
                break;

            case 'create-journey':
                this.addMessage('I\'d like to create a personalized journey', true);
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.removeTypingIndicator();
                        this.addMessage(`
                            <p><strong>Great choice!</strong> I'll help you create a personalized content journey.</p>
                            <p>First, what best describes your role?</p>
                            <p>• Marketing<br>
                            • Sales<br>
                            • Technical<br>
                            • Executive</p>
                        `);
                    }, 1000);
                }, 500);
                break;

            case 'ask-question':
                this.addMessage('I have a question', true);
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.removeTypingIndicator();
                        this.addMessage('<p><strong>Of course!</strong> I\'m here to help. What would you like to know?</p>');
                        this.elements.messageInput?.focus();
                    }, 1000);
                }, 500);
                break;

            case 'book-meeting':
                this.addMessage('I\'d like to book a meeting', true);
                setTimeout(() => {
                    this.showTypingIndicator();
                    setTimeout(() => {
                        this.removeTypingIndicator();
                        this.respondToBooking();
                    }, 1000);
                }, 500);
                break;
        }
    }

    handleQuickAction(action) {
        switch(action) {
            case 'demo':
                this.showContent();
                break;
            case 'journey':
                this.handleSuggestionClick('create-journey');
                break;
            case 'meeting':
                this.handleSuggestionClick('book-meeting');
                break;
        }
    }

    askQuestion(question) {
        this.elements.messageInput.value = question;
        this.sendMessage();
    }

    // ==== Content Viewer ====
    showContent() {
        // Hide suggestions
        this.elements.suggestionsGrid?.classList.add('hidden');

        // Show content viewer
        this.elements.contentViewer?.classList.remove('hidden');

        // Auto-expand to full-screen for 3-column layout: playlist | content | chat
        this.changeLayout('full-screen');

        // Add context message
        this.addMessage(`
            <p><i data-lucide="play-circle" class="icon-inline"></i>
            <strong>Video loaded!</strong> Click the play button to start watching.</p>
        `);

        this.scrollToBottom();
    }

    closeContent() {
        this.elements.contentViewer?.classList.add('hidden');
        this.addMessage('<p>Content viewer closed. Let me know if you\'d like to see something else!</p>');
    }

    playVideo() {
        // Change play button to pause
        const playBtn = this.elements.videoPlayBtn;
        if (playBtn) {
            playBtn.innerHTML = '<i data-lucide="pause" class="icon"></i>';
            lucide.createIcons();
        }

        // Simulate video progress
        const progressFill = document.querySelector('.video-progress-fill');
        if (progressFill) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressFill.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(interval);
                    this.addMessage(`
                        <p><strong>🎉 Video complete!</strong> What would you like to do next?</p>
                        <p>• Watch another demo<br>
                        • Discuss pricing<br>
                        • Schedule a consultation</p>
                    `);
                    this.showFloatingCTA();
                }
            }, 150);
        }

        // Add contextual AI message
        setTimeout(() => {
            this.addMessage(`
                <p><i data-lucide="lightbulb" class="icon-inline"></i>
                <strong>Pro tip:</strong> The workflow automation feature at 0:42 is what makes us unique!</p>
            `);
        }, 3000);
    }

    // ==== UI Utilities ====
    showNotification() {
        this.elements.badgeNotification?.classList.remove('hidden');
    }

    hideNotification() {
        this.elements.badgeNotification?.classList.add('hidden');
    }

    showFloatingCTA() {
        this.elements.floatingCTA?.classList.remove('hidden');
        setTimeout(() => lucide.createIcons(), 50);
    }

    hideFloatingCTA() {
        this.elements.floatingCTA?.classList.add('hidden');
    }

    scrollToBottom() {
        if (this.elements.messagesContainer) {
            this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.showpilot = new ShowPilotApp();

    // Add CSS for typing indicator animation
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .message-bubble span {
            display: inline-block;
            animation: typing 1.4s infinite;
            margin: 0 2px;
        }
        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-8px); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

// Expose demo functions for console
window.demoOpenWidget = () => window.showpilot?.open();
window.demoShowContent = () => window.showpilot?.showContent();
window.demoChangeLayout = (mode) => window.showpilot?.changeLayout(mode);

console.log('%c✨ ShowPilot V2 Demo Functions Available:', 'font-size: 14px; font-weight: bold; color: #6366F1');
console.log('%cdemoOpenWidget() - Open the widget', 'color: #666');
console.log('%cdemoShowContent() - Show content viewer', 'color: #666');
console.log('%cdemoChangeLayout("center-chat" | "sidebar-chat" | "large-center" | "full-screen") - Change layout', 'color: #666');
