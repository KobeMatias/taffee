var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question:"The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
];

var questionDiv = document.querySelector("#question");
var choiceUl = document.querySelector("#choice");
var resultDiv = document.querySelector("#result");
var timerDiv = document.querySelector("#timer")

var questionIndex = 0;
var correctCount = 0;

function displayQuestion() {
    questionDiv.textContent = questions[questionIndex].question;
    
    choiceUl.innerHTML = "";
    resultDiv.innerHTML = "";
    
    var options = questions[questionIndex].choices;
    var choicesLength = options.length;

    for (var i = 0; i < choicesLength; i++) {
        var choiceItem = document.createElement("li");
        choiceItem.textContent = options[i];
        choiceUl.append(choiceItem);
    }
}

function nextQuestion() {
    questionIndex++;
    displayQuestion();
    resultDiv.classList.remove("correct");
    resultDiv.classList.remove("incorrect");
}

function checkAnswer(event) {
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            resultDiv.classList.add("correct");
            resultDiv.textContent = "CORRECT!";
            correctCount++;
        } else {
            resultDiv.classList.add("incorrect");
            resultDiv.textContent = "INCORRECT!";
        }
    }
    setTimeout(nextQuestion, 2000);
}

choiceUl.addEventListener("click", checkAnswer);

displayQuestion();