const mainGame = document.querySelector("main");
let isRunning = false, canTurn = false, hasStarted = false, numOfCards = 15; //hasStarted == false!!!!
const messageSpan = document.getElementById("message");
let cards = [], cardsImg, isTurned, isWon = [], countTurn, pick, discardedImg, index, elapsedTime, numOfTurns = 0;

function createCards(numOfCards) {
    clearCards();
    for (let i = 0; i < numOfCards; i++) {
        let card = document.createElement("div");
        card.classList.add("activeCards")
        card.classList.add("cards");
        mainGame.append(card);
        cards.push(card)
    }
}

function clearCards() {
    let element = document.getElementsByClassName("cards");
    let size = element.length, i = 0;
    cards = [];
    messageSpan.style.visibility = "hidden"
    while (element) {
        i++;
        if (i > size) {
            break;
        }
        mainGame.removeChild(element[element.length-1]);
    }
}

function checkCards(img) {
    createCards(numOfCards);
    
    for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        element.style.backgroundImage = `url(${img[i]})`;
    }
}

function shuffleCards(cards) {
    let temp, j;

    for (let i = 0; i < cards.length; i++) {
        j = Math.floor(Math.random() * cards.length);
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}

function startGame() {
    isTurned = new Array(numOfCards*2).fill(false);
    isWon = new Array(numOfCards*2).fill(false);
    if (!isRunning) {
        if (!hasStarted) {
            
            cardsImg = getImages()
            checkCards(cardsImg)
            cardsImg = getFullImg(cardsImg)
            messageSpan.style.visibility = "visible"
            hasStarted = true
        }
        
        else {
            createCards(numOfCards * 2);
            for (let i = 0; i < cardsImg.length; i++) {
                const element = document.getElementsByClassName("cards")[i];
                element.style.backgroundImage =  `url(${cardsImg[i]})`
            }
            
            setTimeout(() => {
                console.log(cardsImg);
                
                for (let i = 0; i < cardsImg.length; i++) {
                    const element = document.getElementsByClassName("cards")[i];
                    element.style.backgroundImage =  ``
                }
                giveEvent()
                
                messageSpan.style.visibility = "hidden"
                elapsedTime = Date.now();
                isRunning = true;
                
                cards.forEach(element => { 
                    element.classList.add("activeCards");
                    element.classList.remove("disabledCards");
                })
                canTurn = true;
            }, 10000);
        }
    }
}
startGame()

function getImages() {
    cardsImg = ["card1.jpg", "card2.jpeg", "card3.jpeg", "card4.jpeg", "card5.jpg", "card6.jpg", "card7.png", "card8.png",
        "card9.png", "card10.png", "card11.png", "card12.png", "card13.jpg", "card14.jpg", "card15.jpg", "card16.jpg",
        "card17.jpg", "card18.jpg", "card19.jpg", "card20.jpg"]
    discardedImg = [];
    cardsImg = shuffleCards(cardsImg);
    
    for (let i = numOfCards; i < cardsImg.length; i++) {
        discardedImg.push(cardsImg[i])
    }
    
    for (let i = 0; i < discardedImg.length; i++){
        cardsImg.pop(discardedImg[i])
    }
    return cardsImg;
}

function getFullImg(cardsImg) {
    cardsImg.push(...cardsImg);
    cardsImg = shuffleCards(cardsImg);
    pick = [];
    return cardsImg;
}

function giveEvent() {
    cards.forEach(element => {
        element.addEventListener("click", (e) => {
            if (!element.classList.contains("disabledCards") && !element.style.backgroundImage && canTurn) {
                numOfTurns++;
                countTurn = 0;
            
                index = Array.from(e.target.parentNode.children).indexOf(e.target)-1;
                if (isRunning && countTurn <= 2 && !isWon[index]) {
                    element.style.backgroundImage = `url(${cardsImg[index]})`
                    isTurned[index] = true;
                    pick.push(index)
                }
                
                for (let i = 0; i < isTurned.length; i++) {
                    const element = isTurned[i];
                    if (element) {
                        countTurn += 1;
                    }
                }
            
                if (countTurn == 2) {
                    canTurn = false;
                    isTurned = new Array(numOfCards * 2).fill(false);
                
                    if (!checkWin(pick)) {
                        setTimeout(flipBack, 500);
                    }
                    else {
                        canTurn = true;
                    }
                    if (!document.querySelector(".activeCards")) {
                        elapsedTime = ((Date.now() - elapsedTime - 1000) / 1000).toFixed(1);
                        setTimeout((() => {
                            alert(`Turns Taken: ${numOfTurns} \nMinimum Turns: ${numOfCards * 2}\nTotal Time: ${elapsedTime} seconds`);
                            numOfTurns = 0;
                        }), 500);
                    }
                }
            }
        })
    })
}

function flipBack() {    
    for (let i = 0; i < pick.length; i++) {
        cards[pick[i]].style.backgroundImage = `` 
    }
    pick = [];
    canTurn = true;
}

function checkWin(array) {
    if (cardsImg[array[0]] == cardsImg[array[1]]) {
        for (let i = 0; i < 2; i++) {
            isWon[array[i]] = true;
            cards[array[i]].classList.add("disabledCards")
            cards[array[i]].classList.remove("activeCards")
        }
        pick = []
        return true;
    }
    else {
        return false;
    }
}

function restartGame() {
    if (confirm("Are you sure you want to restart")) {
        isRunning = false;
        elapsedTime = 0;
        hasStarted = false;
        startGame()
    }
}
