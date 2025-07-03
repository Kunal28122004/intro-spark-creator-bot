
class PortfolioAnimation {
    constructor() {
        this.isAnimating = false;
        this.currentAnimation = null;
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

        // Faster navigation - reduced delays
        if (page === 'projects') {
            this.startPhoneAnimation(page);
        } else {
            this.startSimpleAnimation(page);
        }
    }

    startPhoneAnimation(page) {
        const characterImage = document.getElementById('characterImage');
        const phone = document.getElementById('phone');
        const animationStatus = document.getElementById('animationStatus');
        
        // Show phone
        phone.classList.add('active');
        characterImage.classList.add('phone-animation');
        
        animationStatus.textContent = '📱 Connecting...';
        
        // Reduced timing for faster response
        setTimeout(() => {
            animationStatus.textContent = '📞 Connected!';
            this.completeNavigation(page);
        }, 1000); // Reduced from 3000 to 1000
    }

    startSimpleAnimation(page) {
        const animationStatus = document.getElementById('animationStatus');
        
        animationStatus.textContent = '✨ Loading...';
        
        // Reduced timing for faster response
        setTimeout(() => {
            this.completeNavigation(page);
        }, 800); // Reduced from 2000 to 800
    }

    completeNavigation(page) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        loadingText.textContent = 'Loading...';
        
        // Faster page navigation
        setTimeout(() => {
            loadingText.textContent = 'Welcome!';
            this.simulatePageNavigation(page);
        }, 500); // Reduced from 1000 to 500
    }

    simulatePageNavigation(page) {
        // Create new page content immediately
        const pageContent = this.getPageContent(page);
        
        // Create new page content
        const newPage = document.createElement('div');
        newPage.className = 'page-content';
        newPage.innerHTML = pageContent;
        
        // Replace current content
        document.body.innerHTML = '';
        document.body.appendChild(newPage);
        
        // Add back button
        this.addBackButton();
    }

    getPageTitle(page) {
        const titles = {
            'about': 'About Me',
            'projects': 'My Projects',
            'accomplishments': 'Accomplishments'
        };
        return titles[page] || 'My Portfolio';
    }

    getPageContent(page) {
        const contents = {
            'about': `
                <div class="page-wrapper">
                    <div class="page-header">
                        <h1>About Kunal</h1>
                        <p>Passionate Developer from Gujarat, India</p>
                    </div>
                    <div class="page-body">
                        <div class="about-section">
                            <h2>Who I Am</h2>
                            <p>Hello! I'm Kunal, a passionate full-stack developer from Gujarat, India. I love creating digital experiences that make a difference in people's lives.</p>
                        </div>
                        <div class="skills-section">
                            <h2>Skills & Technologies</h2>
                            <div class="skills-grid">
                                <div class="skill-card">
                                    <h3>Frontend</h3>
                                    <p>React, TypeScript, HTML, CSS, JavaScript</p>
                                </div>
                                <div class="skill-card">
                                    <h3>Backend</h3>
                                    <p>Node.js, Express, MongoDB, PostgreSQL</p>
                                </div>
                                <div class="skill-card">
                                    <h3>Tools</h3>
                                    <p>Git, Docker, AWS, Firebase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'projects': `
                <div class="page-wrapper">
                    <div class="page-header">
                        <h1>My Projects</h1>
                        <p>Innovative solutions crafted with passion</p>
                    </div>
                    <div class="page-body">
                        <div class="projects-grid">
                            <div class="project-card">
                                <h3>E-Commerce Platform</h3>
                                <p>Full-stack e-commerce solution with React, Node.js, and MongoDB</p>
                                <div class="tech-tags">
                                    <span class="tag">React</span>
                                    <span class="tag">Node.js</span>
                                    <span class="tag">MongoDB</span>
                                </div>
                            </div>
                            <div class="project-card">
                                <h3>Task Management App</h3>
                                <p>Modern task management with real-time collaboration features</p>
                                <div class="tech-tags">
                                    <span class="tag">React</span>
                                    <span class="tag">Firebase</span>
                                    <span class="tag">TypeScript</span>
                                </div>
                            </div>
                            <div class="project-card">
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
            `,
            'accomplishments': `
                <div class="page-wrapper">
                    <div class="page-header">
                        <h1>Accomplishments</h1>
                        <p>Milestones in my development journey</p>
                    </div>
                    <div class="page-body">
                        <div class="accomplishments-grid">
                            <div class="accomplishment-card">
                                <div class="accomplishment-icon">🏆</div>
                                <h3>Best Developer Award 2023</h3>
                                <p>Recognized for outstanding contribution to team projects</p>
                            </div>
                            <div class="accomplishment-card">
                                <div class="accomplishment-icon">🚀</div>
                                <h3>50+ Projects Completed</h3>
                                <p>Successfully delivered diverse web applications</p>
                            </div>
                            <div class="accomplishment-card">
                                <div class="accomplishment-icon">🎓</div>
                                <h3>AWS Certified Developer</h3>
                                <p>Amazon Web Services certification achieved</p>
                            </div>
                            <div class="accomplishment-card">
                                <div class="accomplishment-icon">💡</div>
                                <h3>Innovation Excellence</h3>
                                <p>Created breakthrough solutions for client challenges</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return contents[page] || contents['about'];
    }

    addBackButton() {
        const backButton = document.createElement('button');
        backButton.textContent = '← Back to Home';
        backButton.className = 'back-button';
        backButton.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            color: white;
            border: none;
            border-radius: 30px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        backButton.addEventListener('click', () => {
            location.reload(); // Simple way to go back to home
        });
        
        document.body.appendChild(backButton);
        
        // Add page styles
        const pageStyles = document.createElement('style');
        pageStyles.textContent = `
            .page-content {
                min-height: 100vh;
                background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4338ca 100%);
                color: white;
                padding: 2rem;
                font-family: Arial, sans-serif;
            }
            
            .page-wrapper {
                max-width: 1200px;
                margin: 0 auto;
                padding-top: 6rem;
            }
            
            .page-header {
                text-align: center;
                margin-bottom: 4rem;
            }
            
            .page-header h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                background: linear-gradient(45deg, #ffffff, #a5b4fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .page-header p {
                font-size: 1.2rem;
                opacity: 0.8;
            }
            
            .about-section, .skills-section {
                margin-bottom: 3rem;
                background: rgba(255, 255, 255, 0.1);
                padding: 2rem;
                border-radius: 15px;
                backdrop-filter: blur(10px);
            }
            
            .skills-grid, .projects-grid, .accomplishments-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
            }
            
            .skill-card, .project-card, .accomplishment-card {
                background: rgba(255, 255, 255, 0.15);
                padding: 1.5rem;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease;
            }
            
            .skill-card:hover, .project-card:hover, .accomplishment-card:hover {
                transform: translateY(-5px);
            }
            
            .accomplishment-icon {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 1rem;
            }
            
            .tag {
                background: rgba(59, 130, 246, 0.3);
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                border: 1px solid rgba(59, 130, 246, 0.5);
            }
            
            .back-button:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            @media (max-width: 768px) {
                .page-header h1 {
                    font-size: 2rem;
                }
                
                .skills-grid, .projects-grid, .accomplishments-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(pageStyles);
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
            characterImage.style.transform = 'scale(0.8)';
        } else {
            characterImage.style.transform = 'scale(1)';
        }
    }
}

// Initialize the portfolio animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimation();
});

// Add some additional CSS animations via JavaScript
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
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
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
