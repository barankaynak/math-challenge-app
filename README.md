# Math Challenge Game

A fun and interactive math game designed for 2nd-grade students to practice addition, subtraction, and multiplication.

## Features

- Interactive game with colorful circles and animations
- 60-second challenge to answer as many questions as possible
- Addition, subtraction, and multiplication problems at the 2nd-grade level
- Confetti celebration for correct answers
- Score tracking and end-game statistics

## Project Structure

```
math-challenge-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js
│   ├── MathChallenge.js
│   ├── index.js
│   ├── index.css
│   └── ...
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher recommended)
- npm (version 6.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/math-challenge-app.git
   cd math-challenge-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To build the app for production:

```
npm run build
```

This creates a `build` directory with optimized production files.

## Deployment

The built app can be deployed to any static site hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3
- etc.

## Technologies Used

- React.js
- TailwindCSS
- CSS animations