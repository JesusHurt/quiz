   // Variable global para almacenar el nombre del usuario
   let username;

   function getUserName() {
     const input = prompt('Ingresa tu nombre:');

     if (input === null || input.trim() === '') {
       alert('Por favor, ingresa un nombre válido para comenzar el cuestionario.');
       return getUserName(); // Llama a la función de nuevo si no se proporciona un nombre válido
     }

     username = input;
   }

   const questions = [
    {
      question: '¿Cuál es la definición de Software?',
      options: [
        'Son los accesorios', 
        'Conjunto de programas que hacen posible la ejecución de tareas en la computadora', 
        'Manipulación automática de información',
        'Es una memoria capaz de almacenar información'
      ],
      correctIndex:  2
    },
    {
      question: '¿Qué es un CPU?',
      options: [
        'Procesador central capaz de interpretar instrucciones u operaciones lógicas', 
        'Secuencia de pasos lógicos', 
        'Hardware y Software', 
        'Memoria a corto plazo,no volátil'
      ],
      correctIndex: 1
    },
    {
      question: '¿De qué se ocupa la informática?',
      options: ['Es una memoria de almacenamiento', 'De organizar la informacion', 'Se encarga de la manipulación de información', 'Convierte un problema en una secuencia'],
      correctIndex: 3
    },
    {
      question: 'Elige la respuesta donde se memcionen 3 componentes básicos internos de una computadora  ',
      options: ['Mouse,Teclado,Monitor', 'Escritorio,USB,CPU', 'Memoria RAM,Disco Duro,Tarjeta Madre', 'USB,Mouse,Disco Duro'],
      correctIndex: 3
    },
    {
      question: '¿Por qué es esencial la lógica de programación al crear una aplicación?',
      options: ['Porque nos facilita la creación de programas', 'Para tener una secuencia', 'Para lograr el objetivo de mi aplicación', 'Para convertir un problema en una secuencia de pasos lógicos para que la computadora pueda seguirlos '],
      correctIndex: 4
    },
     {
      question: '¿Qué es un algoritmo?',
      options: ['Serie de pasos para llegar a un fin', 'Un algodón de ritmos', 'Partes de un computador', 'Lógica de aplicaciones'],
      correctIndex: 1
    },
    
  ];

  let currentQuestionIndex = 0;
  let timer;
  let timeRemaining = 100; // 5 minutos en segundos

  function startQuiz() {
    showQuestion();
    startTimer();
  }

  function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const questionText = document.getElementById('question-text');

    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(index);
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.options[index] === currentQuestion.correctIndex) {
      console.log('Respuesta correcta');
    } else {
      console.log('Respuesta incorrecta');
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      resetTimer();
    } else {
      endQuiz();
      console.log('Fin del cuestionario');
      clearInterval(timer);
      document.getElementById('timer').textContent = 'Tiempo restante: :00';
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      document.getElementById('timer').textContent = `Tiempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeRemaining > 0) {
        timeRemaining--;
      } else {
        clearInterval(timer);
        console.log('Tiempo agotado');
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timer);
    timeRemaining = 100;
    startTimer();
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      resetTimer();
    }
  }
 

  function endQuiz() {
    let correctAnswers = 0;
  
    for (let index = 0; index < questions.length; index++) {
      if (index === currentQuestionIndex) {
        correctAnswers++;
      }
    }
  
    alert(`¡Gracias, ${username}!\nTu calificación es: ${correctAnswers}/${questions.length}`);
  }
  
  
  

  window.onload = function() {
    getUserName();
    startQuiz();
  };