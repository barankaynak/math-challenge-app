import React, { useState, useEffect } from 'react';

const CircleButton = ({ position, size, color, onClick }) => {
  return (
    <div
      className="absolute rounded-full cursor-pointer flex items-center justify-center text-white font-bold shadow-lg transform hover:scale-110 transition-transform duration-300"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        backgroundColor: color,
        transform: 'translate(-50%, -50%)',
        border: '4px solid white',
        zIndex: 50
      }}
      onClick={onClick}
    >
      <span className="text-xl select-none">Click!</span>
    </div>
  );
};

const GameCircles = ({ onCircleClick }) => {
  // Define fixed positions for better control
  const circlePositions = [
    { x: 20, y: 20, size: 100, color: '#FF6347' },  // Top left - Red
    { x: 50, y: 15, size: 120, color: '#4682B4' },  // Top center - Blue
    { x: 80, y: 20, size: 90, color: '#32CD32' },   // Top right - Green
    { x: 20, y: 50, size: 110, color: '#9370DB' },  // Middle left - Purple
    { x: 80, y: 50, size: 100, color: '#FFD700' },  // Middle right - Gold
    { x: 30, y: 80, size: 90, color: '#FF6347' },   // Bottom left - Red
    { x: 60, y: 85, size: 120, color: '#4682B4' },  // Bottom center - Blue
    { x: 85, y: 75, size: 100, color: '#32CD32' }   // Bottom right - Green
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-auto z-40">
      {circlePositions.map((circle, index) => (
        <CircleButton
          key={index}
          position={{ x: circle.x, y: circle.y }}
          size={circle.size}
          color={circle.color}
          onClick={onCircleClick}
        />
      ))}
    </div>
  );
};

const Confetti = ({ active }) => {
  const [pieces, setPieces] = useState([]);
  
  useEffect(() => {
    if (active) {
      const newPieces = [];
      const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
      
      // Create 100 pieces of confetti
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100, // Random x position (0-100%)
          y: -20 - Math.random() * 100, // Start above the viewport
          size: 5 + Math.random() * 10, // Random size between 5-15px
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360, // Random rotation
          xVelocity: -2 + Math.random() * 4, // Random horizontal velocity
          yVelocity: 2 + Math.random() * 3, // Random vertical velocity,
        });
      }
      
      setPieces(newPieces);
      
      // Remove confetti after 3 seconds
      const timer = setTimeout(() => {
        setPieces([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active]);
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 1000 }}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: '2px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: 'fall 3s linear forwards',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(1000%) rotate(960deg);
          }
        }
      `}</style>
    </div>
  );
};

const BackgroundCircles = () => {
  const circles = [];
  
  // Generate random circle properties
  for (let i = 0; i < 15; i++) {
    circles.push({
      id: i,
      size: 50 + Math.random() * 150,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.2,
      color: ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#9370DB'][Math.floor(Math.random() * 5)]
    });
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {circles.map(circle => (
        <div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

const MathChallenge = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Generate a random addition, subtraction, or multiplication question appropriate for 2nd graders
  const generateQuestion = () => {
    const operationType = Math.random() < 0.33 ? 'addition' : (Math.random() < 0.67 ? 'subtraction' : 'multiplication');
    let num1, num2, answer, questionText;
    
    if (operationType === 'addition') {
      // Numbers between 1 and 50 for addition
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      questionText = `${num1} + ${num2} = ?`;
    } else if (operationType === 'subtraction') {
      // For subtraction, ensure the answer is positive (2nd grade level)
      num1 = Math.floor(Math.random() * 50) + 10; // Minimum of 10
      num2 = Math.floor(Math.random() * num1); // Ensures num2 < num1
      answer = num1 - num2;
      questionText = `${num1} - ${num2} = ?`;
    } else {
      // For multiplication, use small numbers appropriate for 2nd graders
      num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = num1 * num2;
      questionText = `${num1} × ${num2} = ?`;
    }
    
    return {
      questionText,
      answer
    };
  };
  
  // Start the game
  const startGame = () => {
    console.log("Starting game...");
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setCurrentQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback('');
    setAnsweredQuestions(0);
    setCorrectAnswers(0);
  };
  
  // Handle user submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure the user has entered something
    if (userAnswer.trim() === '') {
      setFeedback('Please enter a number');
      return;
    }
    
    const userNum = parseInt(userAnswer, 10);
    
    if (isNaN(userNum)) {
      setFeedback('Please enter a valid number');
      return;
    }
    
    setAnsweredQuestions(prev => prev + 1);
    
    if (userNum === currentQuestion.answer) {
      setScore(prev => prev + 10);
      setFeedback('Correct! +10 points');
      setCorrectAnswers(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setFeedback(`Not quite. The answer was ${currentQuestion.answer}`);
      setShowConfetti(false);
    }
    
    // Generate a new question
    setCurrentQuestion(generateQuestion());
    setUserAnswer('');
  };
  
  // Timer effect
  useEffect(() => {
    let timer;
    
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameOver && gameStarted) {
      setGameOver(true);
      setGameStarted(false);
    }
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="fixed inset-0 w-full h-full bg-white p-6 overflow-hidden">
      <BackgroundCircles />
      <Confetti active={showConfetti} />
      
      {!gameStarted && <GameCircles onCircleClick={startGame} />}
      
      <div className="max-w-lg mx-auto h-full flex flex-col justify-center relative z-10">
        <h1 className="text-3xl font-bold text-center mb-6">2nd Grade Math Challenge</h1>
        
        {!gameStarted && !gameOver && (
          <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl">
            <p className="mb-4 text-lg">Test your addition, subtraction, and multiplication skills!</p>
            <p className="mb-4 text-lg">You have 1 minute to answer as many questions as you can.</p>
            <p className="mb-4 text-xl font-bold text-blue-600">Click any colored circle to start!</p>
          </div>
        )}
        
        {gameStarted && (
          <div className="bg-white bg-opacity-80 p-6 rounded-xl">
            <div className="flex justify-between mb-4 text-lg">
              <div className="font-bold">Score: {score}</div>
              <div className={timeLeft < 10 ? "font-bold text-red-500" : "font-bold"}>
                Time: {formatTime(timeLeft)}
              </div>
            </div>
            
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold mb-6">{currentQuestion?.questionText}</h2>
              
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="border-2 border-gray-300 p-3 rounded-md mr-2 text-center w-24 text-xl"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 text-lg"
                  onClick={handleSubmit}
                >
                  Check
                </button>
              </form>
              
              {feedback && (
                <p className={feedback.includes('Correct') ? "mt-4 text-green-600 text-xl" : "mt-4 text-red-600 text-xl"}>
                  {feedback}
                </p>
              )}
            </div>
          </div>
        )}
        
        {gameOver && (
          <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl relative z-20">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-2 text-xl">Your final score: {score}</p>
            <p className="mb-6 text-xl">You answered {answeredQuestions} questions and got {correctAnswers} correct!</p>
            <p className="mb-4 text-xl font-bold text-blue-600">Click any colored circle to play again!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathChallenge;