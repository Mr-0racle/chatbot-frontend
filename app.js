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
        const message = this.getMessageFromInput();

        if (!message) {
            return;
        }

        this.addUserMessage(message);
        this.updateChatDisplay();

        this.showTypingIndicator();

        this.sendBotResponse(message)
            .then(botResponse => {
                this.addBotMessage(botResponse);
                this.updateChatDisplay();
                this.hideTypingIndicator();
                this.clearInputField();
            })
            .catch(error => {
                console.error('Error:', error);
                this.hideTypingIndicator();
            });
    }

    getMessageFromInput() {
        const textField = this.args.inputField;
        return textField.value.trim();
    }

    addUserMessage(message) {
        this.messages.push({ name: "User", message });
    }

    updateChatDisplay() {
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

    showTypingIndicator() {
        const dotsElement = this.args.typingIndicator;
        if (dotsElement) {
            dotsElement.classList.add('typing-active');
        }
    }

    hideTypingIndicator() {
        const dotsElement = this.args.typingIndicator;
        if (dotsElement) {
            dotsElement.classList.remove('typing-active');
        }
    }

    sendBotResponse(message) {
        return fetch("ask the ai guy", {
            method: 'POST',
            body: JSON.stringify({ prompt: message }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());
    }

    addBotMessage(response) {
        const botMessage = { name: "Sam", message: response.Assistant };
        this.messages.push(botMessage);
    }

    clearInputField() {
        const textField = this.args.inputField;
        textField.value = '';
    }
}

const chatbox = new Chatbox();
