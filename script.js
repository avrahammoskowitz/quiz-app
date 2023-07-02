// Create an array of objects, each with a question, an array of answers, and the index of the correct answer
const questions = [
  {
    question: 'How does a JavaScript developer prefer their coffee?',
    answers: [
      'Strong and black, like their code.',
      'With a dash of vanillaScript.',
      'Sweet and sugary like a pop-up alert.',
      'Decaffeinated to maintain a calm coding flow.',
    ],
    correctAnswer: 0,
  },
  {
    question:
      'What is the preferred method of JavaScript developers for relaxing after a long day of coding?',
    answers: [
      'Solving the latest LeetCode problem.',
      'Engaging in an intense debugging session.',
      'Reading the latest ECMAScript specifications.',
      'Touching up their GitHub.',
    ],
    correctAnswer: 3,
  },
  {
    question:
      'Which of the following JavaScript functions is responsible for summoning unicorns?',
    answers: [
      "'console.log('unicorn')'",
      "'document.getElementById('unicorn').innerHTML = '🦄''",
      "'Math.random() > 0.5 ? 'unicorn' : 'rainbow''",
      "'function summonUnicorn() { return '🦄' }'",
    ],
    correctAnswer: 2,
  },
  {
    question: 'Why did the JavaScript function go to therapy?',
    answers: [
      'It had trouble passing arguments.',
      'It had unresolved closure issues.',
      'It suffered from a lack of callback.',
      "It couldn't escape its recursive thoughts.",
    ],
    correctAnswer: 1,
  },
  {
    question: 'How does a JavaScript developer maintain work-life balance?',
    answers: [
      'Using the setInterval() method to schedule breaks.',
      'Wrapping work tasks in a Promise and resolving them after hours.',
      'Meditating on the Zen of JavaScript objects and prototypes.',
      'Implementing an "Unplug and Recharge" function in their life module.',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Should you hire me?',
    answers: ['Sure.', 'Yes.', 'Absolutely.', "Here's your hiring bonus!"],
    correctAnswer: 3,
  },
]

const qNumDisplay = document.querySelector('#qNum') // Select span displaying the question number
const currentQDisplay = document.querySelector('#question') // Select span displaying the question
const radioBtnsInput = document.querySelectorAll('input[type = radio]') // Select the radio buttons input
const radioBtnsLabel = document.querySelectorAll('.radio-btn-label') // Select the radio buttons displaying possible answers
const btn = document.querySelector('button') // Select the 'confirm answer'/'next question' button
const answerResultDisplay = document.querySelector('#answer-result') // Select the p element displaying the answer result
const correctAnswerDisplay = document.querySelector('#correct-answer-display') // Select the span displaying the correct answer
const quizGameDisplay = document.querySelector('#quiz-game') // Select the div containing the interactive part of the quiz
const resultsDisplay = document.querySelector('#results') // Select the div containing the quiz results
const finalScoreDisplay = document.querySelector('#final-score') // Select the h1 displaying final score

// Initialize variables for keeping track of the current state of the quiz
let currentQNum = 0 // Variable pointing to the index of the current question
let correctAnswersNum = 0 // Variable keeping track of correct answers
let isQuizOver = false // Boolean checking if the quiz is over
let isConfirmingAnswer = true // Boolean checking the current state of the answer button

// Displays the first question and answers
displayNextQ()

// Listen for a click on the answer button and respond accordingly
btn.addEventListener('click', () => {
  // If quiz is over and user clicks the 'RESTART QUIZ?' button, reset the quiz
  if (isQuizOver && btn.innerText === 'RESTART QUIZ?') {
    resultsDisplay.style.display = 'none'
    quizGameDisplay.style.display = 'block'
    isQuizOver = false
    currentQNum = 0
    correctAnswersNum = 0
    displayNextQ()
    return
  }

  // If the quiz isn't over
  if (!isQuizOver) {
    // If the answer button is currently in the 'confirm answer' state
    if (isConfirmingAnswer) {
      let selectedAnswer = document.querySelector('input[type = radio]:checked') // Select the user's chosen answer
      // if a radio button is selected, proceed with the rest of the code
      if (selectedAnswer) {
        // If the user's chosen answer is correct
        if (selectedAnswer.value == questions[currentQNum].correctAnswer) {
          correctAnswer()
        } else {
          // If the user's chosen answer is incorrect
          wrongAnswer(
            questions[currentQNum].answers[questions[currentQNum].correctAnswer]
          )
        }
        currentQNum++ // Increment the current question number
        // If the final question has been checked
        if (currentQNum == questions.length) {
          isQuizOver = true // Set the quiz as over
          btn.innerText = 'SEE QUIZ RESULTS'
          return // Ends the quiz
        }
        btn.innerText = 'NEXT QUESTION'
        isConfirmingAnswer = false // No longer confirming answer
      } else {
        // if no radio button is selected, display an error message
        answerResultDisplay.className = ''
        answerResultDisplay.classList.add('no-answer')
        answerResultDisplay.innerText = 'Please select an answer.'
      }
    } else {
      // If the answer button is currently in the 'next question' state
      displayNextQ() // Displays the next question and answers
      answerResultDisplay.innerText = ''
      isConfirmingAnswer = true // State is changed back to confirming answer
    }
  } else {
    // Displays the quiz results after the quiz is over and hides the quiz
    quizGameDisplay.style.display = 'none'
    resultsDisplay.style.display = 'block'
    btn.innerText = 'RESTART QUIZ?'
    answerResultDisplay.innerText = ''

    // Calculates and displays the final score
    let finalScore = (correctAnswersNum / questions.length) * 100
    finalScoreDisplay.innerText = `${finalScore.toFixed(0)}%`

    // Changes color of final score display depending on the score
    if (finalScore >= 65) {
      finalScoreDisplay.classList.add('correct')
    } else {
      finalScoreDisplay.classList.add('wrong')
    }
  }
})

// Handles the case when an answer is correct
function correctAnswer() {
  answerResultDisplay.innerText = 'CORRECT!'
  answerResultDisplay.className = ''
  answerResultDisplay.classList.add('correct')
  correctAnswersNum++
}

// Handles the case when an answer is wrong
function wrongAnswer(correctAnswer) {
  answerResultDisplay.innerText = 'WRONG!'
  answerResultDisplay.className = ''
  answerResultDisplay.classList.add('wrong')

  const p = document.createElement('p')
  p.classList.add('correct-answer-display')
  p.innerText = `Correct answer: ${correctAnswer}`
  answerResultDisplay.appendChild(p)
}

// Displays the next question and answers
function displayNextQ() {
  btn.innerText = 'CONFIRM ANSWER'

  // Deselect all radio buttons.
  radioBtnsInput.forEach((radioBtn) => {
    radioBtn.checked = false
  })

  // Display the question number
  qNumDisplay.innerText = `${currentQNum + 1}. `

  // Display the question text
  currentQDisplay.innerText = questions[currentQNum].question

  // Display the answer choices
  for (let i = 0; i < radioBtnsLabel.length; i++) {
    radioBtnsLabel[i].innerText = questions[currentQNum].answers[i]
  }
}
