const questions = [
    {
        question : "1. Madhubani a style of folk paintings, is popular in which of the following states in India?",
        options : ["Bihar","Madhya Pradesh","West Bengal","Rajasthan"],
        answer : "Bihar"
    },
    {
        question : "2.Pablo Picasso belonged to which country?",
        options : ["France","Germany","Spain","Italy"],
        answer : "Spain"
    },
    {
        question : "3.Worli painting is indigenous to which state?",
        options : ["Maharashtra","Gujarat","Karnataka","Andhra Pradesh"],
        answer : "Maharashtra"
    },
    {
        question : "4.Raja Harishchandra, an early Indian film was produced by?",
        options : ["Dada Saheb Phalke", "Ashok Kumar", "Ardeshir Irani",  "Guru Datt"],
        answer : "Ardeshir Irani"
    },
    {
        question : "5.Who among the following is a distinguished actor as well as recipient of Jnanpith AAward?",
        options : ["Vijay Tendulkar", "Kaifi Azmi", "Javed Akhtar", "Girish Karnad"],
        answer : "Girish Karnad"
    },
    {
        question : "6. The song Ekla Chalo Re (Walk alone) was written by ?",
        options : ["Subhash Chandra Bose", "Ishwar Chandra Vidyasagar", "Rabindranath Tagore", "Aurobindo Ghosh"],
        answer : "Rabindranath Tagore"
    },
    {
        question : "7.Who amongst the following great music composers was ruler of a state?",
        options : ["Tyagaraja", "Shyama Shastri", "Muthuswami Dikshitar", "Swathi Tirunal Rama Varma"],
        answer : "Swathi Tirunal Rama Varma"
    },
    {
        question : "8. The National Anthem of Bangladesh was written by ?",
        options : ["Mujib-ur-rahman", "Mohd Iqbal", "Rabindranath Tagore", "Bhpen Hazarika"],
        answer : "Rabindranath Tagore"
    },
    {
        question : "9. Raja Ravi Verma was a famous - ",
        options : ["Painter", "Musician", "Singer", "Physician"],
        answer : "Painter"
    },
    {
        question : "10. Japanese art of paper folding is known as - ",
        options : ["Haiku", "Ikebana", "Origami", "Karaoke"],
        answer : "Origami"
    },
    {
        question : "11. In which city is the Film and Television Institute of India located?",
        options : ["Pune", "New Delhi", "Mumbai", "Ahmedabad"],
        answer : "Pune"
    },
    {
        question : "12. The city famous for its Chikankari work of embroidery is ?",
        options : ["Ludiana", "Chamba", "Barmer", "Lucknow"],
        answer : "Lucknow"
    },
    {
        question : "13. Irula tribe, well-known for snake-catching are native to ?",
        options : ["Tamil Nadu", "Jharkhand", "Nagaland", "Mizoram"],
        answer : "Tamil Nadu"
    },
    {
        question : "14. Kondapalli,  the place famous for toys is located in ?",
        options : ["Tamil Nadu", "Telangana", "Karnataka", "Andhra Pradesh"],
        answer : "Andhra Pradesh"
    },
    {
        question : "15. Deshikottama award is the highest award of which among the following bodies?",
        options : ["Bhartiya Vidya Bhawan", "Vishwa Bharthi", "Banaras Hindu University", "Bhartiya Sahitya Parishad"],
        answer : "Vishwa Bharthi"
    },
    {
        question : "16. Padam, Javali, Kriti and Keerthanam are varnams of which of the following dance forms ?",
        options : ["Bharatanatyam", "Kathak", "Kathakali", "Odissi"],
        answer : "Bharatanatyam"
    },
    {
        question : "17. The Ajanta and Ellora group of caves located in ?",
        options : ["Odisha", "Tamil Nadu", "Karnataka", "Maharastra"],
        answer : "Maharastra"
    },
    {
        question : "18. Katputli, the string puppetry belongs to ?",
        options : ["Rajasthan", "Madhya Pradesh", "Uttrakhand", "Karnataka"],
        answer : "Rajasthan"
    },
    {
        question : "19. All Indian Music Academy established in which year ?",
        options : ["1952", "1954", "1956", "1958"],
        answer : "1952"
    },
    {
        question : "20. The famous dance form of the state of Assam is ?",
        options : ["Bihu", "Bhangra", "Garba", "Dandiya"],
        answer : "Bihu"
    }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedQuestions = 0;
let userAnswers = [];
let timer = 900; 
let timerInterval;
const topicName = "Arts & Culture";

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
    optionsContainer.innerHTML = "";  
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
