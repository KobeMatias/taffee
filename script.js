var questions = [
    {
        question: "Which does not belong?",
        choices: ["Civic", "Accord", "Corolla", "Clarity"],
        answer: "Corolla",
    },
    {
        question: "The Dodge Hellcat Redeye makes _____ horsepower.",
        choices: ["953", "797", "717", "826"],
        answer: "797",
    },
    {
        question: "The R34 Skyline GT-R was manufactured from ____ until ____.",
        choices: ["1999 - 2002", "1998 - 2001", "2000 - 2003", "1997 - 2000"],
        answer: "1999 - 2002",
    },
];

var questionDiv = document.querySelector("#question");
var choiceUl = document.querySelector("#choice");
var resultDiv = document.querySelector("#result");
var timerDiv = document.querySelector("#timer");
var highscoreDiv = document.querySelector("#highscore");
var highscoreBtn = document.querySelector("#highscoreBtn");
var highscoreBtnDiv = document.querySelector("#highscoreBtnDiv");


var questionIndex = 0;
var correctCount = 0;

var time = 31;
var intervalID;

function endQuiz() {
    clearInterval(intervalID);
    questionDiv.innerHTML = "Game Over! Your score is: " + correctCount;
    choiceUl.innerHTML = "";
    resultDiv.innerHTML = "";
    timerDiv.innerHTML = "";
    highscoreBtnDiv.innerHTML = "";
    setTimeout(showHighscore, 2);
}

function showHighscore() {
    var name = prompt("Please enter your name");

    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: correctCount });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var contentUl = document.createElement("ul");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLi = document.createElement("li");
        contentLi.textContent = 
            "Name: " + high_scores[i].name + " | Score: " + high_scores[i].score;
        contentUl.appendChild(contentLi);
    }
    highscoreDiv.appendChild(contentUl);
}


function updateTime() {
    time--;
    timerDiv.textContent = "Time Left: " + time;
    if (time <= 0) {
        endQuiz();
    };
    if (time <= 15) {
        timerDiv.classList.add("redtext"); 
    };
}
    

function displayQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalID = setInterval(updateTime, 1000);

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
    resultDiv.classList.remove("greentext");
    resultDiv.classList.remove("redtext");
    if (questionIndex === questions.length) {
        time = 0;
    }
    displayQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalID);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            resultDiv.classList.add("greentext");
            resultDiv.textContent = "CORRECT!";
            correctCount++;
        } else {
            resultDiv.classList.add("redtext");
            resultDiv.textContent = "INCORRECT!";
            time = time - 2;
            timerDiv.textContent = "Time Left: " + time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

displayQuestion();
choiceUl.addEventListener("click", checkAnswer);
highscoreBtn.addEventListener("click", endQuiz);
