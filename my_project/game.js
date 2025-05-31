document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById('start-btn');
  const quizScreen = document.getElementById('quiz-screen');
  const startScreen = document.getElementById('start-screen');
  const resultScreen = document.getElementById('result-screen');
  const questionText = document.getElementById('question-text');
  const choicesContainer = document.getElementById('choices-container');
  const timerDisplay = document.getElementById('time');
  const resultText = document.getElementById('result-text');
  const restartBtn = document.getElementById('restart-btn');
  const timerSound = document.getElementById('timer-sound');

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 15;
  let timer;

  const questions = [
    {
      question: "Where were the first modern Olympic Games held?",
      choices: ["Athens", "London", "Paris", "Rome"],
      answer: "Athens"
    },
    {
      question: "How many rings are there on the Olympic flag?",
      choices: ["3", "4", "5", "6"],
      answer: "5"
    },
    {
      question: "What does the Olympic flame symbolize?",
      choices: ["The sun", "Peace", "Continuity between games", "Speed"],
      answer: "Continuity between games"
    },
    {
      question: "Which country has won the most Olympic medals?",
      choices: ["Russia", "Germany", "China", "USA"],
      answer: "USA"
    },
    {
      question: "When were women first allowed to compete in the Olympics?",
      choices: ["1896", "1900", "1924", "1948"],
      answer: "1900"
    },
    {
      question: "Which city hosted the Summer Olympics in 2016?",
      choices: ["Beijing", "Tokyo", "Rio de Janeiro", "London"],
      answer: "Rio de Janeiro"
    },
    {
      question: "What is the motto of the Olympics?",
      choices: ["Faster, Higher, Stronger", "Together We Win", "Push the Limits", "Unity Through Sport"],
      answer: "Faster, Higher, Stronger"
    },
    {
      question: "Which sport was added to the Tokyo 2020 Olympics?",
      choices: ["Baseball", "Skateboarding", "Golf", "Karate"],
      answer: "Skateboarding"
    },
    {
      question: "Which of the following is NOT a Winter Olympic sport?",
      choices: ["Bobsleigh", "Speed skating", "Javelin", "Curling"],
      answer: "Javelin"
    },
    {
      question: "What do the five Olympic rings represent?",
      choices: ["5 continents", "5 sports", "5 countries", "5 goals"],
      answer: "5 continents"
    }
  ];

  // Start Game
  startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';

    
    timerSound.currentTime = 0;
    timerSound.play().catch(() => {
      console.log("Autoplay was blocked. Will try again on question load.");
    });

    loadQuestion();
    startTimer();
  });

  restartBtn.addEventListener('click', () => location.reload());

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    choicesContainer.innerHTML = '';

    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.classList.add('btn-style');
      btn.addEventListener('click', () => checkAnswer(choice));
      choicesContainer.appendChild(btn);
    });

    playTimerSound(); // sound 
  }

  function checkAnswer(choice) {
    const correct = questions[currentQuestion].answer;
    if (choice === correct) score++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
      resetTimer();
    } else {
      endGame();
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    startTimer();
  }

  function endGame() {
    clearInterval(timer);
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    resultText.textContent = `You got ${score} out of ${questions.length} correct!`;
  }

  function playTimerSound() {
    if (timerSound) {
      timerSound.pause();
      timerSound.currentTime = 0;
      timerSound.play().catch((err) => {
        console.log("Sound blocked or autoplay issue:", err);
      });
    }
  }
});
