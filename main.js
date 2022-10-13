//-------------------Variables para hacer SPA la página------------------------

const home = document.getElementById("home");

const encuesta = document.getElementById("encuesta");

const homeNav = document.getElementById("homeNav");

const encuestaNav = document.getElementById("encuestaNav");

const resultados = document.getElementById("resultados");

const resultadosNav = document.getElementById("resultadosNav");

function goAbout() {

  home.classList.add("hide");

  encuesta.classList.remove("hide");

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

  // encuestaNav.addEventListener("click", goAbout);

  // function goHome() {

  //   encuesta.classList.add("hide");

  //   home.classList.remove("hide");

  // }

  // homeNav.addEventListener("click", goHome);

  // function hideView() {

  //   home.classList.add("hide");

  //   encuesta.classList.add("hide");

  //   resultados.classList.add("hide");

  //   }

  //   function goContact() {

  //     hideView();

  //     resultados.classList.remove("hide");
  //   }
  //   resultadosNav.addEventListener("click", goContact);
  //--------------------------------------------

  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-btn");
  const questionContainerElement = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const notaElement = document.querySelector(".nota");
  const trivia_amount = document.getElementById("trivia_amount");
  const type = document.getElementById("type")
  const e = document.getElementById("trivia_category")

  let currentQuestionIndex;
  let nota = 0;

  let questions = [];

  function converData() {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=14`)
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

    type.innerText = question.category;

    questionElement.innerText = question.question;

    let answers = [];
    question.incorrect_answers.forEach((incorrectAnswer) =>
      answers.push({ text: incorrectAnswer, correct: false })
    );
    answers.push({ text: question.correct_answer, correct: true });

    answers.sort(function () { return Math.random() - 0.5 });
    console.log(answers);
    answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;


      if (answer.correct) {
        button.dataset.correct = true;
      }

      button.addEventListener("click", function () {

        console.log(button.dataset.correct);

        const nodes = answerButtonsElement.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].disabled = true;
        }

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
      setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {

      nextButton.classList.remove("hide");
    } else {

      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
    }
  }

  startButton.addEventListener("click", startGame);

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
