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
            "The fingerprints of koalas are virtually indistinguishable from human fingerprints."
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
        this.updateDateDisplay();
        this.displayFunFact();
        this.checkWeather();
        this.checkPreviousAttempt();
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
     * Select 10 questions for today based on the date
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
        
        this.todaysQuestions = shuffled.slice(0, 10);
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

        // Submit answer
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.submitAnswer();
        });

        // Enter key to submit
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const submitBtn = document.getElementById('submit-btn');
                const nextBtn = document.getElementById('next-btn');
                
                if (!submitBtn.disabled) {
                    this.submitAnswer();
                } else if (!nextBtn.classList.contains('hidden')) {
                    this.nextQuestion();
                }
            }
        });

        // Next question
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
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

    checkPreviousAttempt() {
        const today = this.getTodayKey();
        const savedData = localStorage.getItem(`peggy-quiz-${today}`);
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.answers = data.answers;
            this.score = data.score;
            this.gameComplete = true;
            
            const statsPreview = document.getElementById('stats-preview');
            statsPreview.querySelector('.stats-text').textContent = 
                `You've already completed today's quiz. Score: ${this.score}/10`;
            
            document.getElementById('start-btn').querySelector('span').textContent = 
                'View Results';
        }
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
        
        // Update progress
        const progress = ((this.currentIndex) / this.todaysQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Update counter
        document.getElementById('current-question').textContent = this.currentIndex + 1;
        document.getElementById('total-questions').textContent = this.todaysQuestions.length;
        
        // Update question number (Roman numerals)
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
        document.getElementById('question-number').textContent = romanNumerals[this.currentIndex] + '.';
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Reset input and feedback
        const input = document.getElementById('answer-input');
        input.value = '';
        input.disabled = false;
        
        // Handle focus differently on mobile vs desktop
        if (this.isMobile()) {
            // On mobile, don't auto-focus to prevent keyboard popup
            // Let user tap to focus naturally
            setTimeout(() => {
                // Smoothly scroll input into view when ready
                input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        } else {
            // Desktop: auto-focus immediately
            input.focus();
        }
        
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('next-btn').classList.add('hidden');
        
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('visible', 'correct', 'incorrect');
    }

    submitAnswer() {
        const input = document.getElementById('answer-input');
        const userAnswer = input.value.trim();
        
        if (!userAnswer) {
            // On mobile, scroll into view instead of just focusing
            if (this.isMobile()) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => input.focus(), 100);
            } else {
                input.focus();
            }
            return;
        }
        
        const question = this.todaysQuestions[this.currentIndex];
        const isCorrect = this.checkAnswer(userAnswer, question.answer, question.alternateAnswers);
        
        // Store answer
        this.answers.push({
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.answer,
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            this.score++;
        }
        
        // Show feedback
        this.showFeedback(isCorrect, question.answer);
        
        // Disable input
        input.disabled = true;
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('next-btn').classList.remove('hidden');
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
        
        feedback.classList.remove('correct', 'incorrect');
        feedback.classList.add('visible', isCorrect ? 'correct' : 'incorrect');
        
        if (isCorrect) {
            feedbackIcon.textContent = '✓';
            const responses = [
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
            feedbackIcon.textContent = '✗';
            const responses = [
                'Not quite.',
                'Alas, no.',
                'Unfortunately not.',
                "I'm afraid not.",
                'Close, but no.'
            ];
            feedbackText.textContent = responses[Math.floor(Math.random() * responses.length)];
            correctAnswerEl.textContent = `The answer was: ${correctAnswer}`;
        }
        
        // On mobile, smoothly scroll feedback into view after it appears
        if (this.isMobile()) {
            setTimeout(() => {
                feedback.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest',
                    inline: 'nearest'
                });
            }, 350); // Wait for transition to start
        }
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
        
        // Save to localStorage
        const today = this.getTodayKey();
        localStorage.setItem(`peggy-quiz-${today}`, JSON.stringify({
            score: this.score,
            answers: this.answers,
            date: today
        }));
        
        this.showResults();
    }

    showResults() {
        this.showScreen('results-screen');
        
        // Update score
        document.getElementById('final-score').textContent = this.score;
        
        // Update message
        const messages = {
            0: 'Perhaps the questions were too serious today.',
            1: 'A humble beginning. Tomorrow awaits.',
            2: 'Two correct! The journey continues.',
            3: 'A respectable showing.',
            4: 'Nearly half! Not too shabby.',
            5: 'A perfectly middling performance.',
            6: 'Above average, one might say.',
            7: 'Quite impressive, dear reader.',
            8: 'Splendid! Peggy would approve.',
            9: 'Remarkable! Just one shy of perfection.',
            10: 'Flawless! You are clearly very serious about questions.'
        };
        document.getElementById('results-message').textContent = messages[this.score];
        
        // Create breakdown dots
        const breakdown = document.getElementById('results-breakdown');
        breakdown.innerHTML = '';
        this.answers.forEach((answer, index) => {
            const dot = document.createElement('div');
            dot.className = `result-dot ${answer.isCorrect ? 'correct' : 'incorrect'}`;
            dot.textContent = index + 1;
            breakdown.appendChild(dot);
        });
    }

    shareResults() {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const squares = this.answers.map(a => a.isCorrect ? '■' : '□').join('');
        
        const shareText = `Peggy's Very Serious Questions
${dateStr} — ${this.score}/10

${squares}

Play at: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: "Peggy's Very Serious Questions",
                text: shareText
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                const btn = document.getElementById('share-btn');
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }).catch(console.error);
        }
    }

    showReview() {
        this.showScreen('review-screen');
        
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';
        
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
        
        this.answers.forEach((answer, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="review-question-num">${romanNumerals[index]}.</div>
                <p class="review-question-text">${answer.question}</p>
                <div class="review-answers">
                    <p class="review-your-answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
                        Your answer: ${answer.userAnswer} ${answer.isCorrect ? '✓' : '✗'}
                    </p>
                    ${!answer.isCorrect ? `<p class="review-correct-answer">Correct answer: ${answer.correctAnswer}</p>` : ''}
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

