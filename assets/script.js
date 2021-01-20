const socket = io();

const nickname = prompt("Enter your nickname");
const chatBox = document.getElementById('chatbox');
const chatinput = document.getElementById('chatinput');

const outputMessage = (nickname, content) => {
  let scrollHeight, totalHeight;
  scrollHeight = chatBox.clientHeight;
  totalHeight = chatBox.scrollHeight - chatBox.scrollTop;

  let message = document.createElement('div');
  
  message.className = 'message';
  message.innerHTML = `<span class="nickname">${nickname}: </span><span class="messageContent">${content}</span>`;
  chatBox.appendChild(message);

  if (totalHeight == scrollHeight) chatBox.scrollTo(0, chatBox.scrollHeight);
}

socket.on('outputMessage', data => {
  outputMessage(data.nickname, data.content);
});

const sendMessage = () => {
  if (chatinput.value.length < 1) return;
  if (nickname.length < 1) return;
  socket.emit('sendMessage', {nickname: nickname, content: chatinput.value});
}

document.getElementById('sendmessage').onclick = () => {
  sendMessage();
  chatinput.value = '';
}

chatinput.onkeyup = e => {
  if (e.key === "Enter") document.getElementById('sendmessage').click();
}