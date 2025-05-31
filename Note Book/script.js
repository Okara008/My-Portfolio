const section = document.querySelector("section");
const textarea = document.querySelector("textarea");
const fileRetrieveContainer = document.querySelector(".fileRetrieve");
const applyEditBtn = document.querySelectorAll(".applyEdit");
const radioCasing = document.querySelectorAll(".radioCasing");
const radioBold = document.querySelectorAll(".radioBold");
const radioFamily = document.querySelectorAll(".radioFamily");
const deleteImgs = Array.from(document.querySelectorAll(".deleteImg"));
const editNav = Array.from(document.querySelectorAll(".editNav"));
const Xbad = Array.from(document.querySelectorAll(".Xbad"));
const editAside = Array.from(document.querySelectorAll(".editAside"));
const fontSize = document.getElementById("fontSize");
const asideNav = Array.from(document.querySelectorAll(".editDetails"));
const menuImg = document.getElementById("menuImg");
const fontColor = document.getElementById("fontColor");
let isNamed = false;
let allFiles = addFile();
const documentTitle = document.getElementById("title");
const mainBtns = document.querySelector(".Btns")

let storeFontSize = `16px`;
let storeColor = "#000080";
let storeCasing = "none";
let storeBold = 400;
let documentName;
let storeFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

window.onbeforeunload = ()=>{
    if (textarea.value) {
        return ""
    }
}

function clearAside() {
    let visibleAsides = Array.from(document.querySelectorAll(".showSection"));
    visibleAsides.forEach(element => {
        element.classList.remove("showSection");
    })
}

function newFunc() {
    if (confirm("Save Changes or Press Cancel to Continue")) {
        saveFunc();
    }
    else {
        textarea.value = "";
        textarea.style.fontSize = storeFontSize;
        textarea.style.textTransform = storeCasing;
        textarea.style.fontWeight = storeBold;
        textarea.style.color = storeColor;
        documentTitle.textContent = "untitled";
        documentName = "";
        isNamed = false;
    }
}

function openFunc() {
    clearAside();
    fileRetrieveContainer.classList.add("showSection");
}

function saveFunc() {
    let isExisting;
    if (!isNamed) {
        do {
            isExisting = false;
            documentName = prompt("What is the title of the document:");

            if (allFiles) {
                for (let i = 0; i < allFiles.length; i++) {
                    const element = allFiles[i];
                    if (element == documentName) {
                        alert("NAME IN USE")
                        isExisting = true;
                        break;
                    }
                }
            }
        } while (isExisting);
    }

    if (!isNamed && documentName) {
        documentTitle.textContent = documentName;
        allFiles.push(documentName);
        createFileELements(documentName);
    }

    if (documentName) {

        isNamed = true;
        
        let documentProp = {
            title: documentName,
            content: textarea.value,
            size: storeFontSize,
            casing: storeCasing,
            color: storeColor,
            bold: storeBold,
            family: storeFamily,
        }
        
        createCookie(documentName, documentProp)
        createCookie("allFiles", allFiles)
    }
    else {
        alert("Document Not Saved")
    }
}

function editFunc() {
    clearAside();
    section.classList.add("showSection");
}

function addListeners() {
    editNav.forEach(element => {
        element.addEventListener("click", (e) => {
            clearAside();
            let index = editNav.indexOf(element);
            editAside[index].classList.add("showSection");
            section.classList.remove("showSection");
        })
    });

    Xbad.forEach(element=> {
        element.addEventListener("click", (e) => { 
            const parent = e.target.offsetParent;
            parent.classList.toggle("showSection");
        })
    })

    applyEditBtn[0].addEventListener("click", (e) => {
        let value = Number(fontSize.value);
        if (value) {
            textarea.style.fontSize = `${value}px`;
        }
        fontSize.value = null;
        storeFontSize = `${value}px`;
    })
    
    applyEditBtn[1].addEventListener("click", (e) => {    
        for (let i = 0; i < radioCasing.length; i++) {
            const element = radioCasing[i];
            if (element.checked) {
                textarea.style.textTransform = element.value
                storeCasing = element.value;
            }    
        }
    })
    
    applyEditBtn[2].addEventListener("click", (e) => {    
        let value = fontColor.value;
        textarea.style.color = `${value}`;
        storeColor = value
    })

    applyEditBtn[3].addEventListener("click", (e) => {    
        for (let i = 0; i < radioBold.length; i++) {
            const element = radioBold[i];
            if (element.checked) {
                textarea.style.fontWeight = element.value
                storeBold = element.value
            }    
        }
    })

    applyEditBtn[4].addEventListener("click", (e) => {    
        for (let i = 0; i < radioFamily.length; i++) {
            const element = radioFamily[i];
            if (element.checked) {
                textarea.style.fontFamily = element.value
                storeFamily = element.value
            }    
        }
    })

}
addListeners();

function createCookie(documentName, documentProp) {
    let documentPropString = JSON.stringify(documentProp);

    localStorage.setItem(`${documentName}` ,`${documentPropString}`);
}

function deleteCookie(documentName) {
    localStorage.removeItem(documentName);   
}

function addFile() {
    let fileArray = localStorage.getItem("allFiles");
    if (!fileArray) {
        return []
    }
    else {            
        fileArray = JSON.parse(fileArray);
        for (let i = 0; i < fileArray.length; i++) {
            const element = fileArray[i];
            createFileELements(element)
        }
        return fileArray;
    }
}

function createFileELements(documentName) {
    let fileElements = document.createElement("div");
    fileElements.classList.add("fileNames");
    fileElements.textContent = documentName;
    fileRetrieveContainer.append(fileElements);
    fileElements.addEventListener("click", (e) => {
        getObjectCookie(documentName)
    })
    
    let deleteImg = document.createElement("img");
    deleteImg.src = "delete.svg";
    deleteImg.addEventListener("click", (e) => {
        const parent = e.target.offsetParent;
        function removeElements(element){
            return element != parent.textContent
        }

        fileRetrieveContainer.removeChild(parent);
        allFiles = allFiles.filter(removeElements);
        createCookie("allFiles", allFiles);
        deleteCookie(parent.textContent);
    })
    fileElements.append(deleteImg);
}

function getObjectCookie(documentname) {
    let documentProp = localStorage.getItem(documentname) 
    documentProp = JSON.parse(documentProp);
    let {title, content, size, color, bold, family, casing } = documentProp;
    documentName = title;
    documentTitle.textContent = title;
    textarea.value = content;
    textarea.style.fontSize = size;
    textarea.style.color = color;
    textarea.style.fontWeight = bold;
    textarea.style.fontFamily = family;
    textarea.style.textTransform = casing;
    isNamed = true;
}

menuImg.addEventListener("click", () => {
    mainBtns.classList.toggle("visibleBtns")
})
