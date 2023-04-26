const startButton = document.getElementById("startBtn");

const timerBox = document.getElementById("timer");
let quizActive = true;


const viewScoresBtn = document.getElementById('toggle-scores');
viewScoresBtn.addEventListener("click", toggleScores);
startButton.addEventListener("click", startQuiz);

function toggleScores(e){
    const scoreSection = document.getElementById("scores-section");
    const storedScores = JSON.parse(localStorage.getItem("initials"));
    const introText = document.createElement("h2");
    scoreSection.appendChild(introText);
    if(!storedScores) {
        introText.innerHTML = "No High Scores Yet";
    } else {

        if(scoreSection.textContent.includes("Scores")){
            console.log(true);
            scoreSection.textContent = "";
        } else {
            

            introText.innerHTML = "Scores";

            const scoreTable = document.createElement("table");
            scoreTable.classList.add("table");
            const sTableHead = document.createElement("thead");
            const sTHRow = document.createElement("tr");
            const sTH1 = document.createElement("th");
            sTH1.setAttribute("scope","col");
            sTH1.textContent = "Name";
            const sTH2 = document.createElement("th");
            sTH2.setAttribute("scopre","col");
            sTH2.textContent = "Score";
            scoreTable.appendChild(sTableHead);
            sTableHead.appendChild(sTHRow);
            sTHRow.appendChild(sTH1);
            sTHRow.appendChild(sTH2);
            const stBody = document.createElement("tbody");
            scoreTable.appendChild(stBody);


            scoreSection.appendChild(scoreTable);
            for (ii=0;ii<storedScores.length;ii++) {
                const scoreRow = document.createElement("tr");
                const scoreTh = document.createElement("th");
                scoreTh.setAttribute("scope","row");
                const scoreNameCell = document.createElement("td");
                scoreNameCell.textContent = storedScores[ii].user;
                const scoreScoreCell = document.createElement("td");
                scoreScoreCell.textContent = storedScores[ii].score;
                stBody.appendChild(scoreTh);
                stBody.appendChild(scoreRow);
                scoreRow.appendChild(scoreNameCell);
                scoreRow.appendChild(scoreScoreCell);

            }
            
        }
}
}


function startQuiz() {
    setTime();
    buildQuiz();
    showFirst();
    const qSection = document.getElementById("questionSection");
    qSection.classList.remove("hideme");
    const startButton = document.getElementById("startBtn");
    startButton.classList.add("hideme");
    const timerDiv = document.getElementById("timer");
    timerDiv.classList.remove("hideme");
};

function showFirst(){
    showqDiv(0);
}
function showqDiv(divtoshow){
    const cDiv = document.getElementById("questionDiv"+divtoshow)
    cDiv.classList.remove("hideme");
}
function hideqDiv(divtohide){
    const cDiv = document.getElementById("questionDiv"+divtohide)
    cDiv.classList.add("hideme");
}

let timeLeft = 30;

timerBox.textContent = timeLeft;

function setTime() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        timerBox.textContent = timeLeft + " seconds left";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        if (quizActive==false) {
            clearInterval(timerInterval);
        }
    }, 1000);
};

const questionsObject = [ 
    { 
        question: "Which of the following key words is used to define variables in JavaScript?",
        answers: ["a. const", "b. let", "c. both a and b", "d. none of the above"],
        correctIndex: 2
    } ,
    {
        question: "What does a JavaScript loop do?.",
        answers: ["a. Runs the same code over and over again", "b. Goes back to the top of the page and runs the nearest function", "c. Adds two integers together", "d. Returns a random number between 1 and 100"],
        correctIndex: 0
    },
    {
        question: "What values does the Boolean data type take?",
        answers:  ["a. Yes and No", "b. True and False", "c. Up and Down", "d. Left and Right"],
        correctIndex: 1
    },
    {
        question: "What does DOM stand for?",
        answers:  ["a. Direct Object Method", "b. Data Object Model", "c. Define Object Map", "d. Document Object Model"],
        correctIndex: 3
    },
    {
        question: "What is JavaScript used for in programming?",
        answers: ["a. to define the content of web pages", "b. to specify the layout of web pages", "c. to program the behavior of web pages", "d. to organize code within a web page"],
        correctIndex: 2
    },
    {
        question: "What are examples of JavaScript Popup boxes?",
        answers: ["a. alert, prompt, and confirm", "b. yes, no, and cancel", "c. present, past, and future", "d. display, hide, and rename"],
        correctIndex: 0
    },
    {
        question: "Who invented JavaScript?",
        answers: ["a. Michael Linloffin", "b. Barry Velma", "c. Lauren Gilligan", "d. Brendan Eich"],
        correctIndex: 3
    },
    {
        question: "What is a JavaScript function?",
        answers: ["a. a predetermined variable within a JavaScript page", "b. an event that occurs inside of JavaScript, but is not displayed on screen", "c. a block of JavaScript code that can be executed when 'called' for", "d. the link between JavaScript, HTML, and CSS"],
        correctIndex: 2
    }
]
function buildQuiz() {
    const showQuestion = document.getElementById("questionSection");

    for (questionNumber=0;questionNumber<questionsObject.length;questionNumber++) {
        console.log(questionsObject[questionNumber].question);
        const qDiv = document.createElement("div");
        qDiv.classList.add("hideme");
        showQuestion.appendChild(qDiv);
        qDiv.setAttribute("id","questionDiv"+questionNumber);
        qDiv.setAttribute("data-questionNumber", questionNumber);
        qDiv.textContent = questionsObject[questionNumber].question;
        const br = document.createElement("br");
        qDiv.appendChild(br);
        for(answerNumber=0;answerNumber<questionsObject[questionNumber].answers.length;answerNumber++) {

            const aBtn = document.createElement("BUTTON");
            qDiv.appendChild(aBtn);
            aBtn.setAttribute("id","answerButton"+questionNumber+answerNumber);
            aBtn.setAttribute("data-questionNumber",questionNumber);
            aBtn.setAttribute("data-answerNumber",answerNumber);
            aBtn.classList.add("btn");
            aBtn.classList.add("btn-primary");
            aBtn.classList.add("bmargin");
            aBtn.textContent=questionsObject[questionNumber].answers[answerNumber];
            aBtn.addEventListener("click", function() {buttonListener(aBtn)})
            const nbsp = document.createTextNode("\u00A0");
            qDiv.appendChild(nbsp);
        }

    }
};

function buttonListener(button) {

    const qNumber = button.getAttribute("data-questionNumber");
    const aNumber = button.getAttribute("data-answerNumber");
    console.log("question: " +qNumber);
    console.log("answer: "+aNumber);

    const buttonId = button.getAttribute("id");

    const btnLenght = buttonId.length;


    const cAnswer = questionsObject[qNumber].correctIndex;
    if(cAnswer == aNumber){
        correctAnswer(qNumber);
        
    } else {
        incorrectAnswer(qNumber);
        
    }
}

function correctAnswer(qNumber){
    console.log("You got it right");
    const positiveResponse = document.getElementById("response");
    const responseDiv = document.createElement("div");
    responseDiv.setAttribute("id","prespDiv");
    positiveResponse.appendChild(responseDiv);
    responseDiv.textContent="You got the right answer!"
    showNextQuestion(qNumber);
    //addNextButton(responseDiv, qNumber);
}
function incorrectAnswer(qNumber) {
    console.log("Sorry that's wrong");
    const negativeResponse = document.getElementById("response");
    const responseDiv = document.createElement("div");
    responseDiv.setAttribute("id","nrespDiv");
    negativeResponse.appendChild(responseDiv);
    responseDiv.textContent="You got the answer wrong"
    showNextQuestion(qNumber)
    penalizeUser();
}
function penalizeUser(){
    timeLeft = timeLeft - 20;
}
function addNextButton(divToAdd, qNumber) {
    const nxtButton = document.createElement("BUTTON");
    nxtButton.setAttribute("id","question"+qNumber)
    
    nxtButton.textContent = "Next >";
    nxtButton.addEventListener("click", function() {showNextQuestion(qNumber)});
    divToAdd.appendChild(nxtButton);
}
function showNextQuestion(cQuestion){
    console.log("Show the next question now");
    const respSection = document.getElementById("response");
    respSection.textContent="";
    hideqDiv(cQuestion);
    if(cQuestion<questionsObject.length-1) {
        
        showqDiv(eval(cQuestion)+1);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const questionSection = document.getElementById("questionSection");
    questionSection.classList.add("hideme");
    const respSection = document.getElementById("response");
    respSection.classList.add("hideme");
    const hTimer = document.getElementById("timer");
    hTimer.classList.add("hideme");
    let userScore = timeLeft;
    if(timeLeft<=0) {
        userScore = 0;
    }
    afterScreen(userScore);
    console.log("the quiz is over");
    console.log("the recorded score is: "+userScore);
    quizActive = false;
}
function afterScreen(score) {
    console.log("starting the afterscreen");
    const scoreSection = document.getElementById("enterScore");
    const scoreText = document.createElement("div");
    scoreText.textContent = "Your score was "+score;
    scoreSection.appendChild(scoreText);
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input-group");
    scoreSection.appendChild(inputDiv);
    const myInputBox = document.createElement("input");
    myInputBox.type="text";
    myInputBox.classList.add("form-control");
    myInputBox.placeholder = "Your initials";
    inputDiv.appendChild(myInputBox);
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("btn");
    submitButton.classList.add("btn-primary");
    
    inputDiv.appendChild(submitButton);
    submitButton.addEventListener("click", function() {getInitials(myInputBox, score)});

}
function getInitials(inputBox, userscore){
    const initials = inputBox.value;
    console.log("initials are : "+ initials);
    let scoreList = JSON.parse(localStorage.getItem("initials"));
    let scorepair = { 
        user: initials,
        score: userscore
    }
    if(!scoreList){
        scoreList = [];
    } 
    scoreList.push(scorepair);
    scoreList.sort(customSort);
    scoreList = top10(scoreList);
    console.log(scoreList);
    localStorage.setItem("initials",JSON.stringify(scoreList));
    const initialsSection = document.getElementById("enterScore");
    initialsSection.classList.add("hideme");
    startButton.classList.remove("hideme");
}

function top10(localArray) {
    for(i=0;i<localArray.length-9;i++) {
        localArray.pop();
    };
    return localArray;

}
function customSort(a, b) {
    console.log("a: "+a.score+" b: "+b.score)

    if (a.score<b.score) {
      return 1;
    }
    if (a.score>b.score) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

