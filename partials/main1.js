document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#input").addEventListener("keypress", function(event) {
    if (event.code === "Enter") {

    }
  });
});



var utterances = [
  ["how are you", "how is life", "how are things"],        //0
  ["hi", "hey", "hello", "good morning", "good afternoon", "hi there"],      //1
  ["what are you doing", "what is going on", "what is up"],      //2
  ["how old are you"],					//3
  ["who are you", "are you human", "are you bot", "are you human or bot", "are you a robot"],   //4
  ["how do you top up my bot", "how to top up marketbot", "top-up", "topup", "top up"],
  ["withdrawals", "withdrawal"],
["register"],
  ["help"],
];

// Possible responses corresponding to triggers

var answers = [
   [
    "Fine... Thanks for asking.",
    "Pretty well, how can I help you?",
    "Fantastic, how can I assist?"

  ],                                                                                  	//0
  [
   /* "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy!" */
"Hi there, I'm your AI assistant. How can I help you?"

  ],						//1
  [
    "Nothing much.",
    "About to go to sleep.",
    "Can you guess?",
    "I don't know actually."
  ],						//2
  ["I am infinite."],					//3
  ["I am just a bot.", "I am a bot. What are you?"],	//4
  ["Visit our /home page and check out the Fund MarketBot dropdown menu."],
  ["Withdrawals have been paused as they update their website.", "Withdrawals have been paused, check back later for more info.", "Please allow some time for withdrawals to open up again."],
  ["Click Sign in|Sign up to register"],
["Have you checked your earnings today? Sign in to see how MarketBot is working for you.", "Try saying 'top up'.", "Say something like 'withdrawal'.", "You can try saying things like 'register'.", "Have questions, send us an e-mail at info@marketbotai.com.", "Want to learn more? click sign in/sign up for more info.", "Need help? Our support team is here to assist, e-mail us at info@marketbotai.com."],



];

// For any other user input

var alternatives = [
/*
  "Have questions about the MarketBot project? Send us an email at info@marketbotai.com",
  "Type help for more options",
  "I don't understand, try again.."
*/
"Have you checked your earnings today? Sign in to see how MarketBot is working for you.", "Try saying 'top up'", "Say something like 'withdrawal'", "You can say things like 'register'", "Have questions, send us an e-mail at info@marketbotai.com", "Want to learn more? click sign in/sign up for more info", "Need help? Our support team is here to assist, e-mail us at info@marketbotai.com"
];

var inputField = document.getElementById("input");
var inputt = document.querySelector("#input");

inputField.addEventListener("keypress", function(event) {
inputt.disabled = false; //setting button state to disabled

inputt.addEventListener("keypress", stateHandle);


     if (event.key === "Enter" && inputField.value) { // || (buttonField.value == "submit" && inputField.value)) { // && input !== "Write something...") {

     let input = inputField.value;

    inputField.value = "";

    output(input);
 
    event.preventDefault();
 
    
 
  
}

});

function stateHandle() {
   
        inputt.disabled = true; //button remains disabled
     setTimeout(() => {
        inputt.disabled = false; //button is enabled
      }, 10000);
}

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
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight; 
 
 

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  
  botDiv.id = "bot";
  botDiv.className = "bot response";
botText.innerText = " ";
 
  
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
 
  setTimeout(() => {
  botText.innerText = "Typing...";

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
  setTimeout(() => {
    botText.innerText = `${product}`;
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  }, 5000);
       }, 5000);
}
