const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, 'user');
  const response = messiBotReply(msg.toLowerCase());
  setTimeout(() => addMessage(response, 'bot'), 600);

  userInput.value = '';
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg', sender);
  msgDiv.textContent = text;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Messi bot responses (Argentine-style)
function messiBotReply(input) {
  if (input.includes("hola") || input.includes("buenas")) {
    return "Hola, che. ¿Cómo andás?";
  } else if (input.includes("amor") || input.includes("te quiero")) {
    return "Sos más especial que cualquier gol que haya hecho.";
  } else if (input.includes("cumple")) {
    return "¡Feliz cumple! Ojalá tengas un día lleno de sonrisas.";
  } else if (input.includes("ronaldo")) {
    return "Gran jugador, pero prefiero hablar de vos 😉.";
  } else if (input.includes("triste")) {
    return "No te preocupes, che. Todo pasa. Te banco siempre.";
  } else {
    return "Perdón, soy mejor con la pelota que con las palabras 😅. Probá preguntarme algo más.";
  }
}
