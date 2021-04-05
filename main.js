// Все варианты ответа
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');
      
// Все наши ответы
const optionElements = document.querySelectorAll('.option');

// Сам вопрос
const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов
      
let indexOfQuestion; // индекс текущего вопроса
let indexOfPage = 0; // индекс страници

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка следующий

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer') // количество правильных ответов
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2') // количество всех вопросов в модальном окне
const btnTryAgain = document.getElementById('btn-try-again') // кнопка "попробуй еще"

const questions = [
  {
    question: 'Для чего предусмотрены циклы в JavaScript?',
    options: [
      'Для многократного повторения одного участка кода ',
      'Чтобы не повторять один и тот же код во многих местах',
      'Для хранения коллекций различных значений и более сложных сущностей',
      'Что бы описать, как и почему работает код'
    ],
    rightAnsver: 0
  },
  {
    question: 'Что можно хранить в переменой?',
    options: [
      'Обьекты и массивы',
      'Любые значения',
      'Картинки',
      'Числа',
    ],
    rightAnsver: 1
  },
  {
    question: 'Как обозначаеться логический оператор "или"?',
    options: [
      '//',
      '&&',
      '!',
      '||',
    ],
    rightAnsver: 3
  },
];

numberOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

  // мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; // установка текущего номера страници
  indexOfPage++; // увеличение индекса страници
}

let completedAnswers = []; // массив для уже заданых вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; // якорь для проверки одинаковых вопросов
  
  if (indexOfPage == questions.length) {
    quizOver() // функция на конец игры
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnsver) {
    el.target.classList.add('correct');
    updateAwsverTracer('correct');
    score++
  } else {
    el.target.classList.add('wrong');
    updateAwsverTracer('wrong');
  }
  disabledOptions();
}

for (option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e))
};

const disabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.add('disabled')
    if (item.dataset.id == questions[indexOfQuestion].rightAnsver) {
      item.classList.add('correct')
    }
  })
};

// удаление всех классов со всех вопросов
const enadleOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'wrong', 'correct')
  })
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div)
  })
};

const updateAwsverTracer = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
  if (!optionElements[0].classList.contains('disabled')) {
    alert('Вам нужно выбрать один из вариантов ответа')
  } else {
    randomQuestion();
    enadleOptions();
  }
};

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
  validate();
});

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});