const InputItem = document.getElementById("InputItem");
const addBtn = document.getElementById("addBtn");

const itemsContainers = document.getElementsByClassName("itemsContainer");
const itemlistContainer = document.getElementsByClassName("itemlistContainer");
const items = document.getElementsByClassName("items");
const deleteItem = document.getElementsByClassName("deleteItem");
const appendElement = document.querySelector("section");

let listContent;
let isChecked = [];
let listItems = [];
let containClass;

function addItem(textcontent) {
    const itemsContain = document.createElement("div");
    itemsContain.classList.add("itemsContainer");
    appendElement.append(itemsContain);

    const newUL = document.createElement("ul");
    newUL.classList.add("itemlistContainer");
    itemsContain.append(newUL);

    const newListItems = document.createElement("li");
    newListItems.textContent = textcontent;
    newListItems.classList.add("items");
    newUL.append(newListItems);

    newListItems.addEventListener("click", () => {
        newListItems.classList.toggle("itemChecked")
    })

    const deleteImage = document.createElement("img");
    deleteImage.src = "delete.svg";
    deleteImage.classList.add("deleteItem");
    deleteImage.alt = "delete"
    itemsContain.append(deleteImage);

    deleteImage.addEventListener("click", () => {
        let index = Array.from(deleteItem).indexOf(deleteImage)
        appendElement.removeChild(itemsContainers[index]);
        collectListItems()
    })

    collectListItems()
}

addBtn.addEventListener("click", () => {
    listContent = InputItem.value;
    listContent = listContent.trim();

    if (listContent) {
        addItem(listContent)
    }
    
    InputItem.value = "";
})

addEventListener("keydown", event => {
    if (event.key == "Enter") {
        
        listContent = InputItem.value;
        listContent = listContent.trim();
    
        if (listContent) {
            addItem(listContent)
        }
        
        InputItem.value = "";
    }
})

function clearResults() {
    function isToDoItem(element) {
        return element.startsWith("item") || element.startsWith("checked");
    }

    const cDecode = decodeURIComponent(document.cookie);
    let cArray = cDecode.split("; ")

    let filterArray = cArray.filter(isToDoItem);

    function makeCookie(name, value, DaysTOLive) {
        const date = new Date();
        date.setTime(date.getTime() + (DaysTOLive * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`
    }

    for (let i = 0; i < filterArray.length; i++) {
        makeCookie(`item${i}`, null, null)        
        makeCookie(`checked${i}`, null, null)        
    }
    
}

function collectListItems() {
    const allListitem = document.querySelectorAll(".items");

    isChecked = [];

    allListitem.forEach(element => {
        if (element.classList.contains("itemChecked")) {
            containClass = 1;           
        }
        else {
            containClass = 0;           
        }

        isChecked.push(containClass)
    })    

    listItems = [];

    allListitem.forEach(listitem => {
        listItems.push(listitem.textContent)
    });

    let listObject = {
        listItems: listItems,
        isChecked: isChecked
    }

    return listObject
}

function saveList(DaysTOLive) {
    clearResults()

    let dataObject = collectListItems();

    let dataArray = dataObject.listItems;
    let IndexArray = dataObject.isChecked;

    for (let index = 0; index < dataArray.length; index++) {
        const element = dataArray[index];
        const isChecked = IndexArray[index];

        const date = new Date();
        date.setTime(date.getTime() + (DaysTOLive * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();

        document.cookie = `item${index}=${element}; ${expires} path=/`;
        document.cookie = `checked${index}=${isChecked}; ${expires} path=/`;        
    }    
}

function openList() {
    const itemsContainerw = document.querySelectorAll(".itemsContainer");
    const section = document.querySelector("section");

    itemsContainerw.forEach(element => {
        section.removeChild(element)
    });

    console.log(itemsContainerw);
    

    function isToDoItem(element) {
        return element.startsWith("item");
    }

    function isStrikeIndex(element) {
        return element.startsWith("checked");
    }

    const cDecode = decodeURIComponent(document.cookie);
    let cArray = cDecode.split("; ")

    let filterArray = cArray.filter(isToDoItem);
    let filterIndex = cArray.filter(isStrikeIndex);

    let listTextContent = [];
    let listStrikeIndex = [];

    for (let i = 0; i < filterArray.length; i++) {
        let element = filterArray[i];
        let elementindex = filterArray[i].indexOf("=");

        let isChecked = filterIndex[i]
        let checkedindex = filterIndex[i].indexOf("=");

        element = element.substring(elementindex + 1);
        isChecked = isChecked.substring(checkedindex + 1);

        listTextContent.push(element);
        listStrikeIndex.push(isChecked);
    }

    for (let i = 0; i < listTextContent.length; i++) { 
        addItem(listTextContent[i]);

        const newListItems = document.querySelectorAll("li");
        
        if (listStrikeIndex[i] == 1) {
            newListItems[i].classList.add("itemChecked")
        } 
    }
}