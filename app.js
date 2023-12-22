
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

        const userMessage = { name: "User", message };
        this.messages.push(userMessage);

        this.updateChatText();

        this.showTypingDots();

        fetch("https://c99e-43-247-157-253.ngrok-free.appv/chat", {
            method: 'POST',
            body: JSON.stringify({ prompt: message }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            const botMessage = { name: "Sam", message: response.Assistant };
            this.messages.push(botMessage);

            this.updateChatText();
            this.hideTypingDots();

            textField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            this.hideTypingDots();
        });
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



    showTypingDots() {
        const dotsElement = document.querySelector('.typing-indicator');
        if (dotsElement) {
            dotsElement.classList.add('typing-active');
        }
    }

    hideTypingDots() {
        const dotsElement = document.querySelector('.typing-indicator');
        if (dotsElement) {
            dotsElement.classList.remove('typing-active');
        }
    }
}

const chatbox = new Chatbox();
