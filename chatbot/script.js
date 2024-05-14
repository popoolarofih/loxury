// Function to generate response internally
const generateResponse = (userMessage) => {
    console.log("User Message:", userMessage);
    // Define responses based on user input keywords
    let response = "";
    const keywords = {
        "hello": ["hello", "hi", "hey", "Evening", "Morning", "Afternoon"],
        "browse": ["browse", "see jewelry", "view jewelry", "store", "what jewelry do you have", "jewelry", "What do you have in store"],
        "order": [ "i want to buy ring", "i want to buy earring", "order", "place order", "buy"],
        "ring_price": ["ring", "rings","price"],
        "earring_price": ["earring", "earrings","price"],
        "bracelet_price": ["bracelet", "bracelets", "price"],
        "anklet_price": ["anklet", "anklets","price"],
        "watch_price": ["wrist watch", "wrist watches","price", "watch"],
        "necklace_price": ["necklace", "price"],
        "Yes": ["yes", "yes i want to order"],
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
                        response = "We have various types of rings available, including engagement rings, wedding bands, and fashion rings. Prices range from #10,000 to #50,000 depending on the type and quality. Simple Band Ring: A classic, minimalist ring featuring a plain band, often made of sterling silver, gold, or rose gold. (#10,000-#30,000)   Gemstone Ring: A elegant ring featuring a precious or semi-precious gemstone, such as a diamond, sapphire, or emerald. (#3000-#100,000)   Cocktail Ring: A statement ring featuring a large, bold design, often adorned with crystals, beads, or intricate metalwork. (#40,000-#120,000)    Stacking Ring: A delicate, minimalist ring designed to be stacked with other rings, often made of silver, gold, or rose gold. (#15,000-#40,000)    Engagement-Style Ring: A luxurious ring featuring a large, prominent gemstone, often made of high-quality metals and designed to resemble an engagement ring. (#10,000-#50,000)";
                        break;
                    case "earring_price":
                        response = "Our earrings collection includes studs, hoops, and danglers. Prices start from #5,000 and can go up to #60,000 depending on the design and materials used. Minimalist Stud Earrings: Simple, small stud earrings, often made of sterling silver or gold-plated metal. (#5000-#15000) Dangle Drop Earrings: Elegant, flowing earrings that dangle below the earlobe, featuring beads, crystals, or metal details. (#15000-#30000) Hoop Earrings: Classic, circular hoop earrings, available in various sizes and materials, such as silver, gold, or rose gold. (#10000-#25000) Tassel Earrings: Trendy, tassel-adorned earrings that add a playful touch to any outfit. (#20000-#40000) Statement Chandelier Earrings: Bold, eye-catching earrings featuring intricate designs, crystals, or beads, perfect for making a fashion statement. (#30000-#60000)";
                        break;
                    case "bracelet_price":
                        response = "Bracelets come in Diamond, Chain Link, and Pearl. We have   Diamond Bracelets which comes for #25,000     Chain Link Bracelets which comes for #20,000     Pearl Bracelets Bands  which comes for #20,000       Bangle Bracelets which comes for #15,000      Tennis Bracelets which comes for #18,000 ";
                        break;
                    case "anklet_price":
                        response = "We have stylish anklets available at prices ranging from #15000 to #95000. Delicate Chain Ankle Bracelet: A simple, dainty chain ankle bracelet, often made of sterling silver or gold-plated metal - (#15000-#30000) Beaded Ankle Bracelet: A colorful, bohemian-inspired ankle bracelet featuring beads made of glass, crystal, or seed beads. (#20000-#40000) Charms Ankle Bracelet: A playful ankle bracelet adorned with small charms, such as tiny animals, stars, or hearts, often made of silver or gold-plated metal. (#25000-#45000) Gemstone Ankle Bracelet: A elegant ankle bracelet featuring a gemstone, like a tiny diamond or sapphire, set in a delicate metal band. (#40000-#70000) Layered Tassel Ankle Bracelet: A trendy, layered ankle bracelet with tassels and intricate details, often made of mixed metals and materials. (#50000-#90000)";
                        break;
                    case "watch_price":
                        response = "Our wrist watches start from #5000 and go up to #35500 depending on the brand and features. We have TOUCHSCREEN - #30,000     HYBRID  - #20,000     Analog - #15,000     SOLAR WATCHES - #5,000 ";
                        break;
                    case "necklace_price":
                        response = "Necklaces are available in gold, silver, and diamond options. Prices range from #2000 to #85000 depending on the material and design. We have Pendant Necklace - #2,000 Collar      Necklace - #10,000     Opera - #15,000        Twisted - #40,000";
                        break;
                    case "order":
                        response = "If you want to order please feel free to do so from our store. or contact the sales representative from our store on 08050985018 or inioluwadawodu@gmail.com";
                        break;
                    case "Yes":
                        response = "If you want to see more please contact the sales representative from our store on 08050985018 or inioluwadawodu@gmail.com";
                        break;
                    case "complaint":
                        response = "I apologize for any inconvenience. Please contact our customer service at 08050985018 for assistance with complaints.";
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