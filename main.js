//-------------------Variables y funciones para hacer SPA la página------------------------

const home = document.getElementById("home");

const encuesta = document.getElementById("encuesta");

const homeNav = document.getElementById("homeNav");

const encuestaNav = document.getElementById("encuestaNav");

const resultados = document.getElementById("resultados");

const resultadosNav = document.getElementById("resultadosNav");

function goAbout() {

  home.classList.add("hide");

  encuesta.classList.remove("hide");

  resultados.classList.add("hide")

}

function goHome() {

  encuesta.classList.add("hide");

  home.classList.remove("hide");

  resultados.classList.add("hide");
}

function hideView() {

  home.classList.add("hide");

  encuesta.classList.add("hide");

  resultados.classList.add("hide");

}
function goContact() {

  hideView();

  resultados.classList.remove("hide");

}

encuestaNav.addEventListener("click", goAbout);
homeNav.addEventListener("click", goHome);
resultadosNav.addEventListener("click", goContact);


//---------------------Variables encuesta-----------------------

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn")
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");
const trivia_amount = document.getElementById("trivia_amount");
const type = document.getElementById("type")
const e = document.getElementById("trivia_category")
const i = document.getElementById("trivia_amount")
const triviaOptions = document.getElementById("trivias-options")
const homeButton = document.getElementById("btn-home")


let currentQuestionIndex;
let nota = 0;

let questions = [];

// function converData() {
//   axios
//     .get(`https://opentdb.com/api.php?amount=${i.value}&category=${e.value}`)
//     .then((res) => {
//       console.log(res.data.results);
//       questions = res.data.results;
//     })
//     .catch((err) => console.error(err));
// }

// converData();

function startGame() {
  axios
    .get(`https://opentdb.com/api.php?amount=${i.value}&category=${e.value}`)
    .then((res) => {
      questions = res.data.results;
      setNextQuestion();
    })
    .catch((err) => console.error(err));
  startButton.classList.add("hide");
  triviaOptions.classList.add("hide");

  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  nameData.classList.add("hide");
}


function showQuestion(question) {

  type.innerText = question.category;

  questionElement.innerText = question.question;

  let answers = [];
  question.incorrect_answers.forEach((incorrectAnswer) =>
    answers.push({ text: incorrectAnswer, correct: false })
  );
  answers.push({ text: question.correct_answer, correct: true });

    answers.sort(function () { return Math.random() - 0.5 });
    let color = ["#EE5656", "#EEDF56", "#56EE9C", "#56D3EE"]
    let myArr =[];
    let index = 0
    answers.map((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      myArr.push(button)
      myArr[index].style.setProperty("background-color", color[index])
      index++

    if (answer.correct) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", function () {

      // console.log(button.dataset.correct);

      const nodes = answerButtonsElement.getElementsByTagName('*');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
      }


      if (button.dataset.correct == "true") {
        nota++;
        notaElement.innerHTML = "Tu puntuación: " + nota;
        // console.log(nota);

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
  // console.log(questions);
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
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {

    nextButton.classList.remove("hide");
  } else {
    restartButton.classList.remove("hide");
    sendData()
    paintResults()
  }
}

function clickReset() {
  questionContainerElement.classList.add("hide")
  startButton.classList.remove("hide")
  restartButton.classList.add("hide")
  triviaOptions.classList.remove("hide");
  nameData.classList.remove("hide");
  resetPlaceholder()
}

function resetPlaceholder() {
  document.getElementById('nombre').value = '';
}

startButton.addEventListener("click", startGame);

homeButton.addEventListener("click", goAbout)

restartButton.addEventListener("click", clickReset)

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {

    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//----------------------Manipular Localstorage y pintar resultados

//-------------------------Variables resultados------------------------

const resultsContainer = document.getElementById("resultados")
// const nameInput = document.getElementById("nombre").value

//--------------------------------------------------------------------

const resultadosUp = JSON.parse(localStorage.getItem("results")) || [];

const nameData = document.getElementById("nombre")

const sendData = () => {
  
  const nameInput = document.getElementById("nombre").value
  const apodoInput =document.getElementById("apodo").value
  const puntuacion = nota;

  const obj = {
    apodoInput,
    nameInput,
    puntuacion,
  };

  resultadosUp.push(obj);
  localStorage.setItem("results", JSON.stringify(resultadosUp));
};

console.log(resultadosUp)

const paintResults = () => {
  const resultadosDown = JSON.parse(localStorage.getItem("results"))
  resultsContainer.innerHTML = ""
  resultadosDown.forEach(results => {
    resultsContainer.innerHTML += `
    <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
    <div class="card-header">${results.apodoInput}</div>
    <div class="card-body">
    <h4 class="card-title">${results.nameInput}</h4>
    <p class="card-text">${results.puntuacion}</p>
    </div>
      `

  });
}
