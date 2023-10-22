document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#input").addEventListener("keypress", function(event) {
    if (event.code === "Enter") {
    }
  });
});

var utterances = [
  ["how are you", "how is life", "how are things"],
  ["hi", "hey", "hello", "good morning", "good afternoon", "good evening", "hi there"],
  ["what are you doing", "what is new", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you a robot", "are you bot", "are you human or bot", "are you a robot"],   
  ["how do you top up my bot", "how to top up marketbot", "top-up", "topup", "top up"],
  ["contact us", "contact-us", "representative", "speak to a representative", "live agent", "agent", "speak to an agent", "speak to a agent", "speak to a live agent"],
  ["register", "sign up", "sign-up", "how can I register", "how to sign up", "how to register", "how do I register", "how do I sign up"],
  ["latest news", "update", "team meeting", "meeting", "meeting minutes", "next meeting", "when is the meeting", "when is the next meeting"],
  ["help"],
];

var answers = [
  ["Fine... Thanks for asking.", "Pretty well, how can I help you?", "Fantastic, how can I assist?"],
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Greetings!"],
  ["Nothing much.", "Improving customer experience, how can I be of help?", "I don't know actually."],
  ["I am infinite."],
  ["I am just a bot.", "I am a bot. What are you?"],
  ["Visit our /home page and check out the Fund MarketBot dropdown menu.", "You can top up you're Advertising budget through any "],
  ["Ok, 'Live Agent'. Click on 'Contact Us'.", "I see you're looking to speak with a representative. Click 'Contact Us' and we'll be in touch", "A representative, sure. Click on 'Contact Us' and send us a message."],
  ["Click GET USD50 ADS BUDGET to register"],
  ["Looking for the latest news, click on 'Contact Us' and request a copy of the meeting minutes.", "Meeting with Eugene has been postponed to Aug. 23, 2022.", "Meeting minutes on the latest news is available, Click 'Contact Us'.", "Read the latest news and updates on AI Marketing, Contact us for more details."],
  ["Have you checked your earnings today? Sign in to see how MarketBot is working for you.", "Try saying 'top up'.", "Say something like 'contact us'.", "You can try saying things like 'register'.", "Have questions, click on 'contact us'.", "Want to learn more? click sign in/sign up for more info.", "Need help? Our support team is here to assist, click on 'contact us' and we'll be in touch."],
];

var alternatives = [
  "Have you checked your earnings today? Sign in to see how MarketBot is working for you.", "Try saying 'top up'", "You can say things like 'register'", "Have questions, click on 'contact us' and we'll be in touch.", "Want to learn more? click sign in/sign up for more info", "Need help? Our support team is here to assist, click on 'contact us'.", "I didn't quit get that, try saying 'Latest News'."
];


var inputField = document.getElementById("input");
var inputt = document.querySelector("#input");
inputt.disabled = false;
//addChatEntryBot();
inputField.addEventListener("keypress", function(event) {
let input = inputField.value;
     if (event.key === "Enter" && inputField.value) {
    inputField.value = "";
    output(input);
 stateHandle();
    event.preventDefault(); 
}
});

function stateHandle() {   
        inputt.disabled = true;
     setTimeout(() => {
        inputt.disabled = false;
      }, 3000);
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
  userDiv.innerHTML = `<span>\u0059\u006F\u0075\u003A<br>${input}<br><br></span>`;
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
  botText.innerText = "\u0041\u0067\u0065\u006E\u0074\u003A\u000DTyping...\u000D\u000D";
  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;  
  setTimeout(() => {
    botText.innerText = `\u0041\u0067\u0065\u006E\u0074\u003A\u000D${product}\u000D\u000D`;
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  }, 2000);
       }, 1000);
}

function addChatEntryBot() {
var messagesContainer = document.getElementById("messages");
let botDiv = document.createElement("div"); 
let botText = document.createElement("span");
botDiv.id = "bot"; 
botDiv.className = "bot response";
botText.innerText = " ";
botDiv.appendChild(botText); 
messagesContainer.appendChild(botDiv);
setTimeout(() => { 
botText.innerText = "\u0041\u0067\u0065\u006E\u0074\u003A\u000DTyping...\u000D\u000D";
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
setTimeout(() => { 
botText.innerText = `\u0041\u0067\u0065\u006E\u0074\u003A\u000DHi there, I'm your AI assistant. How can I help you?\u000D\u000D`;
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}, 3000); 
}, 2000);
}

function openForm() {
   document.getElementById("myForm").style.display = "block";
  var box = document.getElementById('messages'); 
if (box.childNodes.length === 0) {
  addChatEntryBot();  
}
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
