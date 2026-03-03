const socket = io();

let currentUser = '';
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const joinBtn = document.getElementById('joinBtn');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('userCount');
const logoutBtn = document.getElementById('logoutBtn');
const typingIndicator = document.getElementById('typingIndicator');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');

const emojis = ['😀','😃','😄','😁','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','👍','👎','👌','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','✋','🤚','🖐','🖖','👋','🤝','💪','🙏','✍️','💅','🤳','💃','🕺','👯','🧘','🎉','🎊','🎈','🎁','🏆','🥇','🥈','🥉','⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥊','🥋','⛳','⛸','🎣','🎿','🛷','🥌','🎯','🎮','🕹','🎲','♠️','♥️','♦️','♣️','🃏','🀄','🎴','🎭','🎨','🧵','🧶','🎼','🎵','🎶','🎤','🎧','🎷','🎸','🎹','🎺','🎻','🥁','📱','💻','⌨️','🖥','🖨','🖱','💾','💿','📀','🎥','🎬','📺','📷','📸','📹','📼','🔍','🔎','💡','🔦','🏮','📔','📕','📖','📗','📘','📙','📚','📓','📒','📃','📜','📄','📰','🗞','📑','🔖','🏷','💰','💴','💵','💶','💷','💸','💳','🧾','💹','✉️','📧','📨','📩','📤','📥','📦','📫','📪','📬','📭','📮','🗳','✏️','✒️','🖋','🖊','🖌','🖍','📝','💼','📁','📂','🗂','📅','📆','🗒','🗓','📇','📈','📉','📊','📋','📌','📍','📎','🖇','📏','📐','✂️','🗃','🗄','🗑','🔒','🔓','🔏','🔐','🔑','🗝','🔨','⛏','⚒','🛠','🗡','⚔️','🔫','🏹','🛡','🔧','🔩','⚙️','🗜','⚖️','🔗','⛓','🧰','🧲','⚗️','🧪','🧫','🧬','🔬','🔭','📡','💉','💊','🚪','🛏','🛋','🚽','🚿','🛁','🧴','🧷','🧹','🧺','🧻','🧼','🧽','🧯','🛒','🚬','⚰️','⚱️','🗿','🏧','🚮','🚰','♿','🚹','🚺','🚻','🚼','🚾','🛂','🛃','🛄','🛅','⚠️','🚸','⛔','🚫','🚳','🚭','🚯','🚱','🚷','📵','🔞','☢️','☣️','⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️','↕️','↔️','↩️','↪️','⤴️','⤵️','🔃','🔄','🔙','🔚','🔛','🔜','🔝','🛐','⚛️','🕉','✡️','☸️','☯️','✝️','☦️','☪️','☮️','🕎','🔯','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔀','🔁','🔂','▶️','⏩','⏭','⏯','◀️','⏪','⏮','🔼','⏫','🔽','⏬','⏸','⏹','⏺','⏏','🎦','🔅','🔆','📶','📳','📴','♀️','♂️','⚕️','♾️','♻️','⚜️','🔱','📛','🔰','⭐','🌟','✨','⚡','💥','🔥','💫','💦','💨','🌈','☀️','🌤','⛅','🌥','☁️','🌦','🌧','⛈','🌩','🌨','❄️','☃️','⛄','🌬','💨','💧','💦','☔','☂️','🌊','🌫'];

emojis.forEach(emoji => {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.onclick = () => {
        messageInput.value += emoji;
        messageInput.focus();
    };
    emojiPicker.appendChild(span);
});

emojiBtn.addEventListener('click', () => {
    emojiPicker.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
        emojiPicker.classList.add('hidden');
    }
});

joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

function joinChat() {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        socket.emit('join', username);
        loginScreen.classList.remove('active');
        chatScreen.classList.add('active');
        messageInput.focus();
    }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

let typingTimeout;
messageInput.addEventListener('input', () => {
    socket.emit('typing', true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        socket.emit('typing', false);
    }, 1000);
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        socket.emit('message', { text });
        messageInput.value = '';
        socket.emit('typing', false);
    }
}

logoutBtn.addEventListener('click', () => {
    location.reload();
});

socket.on('message', (data) => {
    addMessage(data);
    playSound();
});

socket.on('userJoined', (data) => {
    addSystemMessage(`${data.username} joined the chat`);
    userCount.textContent = data.userCount;
});

socket.on('userLeft', (data) => {
    addSystemMessage(`${data.username} left the chat`);
    userCount.textContent = data.userCount;
});

socket.on('updateUsers', (users) => {
    usersList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
            <div class="user-name">${user.username}</div>
        `;
        usersList.appendChild(userItem);
    });
});

let typingUsers = new Set();
socket.on('userTyping', (data) => {
    if (data.isTyping) {
        typingUsers.add(data.username);
    } else {
        typingUsers.delete(data.username);
    }
    
    if (typingUsers.size > 0) {
        const users = Array.from(typingUsers).join(', ');
        typingIndicator.textContent = `${users} ${typingUsers.size === 1 ? 'is' : 'are'} typing...`;
    } else {
        typingIndicator.textContent = '';
    }
});

function addMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${data.userId === socket.id ? 'own' : ''}`;
    
    const time = new Date(data.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <div class="message-avatar">${data.username.charAt(0).toUpperCase()}</div>
                <span class="message-username">${data.username}</span>
            </div>
            <div class="message-text">${escapeHtml(data.text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addSystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function playSound() {
    const audio = new Audio('iphone_text_message.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
}