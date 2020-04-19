var HomeHighscoreBtn = document.querySelector("#HomeHighscoreBtn");
var highscoreDiv = document.querySelector("#highscore");

function homepageHighScore() {
    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

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

HomeHighscoreBtn.addEventListener("click", homepageHighScore);