const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");

let currentQuestionIndex;
let nota = 0;
let results = [
  {
    "category": "General Knowledge",
    "type": "boolean",
    "difficulty": "medium",
    "question": "Furby was released in 1998.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "In the original &quot;Super Mario Bros.&quot;, what is the acceleration of Mario if he was in free fall?",
    "correct_answer": "91.28 m/s^2",
    "incorrect_answers": [
      "110  m/s^2",
      "9.42  m/s^2",
      "4.4  m/s^2"
    ]
  },
  {
    "category": "Mythology",
    "type": "boolean",
    "difficulty": "easy",
    "question": "According to Greek Mythology, Zeus can control lightning.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Entertainment: Books",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which American author was also a budding travel writer and wrote of his adventures with his dog Charley?",
    "correct_answer": "John Steinbeck",
    "incorrect_answers": [
      "F. Scott Fitzgerald",
      "Ernest Hemingway",
      "William Faulkner"
    ]
  },
  {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which Nirvana album had a naked baby on the cover?",
    "correct_answer": "Nevermind",
    "incorrect_answers": [
      "Bleach",
      "In Utero",
      "Incesticide"
    ]
  },
  {
    "category": "Entertainment: Music",
    "type": "multiple",
    "difficulty": "medium",
    "question": "African-American performer Sammy Davis Jr. was known for losing which part of his body in a car accident?",
    "correct_answer": "Left Eye",
    "incorrect_answers": [
      "Right Ear",
      "Right Middle Finger",
      "Nose"
    ]
  },
  {
    "category": "Animals",
    "type": "boolean",
    "difficulty": "medium",
    "question": "Finnish Lapphund dogs were used for herding reindeer.",
    "correct_answer": "True",
    "incorrect_answers": [
      "False"
    ]
  },
  {
    "category": "Geography",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which English county will you find the University of East Anglia?",
    "correct_answer": "Norfolk",
    "incorrect_answers": [
      "Suffolk",
      "Essex",
      "Cambridgeshire"
    ]
  },
  {
    "category": "Science & Nature",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which of these choices is not one of the phases of mitosis?",
    "correct_answer": "Diplophase",
    "incorrect_answers": [
      "Metaphase",
      "Anaphase",
      "Telophase"
    ]
  },
  {
    "category": "History",
    "type": "multiple",
    "difficulty": "medium",
    "question": "The Panama Canal was finished under the administration of which U.S. president?",
    "correct_answer": "Woodrow Wilson",
    "incorrect_answers": [
      "Franklin Delano Roosevelt",
      "Herbert Hoover",
      "Theodore Roosevelt"
    ]
  }
];


// Object.values(results).forEach((item) => console.log(item.correct_answer + item.incorrect_answers))

for (let i = 0; i < results.length; i++) {
  let questionCyI = results [i];
  let question = [{}]

  console.log([questionCyI.correct_answer] + [questionCyI.incorrect_answers]);
}




// // empezamos a generar los datos para construir nuestro objeto
let incorrect = ([]);
incorrect = results.map(function (elem) {
  let returnIncorrect = {incorrect_answers: elem.incorrect_answers, correct: "false"};
  return returnIncorrect;
});
console.log(incorrect);

//aislamos correctas
let corrects = [];
corrects = results.map(function (elem) {
  let returnCorrects = {correct_answer: elem.correct_answer, correct: "true"};
  return returnCorrects;
});
console.log(corrects);

let questionGlobal = [];
questionGlobal = results.map(function (elem) {
  let returnQuestion = {question: elem.question};
   return returnQuestion;
});
console.log(questionGlobal);

//-----------------------------Hacer pruebas aquí---------------------------------








//--------------------------------------------------------------------------------


const answers = {incorrect,corrects}
console.log(answers);

// creadno el objeto desde los objetos de la api
function crearObjetoDesdeArreglo(datos) {
  let questions  = {};

    for (const e of datos) {
      questions[e[0]] = e[1];
    }
    return questions;
}

let propiedadesValores = [['question', questionGlobal],['answers', answers]];
console.log(crearObjetoDesdeArreglo(propiedadesValores))

//nuestro objeto
const question = {
  question: ['question', questionGlobal],
  answers : ['answers', answers]
}


// empieza el codigo de sofi

function startGame() {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
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
        }else{
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
  showQuestion(results[currentQuestionIndex]);
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