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
    }
];

var startButtonEl = document.querySelector("button#start");
var startPanelEl = document.querySelector("#start-panel");
var mainEl = document.querySelector("main");

var timer = 60;
var score = 0;
var questionCount = 0;

var clickHandler = function(event) {
    if (event.target.id === "start") {
        startPanelEl.className = "exit";
        window.setTimeout(function() {
            startPanelEl.remove();
            questionRender();
        }, 500);
        
        window.setTimeout(function() {
            var questionPanelEl = document.querySelector("#question-panel");
            questionPanelEl.className = "exit";
            setTimeout(function() {
                questionPanelEl.remove();
            }, 500);
            var timeOutEl = document.createElement("div");
            timeOutEl.className = "time-out";
            timeOutEl.textContent = "Time's up!";
            mainEl.appendChild(timeOutEl);
            return;
        }, 5000);
        
    } else {
        responseHandler(event);
    }
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

    mainEl.appendChild(questionPanelEl);
    // questionCount++;
}

var responseHandler = function(event) {
    if (event.target.id === questions[questionCount].correct) {
        // debugger;
        event.target.className = "correct";
        score++;
        questionCount++;
        var questionPanelEl = document.querySelector("#question-panel");
        window.setTimeout(function() {
            questionPanelEl.className = "exit";
            window.setTimeout(function() {
                questionPanelEl.remove();
                questionRender();
            }, 500);
        }, 1000);
    }
}

// startButtonEl.addEventListener("click", startHandler);
mainEl.addEventListener("click", clickHandler);