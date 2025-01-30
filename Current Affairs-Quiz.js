questions = [
    {
        question : "1. Which district of kerala is set to host the international Literature festival ?",
        options : ["Thrissur", "Kollam", "Wayanad", "Kannur"],
        answer: "Thrissur"
    },
    {
        question : "2. What is the new deadline for Vivaad se Vishwas Scheme ?",
        options : ["Jan 31, 2025", "Feb 25, 2025", "Mar 30, 2025", "Apr 20, 2025"],
        answer : "Jan 31, 2025"
    },
    {
        question : "3. Which institute has develeoped needle-free shock syringes for painless injections ?",
        options : ["IIT Hyderabad", "IIT Delhi", "IIT Bombay", "IIT Madras"],
        answer : "IIT Bombay"
    },
    {
        question : "4. Which Country is the host of World Audio Visual & Entertainment Summit (WAVE) 2025 ?",
        options : ["India", "USA", "China", "Japan"],
        answer : "India"
    },
    {
        question : "5. Which of the following is the theme of National Girl Child Day 2025",
        options : ["Empowering Girls through Education", "Empowering Girls through Sports", "Empowering Girls through Entrepreneurship", "Empowering Girls through Health"],
        answer : "Empowering Girls through Education"   
    },
    {
        question : "6. Recently, who became the youngest female to climb the highest peaks in all 7 continents ?",
        options : ["Pragati Bisht", "Kaamya Karthikeyan", "Sanaya Gupta", "Kirti Rawat"],
        answer : "Kaamya Karthikeyan"
    },
    {
        question : "7. Kaveri Engine was developed by which organization ?",
        options : ["DRDO", "ISRO", "BHEL", "NTPC"],
        answer : "DRDO"
    },
    {
        question : "8. Which ministry has introduced the Rastraparv website and app to provide convenient access to information about national festivals ?",
        options : ["Ministry of Defence", "Ministry of Culture", "Ministry of Tourism", "Ministry of Home Affairs"],
        answer : "Ministry of Defence"
    },
    {
        question : "9. Which of the following is the theme of National Science Day 2025 ?",
        options : ["Science for Inclusive Development", "Science for Sustainable Development", "Science for Innovation", "Science for Social Impact"],
        answer : "Science for Inclusive Development"
    },
    {
        question : "10. Which day is observed as Veer Bal Diwas every year in India ?",
        options : ["Dec 24", "Dec 25", "Dec 26", "Dec 27"],
        answer : "Dec 26"
    },
    {
        question : "11. Viksit Panchayat Karmayogi initiative is part of which campaign ?",
        options : ["Digital India", "Prashasan Gaon ki Ore", "Bharat Nirman", "Azadi ka Amrit Mahotsav"],
        answer : "Prashasan Gaon ki Ore"
    },
    {
        question : "12. Sagar Island which was seen in the news, is located in which state ?",
        options : ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
        answer : "West Bengal"
    },
    {
        question : "13. Who has been appointed as the 9th Chairperson National Human Rights Commission recently ?",
        options : ["V.Ramasubramanian", "S.P.Kurdukar", "Ramkrishna Gavai", "Kuldip Singh"],
        answer : "V.Ramasubramanian"
    },
    {
        question : "14. NITI Aayog has launched Youth Co:Lab intiative with which international organization ?",
        options : ["World Bank", "UNDP", "UNEP", "IMF"],
        answer : "UNDP"
    },
    {
        question : "15. Recently, where was the first International Solar Festival organized ?",
        options : ["Jaipur", "Bhopal", "New Delhi", "Lucknow"],
        answer : "New Delhi"
    },
    {
        question : "16. What is the name of the online platform launched by the government for sharing experiences of retiring government employees ?",
        options : ["Suraksha", "Nischit", "Anubhav", "Sankalp"],
        answer : "Anubhav"
    },
    {
        question : "17. Which city is the venue of Women's Indian Open Golf 2024 event ?",
        options : ["Chennai", "Indore", "Gurugram", "Jaipur"],
        answer : "Gurugram"
    },
    {
        question : "18. SMILE is a Central Sector Scheme launched by which ministry ?",
        options : ["Ministry of Health and Family Welfare", "Ministry of Education", "Ministry of Home Affairs", "Ministry of Social Justice and Empowerment"],
        answer : "Ministry of Social Justice and Empowerment"
    },
    {
        question : "19. Which country recently passed the Online Safety Amendment Bill 2024 ?",
        options : ["Australia", "Canada", "New Zealand", "United Kingdom"],
        answer : "Australia"
    },
    {
        question : "20. Which Indian temple won Sword of Honour award for safety excellence ?",
        options : ["Ram Temple, Ayodhya", "Kashi  Vishwanath Temple, Varanasi", "Krishna Janmabhoomi Temple, Mathura", "Maa Vindhyavasini Temple, Mirzapur"],
        answer : "Ram Temple, Ayodhya"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900; 
let timerInterval;
const topicName = "Current Affairs"; 

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
