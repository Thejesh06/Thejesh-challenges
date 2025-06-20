let answerSelected = false;

const questions = [
    {
        question: "What is 1+2",
        answers: [
            { text: "3", correct: true },
            { text: "2", correct: false },
            { text: "1", correct: false },
            { text: "0", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What year did the Titanic sink?",
        answers: [
            { text: "1912", correct: true },
            { text: "1905", correct: false },
            { text: "1920", correct: false },
            { text: "1898", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const restartButton = document.getElementById("restart-btn");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreDisplayElement = document.getElementById("score-display");

function displayScore() {
    feedbackElement.textContent = '🕉 Jai Shri Krishna! You have completed the quiz 🙏';
    scoreDisplayElement.textContent = `Your score: ${score}/${questions.length}`;
    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    answerSelected = false;

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        button.addEventListener("click", () => {
            if (answerSelected) return;
            answerSelected = true;

            if (answer.correct) {
                score++;
                feedbackElement.textContent = "Correct!";
            } else {
                const correctAnswer = question.answers.find(a => a.correct).text;
                feedbackElement.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
            }

            // disable all buttons and color them
            Array.from(answerButtonsElement.children).forEach(btn => {
                btn.disabled = true;
                const isCorrect = question.answers.find(a => a.text === btn.textContent).correct;
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
            });

            nextButton.style.display = "block";
        });

        answerButtonsElement.appendChild(button);
    });
}

function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        feedbackElement.textContent = '';
        nextButton.style.display = "none";
        showQuestion();
    } else {
        displayScore();
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    scoreDisplayElement.textContent = '';
    feedbackElement.textContent = '';
    restartButton.style.display = "none";
    nextButton.style.display = "none";
    showQuestion();
}

restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextQuestion);
window.onload = startQuiz;
