let lines = [];
lines[0] = document.querySelector(".section");

let numberOfEntries;
let degree = 0;
let nameInput = [];
let valueInput = [];
let valueDeg = [];
let colors = [];
let colorstyle = [];
let total = 0;
let detailsOutput;
let colorOutput;
let nameOutput;
let degreeOutput;

const heading = document.createElement("h1");
let nameOfHeading;

do {
    nameOfHeading = window.prompt("What is the title?")
    
    if (nameOfHeading == null || nameOfHeading == '') {
        window.alert("Invalid Input!!!")
    }
} while (nameOfHeading == null || nameOfHeading == '');

console.log(nameOfHeading);

heading.textContent = nameOfHeading;
document.body.prepend(heading);

const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const centre = document.createElement("div");
centre.classList.add("centre");
container.append(centre);

const detailContainer = document.createElement("div");
detailContainer.classList.add("detailContainer");
document.body.append(detailContainer);

do {
    numberOfEntries = window.prompt("How many entries are they?")
    
    if (isNaN(numberOfEntries) || numberOfEntries == null || numberOfEntries == '') {
        window.alert("Invalid Input!!!")
    }
} while (isNaN(numberOfEntries) || numberOfEntries == null || numberOfEntries == '');
Number(numberOfEntries)

for (let i = 0; i < numberOfEntries; i++){
    do {
        nameInput[i] = window.prompt(`What is name ${i+1}?`)
        
        if (nameInput[i] == null || nameInput[i] == '') {
            window.alert("Invalid Input!!!")
        }
    } while (nameInput[i] == null || nameInput[i] == '');

    do {
        valueInput[i] = window.prompt(`What is the value?`)
        
        if (isNaN(valueInput[i]) || valueInput[i] == null || valueInput[i] == '') {
            window.alert("Invalid Input!!!")
        }
    } while (isNaN(valueInput[i]) || valueInput[i] == null || valueInput[i] == '');    
    nameInput[i]
    valueInput[i] = Number(valueInput[i]);
}


console.log(numberOfEntries);
console.log(nameInput);
console.log(valueInput);

// numberOfEntries = 6;
// nameInput = ["Chemistry", "Physics", "Biology", "Mathematics", "Computer", "English"];
// valueInput = [10, 50, 60, 52, 40, 39];
for (let i = 0; i < numberOfEntries; i++){
    total += valueInput[i];
}

for (let i = 0; i < numberOfEntries; i++) {
    valueDeg[i] = (valueInput[i] * 360) / total; 
}

for (let i = 0; i < (numberOfEntries); i++){
    colors[i] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        
    colorstyle[i] = `${colors[i]} ${degree}deg ${degree + valueDeg[i]}deg`;
        
    container.style.background = `conic-gradient(${colorstyle})`;
    
    degree = degree + valueDeg[i];

    detailsOutput = document.createElement("div");
    detailsOutput.classList.add("details");
    detailContainer.append(detailsOutput);

    colorOutput = document.createElement("div");
    colorOutput.classList.add("color");
    detailsOutput.append(colorOutput);
    colorOutput.style.backgroundColor = colors[i];

    nameOutput = document.createElement("div");
    nameOutput.classList.add("name");
    detailsOutput.append(nameOutput);
    nameOutput.textContent = nameInput[i];

    degreeOutput = document.createElement("div");
    degreeOutput.classList.add("degree");
    detailsOutput.append(degreeOutput);
    degreeOutput.textContent = `${valueDeg[i].toFixed(1)}⁰`;
}

