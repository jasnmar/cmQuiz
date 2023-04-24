const startButton = document.getElementById("startBtn"); //assigns existing html element with id=startBtn into variable to use dynamically
startButton.setAttribute("class","button-18"); //sets class for styling
const timerBox = document.getElementById("timer"); //assigns existing html element with id=timer into variable to use dynamically
let quizActive = true; //used to stop the timer when the user has finished all of the questions (when all questions are answered we set this value to false)


startButton.addEventListener("click", startQuiz);

function startQuiz() {
    setTime();
    buildQuiz();
    showFirst();
    const startButton = document.getElementById("startBtn");
    startButton.classList.add("hideme");
};

function showFirst(){
    showqDiv(0);
}
// 
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
const questions = [
    "Which of the following key words is used to define variables in JavaScript?",
    "What does a JavaScript loop do?.",
    "What values does the Boolean data type take?",
    "What does DOM stand for?",
    "What is JavaScript used for in programming?",
    "What are examples of JavaScript Popup boxes?",
    "Who invented JavaScript?",
    "What is a JavaScript function?"
];

function buildQuiz() {
    const showQuestion = document.getElementById("questionSection");

    const possibleAnswers = [
        ["a. const", "b. let", "c. both a and b", "d. none of the above"],
        ["a. Runs the same code over and over again", "b. Goes back to the top of the page and runs the nearest function", "c. Adds two integers together", "d. Returns a random number between 1 and 100"],
        ["a. Yes and No", "b. True and False", "c. Up and Down", "d. Left and Right"],
        ["a. Direct Object Method", "b. Data Object Model", "c. Define Object Map", "d. Document Object Model"],
        ["a. to define the content of web pages", "b. to specify the layout of web pages", "c. to program the behavior of web pages", "d. to organize code within a web page"],
        ["a. alert, prompt, and confirm", "b. yes, no, and cancel", "c. present, past, and future", "d. display, hide, and rename"],
        ["a. Michael Linloffin", "b. Barry Velma", "c. Lauren Gilligan", "d. Brendan Eich"],
        ["a. a predetermined variable within a JavaScript page", "b. an event that occurs inside of JavaScript, but is not displayed on screen", "c. a block of JavaScript code that can be executed when 'called' for", "d. the link between JavaScript, HTML, and CSS"]
    ]

    // iterate through all of the questions
    for (questionNumber=0;questionNumber<questions.length;questionNumber++) {
        console.log(questions[questionNumber]);
        const qDiv = document.createElement("div"); //create div
        qDiv.classList.add("hideme"); //adding class hideme to div so that is does not show up on the page
        showQuestion.appendChild(qDiv); //add div to questions section in html doc
        qDiv.setAttribute("id","questionDiv"+questionNumber); //setting unique id to each question div
        qDiv.textContent = questions[questionNumber]; //add question text to div
        // iterate through the answers to the current question
        for(answerNumber=0;answerNumber<possibleAnswers[questionNumber].length;answerNumber++) {
            const aBtn = document.createElement("BUTTON"); // create button
            qDiv.appendChild(aBtn); //add button to question div
            aBtn.setAttribute("id","answerButton"+questionNumber+answerNumber); //adding unique id to answer button
            aBtn.setAttribute("class","button-18") //adding class to answer button (for styling)
            aBtn.textContent=possibleAnswers[questionNumber][answerNumber]; //adding text content to button based on current question and answer 
            aBtn.addEventListener("click", function() {buttonListener(aBtn.id)}) //add event listener to current button, call function buttonListener and pass button id
        }

    }
};

//
function buttonListener(buttonId) {
    console.log(buttonId);
    //possible answers is a two-dimensional array (matrix) that has the same shape as the answers array
    //in this matrix, incorrect answers are represented by false. and correct answers are represented by true.
    const possibleAnswers = [
        [false, false, true, false],
        [true, false, false, false],
        [false, true, false, false],
        [false, false, false, true],
        [false, false, true, false],
        [true, false, false, false],
        [false, false, false, true],
        [false, false, true, false],
    ]
    //substr(x,y) can get a small part of a string. the x tells it how far into the string to go.
    //the y tells it how many characters to take
    //we know that the button id is a string followed by the question index, then the answer index
    //by using substr() we can get the question and answer button that was clicked.
    const btnLength = buttonId.length; //assigns the length of the button ID to a variable as a number
    const qNumber = buttonId.substr(btnLength-2,1); //assigns the second from last character in the ID to a variable, because we know it represents the question number
    const aNumber = buttonId.substr(btnLength-1,1); //asigns the last character in the ID to a variable, because we know it represents the answer number

    console.log("question: " +qNumber);
    console.log("answer: "+aNumber);
    console.log(possibleAnswers[1][1]);

    //if the value of possibleAnswers at the coordinates [qNumber] the question number and [aNumber] the answer number evaluate true
    //then call correctAnswer function
    if(possibleAnswers[qNumber][aNumber]){
        correctAnswer(qNumber);
        //if it does not evaluate true, call incorrectAnswer function
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
    //addNextButton(responseDiv, qNumber);
    penalizeUser();
}
function penalizeUser(){
    timeLeft = timeLeft - 20;
}
function addNextButton(divToAdd, qNumber) {
    const nxtButton = document.createElement("BUTTON");
    nxtButton.setAttribute("id","question"+qNumber)
    nxtButton.setAttribute("class","button-18");
    nxtButton.textContent = "Next >";
    nxtButton.addEventListener("click", function() {showNextQuestion(qNumber)});
    divToAdd.appendChild(nxtButton);
}
function showNextQuestion(cQuestionIndex){
    console.log("Show the next question now");
    const respSection = document.getElementById("response");
    respSection.textContent="";
    hideqDiv(cQuestionIndex);

    //if the current question index is less than the length of questions -1, call showqDiv function, which displays the next question
    //if it is not less than, that means there are no more questions to display, call endQuiz function
    //the reason we use questions.length -1 is because we need this to line up with the index. Indexes start at 0, while length starts at 1.
    if(cQuestionIndex<questions.length-1) {
        //calling showDiv and passing it a number. This number is the current index + 1 i.e. the next question's index.
        //eval() forces javascript to treat cQuestionIndex as a number.
        showqDiv(eval(cQuestionIndex)+1);
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
    const myInputBox = document.createElement("input");
    myInputBox.placeholder = "Type your initials";
    scoreSection.appendChild(myInputBox);
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("button-18");
    scoreSection.appendChild(submitButton);
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
    scoreList.push(scorepair);
    console.log(scorepair);
    localStorage.setItem("initials",JSON.stringify(scoreList));
    const initialsSection = document.getElementById("enterScore");
    initialsSection.classList.add("hideme");

}

