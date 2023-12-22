class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
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

        // Update the chat display with the user's message
        this.updateChatText();

        // Show typing dots before sending the message
        this.showTypingDots();

        // Call the AI service to get the response
        fetch('ASK AI GUY FOR LINK/chat', {
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

            // Update the chat display with the bot's message
            this.updateChatText();

            // Hide typing dots after receiving the bot's response
            this.hideTypingDots();

            // Clear the input field
            textField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);

            // Hide typing dots in case of an error
            this.hideTypingDots();
        });
    }

    updateChatText() {
        let html = '';

        for (const message of this.messages) {
            if (message.name === "Sam") {
                html += `<div class="messages__item messages__item--operator">${message.message}</div>`;
            } else {
                html += `<div class="messages__item messages__item--visitor">${message.message}</div>`;
            }
        }

        const chatMessage = this.args.chatBox.querySelector('.chatbox__messages');
        chatMessage.innerHTML = html;

        chatMessage.scrollTop = chatMessage.scrollHeight;
    }

    showTypingDots() {
        const dotsElement = document.querySelector('.messages__item--operator.typing-dots');
        dotsElement.classList.add('typing-active');
    }

    hideTypingDots() {
        const dotsElement = document.querySelector('.messages__item--operator.typing-dots');
        dotsElement.classList.remove('typing-active');
    }
}

const chatbox = new Chatbox();
