# Peggy's Very Serious Questions

A daily trivia game with a New Yorker-inspired aesthetic. Each day brings 10 new questions to test your knowledge.

## Features

- **Daily Questions**: 10 questions per day, deterministically selected based on the date
- **Mobile-First Design**: Elegant, magazine-inspired UI optimized for mobile devices
- **Fuzzy Answer Matching**: Forgiving answer checking that allows for:
  - Case insensitivity
  - Minor spelling errors (~20% tolerance)
  - Partial matches (e.g., "Beatles" for "The Beatles")
  - Alternate accepted answers
- **Progress Saving**: Your daily score is saved locally, so you can only play once per day
- **Share Results**: Share your score with a stylish text-based summary

## How to Run

Simply open `index.html` in a web browser. No server required!

For local development with live reload, you can use any simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

## Adding More Questions

Edit `questions.json` to add or modify questions. Each question follows this format:

```json
{
    "question": "Your question text here?",
    "answer": "Primary correct answer",
    "alternateAnswers": ["Alternate 1", "Alternate 2"]
}
```

### Guidelines for Questions

- Questions should be challenging but fair
- Include common alternate answers (different spellings, abbreviated versions, etc.)
- Avoid questions that require exact numbers unless they're well-known
- The answer matching is forgiving, so you don't need to include every possible spelling variation

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks or dependencies)
- Uses localStorage to track daily completion
- Questions are shuffled deterministically based on the date, ensuring everyone gets the same questions each day
- Levenshtein distance algorithm for fuzzy string matching

## Design

The design is inspired by The New Yorker magazine's aesthetic:
- Playfair Display for headings (serif, elegant)
- Source Serif 4 for body text (readable, sophisticated)
- Cream and ink color palette
- Subtle animations and transitions
- Ornamental flourishes

## License

Made with ❧ for trivia lovers everywhere.


