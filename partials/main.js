
   document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#input").addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        
    }
  });
});


var utterances = [
  ["how are you", "how is life", "how are things"],        //0
  ["hi", "hey", "hello", "good morning", "good afternoon"],      //1
  ["what are you doing", "what is going on", "what is up"],      //2
  ["how old are you"],					//3
  ["who are you", "are you human", "are you bot", "are you human or bot"],   //4



];

// Possible responses corresponding to triggers

var answers = [
   [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],                                                                                  	//0
  [
    "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"
  ],						//1
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],						//2
  ["I am infinite"],					//3
  ["I am just a bot", "I am a bot. What are you?"],	//4



];

// For any other user input

var alternatives = [
  "Go on...",
  "Try again",
  "Have questions about the MarketBot project?\nVisit https://marketbotai.com/contact-us or send us an email at\ninfo@marketbotai.com",
];

var inputField = document.getElementById("input");
var buttonField; //document.getElementById("myButton");
// Execute a function when the user presses a key on the keyboard
inputField.addEventListener("keypress", function(event) {
  
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter" && inputField.value) { // && input !== "Write something...") {
    //buttonField = 
     let input = inputField.value;

    inputField.value = "";
    output(input);
    // Cancel the default action, if needed
    event.preventDefault();
   // Trigger the button element with a click
   // document.getElementById("myButton").click();
}
      
});
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  }
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  addChatEntry(input, product);
}

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  var messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
   
    botText.innerText = `${product}`;
  }, 2000);
}
