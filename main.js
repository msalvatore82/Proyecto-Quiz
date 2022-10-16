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
  resultados.classList.add("hide");
  clickReset ()
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
  paintResults()

}

encuestaNav.addEventListener("click", goAbout);
homeNav.addEventListener("click", goHome);
resultadosNav.addEventListener("click", goContact);


//---------------------Variables encuesta-----------------------

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreButonn= document.getElementById("score-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const notaElement = document.querySelector(".nota");
const trivia_amount = document.getElementById("trivia_amount");
const type = document.getElementById("type")
const e = document.getElementById("trivia_category")
const i = document.getElementById("trivia_amount")
const u = document.getElementById("trivia_difficulty")
const triviaOptions = document.getElementById("trivias-options")
const homeButton = document.getElementById("btn-home")


let currentQuestionIndex;

let nota = 0;

let questions = [];

function startGame() {
  axios
    .get(`https://opentdb.com/api.php?amount=${i.value}&category=${e.value}&difficulty=${u.value}`)
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
    element.classList.add('wrong', element.innerText = "X")
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
    scoreButonn.classList.remove("hide");
    sendData()
    paintResults()
    resetScore()
  }
}

function resetScore() {
  if (nota != 0) {
    nota = 0;
    notaElement.innerHTML = "Tu puntuación: " + nota;
  } else {
    notaElement.innerHTML = "Tu puntuación: " + nota;
  }
}

function clickReset() {
  questionContainerElement.classList.add("hide")
  startButton.classList.remove("hide")
  restartButton.classList.add("hide")
  triviaOptions.classList.remove("hide");
  nameData.classList.remove("hide");
  scoreButonn.classList.add("hide")
  resetPlaceholder()
}

function clickScore() {
  questionContainerElement.classList.add("hide")
  restartButton.classList.add("hide")
  scoreButonn.classList.add("hide")
  resetPlaceholder()
  goContact()
}

function resetPlaceholder() {
  document.getElementById('nombre').value = '';
  document.getElementById('apodo').value = '';
}

startButton.addEventListener("click", startGame);
homeButton.addEventListener("click", goAbout)
restartButton.addEventListener("click", clickReset);
scoreButonn.addEventListener("click", clickScore)
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

const resultsContainer = document.getElementById("resultados-box")
// const nameInput = document.getElementById("nombre").value

//--------------------------------------------------------------------

const resultadosUp = JSON.parse(localStorage.getItem("results")) || [];

const sendData = () => {
  
  const nameInput = document.getElementById("nombre").value
  const apodoInput =document.getElementById("apodo").value
  const amountValue = document.getElementById("trivia_amount").value
  const avatarValue = document.getElementById("avatar").value
  const puntuacion = nota;

  

  const obj = {
    apodoInput,
    nameInput,
    puntuacion,
    amountValue,
    avatarValue
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
    <figure class="snip0056">
    <figcaption>
      <h2>${results.nameInput}<br><span>"${results.apodoInput}"</span></h2>
      <p class="p-card">Puntuación de ${nota} sobre ${results.amountValue}.</p>
      <div class="icons"></div>
    </figcaption><img src="${results.avatarValue}" alt="sample8" />
    <div class="position">Categoría elegida irá aquí</div>
  </figure>
        `
    });
}
