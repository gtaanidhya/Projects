const quesJSON = [
  {
    correctAnswer: 'Three',
    options: ['Two', 'Three', 'Four', 'Five'],
    question:
      "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: 'L. Frank Baum',
    options: [
      'Suzanne Collins',
      'James Fenimore Cooper',
      'L. Frank Baum',
      'Donna Leon',
    ],
    question:
      "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: 'Atlanta United',
    options: [
      'Atlanta United',
      'Atlanta Impact',
      'Atlanta Bulls',
      'Atlanta Stars',
    ],
    question:
      'Which of these is a soccer team based in Atlanta?',
  },
  {
    correctAnswer: 'A Nanny',
    options: [
      'A Sow',
      'A Lioness',
      'A Hen',
      'A Nanny',
    ],
    question: 'A female goat is known as what?',
  },
  {
    correctAnswer: 'P. L. Travers',
    options: [
      'J. R. R. Tolkien',
      'P. L. Travers',
      'Lewis Carroll',
      'Enid Blyton',
    ],
    question:
      "Which author wrote 'Mary Poppins'?",
  },
];
   



var score = 0;
var currentQuestion = 0;
const totalScore = quesJSON.length;
    
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next");
showQuestion();
nextButton.addEventListener("click", () => {
  scoreElement.textContent = `Score: ${score} / ${totalScore}`; 
  nextQuestion();
});
function showQuestion() {
  const { correctAnswer, options, question } = quesJSON[currentQuestion];
  questionElement.textContent = question;
  shuffleOption(options);
  for (let i = 0; i < options.length; i++){
    let optionButton = document.createElement("button");
    optionButton.textContent = options[i];
    optionElement.append(optionButton);
    optionButton.addEventListener("click", () => {
      const selectedAnswer = optionButton.textContent.trim();
      if (selectedAnswer == correctAnswer) {
        score++;
      }
      else {
        score = score - 0.25;
      }
      scoreElement.textContent = `Score: ${score} / ${totalScore}`; 
      nextQuestion();
      
    });
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quesJSON.length) {
      questionElement.textContent = "Quiz Completed";
    optionElement.textContent = "";
    nextButton.remove();
  }
  else {
    optionElement.textContent = "";
    showQuestion();
  }
}


function shuffleOption(options) {
  for (let i = options.length - 1; i >= 0; i--){
    const j = Math.floor(Math.random() * i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
}



