// ================= LOGIN =================

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const loginForm = document.getElementById("loginForm");

const userEmail = document.getElementById("userEmail");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    userEmail.textContent = email;

    loginPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

});


// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {

    dashboardPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

});


// ================= FILE SELECTION =================

const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");

fileInput.addEventListener("change", function() {

    if (fileInput.files.length > 0) {

        selectedFile.textContent =
            "Selected: " + fileInput.files[0].name;

    } else {

        selectedFile.textContent =
            "No file selected";

    }

});


// ================= DOCUMENT UPLOAD =================

const uploadBtn = document.getElementById("uploadBtn");
const documentList = document.getElementById("documentList");
const documentCount = document.getElementById("documentCount");

let documents = [];

uploadBtn.addEventListener("click", function() {

    if (fileInput.files.length === 0) {

        alert("Please choose a document first.");

        return;
    }

    const file = fileInput.files[0];

    documents.push(file.name);

    updateDocuments();

    fileInput.value = "";

    selectedFile.textContent = "No file selected";

});


// Update document list

function updateDocuments() {

    documentList.innerHTML = "";

    documentCount.textContent = documents.length;

    if (documents.length === 0) {

        documentList.innerHTML = `
            <div class="empty-message">
                No documents uploaded yet.
            </div>
        `;

        return;
    }


    documents.forEach(function(fileName) {

        const documentItem = document.createElement("div");

        documentItem.className = "document";

        documentItem.innerHTML = `

            <div class="document-left">

                <div class="file-icon">
                    📄
                </div>

                <div>

                    <div class="file-name">
                        ${fileName}
                    </div>

                    <div class="file-type">
                        Private Document
                    </div>

                </div>

            </div>

            <div>
                🔒
            </div>

        `;

        documentList.appendChild(documentItem);

    });

}


// ================= AI CHAT =================

const askBtn = document.getElementById("askBtn");

const questionInput =
    document.getElementById("questionInput");

const chatBox =
    document.getElementById("chatBox");


askBtn.addEventListener("click", askQuestion);


questionInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        askQuestion();

    }

});


function askQuestion() {

    const question =
        questionInput.value.trim();


    if (question === "") {

        alert("Please enter a question.");

        return;
    }


    // User message

    const userMessage =
        document.createElement("div");

    userMessage.className = "ai-message";

    userMessage.innerHTML = `

        <div class="message-icon">
            👤
        </div>

        <div>

            <strong>You</strong>

            <p>
                ${question}
            </p>

        </div>

    `;

    chatBox.appendChild(userMessage);


    // Demo AI response

    setTimeout(function() {

        const aiMessage =
            document.createElement("div");

        aiMessage.className = "ai-message";

        aiMessage.innerHTML = `

            <div class="message-icon">
                🤖
            </div>

            <div>

                <strong>AI Assistant</strong>

                <p>
                    I found your question. In the
                    complete project, the Python
                    backend and RAG system will search
                    your uploaded documents and provide
                    an answer here.
                </p>

            </div>

        `;

        chatBox.appendChild(aiMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 700);


    questionInput.value = "";

}