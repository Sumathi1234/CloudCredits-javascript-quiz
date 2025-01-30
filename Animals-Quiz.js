const questions = [
    {
        question: "1. Which animal can survive for up to two weeks without water?",
        options: ["Camel","Kangaroo","Rat","Tiger"],
        answer: "Camel"
    },
    {
        question: "2.  What is the only mammal capable of true flight?",
        options: ["Squirrel","Bat","Lizard","Lemur"],
        answer: "Bat"
    },
    {
        question: "3. The male of which species gives birth to its young?",
        options: ["SeaHorse","Clownfish","Frog","Octopus"],
        answer: "Seahorse"
    },
    {
        question: "4. Which animal has the longest gestation period?",
        options: ["Elephant","Giraffe","Lion","Tiger"],
        answer: "Elephant"
    },
    {
        question: "5. Which animal has the largest brain in relation to its body size?",
        options: ["Dolphin","Whale","Elephant","Octopus"],
        answer: "Dolphin"
    },
    {
        question: "6. Which animal has the longest migration route?",
        options: ["Caribou","Elephant","Giraffe","Lion"],
        answer: "Caribou"
    },
    {
        question: "7. Which animal can live up to 500 years in the wild?",
        options: ["Tortoise","Whale","Elephant","Octopus"],
        answer: "Tortoise"
    },
    {
        question: "8. Which animal has the highest blood pressure?",
        options: ["Horse","Cow","Sheep","Elephant"],
        answer: "Elephant"
    },
    {
        question: "9. Which animal has the longest tongue?",
        options: ["Chameleon","Elephant","Giraffe","Lion"],
        answer: "Chameleon"
    },
    {
        question: "10. Which animal has the highest jump?",
        options: ["Giraffe","Elephant","Lion","Tiger"],
        answer: "Giraffe"
    },
    {
        question: "11. Which animal has the longest migration route in the air?",
        options: ["Eagle","Falcon","Hawk","Vulture"],
        answer: "Eagle"
    },
    {
        question: "12. Which animal has the highest speed on land?",
        options: ["Cheetah","Lion","Tiger","Elephant"],
        answer: "Cheetah"
    },
    {
        question: "13. Only one type of bird can fly backwards for a reasonable distance. Which?",
        options: ["Kestrels","Cuckoos","Humming Bird","Swift"],
        answer: "Humming Bird"
    },
    {
        question: "14. Which animal has the highest speed in air?",
        options: ["Falcon","Eagle","Hawk","Vulture"],
        answer: "Falcon"
    },
    {
        question: "15. Which animal has the highest speed on ice?",
        options: ["Penguin","Seal","Walrus","Polar bear"],
        answer: "Polar bear"
    },
    {
        question: "16. Which animal has the highest speed on snow?",
        options: ["Penguin","Seal","Walrus","Arctic fox"],
        answer: "Arctic fox"
    },
    {
        question: "17. Which sea creature has three hearts?",
        options: ["Starfish","Octopus","Dolphin","Squid"],
        answer: "Octopus"
    },
    {
        question: "18. Which animal has the highest number of teeth?",
        options: ["Shark","Crocodile","Lion","Tiger"],
        answer: "Shark"
    },
    {
        question: "19. A group of Lions is called ?",
        options: ["Herd","Flock","Pride","Army"],
        answer: "Pride"
    },
    {
        question: "20. Which animal has the slowest heart rate?",
        options: ["Elephant","Shrimp","Mouse","Blue Whale"],
        answer: "Blue Whale"
    }
    
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900;
let timerInterval;
const topicName = "Animals";

function startTimer() {
    timerInterval = setInterval(() => {
        const timerElement = document.getElementById("timer");
        if (timer <= 0) {
            clearInterval(timerInterval);
            showResults();
        } else {
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timer--;
        }
    }, 1000);
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";  // Clear previous options
    questionContainer.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    document.getElementById("next").style.display = (currentQuestionIndex === questions.length - 1) ? "none" : "inline-block";
    document.getElementById("submit").style.display = (currentQuestionIndex === questions.length - 1) ? "inline-block" : "none";
}

function nextQuestion(isSkipped = false) {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    let answer = selectedOption ? selectedOption.value : null;

    if (!isSkipped && !selectedOption) {
        alert("Please select an answer before proceeding to the next question.");
        return;
    }

    if (isSkipped) {
        skippedQuestions++;
        userAnswers.push("Not Answered");
    } else {
        userAnswers.push(answer);
        if (answer === questions[currentQuestionIndex].answer) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("results").style.display = "block";

    document.getElementById("correct").textContent = correctAnswers;
    document.getElementById("wrong").textContent = wrongAnswers;
    document.getElementById("skipped").textContent = skippedQuestions;
    document.getElementById("Score").textContent = correctAnswers;
    document.getElementById("total-questions").textContent = questions.length;

    const userAnswersContainer = document.getElementById("user-answers");
    userAnswersContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || "Not Answered";
        let userAnswerColor = userAnswer === question.answer ? "green" : (userAnswer === "Not Answered" ? "orange" : "red");

        const answerDiv = document.createElement("div");
        answerDiv.innerHTML = `
            <div>
                <strong>Q${index + 1}:</strong> ${question.question}
                <br><strong>Your Answer:</strong> <span style="color: ${userAnswerColor};">${userAnswer}</span>
                <br><strong>Correct Answer:</strong> <span style="color: blue;">${question.answer}</span>
                <hr>
            </div>`;
        userAnswersContainer.appendChild(answerDiv);
    });

    saveResults();
}

function saveResults() {
    let allResults = JSON.parse(localStorage.getItem('quizResults')) || {};
    allResults[topicName] = {
        correctAnswers, 
        totalQuestions: questions.length 
    };

    localStorage.setItem('quizResults', JSON.stringify(allResults));
}

function displayProfileResults() {
    let storedResults = JSON.parse(localStorage.getItem('quizResults'));
    const profileResultsContainer = document.getElementById("quiz-results-table").getElementsByTagName("tbody")[0];

    profileResultsContainer.innerHTML = ""; 

    if (!storedResults || Object.keys(storedResults).length === 0) {
        profileResultsContainer.innerHTML = "<tr><td colspan='3'>No quiz results found.</td></tr>";
        return;
    }

    Object.keys(storedResults).forEach(topic => {
        const result = storedResults[topic];

        const newRow = profileResultsContainer.insertRow();
        newRow.insertCell(0).textContent = topic;
        newRow.insertCell(1).textContent = result.correctAnswers; 
        newRow.insertCell(2).textContent = result.totalQuestions; 
    });
}
if (document.getElementById("profile-results")) {
    displayProfileResults();
}

document.getElementById("next").addEventListener("click", () => nextQuestion());
document.getElementById("submit").addEventListener("click", showResults);
document.getElementById("skip").addEventListener("click", () => nextQuestion(true));

displayQuestion();
startTimer();

if (document.getElementById("profile-results")) {
    displayProfileResults();
}
