const questions = [
    {
        question : "1. Who captained India to its first-ever Cricket World Cup victory in 1983?",
        options : ["Kapil Dev", "Sunil Gavaskar", "Sachin Tendulkar", "Sourav Ganguly"],
        answer : "Kapil Dev"
    },
    {
        question : "2. Which Indian badminton player became the first Indian to win an Olympic medal in the sport?",
        options : ["Saina Nehwal", "PV Sindhu", "Kidambi Srikanth", "Parupalli Kashyap"],
        answer : "Saina Nehwal"
    },
    {
        question : "3. Who is the first Indian to win a Grand Slam singles title in tennis?",
        options : ["Leander Paes", "Mahesh Bhupathi", "Sania Mirza", "Leela Mehta"],
        answer : "Leela Mehta"
    },
    {
        question : "4. Who is the first Indian to win a gold medal in the Commonwealth Games?",
        options : ["Abhinav Bindra", "Gagan Narang", "Sushil Kumar", "Neeraj Chopra"],
        answer : "Neeraj Chopra"
    },
    {
        question : "5. Who is the first Indian to win a gold medal in the Olympics?",
        options : ["Abhinav Bindra", "Gagan Narang", "Sushil Kumar", "Neeraj Chopra"],
        answer : "Abhinav Bindra"
    },
    {
        question : "6.Which city hosted the iconic 2011 Cricket World Cup final between India and Sri Lanka?",
        options : ["Mumbai", "Kolkata", "Chennai", "Ahmedabad"],
        answer : "Mumbai"
    },
    {
        question : "7. Who was the first Indian cricketer to score a double century in ODI?",
        options : ["Sachin Tendulkar", "Virender Sehwag", "Rohit Sharma", "Virat Kohli"],
        answer : "Sachin Tendulkar"
    },
    {
        question : "8.Which Indian chess player holds the prestigious title of Grandmaster?",
        options : ["Viswanathan Anand", "Harikrishna Koneru", "Pentala Harikrishna", "Adhiban Baskaran"],
        answer : "Viswanathan Anand"
    },
    {
        question : "9. Which Indian athlete is known as the Flying Sikh for his exceptional speed in athletics?",
        options : ["Abhinav Bindra", "Gagan Narang", "Sushil Kumar", "Milkha Singh"],
        answer : "Milkha Singh"
    },
    {
        question : "10. Total number of gold medals won by Indian Hockey Team in Olympipcs?",
        options : ["8", "10", "11", "8"],
        answer : "8"
    },
    {
        question : "11. In which stadium Tendulkar completed his 100th century?",
        options : ["Wankhede Stadium", "Feroz Shah Kotla", "Eden Garden", "Sher - e Bangla Stadium"],
        answer : "Sher - e Bangla Stadium"
    },
    {
        question : "12. Who is first Indian women to win an Asian Games gold in 400m run?",
        options : ["M.L.Valasamma", "Kamaljit Sandhu", "PT Usha", "K.Malleswari"],
        answer : "Kamaljit Sandhu"
    },
    {
        question : "13. Which one is the oldest football competitions in India?",
        options : ["Santhosh Trophy", "Durand Cup", "BC Roy Trophy", "Federation Cup"],
        answer : "Durand Cup"
    },
    {
        question : "14. Who won the first cricket WorldCup?",
        options : ["West Indies", "India", "Australia", "Pakistan"],
        answer : "West Indies"
    },
    {
        question : "15. What does the term LBW stands for in cricket?",
        options : ["Leg Before Wicket", "Long Before Wicket", "Long Before Wicket", "Long Before Wicket"],
        answer : "Leg Before Wicket"
    },
    {
        question : "16. In which game India has won most number of Olympic medals?",
        options : ["Hockey", "Shooting", "Wrestling", "Athletics"],
        answer : "Hockey"
    },
    {
        question : "17. In which country the game of chess originated?",
        options : ["India", "China", "Persia", "Russia"],
        answer : "India"
    },
    {
        question : "18. Who amongst the following has become the first in women cricket, to have 20 years of international cricket experince?",
        options : ["Mithali Raj", "Jhulan Goswami", "Harman Preet Kaur", "Anjum Chopra"],
        answer : "Mithali Raj"
    },
    {
        question : "19. Where was India's first Day-Night test organized?",
        options : ["Delhi", "Kolkata", "Mumbai", "Chennai"],
        answer : "Kolkata"
    },
    {
        question : "20. Who among the following cricketer has been chosen for ICC ODI Cricketer of the year for 2019?",
        options : ["Virat kohli", "Sachin Tendulkar", "Rohit Sharma", "Deepak Chahar"],
        answer : "Rohit Sharma"
    }
];



let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900; // 15 minutes in seconds
let timerInterval;
const topicName = "Sports"; // Change this dynamically for different topics

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
