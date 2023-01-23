// domElements Selctor
const startQuiz = document.querySelector(".startQuiz");
const questionContainer = document.querySelector(".questionContainer");
const showTotalPoints = document.querySelector(".showTotalPoints");
const modalContainer = document.querySelector(".modalContainer");
const closeModal = document.querySelector(".closeModal");
const bestScore = document.querySelector(".highestScore");
// modal close on close button click

closeModal.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

// Array of Questions
const arrayOfQuestions = [
  {
    id: 1,
    description: "What is the Capital of West Bengal?",
    options: {
      option1: "Chennai",
      option2: "Kolkata",
      option3: "Agartala",
      option4: "New Delhi",
    },
    rightAnswer: "Kolkata",
  },
  {
    id: 2,
    description: "What is the Capital of Tamil Nadu?",
    options: {
      option1: "Chennai",
      option2: "Kolkata",
      option3: "Jammu",
      option4: "New Delhi",
    },
    rightAnswer: "Chennai",
  },
  {
    id: 3,
    description: "What is the Capital of Tripura?",
    options: {
      option1: "Lucknow",
      option2: "New Delhi",
      option3: "Agartala",
      option4: "Chandigarh",
    },
    rightAnswer: "Agartala",
  },
  {
    id: 4,
    description: "What is the Capital of India?",
    options: {
      option1: "Chennai",
      option2: "Kolkata",
      option3: "Agartala",
      option4: "New Delhi",
    },
    rightAnswer: "New Delhi",
  },
  {
    id: 5,
    description: "What is the Capital of Assam?",
    options: {
      option1: "Kochi",
      option2: "Kolkata",
      option3: "Agartala",
      option4: "Guwahati",
    },
    rightAnswer: "Guwahati",
  },
];

//Start Quiz
let highestScore = 0;
startQuiz.addEventListener("click", () => {
  // Question no count
  let count = 0;
  let totalPoints = 0;

  // Print Question on Dom
  const printQuestion = () => {
    // remove all previous question.
    if (questionContainer.hasChildNodes()) {
      const firstChild = questionContainer.firstChild;
      questionContainer.removeChild(firstChild);
    }

    // getting the question details from arrayOfQuestion
    const question = arrayOfQuestions[count];
    let html = `<div class="question"><div class="timer">10</div><p>${question.id}. ${question.description}</p><div class="options"><div class="row1"><button class='option'>${question.options.option1}</button><button class='option'>${question.options.option2}</button></div><div class="row2"><button class='option'>${question.options.option3}</button><button class='option'>${question.options.option4}</button></div></div></div>`;
    questionContainer.style.display = "block";
    questionContainer.insertAdjacentHTML("beforeend", html);
    // getting all the question part element from the dom after they are printed in the Dom.
    const timer = document.querySelector(".timer");
    const optionButtons = document.querySelectorAll(".option");
    const questionClass = document.querySelector(".question");

    // if click on any answer option.
    questionClass.addEventListener("click", (e) => {
      const target1 = e.target;
      if (target1.classList[0] == "option") {
        // on click of a answer option all the button is disabled
        optionButtons.forEach((e) => {
          e.setAttribute("disabled", "");
        });
        // setting the answer option background red
        target1.style.backgroundColor = "red";
        target1.style.color = "white";
        // if the answer option is correct then setting the background color to green.
        if (target1.innerText == question.rightAnswer) {
          totalPoints += 10;
          target1.style.backgroundColor = "green";
          target1.style.color = "white";
        }
      }
    });

    let Time = 10;
    const counterTime = () => {
      if (Time >= 1) {
        Time = Time - 1;
        timer.innerText = Time;
      } else if (question.id == arrayOfQuestions.length) {
        //  if it is the last question show result.
        showTotalPoints.innerText = `${totalPoints}`;
        modalContainer.style.display = "flex";
        // check if it is the latest highest score.
        if (highestScore < totalPoints) {
          highestScore = totalPoints;
          bestScore.innerText = highestScore;
        }
        // remove the question part from Dom.
        questionContainer.style.display = "none";
        // after quiz is completed stop calling the timerInterval.
        clearInterval(timerInterval);
      }
    };
    const timerInterval = setInterval(counterTime, 1000);
    // update question count.
    count++;
    // if it is the last qustion then stop calling the printFunction.
    if (count == arrayOfQuestions.length) {
      clearInterval(interval);
    }
  };
  printQuestion();
  const interval = setInterval(printQuestion, 11000);
});
