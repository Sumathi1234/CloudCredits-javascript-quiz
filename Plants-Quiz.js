const questions = [
    {
        question: "1. Which part of the plant is below the soil and is usually brown in colour?",
        options: ["Flower", "Fruit", "Root", "Stem"],
        answer: "Root"
    },
    {
        question: "2. What is the process called when plants make their own food from sunlight?",
        options: ["Photosynthesis", "Respiration", "Transpiration", "Evaporation"],
        answer: "Photosynthesis"
    },
    {
        question: "3. What is the part of the plant that carries water and nutrients from the roots to the leaves?",
        options: ["Flower", "Fruit", "Root", "Xylem"],
        answer: "Xylem"
    },
    {
        question: "4. What is the process called when plants release water vapour into the air?",
        options: ["Transpiration", "Respiration", "Photosynthesis", "Evaporation"],
        answer: "Transpiration"
    },
    {
        question: "5. Through which part of the plant does water travel from one place to another?",
        options: ["Petals", "Pollen", "Seeds", "Stem"],
        answer: "Stem"
    },
    {
        question: "6. Which part is responsible for soaking up all the nutrients and the water from the ground?",
        options: ["Flower", "Leaf", "Root", "Seed"],
        answer: "Root"
    },
    {
        question: "7. From where does the oxygen liberated during photosynthesis come from?",
        options: ["Carbondioxide", "Water", "Breakdown of chlorophyll", "Atmosphere"],
        answer: "Water"
    },
    {
        question: "8. Ficus reliogosa is the scientific name of which common tree?",
        options: ["Peepal", "Neem", "Banyan", "Tulsi"],
        answer: "Peepal"
    },
    {
        question: "9. Which of the following is a characteristic of a monocot plant?",
        options: ["Tap root", "Stem with nodes", "Roots with nodules", "Leaves with parallel venation"],
        answer: "Leaves with parallel venation"
    },
    {
        question: "10. What is the process called when plants release their pollen?",
        options: ["Pollination", "Fertilization", "Germination", "Dispersion"],
        answer: "Pollination"
    },
    {
        question: "11. In which part of the plant are stomata found?",
        options: ["Stem", "Root", "Flower", "Leaf"],
        answer: "Leaf"
    },
    {
        question: "12. Cotton fibre is obtained from which part of the plant?",
        options: ["Flower", "Fruit", "Seed", "Leaf"],
        answer: "Fruit"
    },
    {
        question: "13. Which of these is not essential for photosynthesis?",
        options: ["Carbondioxide", "Oxygen", "Water", "Sunlight"],
        answer: "Oxygen"
    },
    {
        question: "14. Which method is used to propagate banana plants?",
        options: ["Grafting", "Stem Cutting", "Sucker removal", "Layering"],
        answer: "Sucker removal"
    },
    {
        question: "15. What is the process called when plants release their seeds?",
        options: ["Pollination", "Fertilization", "Germination", "Dispersion"],
        answer: "Dispersion"
    },
    {
        question: "16. What is the term for the process of plants making their own food?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Osmosis"],
        answer: "Photosynthesis"
    },
    {
        question: "17. What is the term for the movement of water from the roots to the leaves of a plant?",
        options: ["Transpiration", "Respiration", "Photosynthesis", "Osmosis"],
        answer: "Transpiration"
    },
    {
        question: "18. Which parts of plants respire?",
        options: ["Leaves", "Stems", "Roots", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "19. A radicle is a part of the -",
        options: ["Flower", "Fruit", "Root", "Stem"],
        answer: "Root"
    },
    {
        question: "20. Which of these is a carnivorous plant?",
        options: ["Sundews", "Venus Flytrap", "Pitcher Plant", "All of the above"],
        answer: "All of the above"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900; // 15 minutes in seconds
let timerInterval;
const topicName = "Plants"; // Change this dynamically for different topics

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

// Function to store results in localStorage and update scores if reattempted
function saveResults() {
    let allResults = JSON.parse(localStorage.getItem('quizResults')) || {};

    // Save only correctAnswers and totalQuestions for the topic
    allResults[topicName] = {
        correctAnswers,  // Only save the score
        totalQuestions: questions.length  // Save the total number of questions
    };

    localStorage.setItem('quizResults', JSON.stringify(allResults));
}

// Function to display quiz results on the profile page
// Function to display only score and total questions in the profile page
function displayProfileResults() {
    let storedResults = JSON.parse(localStorage.getItem('quizResults'));
    const profileResultsContainer = document.getElementById("quiz-results-table").getElementsByTagName("tbody")[0];

    profileResultsContainer.innerHTML = ""; // Clear previous results

    if (!storedResults || Object.keys(storedResults).length === 0) {
        profileResultsContainer.innerHTML = "<tr><td colspan='3'>No quiz results found.</td></tr>";
        return;
    }

    Object.keys(storedResults).forEach(topic => {
        const result = storedResults[topic];

        const newRow = profileResultsContainer.insertRow();
        newRow.insertCell(0).textContent = topic;  // Display topic
        newRow.insertCell(1).textContent = result.correctAnswers;  // Display only score
        newRow.insertCell(2).textContent = result.totalQuestions;  // Display total questions
    });
}

// Call the function when the profile page loads
if (document.getElementById("profile-results")) {
    displayProfileResults();
}


// Event Listeners
document.getElementById("next").addEventListener("click", () => nextQuestion());
document.getElementById("submit").addEventListener("click", showResults);
document.getElementById("skip").addEventListener("click", () => nextQuestion(true));

// Start the quiz
displayQuestion();
startTimer();

// If on the profile page, display results
if (document.getElementById("profile-results")) {
    displayProfileResults();
}
