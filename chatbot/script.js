// Function to generate response internally
const generateResponse = (userMessage) => {
    console.log("User Message:", userMessage);
    // Define responses based on user input keywords
    let response = "";
    const keywords = {
        "hello": ["hello", "hi", "hey", "Evening", "Morning", "Afternoon"],
        "browse": ["browse", "see jewelry", "view jewelry", "store", "what jewelry do you have", "jewelry", "What do you have in store"],
        "order": ["i want to buy ring", "i want to buy earring", "order", "place order", "buy"],
        "ring_price": ["ring", "rings","price"],
        "earring_price": ["earring", "earrings","price"],
        "bracelet_price": ["bracelet", "bracelets", "price"],
        "anklet_price": ["anklet", "anklets","price"],
        "watch_price": ["wrist watch", "wrist watches","price", "watch"],
        "necklace_price": ["necklace", "price"],
        
        "complaint": ["complain", "complaint"]
    };

    // Check for keywords in user's message
    for (const key in keywords) {
        if (keywords.hasOwnProperty(key)) {
            const keywordArray = keywords[key];
            const match = keywordArray.some(keyword => userMessage.toLowerCase().includes(keyword));
            if (match) {
                switch (key) {
                    case "hello":
                        response = "Hi there! Welcome to our jewelry store. How can I assist you today?";
                        break;
                    case "browse":
                        response = "Sure! Here are some categories you can browse: rings, necklaces, bracelets, earrings, anklets, wrist watches. What are you interested in?";
                        break;
                    case "ring_price":
                        response = "We have various types of rings available, including engagement rings, wedding bands, and fashion rings. Prices range from #1000 to #5000 depending on the type and quality. Would you like to see our collection?";
                        break;
                    case "earring_price":
                        response = "Our earrings collection includes studs, hoops, and danglers. Prices start from #50 and can go up to #1000 depending on the design and materials used.";
                        break;
                    case "bracelet_price":
                        response = "Bracelets come in gold, silver, and platinum. Prices vary from #80 to #2000 depending on the metal and design.";
                        break;
                    case "anklet_price":
                        response = "We have stylish anklets available at prices ranging from #3000 to #8500.";
                        break;
                    case "watch_price":
                        response = "Our wrist watches start from #1000 and go up to #21500 depending on the brand and features.";
                        break;
                    case "necklace_price":
                        response = "Necklaces are available in gold, silver, and diamond options. Prices range from #1050 to $85000 depending on the material and design.";
                        break;
                    case "order":
                        response = "If you want to order please feel free to do so from our store.";
                        break;
                    case "complaint":
                        response = "I apologize for any inconvenience. Please contact our customer service at +234-123-4567 for assistance with complaints.";
                        break;
                    default:
                        response = "I'm sorry, I didn't understand that. How can I assist you with your jewelry needs?";
                }
                break;
            }
        }
    }
    return response;
}

// Selecting DOM elements and handling user interactions
window.addEventListener("DOMContentLoaded", () => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    // Variable to store initial height of the chat input textarea
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

    // Function to handle user input and initiate chat
    const handleChat = () => {
        const userMessage = chatInput.value.trim();
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

            // Generate response
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
});