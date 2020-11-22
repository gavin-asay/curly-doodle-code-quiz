var questions = [
    {
        question: "Which element carries the style display: block by default?",
        A: "<span>",
        B: "<button>",
        C: "<p>",
        D: "<em>",
        correct: "C"
    },
    {
        question: "Which is NOT a valid value for the justify-content property?",
        A: "float",
        B: "center",
        C: "space-around",
        D: "space-between",
        correct: "A"
    },
    {
        question: "Which symbol signifies an ID in a CSS selector?",
        A: ".",
        B: "@",
        C: "*",
        D: "#",
        correct: "D"
    },
    {
        question: "Which of the following keywords ends execution of a function?",
        A: "for",
        B: "return",
        C: "else",
        D: "switch",
        correct: "B"
    },
    {
        question: "CSS rulesets for which pseudo-class will likely be poorly supported on mobile devices?",
        A: ":hover",
        B: ":visited",
        C: ":focus",
        D: ":checked",
        correct: "A"
    },
    {
        question: "DOM stands for _______.",
        A: "Document Object Model",
        B: "Domain Operation Method",
        C: "Document Option Manager",
        D: "Download Operation Model",
        correct: "A"
    },
    {
        question: "",
        A: "",
        B: "",
        C: "",
        D: "",
        correct: ""
    },
];

var startButtonEl = document.querySelector("button#start");
var startPanelEl = document.querySelector("#start-panel");
var mainEl = document.querySelector("main");

var timeLeft = 59;
var score = 0;
var questionCount = 0;
var scoreList = [];

var clickHandler = function(event) {
    if (event.target.id === "start") {
        startGame();
    } else {
        responseHandler(event);
    }
}

var startGame = function() {
    // debugger;
    var timerContainerEl = document.querySelector("#timer-container");
    var timerEl = document.querySelector("#timer");
    startPanelEl.className = "exit";
    window.setTimeout(function() {
        startPanelEl.remove();
        timerContainerEl.className = "visible";
        // debugger;
        questionRender();
    }, 500);

    window.setInterval(function() {
        if (timeLeft >= 0) {
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        }
    }, 1000);
    
    window.setTimeout(function() {
        var questionPanelEl = document.querySelector("#question-panel");
        questionPanelEl.className = "exit";
        setTimeout(function() {
            questionPanelEl.remove();
        }, 500);
        
        var timeOutEl = document.createElement("div");
        timeOutEl.id = "time-out";
        
        var h2EndEl = document.createElement("h2");
        h2EndEl.textContent = "Time's up!";
        
        var h3ScoreEl = document.createElement("h3");
        h3ScoreEl.textContent = "Final Score: " + score;

        var instructionEl = document.createElement("p");
        instructionEl.textContent = "Enter your initials (two to four characters)";
        
        var scoreFormEl = document.createElement("form");
        scoreFormEl.id = "score-submit";
        
        var initialInputEl = document.createElement("input");
        initialInputEl.setAttribute("type", "text");
        initialInputEl.setAttribute("minlength", "2");
        initialInputEl.setAttribute("maxlength", "4");
        initialInputEl.setAttribute("size", "7");

        var submitButtonEl = document.createElement("button");
        submitButtonEl.id = "score-button";
        submitButtonEl.textContent = "Submit";

        scoreFormEl.appendChild(initialInputEl);
        scoreFormEl.appendChild(submitButtonEl);

        timeOutEl.appendChild(h2EndEl);
        timeOutEl.appendChild(h3ScoreEl);
        timeOutEl.appendChild(instructionEl);
        timeOutEl.appendChild(scoreFormEl);
        
        mainEl.removeEventListener("click", clickHandler);

        mainEl.appendChild(timeOutEl);
        scoreFormEl.addEventListener("submit", scoreHandler);
    }, 61000);
}

var questionRender = function() {
    var questionPanelEl = document.createElement("div");
    questionPanelEl.id = "question-panel";

    var questionHeaderEl = document.createElement("h2");
    questionHeaderEl.textContent = "Question " + (questionCount + 1);
    questionPanelEl.appendChild(questionHeaderEl);

    var questionTextEl = document.createElement("p");
    questionTextEl.textContent = questions[questionCount].question;
    questionPanelEl.appendChild(questionTextEl);

    var answerList = document.createElement("ol");
    for (i = 0; i < 4; i++) {
        var answerOption = document.createElement("li");
        var answerButton = document.createElement("button");
        answerOption.appendChild(answerButton);
        switch (i) {
            case 0:
                answerButton.textContent = questions[questionCount].A;
                answerButton.id = "A";
                break;
            case 1:
                answerButton.textContent = questions[questionCount].B;
                answerButton.id = "B";
                break;
            case 2:
                answerButton.textContent = questions[questionCount].C;
                answerButton.id = "C";
                break;
            case 3:
                answerButton.textContent = questions[questionCount].D;
                answerButton.id = "D";
                break;
        }
        answerList.appendChild(answerOption);
    }
    questionPanelEl.appendChild(answerList);

    if (timeLeft >= 0) {
        mainEl.appendChild(questionPanelEl);
    }
    // questionCount++;
}

var responseHandler = function(event) {
    var questionPanelEl = document.querySelector("#question-panel");
    var scoreDisplayEl = document.querySelector("#score-display");
    console.log(event.target);
    if (event.target.matches("button#" + questions[questionCount].correct)) {
        // debugger;
        event.target.className = "correct";
        score++;
        scoreDisplayEl.textContent = "Score: " + score;
        window.setTimeout(function() {
            questionPanelEl.className = "exit";
            window.setTimeout(function() {
                questionCount++;
                questionPanelEl.remove();
                questionRender();
            }, 500);
        }, 1000);
    } else if (event.target.id !== questions[questionCount].correct && event.target.matches("button")) {
        event.target.className = "incorrect";
        document.querySelector("#" + questions[questionCount].correct).className = "correct";
        window.setTimeout(function() {
            questionPanelEl.className = "exit";
            window.setTimeout(function() {
                questionCount++;
                questionPanelEl.remove();
                questionRender();
            }, 500);
        }, 1000);
    }
}

var scoreHandler = function(event) {
    event.preventDefault();
    console.log(event);
    var initials = document.querySelector("#score-submit input").value;
    // debugger;
    localStorage.setItem(JSON.stringify(localStorage.length), JSON.stringify({name: initials, score: score.toString() }));
    
    window.setTimeout(function() {
        var timeOutEl = document.querySelector("#time-out");
        timeOutEl.className = "exit";
        window.setTimeout(function() {
            timeOutEl.remove();
        }, 500);
    }, 1000);

    scoreboardEl = document.createElement("div");
    scoreboardEl.id = "scoreboard";
    var scoreboardHeaderEl = document.createElement("h2");
    scoreboardHeaderEl.textContent = "High Scores";
    listEl = document.createElement("ol");
   
    for (i = 0; i < localStorage.length; i++) {
        // debugger;
        var keyValue = JSON.parse(localStorage.getItem(i.toString()));
        scoreList.push(keyValue);
        listItemEl = document.createElement("li");
        listItemEl.textContent = scoreList[i].name + ": " + scoreList[i].score;
        scoreList.sort(function(a, b) {
            return b.score - a.score;
        });
        listEl.appendChild(listItemEl);
    }

    scoreboardEl.appendChild(scoreboardHeaderEl);
    scoreboardEl.appendChild(listEl);
    mainEl.appendChild(scoreboardEl);
}

mainEl.addEventListener("click", clickHandler);