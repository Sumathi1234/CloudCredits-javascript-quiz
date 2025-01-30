questions = [
    {
        question : "1. Dr. A.P.J. Abdul Kalam used to play - ",
        options : ["Nadaswaram", "Veena", "Sitar", "Violin"],
        answer : "Veena"
    },
    {
        question : "2. The opening theme of Doordarshan was composed by ?",
        options : ["Pt.Ravi Shankar", "Lata Mangeshkar", "A.R. Rahman", "Kalyanji-Anandji"],
        answer : "Pt.Ravi Shankar"
    },
    {
        question : "3. Time Theory of Raga has been mentioned in the text - ",
        options : ["Siksha", "Brihaddesi", "Sangeet Ratnakar", "Sangeet Makaranda"],
        answer : "Sangeet Makaranda"
    },
    {
        question : "4. Who is credited with creating the world famous Raag Miya ki Malhar ?",
        options : ["Amir Khusro", "Tansen", "Meera Bai", "Bhimsen Joshi"],
        answer : "Tansen"
    },
    {
        question : "5. The oldest form of composition of Hindustani Vocal Music is - " ,
        options : ["Ghazal", "Dhrupad", "Thumri", "Qawwali"],
        answer : "Dhrupad"
    },
    {
        question : "6. Which is a wind instrument ?",
        options : ["Sitar", "Veena", "Nadaswaram", "Flute"],
        answer : "Flute"
    },
    {
        question : "7. Yakshagana is a dance form of - ",
        options : ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Maharashtra"],
        answer : "Karnataka"
    },
    {
        question : "8. Which Stringed instrument has the most number of strings ?",
        options : ["Sitar", "Veena", "Nadaswaram", "Tanpura"],
        answer : "Veena"
    },
    {
        question : "9. Which of the following is a percussion instrument ?",
        options : ["Sitar", "Veena", "Nadaswaram", "Dhol"],
        answer : "Dhol"
    },
    {
        question : "10. Hariprasad Chaurasia is associated with which musical instrument ?",
        options : ["Tabla", "Flute", "Shehnai", "Santoor"],
        answer : "Flute"
    },
    {
        question : "11.Who was the first person associated with classical music to be awarded the Bharat Ratna?",
        options : ["Ravi Shankar", "Bismillah Khan", "MS SubbhaLakshmi", "Bhimsen Joshi"],
        answer : "MS SubbhaLakshmi"
    },
    {
        question : "12. What kind of musical instrument is Ghatam ?",
        options : ["Wind", "String", "Percussion", "Electronic"],
        answer : "Percussion"
    },
    {
        question : "13. Who of the following is acclaimed as India's first female professional tabla player?",
        options : ["Anupama Bhagwat", "E.Gayatri", "Sumathi Murthy", "Anuradha Pal"],
        answer : "Anuradha Pal"
    },
    {
        question : "14. Which of the following is a folk dance of Maharashtra?",
        options : ["Lavani", "Bharatanatyam", "Kathak", "Kathakali"],
        answer : "Lavani"
    },
    {
        question : "15. Who was the first Indian to win a Grammy Award ?",
        options : ["Ravi Shankar", "Lata Mangeshkar", "Bismillah Khan", "MS SubbhaLakshmi"],
        answer : "Ravi Shankar"
    },
    {
        question : "16. Which of the following is a musical instrument that is played with a bow ?",
        options : ["Sitar", "Violin", "Nadaswaram", "Tanpura"],
        answer : "Violin"
    },
    {
        question : "17. Which state hosts the Natyanjali Dance Festival dedicated to Lord Shiva ?",
        options : ["Tamil Nadu", "Kerala", "Andhra Pradesh", "Maharastra"],
        answer : "Tamil Nadu"
    },
    {
        question : "18. When was Lata Mangeshkar awarded the Padma Bhushan ?",
        options : ["1959", "1969", "1979", "1989"],
        answer : "1969"
    },
    {
        question : "19. Which playback singer has been awarded the Bharat Ratna, the nation's highest civilian honour ?",
        options : ["Lata Mangeshkar", "Asha Bhosle", "K.L.Saigal", "Mukesh"],
        answer : "Lata Mangeshkar"
    },
    {
        question : "20. Which of the following is a traditional Indian musical instrument that is played withhands ?",
        options : ["Sitar", "Veena", "Tanpura", "Dholak"],
        answer : "Dholak"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900; 
let timerInterval;
const topicName = "Music";

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
