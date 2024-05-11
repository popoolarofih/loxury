// JavaScript code here
        // Selecting DOM elements
        const chatbotToggler = document.querySelector(".chatbot-toggler");
        const closeBtn = document.querySelector(".close-btn");
        const chatbox = document.querySelector(".chatbox");
        const chatInput = document.querySelector(".chat-input textarea");
        const sendChatBtn = document.querySelector(".chat-input span");

        // Variable to store user's message
        let userMessage = null;
        // Initial height of the chat input textarea
        const inputInitHeight = chatInput.scrollHeight;

        // Function to create a chat <li> element
        const createChatLi = (message, className) => {
            const chatLi = document.createElement("li");
            chatLi.classList.add("chat", `${className}`);
            let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
            chatLi.innerHTML = chatContent;
            chatLi.querySelector("p").textContent = message;
            return chatLi;
        }

        // Function to generate response internally
const generateResponse = (userMessage) => {
    // Define responses based on user input
    let response = "";
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        response = "Hi there! Welcome to our jewelry store. How can I assist you today?";
    } else if (userMessage.toLowerCase().includes("browse") || userMessage.toLowerCase().includes("see jewelry")) {
        response = "Sure! Here are some categories you can browse: rings, necklaces, bracelets, earrings, anklets, wrist watches. What are you interested in?";
    } else if (userMessage.toLowerCase().includes("ring") && userMessage.toLowerCase().includes("price")) {
        response = "We have various types of rings available, including engagement rings, wedding bands, and fashion rings. Prices range from #1000 to #5000 depending on the type and quality. Would you like to see our collection?";
    } else if (userMessage.toLowerCase().includes("earring") && userMessage.toLowerCase().includes("price")) {
        response = "Our earrings collection includes studs, hoops, and danglers. Prices start from #50 and can go up to #1000 depending on the design and materials used.";
    } else if (userMessage.toLowerCase().includes("bracelet") && userMessage.toLowerCase().includes("price")) {
        response = "Bracelets come in gold, silver, and platinum. Prices vary from #800 to #2000 depending on the metal and design.";
    } else if (userMessage.toLowerCase().includes("anklet") && userMessage.toLowerCase().includes("price")) {
        response = "We have stylish anklets available at prices ranging from #300 to #5000.";
    } else if (userMessage.toLowerCase().includes("wrist watch") && userMessage.toLowerCase().includes("price")) {
        response = "Our wrist watches start from #1100 and go up to #1500 depending on the brand and features.";
    } else if (userMessage.toLowerCase().includes("necklace") && userMessage.toLowerCase().includes("price")) {
        response = "Necklaces are available in gold, silver, and diamond options. Prices range from #4150 to #5000 depending on the material and design.";
    } else if (userMessage.toLowerCase().includes("order")) {
        response = "If you have any other specific inquiries, please feel free to contact our business owner.";
    } else if (userMessage.toLowerCase().includes("complain") || userMessage.toLowerCase().includes("complaint")) {
        response = "I apologize for any inconvenience. Please contact our customer service at +234-800-123-4567 for assistance with complaints.";
    } else {
        response = "I'm sorry, I didn't understand that. How can I assist you with your jewelry needs?";
    }
    return response;
}

        // Function to handle user input and initiate chat
        const handleChat = () => {
            userMessage = chatInput.value.trim();
            if (!userMessage) return;

            // Clear the input textarea and set its height to default
            chatInput.value = "";
            chatInput.style.height = `${inputInitHeight}px`;

            // Append the user's message to the chatbox
            chatbox.appendChild(createChatLi(userMessage, "outgoing"));
            chatbox.scrollTo(0, chatbox.scrollHeight);

            setTimeout(() => {
                // Display "Thinking..." message while waiting for the response
                const incomingChatLi = createChatLi("Thinking...", "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);

                // Generate response internally
                const response = generateResponse(userMessage);
                const responseChatLi = createChatLi(response, "incoming");
                chatbox.appendChild(responseChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            }, 600);
        }

        // Event listeners for chat input textarea
        chatInput.addEventListener("input", () => {
            chatInput.style.height = `${inputInitHeight}px`;
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });

        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
                e.preventDefault();
                handleChat();
            }
        });

        // Event listeners for send button, close button, and chatbot toggler
        sendChatBtn.addEventListener("click", handleChat);
        closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
        chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));