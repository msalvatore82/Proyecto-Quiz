const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");

let currentQuestionIndex;
let nota = 0;

let questions = [];

function converData() {
  axios
    .get("https://opentdb.com/api.php?amount=10&category=21")
    .then((res) => {
      console.log(res.data.results);
      questions = res.data.results;
    })
    .catch((err) => console.error(err));
}

converData();

function startGame() {
  converData();
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}


function showQuestion(question) {
  
  questionElement.innerText = question.question;
  let answers = [];
  
  question.incorrect_answers.forEach((incorrectAnswer) =>
    answers.push({ text: incorrectAnswer, correct: false })
  );
  answers.push({ text: question.correct_answer, correct: true });

    answers.sort(function() {return Math.random() - 0.5});
    console.log(answers);
    answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    
    if (answer.correct) {
      button.dataset.correct = true;
    }
    // cuando clique una respuesta llama a la función

    button.addEventListener("click", function () {
      console.log(button.dataset.correct);
      if (button.dataset.correct == "true") {
        nota++;
        notaElement.innerHTML = "Tu puntuación: " + nota;
        console.log(nota);
      } else {
        if (nota != 0) {
          nota = nota - 0.5;
          notaElement.innerHTML = "Tu puntuación: " + nota;
        } else {
          notaElement.innerHTML = "Tu puntuación: " + nota;
        }
      }

      selectAnswer();
    });
    answerButtonsElement.appendChild(button);
  });
}

function setNextQuestion() {
  resetState();
  console.log(questions);
  showQuestion(questions[currentQuestionIndex]);
}

function setStatusClass(element, correct) {
  //pinta la respuesta corre e incorrecta
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    //llamamos a la función y le pasamos los botons y el botón correcto
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    //si estamos en una pregunta que es menos que las preguuntas que quedan
    //es decir si son 10 preguntas y estamos en la 7
    //se muestra el boton siguiente porque aun quedan preguntas
    nextButton.classList.remove("hide");
  } else {
    //si no quedan preguntas porque hemos terminado (10/10)
    startButton.innerText = "Restart"; //cambiamos el texto del botón start por "restart"
    startButton.classList.remove("hide"); // volvemos a mostrar el botón start
  }
}

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function resetState() {
  nextButton.classList.add("hide"); //escondemos el botón next
  while (answerButtonsElement.firstChild) {
    //bucle que se ejecuta si answerButtonsElemetnos
    //tiene un primer hijo
    //borramos el primer hijo de answerButtonsElements
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
