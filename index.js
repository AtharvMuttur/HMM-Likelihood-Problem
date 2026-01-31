let arr1 = [];
let arr2 = [];

let arrI = [];
let arrT = [];
let arrE = [];

let arrL = [];

let arrTemp = [];

let HidList = document.getElementById("HidS");
let ObsList = document.getElementById("Obs");
let ObsSeqList = document.getElementById("ObsSeq");


function handleSubmit1(){
    getNumHidS();
    getHidS();
    displayHiddenStates();
}

function handleSubmit2(){
    getNumObs();
    getObs();
    displayObservations()
}

function handleSubmit3(){
    getNumO();
    getO();
    displayObsSequence();
}

function handleSubmit4(){
    decTransProb();
    displayTransProb();
}

function handleSubmit5(){
    decEmmiProb();
    displayEmmiProb();
}





function getNumHidS() {
    let HidVal = document.getElementById("numHidS").value;
    return HidVal;
}

function getHidS() {
    let val = getNumHidS();

    for (let i = 0; i < val; i++){
        arr1.push(prompt(`Enter state ${i+1}`))
    }

    return arr1;
}




function getNumObs() {
    let ObsVal = document.getElementById("numObs").value;
    return ObsVal;
}

function getObs() {
    let val = getNumObs();

    for (let i = 0; i < val; i++){
        arr2.push(prompt(`Enter observation ${i+1}`))
    }

}





function getNumO(){
    let SVal = document.getElementById("numS").value;
    return SVal;
}

function getO(){
    let val = getNumO();

    for (let i = 0; i < val; i++){
        arrL.push(prompt(`Enter state ${i+1}`))
    }
}





function decInitProb(){
    for(let i = 0; i < getNumHidS(); i++){
        arrI.push(parseFloat(prompt(`Enter Initial Probability for state ${i+1}`)))
    }

    console.log(arrI)
}

function decTransProb(){
    let arrH = arr1;

    for (let i = 0; i < getNumHidS(); i++){
        arrT[i] = [];
        for(let j = 0; j < getNumHidS(); j++){
            arrT[i].push(parseFloat(prompt(`Enter Transition Probabiity from ${arrH[i]} to ${arrH[j]}`)))
        }
    }

    console.log(arrT)
}

function decEmmiProb(){
    let arrH = arr1;
    let arrO = arr2;

    for(let i = 0; i < getNumHidS(); i++){
        arrE[i] = [];
        for(let j = 0; j < getNumObs(); j++){
            arrE[i].push(parseFloat(prompt(`Enter Emmision Probability from ${arrH[i]} to ${arrO[j]}`)))
        }
    }

    console.log(arrE)
}




function displayHiddenStates() {
    let HidList = document.getElementById("HidS");
    HidList.innerHTML = ""; 

    arr1.forEach(val => {
        HidList.innerHTML += `<li>${val}</li>`;
    });
}

function displayObservations() {
    let ObsList = document.getElementById("Obs");
    ObsList.innerHTML = ""; 

    arr2.forEach(val => {
        ObsList.innerHTML += `<li>${val}</li>`;
    });
}

function displayObsSequence(){
    let ObsSeqList = document.getElementById("ObsSeq");
    ObsSeqList.innerHTML = "";

    ObsSeqList.textContent = arrL.join(" -> ")
}

function displayTransProb(){
  

    const table = document.getElementById("matrixT");

    // Create header row
    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th")); // empty corner cell

    arr1.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Create data rows
    arrT.forEach((row, i) => {
        const tr = document.createElement("tr");

        // Row header
        const rowHeader = document.createElement("th");
        rowHeader.textContent = arr1[i];
        tr.appendChild(rowHeader);

        // Matrix values
        row.forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

function displayEmmiProb(){
    const table = document.getElementById("matrixE");

    // Create header row
    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th")); // empty corner cell

    arr2.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Create data rows
    arrE.forEach((row, i) => {
        const tr = document.createElement("tr");

        // Row header
        const rowHeader = document.createElement("th");
        rowHeader.textContent = arr1[i];
        tr.appendChild(rowHeader);

        // Matrix values
        row.forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

function findProb(){

    for(let i = 0; i < arr1.length; i++){
        arrTemp[i] = [];
    }

    for(let j = 0; j < arrL.length; j++){
        for(let i = 0; i < arr1.length; i++){

            if(j == 0){
                let idx = arr2.indexOf(arrL[j])
                res = arrI[i]*arrE[i][idx]
                arrTemp[i].push(res)
            }
            else{
                let res = 0
                let idx2 = arr2.indexOf(arrL[j])

                for(let x = 0; x < arr1.length; x++){
                    res += arrTemp[x][j-1]*arrT[x][i]*arrE[i][idx2]
                }
                arrTemp[i].push(res)
            }
        }
    }

    let likelihood = 0;
    for(let i = 0; i < arr1.length; i++){
        likelihood += arrTemp[i][arrTemp[i].length-1]
    }

    document.getElementById("res").innerHTML = likelihood;
}


// ================= Keyword Extraction Agent =================

let geminiApiKey = "";

function saveApiKey() {
    const apiKeyInput = document.getElementById("geminiApiKey");
    geminiApiKey = apiKeyInput.value.trim();
    
    if (geminiApiKey) {
        // Store in sessionStorage for the current session
        sessionStorage.setItem("geminiApiKey", geminiApiKey);
        updateStatus("API Key saved successfully!", "success");
        apiKeyInput.value = ""; // Clear the input for security
    } else {
        updateStatus("Please enter a valid API key", "error");
    }
}

function updateStatus(message, type) {
    const statusElement = document.getElementById("extractionStatus");
    statusElement.textContent = message;
    statusElement.className = "status-message " + type;
    
    // Clear status after 5 seconds
    setTimeout(() => {
        statusElement.textContent = "";
        statusElement.className = "status-message";
    }, 5000);
}

async function extractKeywords() {
    const inputText = document.getElementById("inputText").value.trim();
    const resultsDiv = document.getElementById("keywordResults");
    
    // Retrieve API key from session storage if not already loaded
    if (!geminiApiKey) {
        geminiApiKey = sessionStorage.getItem("geminiApiKey") || "";
    }
    
    // Validation
    if (!geminiApiKey) {
        updateStatus("Please enter and save your Gemini API key first", "error");
        return;
    }
    
    if (!inputText) {
        updateStatus("Please enter some text to extract keywords from", "error");
        return;
    }
    
    // Show loading state
    updateStatus("Extracting keywords...", "info");
    resultsDiv.innerHTML = "<p>Processing...</p>";
    
    try {
        // Call Google Gemini API
        const keywords = await callGeminiAPI(inputText);
        
        // Display results
        displayKeywords(keywords);
        updateStatus("Keywords extracted successfully!", "success");
        
    } catch (error) {
        console.error("Error extracting keywords:", error);
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        updateStatus("Failed to extract keywords. Check your API key and try again.", "error");
    }
}

async function callGeminiAPI(text) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;
    
    const prompt = `Extract the most important keywords from the following text. Return only the keywords as a comma-separated list, with no additional explanation or formatting:\n\n${text}`;
    
    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract the generated text from the response
    if (data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;
        return parseKeywords(generatedText);
    } else {
        throw new Error("No response from Gemini API");
    }
}

function parseKeywords(text) {
    // Split by comma and clean up
    const keywords = text.split(',')
        .map(kw => kw.trim())
        .filter(kw => kw.length > 0);
    
    return keywords;
}

function displayKeywords(keywords) {
    const resultsDiv = document.getElementById("keywordResults");
    
    if (keywords.length === 0) {
        resultsDiv.innerHTML = "<p>No keywords found</p>";
        return;
    }
    
    // Create a styled list of keywords
    let html = '<div class="keywords-container">';
    keywords.forEach(keyword => {
        html += `<span class="keyword-tag">${keyword}</span>`;
    });
    html += '</div>';
    
    resultsDiv.innerHTML = html;
}

// Load API key on page load if it exists in session
window.addEventListener('DOMContentLoaded', () => {
    const savedKey = sessionStorage.getItem("geminiApiKey");
    if (savedKey) {
        geminiApiKey = savedKey;
        updateStatus("API Key loaded from session", "success");
    }
});