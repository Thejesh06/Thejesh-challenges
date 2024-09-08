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

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreDisplayElement = document.getElementById("score-display");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplayElement.textContent = '';
    feedbackElement.textContent = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.onclick = () => selectAnswer(answer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
        feedbackElement.textContent = "Correct!";
    } else {
        feedbackElement.textContent = `Wrong! The correct answer is: ${questions[currentQuestionIndex].answers.find(a => a.correct).text}`;
    }
    nextButton.style.display = "block";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        feedbackElement.textContent = '';
        nextButton.style.display = "none";
        showQuestion(questions[currentQuestionIndex]);
    } else {
        displayScore();
    }
}

function displayScore() {
    feedbackElement.textContent = '';
    scoreDisplayElement.textContent = `Your score: ${score}/${questions.length}`;
    nextButton.style.display = "none";
}

// Start the quiz on page load
startQuiz();
