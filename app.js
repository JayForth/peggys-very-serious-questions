/**
 * Peggy's Very Serious Questions
 * A daily trivia game with fuzzy answer matching
 */

class PeggysQuiz {
    constructor() {
        this.questions = [];
        this.todaysQuestions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];
        this.gameComplete = false;
        this.startTime = null;
        this.endTime = null;
        this.stats = this.loadStats();
        this.currentMode = localStorage.getItem('peggy-mode') || 'classic';
        
        this.funFacts = [
            "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.",
            "Octopuses have three hearts and blue blood.",
            "A group of flamingos is called a 'flamboyance'.",
            "The shortest war in history lasted 38 to 45 minutes, between Britain and Zanzibar in 1896.",
            "Bananas are berries, but strawberries aren't.",
            "The Eiffel Tower can grow by up to 6 inches in summer due to thermal expansion.",
            "Cows have best friends and get stressed when separated.",
            "The inventor of the Pringles can is buried in one.",
            "A jiffy is an actual unit of time: 1/100th of a second.",
            "Scotland's national animal is the unicorn.",
            "Wombat droppings are cube-shaped.",
            "The longest hiccuping spree lasted 68 years.",
            "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
            "There are more possible iterations of a game of chess than atoms in the observable universe.",
            "A cloud can weigh more than a million pounds.",
            "The dot over the letters 'i' and 'j' is called a tittle.",
            "Sharks existed before trees.",
            "Oxford University is older than the Aztec Empire.",
            "Hot water freezes faster than cold water—this is called the Mpemba effect.",
            "A day on Venus is longer than a year on Venus.",
            "Beethoven never knew how to multiply or divide.",
            "The heart of a shrimp is located in its head.",
            "There's a species of jellyfish that is biologically immortal.",
            "Humans share 60% of their DNA with bananas.",
            "The word 'nerd' was first coined by Dr. Seuss.",
            "Queen Elizabeth II was a trained mechanic.",
            "The Moon has moonquakes.",
            "Peanuts aren't nuts—they're legumes.",
            "A single strand of spaghetti is called a spaghetto.",
            "The fingerprints of koalas are virtually indistinguishable from human fingerprints.",
            "The average person walks the equivalent of three times around the world in a lifetime.",
            "A group of porcupines is called a prickle.",
            "The inventor of the frisbee was turned into a frisbee after he died—his ashes were molded into one.",
            "Sloths can hold their breath longer than dolphins can.",
            "The longest English word without a vowel is 'rhythms'.",
            "There are more trees on Earth than stars in the Milky Way.",
            "A snail can sleep for three years.",
            "The Great Wall of China is held together with sticky rice.",
            "Butterflies taste with their feet.",
            "The hashtag symbol is technically called an octothorpe.",
            "Elephants are the only animals that can't jump.",
            "A crocodile cannot stick its tongue out.",
            "Armadillos almost always give birth to identical quadruplets.",
            "The inventor of the microwave only received $2 for his discovery.",
            "Pigeons can do math at roughly the same level as monkeys.",
            "A cockroach can live for weeks without its head.",
            "The shortest complete sentence in English is 'Go.'",
            "Rats laugh when tickled.",
            "The unicorn is Scotland's national animal because it was believed to be the natural enemy of the lion—England's symbol.",
            "There's a basketball court on the top floor of the U.S. Supreme Court building.",
            "Dolphins have names for each other.",
            "The electric chair was invented by a dentist.",
            "A group of owls is called a parliament.",
            "The inventor of the telephone, Alexander Graham Bell, never called his wife or mother—both were deaf.",
            "Strawberries can be white, yellow, or green—red isn't their only color.",
            "Sea otters hold hands while sleeping so they don't drift apart.",
            "The longest wedding veil was longer than 63 football fields.",
            "A flock of crows is called a murder.",
            "The average cloud travels at 30 miles per hour.",
            "Hippo milk is pink.",
            "The Twitter bird has a name—Larry.",
            "The King of Hearts is the only king without a mustache in a standard deck of cards.",
            "Vending machines kill more people each year than sharks do.",
            "The oldest known living tree is over 5,000 years old.",
            "A bolt of lightning is five times hotter than the surface of the sun.",
            "The inventor of Vaseline ate a spoonful of it every day.",
            "The average person spends six months of their life waiting for red lights to turn green.",
            "Cows moo with regional accents.",
            "A group of pandas is called an embarrassment.",
            "The longest place name in the world has 85 letters.",
            "Mosquitoes are attracted to people who just ate bananas.",
            "The first oranges weren't orange—they were green.",
            "A blue whale's heart is the size of a small car.",
            "Cats have fewer toes on their back paws than their front paws.",
            "The shortest commercial flight lasts only 57 seconds.",
            "Polar bears have black skin under their white fur.",
            "The dot on a lowercase 'i' was added to distinguish it from similar letters in medieval handwriting.",
            "Your nose can detect over 1 trillion different scents.",
            "Honey is the only food that includes all the substances necessary to sustain life.",
            "A group of rabbits is called a fluffle.",
            "The average person produces enough saliva in their lifetime to fill two swimming pools.",
            "Nintendo was founded in 1889 as a playing card company.",
            "Camels have three eyelids to protect themselves from sand.",
            "The longest hiccup attack lasted 68 years—Charles Osborne hiccuped from 1922 to 1990.",
            "A hummingbird weighs less than a penny.",
            "You can hear a blue whale's heartbeat from over two miles away.",
            "A jiffy is actually 1/100th of a second in computer engineering.",
            "Astronauts cannot cry in space—the tears just form bubbles.",
            "The Hawaiian alphabet has only 12 letters.",
            "A group of jellyfish is called a smack.",
            "The longest time between two twins being born is 87 days.",
            "Horses can't breathe through their mouths.",
            "A single lightning bolt can toast 100,000 slices of bread.",
            "The human brain uses the same amount of power as a 10-watt light bulb.",
            "A shrimp's heart is in its head.",
            "The average person will spend 2 weeks of their lifetime waiting for traffic lights.",
            "Bees can recognize human faces.",
            "The first computer mouse was made of wood.",
            "A group of pugs is called a grumble.",
            "The longest time anyone has gone without sleep is 11 days.",
            "Crows can remember human faces and hold grudges.",
            "The letter 'E' appears in 11% of all English words.",
            "Venus is the only planet that spins clockwise.",
            "A group of cats is called a clowder.",
            "The first alarm clock could only ring at 4 AM.",
            "An ostrich's eye is bigger than its brain.",
            "Movie trailers were originally shown after the movie—hence the name 'trailers'.",
            "A group of hippos is called a bloat.",
            "The first product to have a barcode was Wrigley's gum.",
            "Lobsters taste with their feet.",
            "The longest word you can type with only your left hand is 'stewardesses'.",
            "Goldfish can see infrared and ultraviolet light.",
            "A group of apes is called a shrewdness.",
            "The original Monopoly game was designed to teach about the evils of capitalism.",
            "Your fingernails grow faster on your dominant hand.",
            "A jiffy is also the time it takes for light to travel one centimeter in physics.",
            "Humans are the only animals that blush.",
            "A group of ferrets is called a business.",
            "The word 'alphabet' comes from the first two Greek letters: alpha and beta.",
            "An octopus has nine brains—one central brain and one in each arm.",
            "The first emoji was created in 1999 by a Japanese artist.",
            "A group of rhinoceroses is called a crash.",
            "The inventor of the chocolate chip cookie sold her recipe to Nestlé for a lifetime supply of chocolate.",
            "Adult cats only meow to communicate with humans, not other cats.",
            "A group of zebras is called a dazzle.",
            "Your taste buds are replaced every two weeks.",
            "The longest English word with letters in alphabetical order is 'almost'.",
            "A group of squirrels is called a scurry.",
            "The human eye can distinguish about 10 million different colors.",
            "A group of hedgehogs is called a prickle.",
            "The first YouTube video was uploaded on April 23, 2005—it was about elephants at a zoo."
        ];
        
        this.init();
    }

    async init() {
        // Check for reset parameter
        if (window.location.search.includes('reset=true')) {
            const today = this.getTodayKey();
            localStorage.removeItem(`peggy-quiz-${today}`);
            window.location.href = window.location.pathname;
            return;
        }
        
        await this.loadQuestions();
        this.selectTodaysQuestions();
        this.bindEvents();
        this.setupKeyboardHandling();
        this.setupModeToggle();
        this.applyMode(this.currentMode, false); // Don't play sound on initial load
        this.updateDateDisplay();
        this.displayFunFact();
        this.checkWeather();
        this.checkPreviousAttempt();
        this.displayStats();
    }

    /**
     * Setup mode toggle buttons
     */
    setupModeToggle() {
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                if (mode !== this.currentMode) {
                    this.switchMode(mode);
                }
            });
        });
    }

    /**
     * Start emoji rain effect for basic mode
     */
    startEmojiRain() {
        // Don't create duplicate containers
        if (document.querySelector('.emoji-rain-container')) return;
        
        const emojis = ['💦', '🫦', '💗', '🔥', '❤️‍🔥', '🙈', '😘', '✌️', '💰', '💸'];
        const container = document.createElement('div');
        container.className = 'emoji-rain-container';
        document.body.appendChild(container);
        
        // Create initial batch of emojis
        for (let i = 0; i < 20; i++) {
            this.createRainEmoji(container, emojis, i * 500);
        }
        
        // Continuously spawn new emojis
        this.emojiRainInterval = setInterval(() => {
            this.createRainEmoji(container, emojis, 0);
        }, 800);
    }

    /**
     * Create a single falling emoji
     */
    createRainEmoji(container, emojis, delay) {
        setTimeout(() => {
            if (!document.querySelector('.emoji-rain-container')) return;
            
            const emoji = document.createElement('div');
            emoji.className = 'emoji-rain';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Randomly assign size and opacity at creation time (fixed for this emoji's lifetime)
            const sizeVariant = Math.random();
            let fontSize, opacity;
            if (sizeVariant < 0.33) {
                fontSize = '1rem';
                opacity = 0.3;
            } else if (sizeVariant < 0.66) {
                fontSize = '1.5rem';
                opacity = 0.5;
            } else {
                fontSize = '1.8rem';
                opacity = 0.7;
            }
            
            emoji.style.fontSize = fontSize;
            emoji.style.setProperty('--emoji-opacity', opacity);
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 5 + 8) + 's';
            
            container.appendChild(emoji);
            
            // Remove emoji after animation completes
            const duration = parseFloat(emoji.style.animationDuration) * 1000 + 1000;
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.remove();
                }
            }, duration);
        }, delay);
    }

    /**
     * Stop emoji rain effect
     */
    stopEmojiRain() {
        if (this.emojiRainInterval) {
            clearInterval(this.emojiRainInterval);
            this.emojiRainInterval = null;
        }
        const container = document.querySelector('.emoji-rain-container');
        if (container) {
            container.remove();
        }
    }

    /**
     * Switch between Classic and Basic mode
     */
    switchMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('peggy-mode', mode);
        this.applyMode(mode, true);
    }

    /**
     * Apply the selected mode
     */
    applyMode(mode, playSound = false) {
        const root = document.documentElement;
        const modeButtons = document.querySelectorAll('.mode-btn');
        const mascotImg = document.getElementById('mascot-image');
        const title = document.getElementById('main-title');
        const subtitle = document.getElementById('main-subtitle');
        const footerText = document.querySelector('.footer-text');
        const startBtn = document.getElementById('start-btn');
        const sound = document.getElementById('mode-sound');
        
        // Update active button
        modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        if (mode === 'basic') {
            root.classList.add('basic-mode');
            
            // Play sound effect
            if (playSound && sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Start emoji rain
            this.startEmojiRain();
            
            // Update branding
            if (mascotImg) mascotImg.src = 'Peggy-basic.png';
            if (title) title.innerHTML = "Peggy's <span class='title-emoji'>💅</span>";
            if (subtitle) subtitle.textContent = 'Super Slay Questions';
            if (footerText) footerText.textContent = "Five questions await you, biiiitch! 💁‍♀️";
            
            // Update start button text
            if (startBtn) {
                if (this.gameComplete) {
                    startBtn.querySelector('span').textContent = 'See Your Slay 👑';
                } else {
                    startBtn.querySelector('span').textContent = "Let's Go Bestie! 💅";
                }
            }
            
            // Update stats preview if game complete
            if (this.gameComplete) {
                const statsPreview = document.getElementById('stats-preview');
                if (statsPreview && statsPreview.querySelector('.stats-text')) {
                    statsPreview.querySelector('.stats-text').textContent = 
                        `Already slayed today bestie! 💅 Score: ${this.score}/${this.todaysQuestions.length}`;
                }
            }
            
            // Update page title
            document.title = "Peggy's Super Slay Questions 💅";
            
            // Update info card titles for basic mode
            this.updateBasicModeText();
        } else {
            root.classList.remove('basic-mode');
            
            // Stop the music when switching to classic
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
            
            // Stop emoji rain
            this.stopEmojiRain();
            
            // Restore classic branding
            if (mascotImg) mascotImg.src = 'peggy.png';
            if (title) title.innerHTML = "Peggy's";
            if (subtitle) subtitle.textContent = 'Very Serious Questions';
            if (footerText) footerText.textContent = 'Five questions await you, dear reader.';
            
            // Update start button text
            if (startBtn) {
                if (this.gameComplete) {
                    startBtn.querySelector('span').textContent = 'View Results';
                } else {
                    startBtn.querySelector('span').textContent = "Begin Today's Quiz";
                }
            }
            
            // Update stats preview if game complete
            if (this.gameComplete) {
                const statsPreview = document.getElementById('stats-preview');
                if (statsPreview && statsPreview.querySelector('.stats-text')) {
                    statsPreview.querySelector('.stats-text').textContent = 
                        `You've already completed today's quiz. Score: ${this.score}/${this.todaysQuestions.length}`;
                }
            }
            
            // Update page title
            document.title = "Peggy's Very Serious Questions";
            
            // Restore classic text
            this.updateClassicModeText();
        }
    }

    /**
     * Update text elements for Basic mode
     */
    updateBasicModeText() {
        // Update info card titles
        const todayTitle = document.querySelector('.info-card.primary .info-card-title');
        const funFactTitle = document.querySelector('.info-sections .info-card.secondary:first-of-type .info-card-title');
        const coatTitle = document.querySelector('.info-sections .info-card.secondary:last-of-type .info-card-title');
        
        if (todayTitle) todayTitle.textContent = "TODAY'S TEA ☕";
        
        // Fun fact card
        const funFactCard = document.querySelectorAll('.info-card.secondary')[0];
        if (funFactCard) {
            const title = funFactCard.querySelector('.info-card-title');
            if (title) title.textContent = "A *CHEF KISS* FACT 👨‍🍳";
        }
        
        // Coat card
        const coatCard = document.querySelectorAll('.info-card.secondary')[1];
        if (coatCard) {
            const title = coatCard.querySelector('.info-card-title');
            if (title) title.textContent = "DOES LIL' B NEED A COAT? 🧥";
        }
        
        // Update results screen text
        const resultsTitle = document.querySelector('.results-title');
        if (resultsTitle) resultsTitle.textContent = 'Slay Complete! 💖';
        
        const resultsOrnament = document.querySelector('.results-ornament');
        if (resultsOrnament) resultsOrnament.textContent = '👑';
        
        const returnMessage = document.querySelector('.return-message');
        if (returnMessage) returnMessage.textContent = "Come back tomorrow hun, we're not done slaying! 💅✨";
        
        const reviewTitle = document.querySelector('.review-title');
        if (reviewTitle) reviewTitle.textContent = "The Tea on Today's Answers ☕";
        
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) shareBtn.textContent = 'Share Your Slay 💖';
        
        const reviewBtn = document.getElementById('review-btn');
        if (reviewBtn) reviewBtn.textContent = '👀 Spill the Tea';
        
        const backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.textContent = '← Back Bestie';
        
        const quitBtn = document.getElementById('quit-btn');
        if (quitBtn) quitBtn.textContent = '← Exit Hun';
        
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) skipBtn.textContent = 'Pass 💨';
        
        const answerInput = document.getElementById('answer-input');
        if (answerInput) answerInput.placeholder = 'Spill the tea bestie...';
    }

    /**
     * Update text elements for Classic mode
     */
    updateClassicModeText() {
        // Restore info card titles
        const todayTitle = document.querySelector('.info-card.primary .info-card-title');
        if (todayTitle) todayTitle.textContent = "TODAY'S EDITION";
        
        // Fun fact card
        const funFactCard = document.querySelectorAll('.info-card.secondary')[0];
        if (funFactCard) {
            const title = funFactCard.querySelector('.info-card-title');
            if (title) title.textContent = "A FUN FACT";
        }
        
        // Coat card
        const coatCard = document.querySelectorAll('.info-card.secondary')[1];
        if (coatCard) {
            const title = coatCard.querySelector('.info-card-title');
            if (title) title.textContent = "DOES BECKY NEED A COAT?";
        }
        
        // Restore results screen text
        const resultsTitle = document.querySelector('.results-title');
        if (resultsTitle) resultsTitle.textContent = 'Finis';
        
        const resultsOrnament = document.querySelector('.results-ornament');
        if (resultsOrnament) resultsOrnament.textContent = '✦';
        
        const returnMessage = document.querySelector('.return-message');
        if (returnMessage) returnMessage.textContent = 'Return tomorrow for a fresh set of inquiries.';
        
        const reviewTitle = document.querySelector('.review-title');
        if (reviewTitle) reviewTitle.textContent = "Today's Answers";
        
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) shareBtn.textContent = 'Share Your Score';
        
        const reviewBtn = document.getElementById('review-btn');
        if (reviewBtn) reviewBtn.textContent = 'Review Answers';
        
        const backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.textContent = '← Back to Results';
        
        const quitBtn = document.getElementById('quit-btn');
        if (quitBtn) quitBtn.textContent = '← Exit';
        
        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) skipBtn.textContent = 'Skip';
        
        const answerInput = document.getElementById('answer-input');
        if (answerInput) answerInput.placeholder = 'Your answer...';
    }

    /**
     * Setup keyboard handling for Android
     */
    setupKeyboardHandling() {
        if (!this.isMobile()) return;
        
        const input = document.getElementById('answer-input');
        if (!input) return;
        
        // Handle input focus - ensure it stays visible above keyboard
        input.addEventListener('focus', () => {
            setTimeout(() => {
                const gameScreen = document.getElementById('game-screen');
                if (gameScreen) {
                    const inputRect = input.getBoundingClientRect();
                    const screenHeight = window.innerHeight;
                    const viewportHeight = window.visualViewport?.height || screenHeight;
                    
                    // Calculate if input is hidden by keyboard
                    const keyboardHeight = screenHeight - viewportHeight;
                    if (keyboardHeight > 0) {
                        // Keyboard is open, scroll input above it
                        const targetScroll = inputRect.top - (viewportHeight * 0.2);
                        if (targetScroll < gameScreen.scrollTop) {
                            gameScreen.scrollTo({
                                top: gameScreen.scrollTop + targetScroll - gameScreen.scrollTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }, 300); // Wait for keyboard animation
        });
    }

    async loadQuestions() {
        try {
            const response = await fetch('questions.json');
            const data = await response.json();
            this.questions = data.questions;
        } catch (error) {
            console.error('Failed to load questions:', error);
            this.questions = [];
        }
    }

    /**
     * Select 5 questions for today based on the date
     * Uses a seeded random to ensure everyone gets the same questions each day
     */
    selectTodaysQuestions() {
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const seed = this.hashCode(dateString);
        
        // Create a seeded shuffle
        const shuffled = [...this.questions];
        let currentSeed = seed;
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
            const j = currentSeed % (i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        this.todaysQuestions = shuffled.slice(0, 5);
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth <= 768;
    }

    bindEvents() {
        // Start button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        // Submit/Next button (transforms based on state)
        document.getElementById('submit-btn').addEventListener('click', () => {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn.classList.contains('next-mode')) {
                this.nextQuestion();
            } else {
                this.submitAnswer();
            }
        });

        // Skip button
        document.getElementById('skip-btn').addEventListener('click', () => {
            this.skipQuestion();
        });

        // Enter key to submit/next
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const submitBtn = document.getElementById('submit-btn');
                if (submitBtn.classList.contains('next-mode')) {
                    this.nextQuestion();
                } else if (!submitBtn.disabled) {
                    this.submitAnswer();
                }
            }
        });

        // Share button
        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareResults();
        });

        // Review button
        document.getElementById('review-btn').addEventListener('click', () => {
            this.showReview();
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showScreen('results-screen');
        });

        // Home link (Peggy + title)
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showScreen('start-screen');
        });

        // Quit button (exit quiz)
        document.getElementById('quit-btn').addEventListener('click', () => {
            this.showScreen('start-screen');
        });
    }

    updateDateDisplay() {
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const dateStr = today.toLocaleDateString('en-US', options);
        document.getElementById('today-date').textContent = dateStr;
    }

    displayFunFact() {
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const seed = this.hashCode(dateString + 'funfact');
        const factIndex = Math.abs(seed) % this.funFacts.length;
        document.getElementById('fun-fact').textContent = this.funFacts[factIndex];
    }

    async checkWeather() {
        const verdictEl = document.getElementById('coat-verdict');
        const detailsEl = document.getElementById('weather-details');
        
        try {
            // Sheffield, UK coordinates
            const lat = 53.38;
            const lon = -1.47;
            
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,rain,wind_speed_10m,weather_code&timezone=Europe/London`
            );
            
            if (!response.ok) throw new Error('Weather fetch failed');
            
            const data = await response.json();
            const current = data.current;
            
            const temp = current.temperature_2m;
            const rain = current.rain || 0;
            const precipitation = current.precipitation || 0;
            const windSpeed = current.wind_speed_10m;
            const weatherCode = current.weather_code;
            
            // Determine if coat is needed
            // Coat needed if: temp < 14°C, or raining, or very windy (>30 km/h), or bad weather code
            const rainyWeatherCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99];
            const isRaining = rain > 0 || precipitation > 0 || rainyWeatherCodes.includes(weatherCode);
            const isCold = temp < 14;
            const isWindy = windSpeed > 30;
            
            const needsCoat = isCold || isRaining || isWindy;
            
            // Build verdict
            verdictEl.textContent = needsCoat ? 'Yes!' : 'No!';
            verdictEl.classList.remove('yes', 'no');
            verdictEl.classList.add(needsCoat ? 'yes' : 'no');
            
            // Build details
            let details = `${Math.round(temp)}°C`;
            if (isRaining) details += ', rainy';
            if (isWindy) details += ', windy';
            if (!isRaining && !isWindy && !isCold) details += ', lovely';
            details += ' in Sheffield';
            
            detailsEl.textContent = details;
            
        } catch (error) {
            console.error('Weather error:', error);
            verdictEl.textContent = 'Maybe?';
            verdictEl.classList.remove('yes', 'no');
            detailsEl.textContent = "Couldn't check Sheffield weather";
        }
    }

    loadStats() {
        const statsData = localStorage.getItem('peggy-quiz-stats');
        if (statsData) {
            return JSON.parse(statsData);
        }
        return {
            totalGames: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            bestStreak: 0,
            currentStreak: 0,
            lastPlayedDate: null,
            scores: []
        };
    }

    saveStats() {
        localStorage.setItem('peggy-quiz-stats', JSON.stringify(this.stats));
    }

    updateStreak() {
        const today = this.getTodayKey();
        const yesterday = this.getYesterdayKey();
        
        if (this.stats.lastPlayedDate === today) {
            // Already played today, don't update streak
            return;
        }
        
        if (this.stats.lastPlayedDate === yesterday) {
            // Consecutive day - increment streak
            this.stats.currentStreak++;
        } else if (this.stats.lastPlayedDate !== null) {
            // Streak broken - reset to 1
            this.stats.currentStreak = 1;
        } else {
            // First time playing
            this.stats.currentStreak = 1;
        }
        
        if (this.stats.currentStreak > this.stats.bestStreak) {
            this.stats.bestStreak = this.stats.currentStreak;
        }
        
        this.stats.lastPlayedDate = today;
    }

    getYesterdayKey() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
    }

    checkPreviousAttempt() {
        const today = this.getTodayKey();
        const savedData = localStorage.getItem(`peggy-quiz-${today}`);
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.answers = data.answers;
            this.score = data.score;
            this.gameComplete = true;
            this.endTime = data.endTime || null;
            
            this.displayStats();
            
            const statsPreview = document.getElementById('stats-preview');
            statsPreview.querySelector('.stats-text').textContent = this.currentMode === 'basic'
                ? `Already slayed today bestie! 💅 Score: ${this.score}/${this.todaysQuestions.length}`
                : `You've already completed today's quiz. Score: ${this.score}/${this.todaysQuestions.length}`;
            
            document.getElementById('start-btn').querySelector('span').textContent = this.currentMode === 'basic'
                ? 'See Your Slay 👑'
                : 'View Results';
        } else {
            this.displayStats();
        }
    }

    displayStats() {
        const statsEl = document.getElementById('stats-display');
        if (!statsEl) return;
        
        const avgScore = this.stats.totalGames > 0 
            ? (this.stats.totalCorrect / this.stats.totalQuestions * 100).toFixed(0)
            : 0;
        
        statsEl.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">Streak</span>
                <span class="stat-value streak-value">${this.stats.currentStreak}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Avg Score</span>
                <span class="stat-value">${avgScore}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Games Played</span>
                <span class="stat-value">${this.stats.totalGames}</span>
            </div>
        `;
    }

    getTodayKey() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    startGame() {
        if (this.gameComplete) {
            this.showResults();
            return;
        }
        
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
        this.showScreen('game-screen');
        this.displayQuestion();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    displayQuestion() {
        const question = this.todaysQuestions[this.currentIndex];
        
        // Update progress with smooth animation
        const progress = ((this.currentIndex) / this.todaysQuestions.length) * 100;
        const progressFill = document.getElementById('progress-fill');
        // Force reflow for smooth animation
        progressFill.offsetWidth;
        progressFill.style.width = `${progress}%`;
        
        // Update counter
        document.getElementById('current-question').textContent = this.currentIndex + 1;
        document.getElementById('total-questions').textContent = this.todaysQuestions.length;
        
        // Update question number (Roman numerals)
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
        document.getElementById('question-number').textContent = romanNumerals[this.currentIndex] + '.';
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Reset input and feedback
        const input = document.getElementById('answer-input');
        input.value = '';
        input.disabled = false;
        
        // Handle focus differently on mobile vs desktop
        if (this.isMobile()) {
            // On mobile, auto-focus to bring keyboard back for next question
            // This provides seamless flow between questions
            setTimeout(() => {
                input.focus();
                // Scroll input into view above keyboard - use 'start' for Android
                // This ensures input is visible above the keyboard
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                    // Additional scroll adjustment for Android
                    const gameScreen = document.getElementById('game-screen');
                    if (gameScreen) {
                        const inputRect = input.getBoundingClientRect();
                        const screenHeight = window.innerHeight;
                        // If input is in lower half, scroll more
                        if (inputRect.top > screenHeight / 2) {
                            gameScreen.scrollBy({
                                top: inputRect.top - (screenHeight * 0.3),
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            }, 100);
        } else {
            // Desktop: auto-focus immediately
            input.focus();
        }
        
        // Reset button to Submit mode
        const submitBtn = document.getElementById('submit-btn');
        const skipBtn = document.getElementById('skip-btn');
        submitBtn.disabled = false;
        skipBtn.disabled = false;
        skipBtn.textContent = this.currentMode === 'basic' ? 'Pass 💨' : 'Skip';
        submitBtn.classList.remove('next-mode');
        submitBtn.querySelector('.btn-text').textContent = this.currentMode === 'basic' ? 'Slay! 💖' : 'Submit';
        
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('visible', 'correct', 'incorrect');
    }

    skipQuestion() {
        const question = this.todaysQuestions[this.currentIndex];
        
        // Store answer as skipped (marked as incorrect)
        this.answers.push({
            question: question.question,
            userAnswer: '(skipped)',
            correctAnswer: question.answer,
            isCorrect: false,
            category: this.getQuestionCategory(question.question)
        });
        
        // Show feedback
        this.showFeedback(false, question.answer);
        
        // Transform button to "Next Question"
        const submitBtn = document.getElementById('submit-btn');
        const input = document.getElementById('answer-input');
        input.disabled = true;
        document.getElementById('skip-btn').disabled = true;
        submitBtn.disabled = false; // Re-enable for next action
        submitBtn.classList.add('next-mode');
        submitBtn.querySelector('.btn-text').textContent = this.currentMode === 'basic' ? 'Next Bestie! 💅' : 'Next Question';
    }

    submitAnswer() {
        const input = document.getElementById('answer-input');
        const userAnswer = input.value.trim();
        
        if (!userAnswer) {
            // On mobile, scroll into view instead of just focusing
            if (this.isMobile()) {
                // Scroll input into view above keyboard
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                    const gameScreen = document.getElementById('game-screen');
                    if (gameScreen) {
                        const inputRect = input.getBoundingClientRect();
                        const screenHeight = window.innerHeight;
                        if (inputRect.top > screenHeight / 2) {
                            gameScreen.scrollBy({
                                top: inputRect.top - (screenHeight * 0.3),
                                behavior: 'smooth'
                            });
                        }
                    }
                    setTimeout(() => input.focus(), 100);
                }, 50);
            } else {
                input.focus();
            }
            return;
        }
        
        const question = this.todaysQuestions[this.currentIndex];
        const isCorrect = this.checkAnswer(userAnswer, question.answer, question.alternateAnswers);
        
        // Store answer with category
        this.answers.push({
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.answer,
            isCorrect: isCorrect,
            category: this.getQuestionCategory(question.question)
        });
        
        if (isCorrect) {
            this.score++;
        }
        
        // Show feedback
        this.showFeedback(isCorrect, question.answer);
        
        // Transform button to "Next Question"
        const submitBtn = document.getElementById('submit-btn');
        input.disabled = true;
        document.getElementById('skip-btn').disabled = true;
        submitBtn.disabled = false; // Re-enable for next action
        submitBtn.classList.add('next-mode');
        submitBtn.querySelector('.btn-text').textContent = this.currentMode === 'basic' ? 'Next Bestie! 💅' : 'Next Question';
    }

    /**
     * Check answer with fuzzy matching
     * Allows for case insensitivity and minor spelling errors
     */
    checkAnswer(userAnswer, correctAnswer, alternateAnswers = []) {
        const normalize = (str) => str.toLowerCase().trim()
            .replace(/['']/g, "'")
            .replace(/[""]/g, '"')
            .replace(/\s+/g, ' ');
        
        const normalizedUser = normalize(userAnswer);
        const allAnswers = [correctAnswer, ...(alternateAnswers || [])];
        
        for (const answer of allAnswers) {
            const normalizedCorrect = normalize(answer);
            
            // Exact match (case insensitive)
            if (normalizedUser === normalizedCorrect) {
                return true;
            }
            
            // Check similarity (allow ~20% error rate)
            const similarity = this.calculateSimilarity(normalizedUser, normalizedCorrect);
            if (similarity >= 0.8) {
                return true;
            }
            
            // Check if user answer contains the correct answer or vice versa
            // (for answers like "The Beatles" when user types "Beatles")
            if (normalizedUser.includes(normalizedCorrect) || 
                normalizedCorrect.includes(normalizedUser)) {
                // Only accept if the shorter string is at least 60% of the longer
                const shorter = normalizedUser.length < normalizedCorrect.length ? 
                    normalizedUser : normalizedCorrect;
                const longer = normalizedUser.length >= normalizedCorrect.length ? 
                    normalizedUser : normalizedCorrect;
                if (shorter.length / longer.length >= 0.6) {
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Calculate string similarity using Levenshtein distance
     */
    calculateSimilarity(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;
        
        if (len1 === 0) return len2 === 0 ? 1 : 0;
        if (len2 === 0) return 0;
        
        // Create distance matrix
        const matrix = Array(len1 + 1).fill(null)
            .map(() => Array(len2 + 1).fill(null));
        
        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;
        
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,      // deletion
                    matrix[i][j - 1] + 1,      // insertion
                    matrix[i - 1][j - 1] + cost // substitution
                );
            }
        }
        
        const distance = matrix[len1][len2];
        const maxLen = Math.max(len1, len2);
        return (maxLen - distance) / maxLen;
    }

    showFeedback(isCorrect, correctAnswer) {
        const feedback = document.getElementById('feedback');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');
        const correctAnswerEl = document.getElementById('correct-answer');
        
        feedback.classList.remove('correct', 'incorrect', 'animate-bounce');
        feedback.classList.add('visible', isCorrect ? 'correct' : 'incorrect');
        
        // Add animation class for correct answers only
        if (isCorrect) {
            setTimeout(() => {
                feedback.classList.add('animate-bounce');
            }, 10);
        }
        
        if (isCorrect) {
            feedbackIcon.textContent = this.currentMode === 'basic' ? '💖' : '✓';
            const responses = this.currentMode === 'basic' ? [
                'YAAAS QUEEN! 👑',
                'SLAY BESTIE! 💅',
                'Absolutely iconic! ✨',
                'Mother is mothering! 🔥',
                'You ate that up! 😍',
                'Period! 💖',
                'Living for this! 🦋',
                'The serve is serving! ✨'
            ] : [
                'Precisely so.',
                'Quite right.',
                'Indeed.',
                'Correct.',
                'Well done.',
                'Excellent.',
                'Spot on.'
            ];
            feedbackText.textContent = responses[Math.floor(Math.random() * responses.length)];
            correctAnswerEl.textContent = '';
        } else {
            feedbackIcon.textContent = this.currentMode === 'basic' ? '😭' : '✗';
            const responses = this.currentMode === 'basic' ? [
                "Not it hun! 😬",
                "That ain't it bestie! 💔",
                "Oop- not quite! 🙈",
                "We'll pretend we didn't see that! 👀",
                "Main character moment... failed! 😩",
                "The flop era! 💀"
            ] : [
                'Not quite.',
                'Alas, no.',
                'Unfortunately not.',
                "I'm afraid not.",
                'Close, but no.'
            ];
            feedbackText.textContent = responses[Math.floor(Math.random() * responses.length)];
            correctAnswerEl.textContent = this.currentMode === 'basic' 
                ? `The tea was: ${correctAnswer} ☕` 
                : `The answer was: ${correctAnswer}`;
        }
        
        // On mobile, ensure submit/next button stays visible after feedback appears
        // The button is already in the answer section, so it should be visible
        // No need for extra scrolling since it's in the same container
    }

    nextQuestion() {
        this.currentIndex++;
        
        if (this.currentIndex >= this.todaysQuestions.length) {
            this.endGame();
        } else {
            this.displayQuestion();
        }
    }

    endGame() {
        this.gameComplete = true;
        this.endTime = Date.now();
        const timeTaken = Math.round((this.endTime - this.startTime) / 1000);
        
        // Update statistics
        this.updateStreak();
        this.stats.totalGames++;
        this.stats.totalQuestions += this.todaysQuestions.length;
        this.stats.totalCorrect += this.score;
        this.stats.scores.push({
            date: this.getTodayKey(),
            score: this.score,
            total: this.todaysQuestions.length,
            timeTaken: timeTaken
        });
        // Keep only last 30 days of scores
        if (this.stats.scores.length > 30) {
            this.stats.scores.shift();
        }
        this.saveStats();
        
        // Save to localStorage
        const today = this.getTodayKey();
        localStorage.setItem(`peggy-quiz-${today}`, JSON.stringify({
            score: this.score,
            answers: this.answers,
            date: today,
            timeTaken: timeTaken,
            endTime: this.endTime
        }));
        
        this.showResults();
    }

    showResults() {
        this.showScreen('results-screen');
        
        // Apply mode-specific text to results screen
        if (this.currentMode === 'basic') {
            this.updateBasicModeText();
        } else {
            this.updateClassicModeText();
        }
        
        // Update score
        document.getElementById('final-score').textContent = this.score;
        
        // Get time taken
        let timeTaken = null;
        if (this.endTime && this.startTime) {
            timeTaken = Math.round((this.endTime - this.startTime) / 1000);
        } else {
            const today = this.getTodayKey();
            const savedData = localStorage.getItem(`peggy-quiz-${today}`);
            if (savedData) {
                const data = JSON.parse(savedData);
                timeTaken = data.timeTaken || null;
            }
        }
        
        // Update message
        const totalQuestions = this.todaysQuestions.length;
        const classicMessages = {
            0: 'Perhaps the questions were too serious today.',
            1: 'A humble beginning. Tomorrow awaits.',
            2: 'Two correct! The journey continues.',
            3: 'A respectable showing.',
            4: 'Nearly there! Not too shabby.',
            5: 'Flawless! You are clearly very serious about questions.'
        };
        const basicMessages = {
            0: "Bestie... we need to talk 😭💔 Main character origin story tho!",
            1: "One slay is still a slay hun! 💅 You're warming up!",
            2: "Two correct! The glow up is coming bestie! ✨",
            3: "Okaaay we see you! Serving mid but make it fashion! 💖",
            4: "So close to eating this UP! You're literally ICONIC! 👑",
            5: "MOTHER ATE AND LEFT NO CRUMBS!!! 💅👑✨ SLAY QUEEN!"
        };
        const messages = this.currentMode === 'basic' ? basicMessages : classicMessages;
        const message = messages[this.score] || (this.currentMode === 'basic' 
            ? `You got ${this.score} out of ${totalQuestions} hun! Keep slaying! 💖`
            : `You got ${this.score} out of ${totalQuestions} correct.`);
        document.getElementById('results-message').textContent = message;
        
        // Add time taken if available
        const timeDisplay = document.getElementById('time-taken');
        if (timeDisplay) {
            if (timeTaken) {
                const minutes = Math.floor(timeTaken / 60);
                const seconds = timeTaken % 60;
                timeDisplay.textContent = `Completed in ${minutes}:${seconds.toString().padStart(2, '0')}`;
                timeDisplay.style.display = 'block';
            } else {
                timeDisplay.style.display = 'none';
            }
        }
        
        // Create breakdown dots with animation
        const breakdown = document.getElementById('results-breakdown');
        breakdown.innerHTML = '';
        this.answers.forEach((answer, index) => {
            const dot = document.createElement('div');
            dot.className = `result-dot ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            dot.textContent = index + 1;
            dot.style.animationDelay = `${index * 0.1}s`;
            breakdown.appendChild(dot);
        });
        
        // Show category breakdown
        this.displayCategoryBreakdown();
        
        // Show confetti for perfect score
        if (this.score === totalQuestions && totalQuestions > 0) {
            this.showConfetti();
        }
        
        // Update streak display
        this.displayStats();
    }

    showConfetti() {
        const confettiCount = 50;
        const confettiColors = this.currentMode === 'basic' 
            ? ['#FF1493', '#FF69B4', '#FFD700', '#00CED1', '#FF69B4', '#FFB6C1']
            : ['#8B3A3A', '#3A5F4A', '#9A8B6F', '#1C1C1C'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 3000);
    }

    displayCategoryBreakdown() {
        // Count categories
        const categoryStats = {};
        this.answers.forEach(answer => {
            // Ensure category is always defined
            const category = answer.category || 'General';
            if (!categoryStats[category]) {
                categoryStats[category] = { total: 0, correct: 0 };
            }
            categoryStats[category].total++;
            if (answer.isCorrect) {
                categoryStats[category].correct++;
            }
        });
        
        // Create category display
        const categoryContainer = document.getElementById('category-breakdown');
        if (!categoryContainer) return;
        
        categoryContainer.innerHTML = '';
        
        const categories = Object.keys(categoryStats).filter(cat => cat && cat !== 'undefined').sort();
        if (categories.length === 0) return;
        
        categories.forEach(category => {
            const stat = categoryStats[category];
            const percentage = Math.round((stat.correct / stat.total) * 100);
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category-item';
            categoryEl.innerHTML = `
                <span class="category-name">${category}</span>
                <span class="category-score">${stat.correct}/${stat.total} (${percentage}%)</span>
            `;
            categoryContainer.appendChild(categoryEl);
        });
    }

    shareResults() {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const totalQuestions = this.todaysQuestions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);
        
        const squares = this.currentMode === 'basic' 
            ? this.answers.map(a => a.isCorrect ? '💖' : '💔').join('')
            : this.answers.map(a => a.isCorrect ? '🟩' : '⬜').join('');
        
        const emoji = this.currentMode === 'basic'
            ? (this.score === totalQuestions ? '👑' : this.score >= totalQuestions * 0.8 ? '💅' : this.score >= totalQuestions * 0.6 ? '✨' : '🦋')
            : (this.score === totalQuestions ? '🎉' : this.score >= totalQuestions * 0.8 ? '✨' : this.score >= totalQuestions * 0.6 ? '👍' : '📚');
        
        const gameName = this.currentMode === 'basic' 
            ? "Peggy's Super Slay Questions 💅" 
            : "Peggy's Very Serious Questions";
        
        const streakText = this.currentMode === 'basic'
            ? (this.stats.currentStreak > 1 ? `${this.stats.currentStreak} day slay streak 🔥\n\n` : '')
            : (this.stats.currentStreak > 1 ? `${this.stats.currentStreak} day streak\n\n` : '');
        
        const shareText = `${emoji} ${gameName}
${dateStr} — ${this.score}/${totalQuestions} (${percentage}%)

${squares}

${streakText}Play at: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: "Peggy's Very Serious Questions",
                text: shareText
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                const btn = document.getElementById('share-btn');
                const originalText = btn.textContent;
                btn.textContent = '✓ Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(console.error);
        }
    }

    /**
     * Categorize a question based on keywords
     */
    getQuestionCategory(question) {
        const q = question.toLowerCase();
        
        if (q.includes('wrote') || q.includes('author') || q.includes('novel') || q.includes('poem') || q.includes('play') || q.includes('book')) {
            return 'Literature';
        }
        if (q.includes('painted') || q.includes('artist') || q.includes('painting') || q.includes('sculpted') || q.includes('sculpture')) {
            return 'Art';
        }
        if (q.includes('composed') || q.includes('composer') || q.includes('symphony') || q.includes('opera') || q.includes('sonata')) {
            return 'Music';
        }
        if (q.includes('capital') || q.includes('country') || q.includes('city') || q.includes('continent') || q.includes('ocean') || q.includes('river') || q.includes('mountain')) {
            return 'Geography';
        }
        if (q.includes('chemical') || q.includes('element') || q.includes('symbol') || q.includes('formula') || q.includes('atom')) {
            return 'Science';
        }
        if (q.includes('planet') || q.includes('moon') || q.includes('solar system') || q.includes('star') || q.includes('galaxy')) {
            return 'Astronomy';
        }
        if (q.includes('year') || q.includes('century') || q.includes('war') || q.includes('empire') || q.includes('revolution') || q.includes('discovered') || q.includes('invented')) {
            return 'History';
        }
        if (q.includes('organ') || q.includes('bone') || q.includes('body') || q.includes('blood') || q.includes('heart') || q.includes('cell')) {
            return 'Biology';
        }
        if (q.includes('animal') || q.includes('species') || q.includes('mammal') || q.includes('bird') || q.includes('fish')) {
            return 'Nature';
        }
        
        return 'General';
    }

    /**
     * Generate Wikipedia URL from answer text
     */
    getWikipediaUrl(answer) {
        // Clean up the answer for Wikipedia URL
        let searchTerm = answer.trim();
        // Remove common prefixes/suffixes that might not be in Wikipedia title
        searchTerm = searchTerm.replace(/^(The|A|An)\s+/i, '');
        // Replace spaces with underscores and encode
        searchTerm = encodeURIComponent(searchTerm.replace(/\s+/g, '_'));
        return `https://en.wikipedia.org/wiki/${searchTerm}`;
    }

    showReview() {
        this.showScreen('review-screen');
        
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';
        
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
        
        this.answers.forEach((answer, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            
            // Generate Wikipedia link for wrong answers - make the answer itself a link
            let correctAnswerHtml = '';
            if (!answer.isCorrect) {
                const wikiUrl = this.getWikipediaUrl(answer.correctAnswer);
                correctAnswerHtml = `<p class="review-correct-answer">Correct answer: <a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="review-answer-link">${answer.correctAnswer}</a></p>`;
            }
            
            item.innerHTML = `
                <div class="review-question-num">${romanNumerals[index]}.</div>
                <p class="review-question-text">${answer.question}</p>
                <div class="review-answers">
                    <p class="review-your-answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
                        Your answer: ${answer.userAnswer} ${answer.isCorrect ? '✓' : '✗'}
                    </p>
                    ${correctAnswerHtml}
                </div>
            `;
            reviewList.appendChild(item);
        });
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PeggysQuiz();
});



