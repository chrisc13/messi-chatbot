const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

let conversationStep = 0;

const personalGuesses = [
  "Sé que sos enfermera, ¿es cierto?",
  "Apuesto que te encantan los Kit Kats, ¿cierto?",
  "Me imagino que sos fan de los libros, ¿verdad?",
  "Me parece que sos una persona que disfruta el mate por la tarde.",
  "Estoy seguro que tenés una sonrisa que gana partidos."
];

let guessStep = 0; // track guess followup

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, 'user');

  switch (conversationStep) {
    case 0:
      await sendInitialSequence();
      conversationStep++;
      break;

      case 1:
        await handleDayAnswer(msg);
        conversationStep++;
        break;
    
      case 2:
        // After day answer, handle gol answer + send guess after delay
        await handleGolAnswer(msg);
        conversationStep++;
        break;
      case 3:
        // Now we're handling the user’s reply to the guess
        const lower = msg.toLowerCase();
        if (
          lower.includes('sí') ||
          lower.includes('si') ||
          lower.includes('claro') ||
          lower.includes('exacto') ||
          lower.includes('correcto') ||
          lower.includes('cierto')
        ) {
          await sendBotMessage("¡Sabía que tenía razón! 😉");
        } else if (lower.includes('no') || lower.includes('nop') || lower.includes('nunca')) {
          await sendBotMessage("Jaja, bueno, creo que mientes jeje");
        } else {
          await sendBotMessage("¡Interesante! Contame más si querés.");
        }
      
        await sendBotMessage("Ahora te toca a vos... Preguntame lo que quieras 😏");
      
        conversationStep++;
        break;
      
      case 4:
        // User asks Messi a question
        const userQuestion = msg.toLowerCase();
      
        if (userQuestion.includes('comida') || userQuestion.includes('asado')) {
          await sendBotMessage("El asado, sin dudas. Aunque a veces extraño las milanesas de mi mamá 🍖😋");
        } else if (userQuestion.includes('ronaldo')) {
          await sendBotMessage("Ronaldo es un crack, pero somos distintos. Yo juego para el equipo 😉");
        } else if (userQuestion.includes('equipo') || userQuestion.includes('barça')) {
          await sendBotMessage("Barcelona siempre va a ser mi casa, pero en París también aprendí mucho.");
        } else {
          await sendBotMessage("Mmm buena pregunta... te diría que depende del día 😉");
        }
        await sendBotMessage("Aver otra pregunta que tienes", 2000);
      
        conversationStep++;
        break;
      
      case 5:
        const userQuestion2 = msg.toLowerCase();
      
        // Muy básico: respuestas fijas según palabras clave
        if (userQuestion2.includes('comida') || userQuestion2.includes('asado')) {
          await sendBotMessage("El asado, sin dudas. Aunque a veces extraño las milanesas de mi mamá 🍖😋");
        } else if (userQuestion2.includes('ronaldo')) {
          await sendBotMessage("Ronaldo es un crack, pero somos distintos. Yo juego para el equipo 😉");
        } else if (userQuestion2.includes('equipo') || userQuestion2.includes('barça')) {
          await sendBotMessage("Barcelona siempre va a ser mi casa, pero en París también aprendí mucho.");
        } else {
          // fallback answer
          await sendBotMessage("Mmm buena pregunta... te diría que depende del día 😉");
        }
        await sendBotMessage("¿Querés ver algo especial que encontré para vos?", 5000);
      
        // Continuar al paso siguiente (ej. mostrar el regalo)
        conversationStep++;
        break;
      case 6:
        const lowerMsg = msg.toLowerCase();
       
          await sendBotMessage("Posiblemente está en la bolsa 😉");
          await sendBotMessageGif('/messi-chatbot/scrapbook-image.jpg', 2000);
        
        conversationStep++;
        break;
      case 7:
        await sendBotMessage("¡Feliz cumple, crack! Que este año sea como un partido inolvidable, lleno de alegría y goles.");

        conversationStep++;
        break;
  }

  clearInput();
}


async function sendInitialSequence() {
  await sendBotMessage("Che, espera tantito...", 1500);
  await sendBotMessageGif('/messi-chatbot/messiGif.gif', 2500);
  await sendBotMessage("Ahora sí! ¡Vamos con todo! ⚽😉", 2500);
  await sendBotMessage("¿Cómo va tu día? Bonita", 1500);
}

async function handleDayAnswer(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes("bien") || lower.includes("bueno") || lower.includes("genial")) {
    await sendBotMessage("¡Qué bueno, bonita! ¿Algún gol hoy?");
  } else {
    await sendBotMessage("No te preocupes, siempre hay revancha. Mañana la rompés seguro, no?");
  }
}
async function handleGolAnswer(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes("sí") || lower.includes("si") || lower.includes("claro") || lower.includes("obvio")) {
    await sendBotMessage("Ta bueno.");
  } else if (lower.includes("no") || lower.includes("nop") || lower.includes("nada")) {
    await sendBotMessage("No pasa nada.");
  } else {
    await sendBotMessage("¡Gracias por contarme! Siempre hay una nueva oportunidad para meter un gol.");
  }

  // Pause then send the guess
  await new Promise(resolve => setTimeout(resolve, 1500));
  await sendBotMessage(personalGuesses[guessStep]);
  guessStep++;
}


async function followUpChallenge(userMsg) {
  const lower = userMsg.toLowerCase();

  if (lower.includes("bien") || lower.includes("bueno") || lower.includes("genial")) {
    await sendBotMessage("¡Genial! ¿Sabías que puedo hacer 5 malabares con el balón mientras te hago esta charla? ¿Querés que te enseñe uno?");
  } else if (lower.includes("mal") || lower.includes("cansado") || lower.includes("triste")) {
    await sendBotMessage("No te preocupes, la próxima vez te dedico un gol que te alegre el día. ¿Qué jugada te gustaría aprender?");
  } else if (lower.includes("más o menos") || lower.includes("regular")) {
    await sendBotMessage("Esos días son trampolines para los grandes goles. ¿Querés que te cuente cuál fue mi entrenamiento más loco?");
  } else {
    await sendBotMessage("Estoy aquí para animarte. ¿Querés que te comparta el mejor truco de fútbol que tengo?");
  }
}

async function followUpInspire(userMsg) {
  const lower = userMsg.toLowerCase();

  if (lower.includes("bien") || lower.includes("bueno") || lower.includes("genial")) {
    await sendBotMessage("Me alegra! Como siempre digo: 'El talento te da un gol, el trabajo en equipo un campeonato.' ¿Cuál es tu mayor motivación?");
  } else if (lower.includes("mal") || lower.includes("cansado") || lower.includes("triste")) {
    await sendBotMessage("Los días difíciles son los que te hacen más fuerte. 'Nunca pierdas la fe en ti mismo.' ¿Querés que te cuente cómo lo hago?");
  } else if (lower.includes("más o menos") || lower.includes("regular")) {
    await sendBotMessage("Recuerda: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.' ¿Qué esfuerzo te gustaría empezar a hacer?");
  } else {
    await sendBotMessage("Cada día es una nueva oportunidad. 'El único límite es el que vos te pongas.' ¿Querés que te motive con alguna historia?");
  }
}

function clearInput() {
  userInput.value = '';
}

function messiBotReply(input) {
  input = input.toLowerCase();

  const questionsAnswers = {
    "hola": [
      "¡Hola, che! ¿Cómo va todo? Acá siempre entrenando para hacer un gol, pero hoy te hago este pase especial.",
      "¡Ey! ¿Todo bien por ahí? Siempre listo para jugar.",
      "¿Qué onda? Acá Messi en vivo para vos."
    ],
    "amor": [
      "Sos mi mejor jugada, más valiosa que cualquier copa que levanté.",
      "Con vos siempre quiero hacer el mejor partido.",
      "El amor es la pasión que me impulsa dentro y fuera de la cancha."
    ],
    "cumple": [
      "¡Feliz cumple, crack! Que este año sea como un partido inolvidable, lleno de alegría y goles.",
      "Un año más de goles y magia para vos.",
      "Que todos tus sueños se hagan gol este año."
    ],
    "ronaldo": [
      "Rival de respeto, pero hoy te dedico mis mejores gambetas y goles a vos.",
      "Ronaldo es un grande, pero hoy la cancha es mía para vos.",
      "La competencia me hace mejor, pero acá estoy para vos."
    ],
    "triste": [
      "No te preocupes, siempre hay revancha. Acá estoy para bancarte, como en los momentos difíciles del partido.",
      "Las derrotas enseñan y las victorias motivan, ¡dale para adelante!",
      "Siempre hay una jugada para cambiar el partido, igual que en la vida."
    ],
    "fútbol": [
      "El fútbol es vida, pero vos sos la razón por la que siempre quiero jugar mejor.",
      "Cada partido es una historia, ¿cuál es la tuya?",
      "La pasión por el fútbol corre en mi sangre, ¿y en la tuya?"
    ],
    "argentino": [
      "Orgullo de ser argentino, con la camiseta puesta y el corazón en la cancha y en vos.",
      "Ser argentino es llevar la garra en el alma.",
      "Desde Rosario para el mundo, con el corazón lleno de fútbol."
    ],
    "gol": [
      "Golazo, como el que te quiero meter en el corazón.",
      "Cada gol es un poema, y vos sos mi inspiración.",
      "La magia del gol es única, como esta charla entre nosotros."
    ],
    "gracias": [
      "De nada, siempre con vos en la tribuna de mi vida.",
      "Gracias a vos por la buena onda.",
      "Acá estamos para lo que necesites, crack."
    ],
    "adiós": [
      "Nos vemos, ¡y que no falten los goles y las sonrisas!",
      "Hasta la próxima, seguí brillando.",
      "Chau, que la vida te dé muchos goles y alegrías."
    ],
    "chau": [
      "Nos vemos, ¡y que no falten los goles y las sonrisas!",
      "Hasta la próxima, seguí brillando.",
      "Chau, que la vida te dé muchos goles y alegrías."
    ],
  };

  for (const key in questionsAnswers) {
    if (input.includes(key)) {
      const replies = questionsAnswers[key];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }

  const fallbackReplies = [
    "Che, soy mejor con la pelota que con las palabras, pero siempre intento.",
    "¿Sabés? Cada día es una nueva oportunidad para hacer magia en la cancha y en la vida.",
    "Si querés, te cuento algún secreto de los entrenamientos.",
    "La pasión y la dedicación hacen la diferencia, como en cada partido.",
    "Contame, ¿cuál es tu jugada favorita?"
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg', sender);

  if (sender === 'bot') {
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = text;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(textDiv);
  } else {
    msgDiv.textContent = text;
  }

  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function addImageMessage(imageUrl) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg', 'bot', 'image');

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');

  const img = document.createElement('img');
  img.src = imageUrl + '?t=' + new Date().getTime();
  img.alt = "Messi scrapbook image";

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(img);

  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendBotMessage(text, delay = 1500) {
  const typing = showTypingIndicator();
  return new Promise(resolve => {
    setTimeout(() => {
      chatbox.removeChild(typing);
      addMessage(text, 'bot');
      resolve();
    }, delay);
  });
}

function sendBotMessageGif(imageUrl, delay = 1500) {
  const typing = showTypingIndicator();
  return new Promise(resolve => {
    setTimeout(() => {
      chatbox.removeChild(typing);
      addImageMessage(imageUrl);
      launchConfetti(100); // Confetti celebration!
      resolve();
    }, delay);
  });
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('msg', 'bot', 'typing-indicator');

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');

  const typingBubble = document.createElement('div');
  typingBubble.classList.add('typing-bubble');

  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('typing-dots');

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.classList.add('typing-dot');
    dotsContainer.appendChild(dot);
  }

  typingBubble.appendChild(dotsContainer);
  typingDiv.appendChild(avatar);
  typingDiv.appendChild(typingBubble);

  chatbox.appendChild(typingDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  return typingDiv;
}

function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');

  // Random color
  const colors = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7', '#732982'];
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  // Random start position across the width of the viewport
  confetti.style.left = Math.random() * window.innerWidth + 'px';

  // Random animation duration between 3-6 seconds
  const duration = (3 + Math.random() * 3).toFixed(2);
  confetti.style.animationDuration = `${duration}s, ${duration / 2}s`;

  // Random animation delay (start time)
  confetti.style.animationDelay = '0s, 0s';

  return confetti;
}

function launchConfetti(amount = 100) {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  for (let i = 0; i < amount; i++) {
    const confetti = createConfettiPiece();
    container.appendChild(confetti);

    // Remove confetti after animation finishes
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}

userInput.addEventListener('focus', () => {
  setTimeout(() => {
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 300);
});


if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const chatbox = document.getElementById('chatbox');
    const vh = window.visualViewport.height;
    chatbox.style.height = (vh - 100) + 'px'; // adjust as needed
  });
}
