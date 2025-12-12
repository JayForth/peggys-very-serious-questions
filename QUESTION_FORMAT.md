# Question Format Guide

This guide explains how to add new questions to **Peggy's Very Serious Questions**.

## File Location

All questions are stored in `questions.json` in the root directory.

## Question Structure

Each question is a JSON object with the following fields:

```json
{
    "question": "Your question text here?",
    "answer": "The primary correct answer",
    "alternateAnswers": ["Alternate 1", "Alternate 2"]
}
```

### Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `question` | ✅ Yes | The question text to display to the player |
| `answer` | ✅ Yes | The primary correct answer |
| `alternateAnswers` | ✅ Yes | Array of alternate acceptable answers (can be empty `[]`) |

## Example Questions

### Simple Question (No Alternates)
```json
{
    "question": "What is the capital of France?",
    "answer": "Paris",
    "alternateAnswers": []
}
```

### Question with Alternate Answers
```json
{
    "question": "Who wrote 'Romeo and Juliet'?",
    "answer": "William Shakespeare",
    "alternateAnswers": ["Shakespeare", "W. Shakespeare"]
}
```

### Question with Multiple Spelling Variations
```json
{
    "question": "Who painted 'The Persistence of Memory'?",
    "answer": "Salvador Dalí",
    "alternateAnswers": ["Salvador Dali", "Dali", "Dalí"]
}
```

## Answer Matching Rules

The game has **fuzzy matching** built in, so you don't need to include every possible variation. The system automatically handles:

- **Case insensitivity** — "paris" matches "Paris"
- **Minor spelling errors** — ~20% character tolerance (e.g., "Shakspeare" would match "Shakespeare")
- **Partial matches** — "Beatles" matches "The Beatles" (if the shorter answer is at least 60% of the longer)

### When to Add Alternate Answers

Add alternates for:
- **Shortened versions** — "Beethoven" for "Ludwig van Beethoven"
- **Common nicknames** — "Big Ben" for "Elizabeth Tower"
- **Different spellings** — "Dostoyevsky" vs "Dostoevsky"
- **With/without articles** — "Great Barrier Reef" for "The Great Barrier Reef"
- **Equivalent answers** — "Dionysus" and "Bacchus" (Greek vs Roman name)

### You Don't Need Alternates For

- Lowercase/uppercase variations (handled automatically)
- Minor typos (handled by fuzzy matching)
- Very similar spellings (handled by fuzzy matching)

## Adding Questions to the File

1. Open `questions.json`
2. Find the `"questions": [` array
3. Add your new questions inside the array, separated by commas
4. Make sure to maintain valid JSON syntax

### Template for Adding Multiple Questions

```json
{
    "question": "Question 1?",
    "answer": "Answer 1",
    "alternateAnswers": []
},
{
    "question": "Question 2?",
    "answer": "Answer 2",
    "alternateAnswers": ["Alt answer"]
},
{
    "question": "Question 3?",
    "answer": "Answer 3",
    "alternateAnswers": ["Alt 1", "Alt 2"]
}
```

## Tips for Good Questions

1. **Be specific** — Avoid ambiguous questions with multiple valid answers
2. **Avoid numbers** — Unless they're well-known (e.g., "1776", "1989")
3. **Keep answers concise** — Single words or short phrases work best
4. **Test your questions** — Make sure the expected answer feels natural to type
5. **Include common alternates** — Think about how someone might reasonably answer

## Question Count

- **10 questions** are shown per day
- Questions are shuffled deterministically by date
- Currently: **98 questions** = ~9-10 days of unique content
- For 30 days: aim for **300+ questions**

## Validating Your JSON

Before saving, make sure your JSON is valid:
- All strings are in double quotes `"like this"`
- Arrays use square brackets `[]`
- Objects use curly braces `{}`
- Items are separated by commas (no trailing comma on the last item)

You can validate your JSON at: https://jsonlint.com/


