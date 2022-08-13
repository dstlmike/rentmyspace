var inputField = document.getElementById("input");
var inputt = document.querySelector("#input");
inputt.disabled = false; //setting button state to disabled

inputField.addEventListener("keypress", function(event) {
//inputt.disabled = false; //setting button state to disabled

//inputt.addEventListener("keypress", stateHandle);
let input = inputField.value;

     if (event.key === "Enter" && inputField.value) { // || (buttonField.value == "submit" && inputField.value)) { // && input !== "Write something...") {
//inputt.disabled = false; //setting button state to disabled
     

    inputField.value = "";

    output(input);
 stateHandle();
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
  userDiv.innerHTML = `<span>\u0055\u0073\u0065\u0072<br>${input}<br><br></span>`;
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
  botText.innerText = "\u0042\u006F\u0074\u000DTyping...\u000D\u000D";

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
  setTimeout(() => {
    botText.innerText = `\u0042\u006F\u0074\u000D${product}\u000D\u000D`;
messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  }, 5000);
       }, 5000);
}
