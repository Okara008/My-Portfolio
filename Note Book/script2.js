const Xbad = Array.from(document.querySelectorAll(".Xbad"));
const fileRetrieveContainer = document.querySelector(".fileRetrieve");
let noteContentContainer = document.getElementById("noteContent");
let documentTitle = document.getElementById("title");
const menuImg = document.getElementById("menuImg");
const mainBtns = document.querySelector(".Btns");
createFileELements();

function createFileELements() {
    let fileNames = JSON.parse(localStorage.getItem("allFiles"));

    for (let i = 0; i < fileNames.length; i++){
        let fileElements = document.createElement("div");
        fileElements.classList.add("fileNames");
        fileElements.textContent = fileNames[i];
        
        fileRetrieveContainer.append(fileElements);
        fileElements.addEventListener("click", (e) => {
            getObjectCookie(fileNames[i])
        })
        
        let deleteImg = document.createElement("img");
        deleteImg.src = "delete.svg";
        deleteImg.addEventListener("click", (e) => {
            const parent = e.target.offsetParent;
            function removeElements(element){
                return element != parent.textContent
            }
    
            fileRetrieveContainer.removeChild(parent);
            fileNames = fileNames.filter(removeElements);
            createCookie("allFiles", fileNames);
            deleteCookie(parent.textContent);
        })
        fileElements.append(deleteImg);
    }
    
}

function getObjectCookie(documentname) {
    let documentProp = localStorage.getItem(documentname) 
    documentProp = JSON.parse(documentProp);
    let {title, content, size, color, bold, family, casing} = documentProp;
    documentTitle.textContent = title;
    
    showEditedNotes(content);
    noteContentContainer.style.fontSize = size;
    noteContentContainer.style.color = color;
    noteContentContainer.style.fontWeight = bold;
    noteContentContainer.style.fontFamily = family;
    noteContentContainer.style.textTransform = casing;
}

function openFunc() {
    fileRetrieveContainer.classList.add("showSection");
}

function showEditedNotes(text) {
    let startIndex, endIndex, beforeText, afterText, mainText, mainHTML;
    noteContentContainer.innerHTML = text;
    while (text.includes("/*") && text.includes("*/")) {
        startIndex = text.indexOf("/*") ;
        endIndex = text.indexOf("*/") + 2;
    
        mainText = text.slice(startIndex + 2, endIndex - 2);
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<span style="font-weight: bold;">${mainText}</span>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }
    
    while (text.includes("#*") && text.includes("*#")) {
        startIndex = text.indexOf("#*") ;
        endIndex = text.indexOf("*#") + 2;
    
        mainText = text.slice(startIndex + 2, endIndex - 2);
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<h2>${mainText}</h2>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }
    
    while (text.includes("*_") && text.includes("_*")) {
        startIndex = text.indexOf("_*") ;
        endIndex = text.indexOf("*_") + 2;
    
        mainText = text.slice(startIndex + 2, endIndex - 2);
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<span style="text-decoration: underline;">${mainText}</span>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }
    
    while (text.includes("[*") && text.includes("*]")) {
        startIndex = text.indexOf("[*") ;
        endIndex = text.indexOf("*]") + 2;
    
        mainText = text.slice(startIndex + 2, endIndex - 2);
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<span style="font-style: italic;">${mainText}</span>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }
    
    /*while (text.includes("(*") && text.includes("*)")) {
        startIndex = text.indexOf("(*") ;
        endIndex = text.indexOf("*)") + 2;
    
        mainText = text.slice(startIndex + 2, endIndex - 2);
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<span style="display: block;">${mainText}</span>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }*/
    
    while (text.includes("**")) {
        startIndex = text.indexOf("**") ;
        endIndex = text.indexOf("**") + 2;
    
        beforeText = text.slice(0, startIndex)
        afterText = text.slice(endIndex)
        mainHTML = `<br>`
        text = beforeText + " " + mainHTML + " " + afterText;
        noteContentContainer.innerHTML = text;
    }
    console.log();

    console.log(noteContentContainer);
    
}

Xbad.forEach(element=> {
    element.addEventListener("click", (e) => { 
        const parent = e.target.offsetParent;
        parent.classList.toggle("showSection");
    })
})

function createCookie(documentName, documentProp) {
    let documentPropString = JSON.stringify(documentProp);

    localStorage.setItem(`${documentName}` ,`${documentPropString}`);
}

function deleteCookie(documentName) {
    localStorage.removeItem(documentName);   
}

menuImg.addEventListener("click", () => {
    mainBtns.classList.toggle("visibleBtns")
})
