const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const title1Element = document.getElementById('title1')
const title2Element = document.getElementById('title2')
const timeH = document.getElementById('time')
const endScreen = document.getElementById('end-screen')
const correction = document.getElementById('corrector')

//the starting time
let timeSecond = 10;


//createes two variables to suffle the questions as well as knwing were we are
let shuffledQuestions, currentQuestionsIndex


startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    setNextQuestion()
  })

function startGame() {
    // what this is doing is adding the 'hide' class to the start button 
    startButton.classList.add('hide')
    // this is what is making sure that the question come out random annd dont stay the same
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    //should set the first question for us
    questionContainElement.classList.remove('hide')
    //set the title away
    title1Element.classList.add('hide')
    title2Element.classList.add('hide')
    //will begin the countdown
    const countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond)
        if (timeSecond <= 0 || timeSecond < 1) {
            clearInterval(countDown);
        }
    }, 1000)

    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    //this will add the buttons to the questions with the answers and 
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        //this add the styles from the btn class
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    // if there is any first child elemtn it will remove it
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')
}
// this is what makes sure that the questions are correct or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else (
        element.classList.add('wrong')
    )
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//the function that makes the timer go down
function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60)
    timeH.innerHTML = `${min < 10 ? "Time: 0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function endCount() {
    quizEnd()
}

//end quiz
function quizEnd(){
    clearInterval(timeSecond)
    //show the end screen
    endScreen.classList.remove('hide')
    //show the end score
    
    //hide the questions
    questionContainElement.classList.add('hide')
}



// the questions 
const questions = [

    {
        question: "What does HTML stand for?",
        answers: [
            { text: 'A) Hyper Text Markup Language', correct: true },
            { text: 'B) Home Tool Markup Language', correct: false },
            { text: 'C) Hyperlinks and Text Markup Language', correct: false },
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers: [
            { text: 'A) Microsoft', correct: false },
            { text: 'B) Google', correct: false },
            { text: 'C) The World Wide Web Consortium', correct: true },
            { text: 'D) Mozilla', correct: false },
        ],
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            { text: 'A) <h6>', correct: false },
            { text: 'B) <h1>', correct: true },
            { text: 'C) <heading>', correct: false },
            { text: 'D) <head>', correct: false },
        ],
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            { text: 'A) <break>', correct: false },
            { text: 'B) <lb>', correct: false },
            { text: 'C) <br>', correct: true },
        ],
    },
    {
        question: "What is the correct HTML for adding a background color?",
        answers: [
            { text: 'A) <body style="background-color:yellow;"> ', correct: false },
            { text: 'B) <body bg="yellow">', correct: false },
            { text: 'C) <background>yellow</background>', correct: true },
        ],
    },
    {
        question: "What is the correct HTML for inserting a background image?",
        answers: [
            { text: 'A) <body bg="background.gif">', correct: false },
            { text: 'B) <background img="background.gif">', correct: false },
            { text: 'C) <body style="background-image:url(background.gif)"', correct: true },
        ],
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        answers: [
            { text: 'A) alt', correct: true },
            { text: 'B) src', correct: false },
            { text: 'C) longdesc', correct: false },
            { text: 'D) title', correct: false },
        ],
    },
    {
        question: "Which HTML element defines navigation links?",
        answers: [
            { text: 'A) <nav>', correct: true },
            { text: 'B) <navigation>', correct: false },
            { text: 'C) <navigate>', correct: false },
        ],
    },
    {
        question: "Which HTML element is used to specify a header for a document or section?",
        answers: [
            { text: 'A) <header>', correct: true },
            { text: 'B) <top>', correct: false },
            { text: 'C) <section>', correct: false },
            { text: 'D) <head>', correct: false },
        ],
    },
    {
        question: "Which character is used to indicate an end tag?",
        answers: [
            { text: 'A) *', correct: false },
            { text: 'B) ^', correct: false },
            { text: 'C) <', correct: false },
            { text: 'D) /', correct: true },
        ],
    }
]