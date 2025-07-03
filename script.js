
class PortfolioAnimation {
    constructor() {
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.createParticles();
        this.startIdleAnimations();
    }

    bindEvents() {
        // Navigation button events
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.handleNavigation(page, e.currentTarget);
            });
        });

        // Character hover events
        const characterImage = document.getElementById('characterImage');
        characterImage.addEventListener('mouseenter', () => {
            if (!this.isAnimating) {
                this.showSpeechBubble();
            }
        });

        characterImage.addEventListener('mouseleave', () => {
            this.hideSpeechBubble();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createParticles() {
        const particlesContainer = document.querySelector('.background-particles');
        
        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${2 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${0.3 + Math.random() * 0.7};
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    startIdleAnimations() {
        // Character idle breathing animation
        const characterImage = document.getElementById('characterImage');
        setInterval(() => {
            if (!this.isAnimating) {
                const scale = 1 + Math.sin(Date.now() * 0.002) * 0.02;
                characterImage.style.transform = `scale(${scale})`;
            }
        }, 50);
    }

    handleNavigation(page, button) {
        if (this.isAnimating) return;

        console.log(`Navigating to: ${page}`);
        this.isAnimating = true;
        
        // Update button state
        button.classList.add('loading');
        
        // Update animation status
        const animationStatus = document.getElementById('animationStatus');
        animationStatus.textContent = '🎬 Starting navigation...';

        // Quick navigation
        setTimeout(() => {
            this.completeNavigation(page);
        }, 300);
    }

    completeNavigation(page) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        loadingText.textContent = 'Loading...';
        
        // Quick page navigation
        setTimeout(() => {
            loadingText.textContent = 'Welcome!';
            this.simulatePageNavigation(page);
        }, 200);
    }

    simulatePageNavigation(page) {
        // Create new page content
        const pageContent = this.getPageContent(page);
        
        // Replace current content
        document.body.innerHTML = pageContent;
        
        // Add back button functionality
        this.addBackButton();
    }

    getPageContent(page) {
        const contents = {
            'about': `
                <div class="page-content">
                    <button class="back-button" onclick="location.reload()">← Back to Home</button>
                    <div class="page-wrapper">
                        <div class="page-header">
                            <h1>About Kunal</h1>
                            <p>Passionate Developer from Gujarat, India</p>
                        </div>
                        <div class="page-body">
                            <div class="section">
                                <h2>Who I Am</h2>
                                <p>Hello! I'm Kunal, a passionate full-stack developer from Gujarat, India. I love creating digital experiences that make a difference in people's lives.</p>
                            </div>
                            <div class="section">
                                <h2>Skills & Technologies</h2>
                                <div class="grid">
                                    <div class="card">
                                        <h3>Frontend</h3>
                                        <p>React, TypeScript, HTML, CSS, JavaScript, Vue.js</p>
                                    </div>
                                    <div class="card">
                                        <h3>Backend</h3>
                                        <p>Node.js, Express, MongoDB, PostgreSQL, Python</p>
                                    </div>
                                    <div class="card">
                                        <h3>Tools</h3>
                                        <p>Git, Docker, AWS, Firebase, Figma</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'projects': `
                <div class="page-content">
                    <button class="back-button" onclick="location.reload()">← Back to Home</button>
                    <div class="page-wrapper">
                        <div class="page-header">
                            <h1>My Projects</h1>
                            <p>Innovative solutions crafted with passion</p>
                        </div>
                        <div class="page-body">
                            <div class="grid">
                                <div class="card">
                                    <h3>E-Commerce Platform</h3>
                                    <p>Full-stack e-commerce solution with React, Node.js, and MongoDB</p>
                                    <div class="tech-tags">
                                        <span class="tag">React</span>
                                        <span class="tag">Node.js</span>
                                        <span class="tag">MongoDB</span>
                                    </div>
                                </div>
                                <div class="card">
                                    <h3>Task Management App</h3>
                                    <p>Modern task management with real-time collaboration features</p>
                                    <div class="tech-tags">
                                        <span class="tag">React</span>
                                        <span class="tag">Firebase</span>
                                        <span class="tag">TypeScript</span>
                                    </div>
                                </div>
                                <div class="card">
                                    <h3>Weather Dashboard</h3>
                                    <p>Beautiful weather app with advanced forecasting and maps</p>
                                    <div class="tech-tags">
                                        <span class="tag">React</span>
                                        <span class="tag">API Integration</span>
                                        <span class="tag">Chart.js</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'accomplishments': `
                <div class="page-content">
                    <button class="back-button" onclick="location.reload()">← Back to Home</button>
                    <div class="page-wrapper">
                        <div class="page-header">
                            <h1>Accomplishments</h1>
                            <p>Milestones in my development journey</p>
                        </div>
                        <div class="page-body">
                            <div class="grid">
                                <div class="card">
                                    <div class="icon">🏆</div>
                                    <h3>Best Developer Award 2023</h3>
                                    <p>Recognized for outstanding contribution to team projects</p>
                                </div>
                                <div class="card">
                                    <div class="icon">🚀</div>
                                    <h3>50+ Projects Completed</h3>
                                    <p>Successfully delivered diverse web applications</p>
                                </div>
                                <div class="card">
                                    <div class="icon">🎓</div>
                                    <h3>AWS Certified Developer</h3>
                                    <p>Amazon Web Services certification achieved</p>
                                </div>
                                <div class="card">
                                    <div class="icon">💡</div>
                                    <h3>Innovation Excellence</h3>
                                    <p>Created breakthrough solutions for client challenges</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'contact': `
                <div class="page-content">
                    <button class="back-button" onclick="location.reload()">← Back to Home</button>
                    <div class="page-wrapper">
                        <div class="page-header">
                            <h1>Contact Me</h1>
                            <p>Let's connect and create something amazing together</p>
                        </div>
                        <div class="page-body">
                            <div class="grid">
                                <div class="card">
                                    <div class="icon">📧</div>
                                    <h3>Email</h3>
                                    <p>kunal@example.com</p>
                                </div>
                                <div class="card">
                                    <div class="icon">📱</div>
                                    <h3>Phone</h3>
                                    <p>+91 98765 43210</p>
                                </div>
                                <div class="card">
                                    <div class="icon">🌐</div>
                                    <h3>LinkedIn</h3>
                                    <p>linkedin.com/in/kunal-dev</p>
                                </div>
                                <div class="card">
                                    <div class="icon">💻</div>
                                    <h3>GitHub</h3>
                                    <p>github.com/kunal-dev</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return contents[page] || contents['about'];
    }

    addBackButton() {
        // Back button functionality is handled in the HTML content
        console.log('Page loaded successfully');
    }

    showSpeechBubble() {
        // Create speech bubble if it doesn't exist
        if (!document.querySelector('.speech-bubble')) {
            const bubble = document.createElement('div');
            bubble.className = 'speech-bubble';
            bubble.innerHTML = `
                <div class="bubble-content">
                    <p>Hello! I'm Kunal, a passionate full-stack developer. Click any button to start exploring!</p>
                </div>
                <div class="bubble-tail"></div>
            `;
            
            bubble.style.cssText = `
                position: absolute;
                top: -120px;
                left: 50px;
                background: white;
                color: #333;
                padding: 1rem;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                max-width: 250px;
                font-size: 0.9rem;
                z-index: 100;
                animation: fadeInUp 0.3s ease-out;
            `;
            
            document.getElementById('characterImage').appendChild(bubble);
            
            // Add bubble tail styles
            const tailStyles = document.createElement('style');
            tailStyles.textContent = `
                .bubble-tail {
                    position: absolute;
                    bottom: -10px;
                    left: 30px;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 10px solid white;
                }
            `;
            document.head.appendChild(tailStyles);
        }
    }

    hideSpeechBubble() {
        const bubble = document.querySelector('.speech-bubble');
        if (bubble) {
            bubble.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                bubble.remove();
            }, 300);
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const width = window.innerWidth;
        const characterImage = document.getElementById('characterImage');
        
        if (width <= 768) {
            characterImage.style.transform = 'scale(0.9)';
        } else {
            characterImage.style.transform = 'scale(1)';
        }
    }
}

// Initialize the portfolio animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimation();
});

// Add fade out animation
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    .floating-particle {
        pointer-events: none;
    }
    
    .character-image:hover img {
        animation: imageBob 0.5s ease-in-out;
    }
    
    @keyframes imageBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;

document.head.appendChild(additionalStyles);
