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
    if (event.target.id = "start") {
        startPanelEl.remove();
        questionRender();
    } else {
        responseHandler();
    }
}

var questionRender = function() {
    questionCount++;

    var questionPanelEl = document.createElement("div");
    questionPanelEl.className = "question-panel";
    questionPanelEl.id = "question-panel";

    var questionHeaderEl = document.createElement("h2");
    questionHeaderEl.textContent = "Question " + questionCount;
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
                break;
            case 1:
                answerButton.textContent = questions[questionCount].B;
                break;
            case 2:
                answerButton.textContent = questions[questionCount].C;
                break;
            case 3:
                answerButton.textContent = questions[questionCount].D;
                break;
        }
        answerList.appendChild(answerOption);
    }
    questionPanelEl.appendChild(answerList);

    mainEl.appendChild(questionPanelEl);
}

// startButtonEl.addEventListener("click", startHandler);
mainEl.addEventListener("click", clickHandler);