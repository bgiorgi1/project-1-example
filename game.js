let question = document.getElementById('question'); //pulling in questions
const choices = Array.from(document.getElementsByClassName('choice-text')); //pulls in array of question choices queryselectorall
const progressText = document.getElementById('progressText');  //pulls in progress bar text "question 1/10"
const scoreText = document.getElementById('score'); //pulls in display score
const progressBarFull = document.getElementById('progressBarFull'); //pulls in progress bar
let currentQuestion = 0;
let acceptingAnswers = false;
let gameIndex = 0;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

function shuffle(array) { //shuffle the questions/array
    array.sort(() => Math.random() - 0.5);
  }
function showQuestions(index, mainQuestions) { //function takes in number and main questions
console.log(mainQuestions)
//takes in number of question you're on and counts to 10, so that their is a set number of questions you need to reach
// relflects what number question you're on
//if button is clicked and gets answer
// then move progress bar
currentQuestion = index
let theQuestion=mainQuestions[index] //dictating where the questions are in the array, that is asks.
question.innerHTML=theQuestion.question //pulls in the question to the site
choices.map((answers, choiceIndex) => {
    // answers.innerHTML=choiceIndex //inserted index number from choices
    answers.innerHTML=`${mainQuestions[currentQuestion].possible_answers[choiceIndex]}` //pulls in answer choices to page
answers.onclick = function(){
console.log(choiceIndex)
answerQuestion(`${mainQuestions[currentQuestion].possible_answers[choiceIndex]}`, currentQuestion, mainQuestions) //activates function and checks all the work
}

}) 

}
function answerQuestion(selectedAnswer, questionNumber, quiz){ 
    if (selectedAnswer===quiz[questionNumber].correct_answer){ //finds correct/incorrect answers
        console.log("correct")
    } else {
        console.log("wrong")
    }
    console.log(questionNumber)
    if (questionNumber+1 < quiz.length){  //whether they get it right or worng, it's going to continue to loop until max questions has been reached(20)
        showQuestions (questionNumber+1, quiz)
    }
//need answer that was pulled
//need what question are you on 
//need where are you in the quiz and your answer
}

function highScore (){
    //once you answer the question, it shows up in the score, whether yoy get it right or wrong
//10 points per question
// if answer is correct, then add 10 points to score
//else do not
}

fetch(
    'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
    //    return questions = loadedQuestions.results.map(loadedQuestion => loadedQuestion);
       for (let i=0; i < loadedQuestions.results.length; i++) {
          loadedQuestions.results[i]["possible_answers"]=loadedQuestions.results[i]["incorrect_answers"] //this shows loadedquestions as possible answers
          loadedQuestions.results[i]['possible_answers'].push(loadedQuestions.results[i]['correct_answer']); //pushing correct answer to array
          shuffle(loadedQuestions.results[i]["possible_answers"])
          questions.push(loadedQuestions.results[i]) 
        }     
       showQuestions(0, questions)

    }).catch(err=>console.log(err)) //whatever error messages that happen, shows it
//    console.log(questions)


// function showResults(){
//     for(let i=0; i<theAnswers.length; i++) {
//         if(theAnswers[i].checked) {
//             if (theAnswers[i].value==myQuestions[counter].correctAnswer){
//                 console.log("it works")
//             } else {
//                 console.log("false")
//             }
//         }
//     }
// }