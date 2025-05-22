const AddRemoveBtns = document.querySelectorAll(".AddRemoveBtns");
const amountContainer = document.querySelector(".amountContainer");
const labelAddRemove = document.querySelector(".labelAddRemove");
const amountInput = document.querySelector("#amountInput");
const addItemBtn = document.getElementById("editBtn");
const printBtn = document.getElementById("printBtn");
const inputElement = document.getElementById("inputElement");
const addContainer = document.querySelector(".addContainer");
const tableContent = document.getElementById("tableContent");
let recomendations;
let totalSum = 0;
let itemNum = 0;
let index;

const products = ["DANO MILK", "DANGOTE SUGAR", "IJEBU GARRI", "NIBBLES BREAD", "ORAL-B TOOTHPASTE", "CASIO CALCULATOR"]
const prices = [150, 750, 1500, 2000, 1700, 11000]

AddRemoveBtns.forEach(button => {
    button.addEventListener("click", () => {
        index = Array.from(AddRemoveBtns).indexOf(button);

        if (!button.className.includes("Checked")) {
            for (let i = 0; i < AddRemoveBtns.length; i++) {
                const element = AddRemoveBtns[i];
                element.classList.toggle("Checked")
            }
    
            if (button.textContent == "+") {
                labelAddRemove.textContent = "ADD:"
                amountContainer.style.visibility = "visible"   
                addItemBtn.textContent = "ADD"         
            }
            else {
                labelAddRemove.textContent = "Delete:"
                amountContainer.style.visibility = "hidden"
                amountContainer.style.transition = "all 100ms ease-out"
                addItemBtn.textContent = "DELETE"            
            }
        }
    })
})

inputElement.addEventListener("keyup", event => {
    let inputValue = inputElement.value.toUpperCase();
    let recomendationsElements = [];
    
    if (!recomendations) {        
        recomendations = document.createElement("div");
        recomendations.classList.add("recomendations");
        addContainer.append(recomendations);
    }

    while (recomendations.firstChild != null) {
        recomendations.removeChild(recomendations.firstChild);
    }

    for (let i = 0; i < products.length; i++) {
        const element = products[i];

        if (element.match(inputValue)) {
            recomendations.style.visibility = "visible"
        
            recomendationsElements[i] = document.createElement("div");
            recomendationsElements[i].textContent = element;
            recomendationsElements[i].style.cursor = "pointer";
            recomendationsElements[i].addEventListener("click", e => {
                inputElement.value = element;
                recomendations.style.visibility = "hidden"
            })
            recomendations.appendChild(recomendationsElements[i]); 
        }        
    }    
})

addItemBtn.addEventListener("click", () => {
    let inputValue = inputElement.value.toUpperCase();
    checkInput(inputValue)
})

function createRow(itemName, numOfItems, index) {
    let tableRow = document.createElement("tr");
    itemNum++;
    tableContent.append(tableRow);

    let snOutput = document.createElement("td");
    snOutput.textContent = itemNum;
    tableRow.append(snOutput);

    let nameOutput = document.createElement("td");
    nameOutput.textContent = itemName;
    nameOutput.classList.add("itemName")
    tableRow.append(nameOutput);

    let pricesOutput = document.createElement("td");
    pricesOutput.textContent = `₦${(prices[index])}`;
    tableRow.append(pricesOutput);

    let numOfItemsOutput = document.createElement("td");
    numOfItems = Number(numOfItems);
    numOfItemsOutput.textContent = numOfItems;
    tableRow.append(numOfItemsOutput);

    let totalAmountOutput = document.createElement("td");
    totalAmountOutput.textContent = `₦${(prices[index] * numOfItems)}`;
    tableRow.append(totalAmountOutput);
}

function deleteRow(index) {
    tableContent.removeChild(tableContent.children[index]);
}

function checkInput(inputValue) {
    let index;
    let isMatched = false;
    let isaNumber = false;

    for (let i = 0; i < products.length; i++) {
        if (inputValue == products[i]) { 
            isMatched = true;
            index = i;
            break;
        }            
    }    
    if (!isMatched) {
        window.alert("Invalid Name!!!!!");
    }

    let amountValue = Number(amountInput.value);
    
    if (isNaN(amountValue) || amountValue < 1 && amountValue) {
        window.alert("Invalid Number!!!!!");
    }
    else {
        isaNumber = true;
        amountValue = Math.floor(amountValue);
    }
    
    if (addItemBtn.textContent == "ADD" && isaNumber && isMatched) {
        let row = document.querySelectorAll("tr");

        for (let i = 0; i < row.length; i++) { 
            if (row[i].children[1].textContent == inputElement.value) {
                isMatched = false;
                break;
            }
        }    
        if (isMatched) {
            recomendations.style.visibility = "hidden"
            createRow(inputValue, amountValue, index);
        }
        else{
            window.alert("Item is already inputed");
        }
            
    }
    else if (addItemBtn.textContent == "DELETE" && isaNumber && isMatched) { 
        isMatched = false;
        let row = document.getElementsByTagName("tr");
        for (let i = 1; i < row.length; i++) {
            const element = row[i].children[1].textContent;
            if (element == inputValue) {
                deleteRow(i - 1);
                isMatched = true
                break;
            }
        }
        if (!isMatched) {
            window.alert("Invalid Name!!!!!");
        }

        row = document.getElementsByTagName("tr");
        for (let i = 1; i < row.length; i++){            
            row[i].children[0].textContent = i;
            itemNum = i;
        }
    }

    inputElement.value = "";
    amountInput.value = '';
}

printBtn.addEventListener("click", () => {
    let row = document.getElementsByTagName("tr");
    let name = [];
    let amount = [];
    let numOfItems = [];
    let totalAmount = [];

    for (let i = 1; i < row.length; i++) {
        name[i-1] = row[i].children[1].textContent;
    }
    for (let i = 1; i < row.length; i++) {
        amount[i-1] = row[i].children[2].textContent;
    }
    for (let i = 1; i < row.length; i++) {
        numOfItems[i-1] = row[i].children[3].textContent;
    }
    for (let i = 1; i < row.length; i++) {
        totalAmount[i-1] = row[i].children[4].textContent;
    }

    for (let i = 0; i < totalAmount.length; i++) {
        const element = Number(totalAmount[i].slice(1));
        totalSum += element;
    }
    
    name = JSON.stringify(name);
    amount = JSON.stringify(amount);
    numOfItems = JSON.stringify(numOfItems);
    totalAmount = JSON.stringify(totalAmount);
    
    window.sessionStorage.setItem("Name", name);
    window.sessionStorage.setItem("amount", amount);
    window.sessionStorage.setItem("numOfItems", numOfItems);
    window.sessionStorage.setItem("totalAmount", totalAmount);
    window.sessionStorage.setItem("totalSum", totalSum);
    
    if (row[1]) {
        window.location.href = "receipt.html";
    }    
})