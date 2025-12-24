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