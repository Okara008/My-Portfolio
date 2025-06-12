const cards = Array.from(document.querySelectorAll(".cards"));
const mainGame = document.querySelector("main");
let isRunning = false;
let canTurn = false;
let cardsImg, numOfCards, isTurned, isWon, countTurn, pick, discardedImg, index, elapsedTime, numOfTurns = 0;

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
    alert("Game Has Begun")
    cardsImg = getImages()
    elapsedTime = Date.now();
    isRunning = true;
    mainGame.className = "active"
    cards.forEach(element => { 
        element.classList.add("activeCards");
        element.classList.remove("disabledCards");
    })
    canTurn = true;
}

function getImages() {
    cardsImg = ["card1.jpg", "card2.jpeg", "card3.jpeg", "card4.jpeg", "card5.jpg", "card6.jpg", "card7.png", 
        "card8.png", "card9.png", "card10.png", "card11.png", "card12.png", "card13.jpg"]
    numOfCards = cards.length / 2;
    discardedImg = [];
    cardsImg = shuffleCards(cardsImg);
    
    for (let i = numOfCards; i < cardsImg.length; i++) {
        discardedImg.push(cardsImg[i])
    }
    
    for (let i = 0; i < discardedImg.length; i++){
        cardsImg.pop(discardedImg[i])
    }

    cardsImg.push(...cardsImg);
    cardsImg = shuffleCards(cardsImg);
    isTurned = new Array(numOfCards*2).fill(false);
    isWon = new Array(numOfCards*2).fill(false);
    pick = [];
    return cardsImg;
}

cards.forEach(element => {
    element.addEventListener("click", (e) => {
        if (!element.classList.contains("disabledCards") && !element.style.backgroundImage && canTurn) {
            numOfTurns++;
            countTurn = 0;
            
            index = Array.from(e.target.parentNode.children).indexOf(e.target);
            if (isRunning && countTurn <= 2 && !isWon[index]) {
                element.style.backgroundImage = `url(../../img/${cardsImg[index]})` 
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
                    setTimeout((flipBack => {
                        alert(`Turns Taken: ${numOfTurns} \nMinimum Turns: ${numOfCards*2}\nTotal Time: ${elapsedTime} seconds`)
                    }), 1000);
                }
            }
        }
    })
})

function flipBack() {
    for (let i = 0; i < 2; i++) {
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
        mainGame.className = "disabled";
        cards.forEach(element => { 
            element.classList.remove("activeCards");
            element.classList.add("disabledCards");
            element.style.backgroundImage = ``;
        })

    }
}