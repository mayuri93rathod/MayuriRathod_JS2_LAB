function showScore(){
    var quizOver = "<h1>Result</h1>";

    quizOver += "<h2> Your scores: " + quiz.score + ".And mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";

    var element = document.getElementById("quiz");

    element.innerHTML = quizOver;

}


function loadQuiz() {
    //check whether all questions attempted or not
    if (quiz.isEnded()) {
        //show score
        showScore();
    }
    else {
        //load question 
        let que = document.querySelector('#question');
        que.innerHTML = quiz.getQuestionByIndex().questionText;

        //showing options
        //    let option1 = document.querySelector( '#btn0' );
        //    let option2 = document.querySelector( '#btn1' );
        //    let option3 = document.querySelector( '#btn2' );
        //    let option4 = document.querySelector( '#btn3' );

        //get options of current question
        let optionss = quiz.getQuestionByIndex().options;

        for (let i = 0; i < optionss.length; i++) {

            let optionEle = document.getElementById('choice' + i);
            optionEle.innerHTML = optionss[i];
            //for option we have button so check for button onclick 
            handleButton("btn" + i, optionss[i])   //button id and option choosed
        }
        //show progress
        showProgress();

    }
}
function handleButton(id, currentOption) {
    //1.check whick button clicked
    //2.compare selected option with answer
    //3.calculate score
    //4. go to next question

    //get button ele
    let button = document.getElementById(id);

    button.onclick = function () {
        quiz.checkOptionWithAnswer(currentOption);
        loadQuiz();
    }
}

function showProgress(){
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ele = document.getElementById("progress");
    ele.innerHTML = `Question ${currentQuestionNumber}  of  ${quiz.questions.length}`;
}

//prototype 
Question.prototype.isCorrectAnswer = function (clickedOption) {
    return this.answer === clickedOption;
}

Quiz.prototype.checkOptionWithAnswer = function (clickedOption) {
    
    if (this.getQuestionByIndex().isCorrectAnswer(clickedOption)) {
        this.score++;
        console.log(this.score);
    }
    this.questionIndex++; //next question after checking for correct option
}

Quiz.prototype.isEnded = function () {
    //check with length of questions
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}
//1. create questions 

function Question(questionText, options, answer) {
    this.questionText = questionText;
    this.answer = answer;
    this.options = options;
}

//we can add as many number of questions here
let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "NodeJS","Django"], "Django"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

//2.initialize score to zero and question index to 0 to start

function Quiz(questions) {
    this.score = 0;
    this.questionIndex = 0;
    this.questions = questions;
}

let quiz = new Quiz(questions);

//3.load quiz 
loadQuiz();




