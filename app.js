/* class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            typingIndicator: document.querySelector('.typing-indicator'),
            inputField: document.querySelector('.chatbox__input--footer')
        }

        this.state = false;
        this.messages = [];

        this.display();
    }

    display() {
        const { openButton, chatBox, sendButton, inputField } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        inputField.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.sendMessage();
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    sendMessage() {
        const textField = this.args.inputField;
        const message = textField.value.trim();

        if (message === "") {
            return;
        }

        const userMessage = { name: "User", message };
        this.messages.push(userMessage);

<<<<<<< HEAD
        // Simulated response from server (replace this with actual fetch call)
        const samResponse = { name: "Sam", message: "This is a response from Sam." };
        this.messages.push(samResponse);
=======
        fetch('ASK AI GUY FOR LINK/chat', {
            method: 'POST',
            body: JSON.stringify({ prompt: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.Assistant };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
>>>>>>> 1d9e20fa4f1b74b98813dd11067caecc496ce0a7

        this.updateChatText();
        textField.value = '';
    }

    updateChatText() {
        let html = '';
        this.messages.forEach(function(item) {
            if (item.name === "Sam") {
                html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
            } else {
                html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
            }
        });

        const chatMessage = this.args.chatBox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = html;

        // Scroll to the bottom to show the most recent message
        chatMessage.scrollTop = chatMessage.scrollHeight;
    }
}

const chatbox = new Chatbox();
 */

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            typingIndicator: document.querySelector('.typing-indicator'),
            inputField: document.querySelector('.chatbox__input--footer')
        }

        this.state = false;
        this.messages = [];

        this.display();
    }

    display() {
        const { openButton, chatBox, sendButton, inputField } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        inputField.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.sendMessage();
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    sendMessage() {
        const textField = this.args.inputField;
        const message = textField.value.trim();

        if (message === "") {
            return;
        }

        // Create a new user message object
        const userMessage = { name: "User", message };

        // Push the user's message to the end of the messages array
        this.messages.push(userMessage);

        // Update the chat display
        this.updateChatText();
        textField.value = '';
    }

    updateChatText() {
        let html = '';

        for (const message of this.messages) {
            if (message.name === "Sam") {
                html += `<div class="messages__item messages__item--operator">${message.message}</div>`;
            } else {
                html = `<div class="messages__item messages__item--visitor">${message.message}</div>` + html;
            }
        }

        const chatMessage = this.args.chatBox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = html;

        chatMessage.scrollTop = chatMessage.scrollHeight;
    }
}

const chatbox = new Chatbox();
