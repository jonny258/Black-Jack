const playerSection = document.querySelector(".player")
const dealerSection = document.querySelector(".dealer")
const dealerShowCard = document.querySelector(".dealerShowCard")
const dealerCoveredCard = document.querySelector(".dealerCoveredCard")
const playerCardOne = document.querySelector(".playerCardOne")
const playerCardTwo = document.querySelector(".playerCardTwo")

const betInput = document.querySelector("#betInput")
const betAmount = document.querySelector("#betAmount")

const dealerCurCount = document.querySelector("#dealerCurCount")
const playerCurCount = document.querySelector("#playerCurCount")

const hitButton = document.querySelector("#hitButton")
const standButton = document.querySelector("#standButton")
const splitButton= document.querySelector("#splitButton")
const doubleDownButton = document.querySelector("#doubleDownButton")

const submitButton = document.querySelector("#submitButton")
const chipCount = document.querySelector("#chipCount")
const winorloss = document.querySelector("#winorloss")


const possibleCards = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]

let dealCount = 0;
let playCount = 0;
let hitCount = 2;
let dealHitCount = 2;
P1 = playerCardOne.children[1].children[0];
P2 = playerCardTwo.children[1].children[0];
DS = dealerShowCard.children[1].children[0];
DC = dealerCoveredCard.children[1].children[0];


function endGame(){
    hitButton.style.display = "none"
    standButton.style.display = "none"
    splitButton.style.display = "none"
    doubleDownButton.style.display = "none"

    console.log(betInput.value)

    if(playCount > 21){
        winorloss.innerHTML = "You busted and lost " + betAmount.innerHTML + " chips"
    }
    else if(dealCount > 21){
        let chipAmount = Number(chipCount.innerHTML)
        console.log(chipAmount)
        let winAmount = (Number(betAmount.innerHTML) * 2)
        console.log(chipAmount+winAmount)
        winorloss.innerHTML = "Dealer busted you won " + betAmount.innerHTML + " chips"
        chipCount.innerHTML = chipAmount+winAmount
    }
    else if(playCount > dealCount){
        let chipAmount = Number(chipCount.innerHTML)
        console.log(chipAmount)
        let winAmount = (Number(betAmount.innerHTML) * 2)
        console.log(chipAmount+winAmount)
        winorloss.innerHTML = "You won " + betAmount.innerHTML + " chips"
        chipCount.innerHTML = chipAmount+winAmount
    }
    else if(playCount < dealCount){
        winorloss.innerHTML = "You lost " + betAmount.innerHTML + " chips"
    }else if(playCount === dealCount){
        let chipAmount = Number(chipCount.innerHTML)
        console.log(chipAmount)
        let winAmount = (Number(betAmount.innerHTML))
        console.log(chipAmount+winAmount)
        chipCount.innerHTML = chipAmount+winAmount
        winorloss.innerHTML = "Push"
    }
}


function hasBusted(count){
    if(count>21){
        console.log("BUSTED")
        hitButton.style.display = "none"
        DC.style.display = "block"
        endGame()
    }
}

function cardCount(card){
    let count= 0;
    if(card.textContent === "J" || card.textContent === "Q" || card.textContent === "K"){
        count += 10;
        //Make Ace 1 or 11
    }else if(card.textContent === "A"){
        count += 11;
    }else{
        count += Number(card.textContent);
    }
    return(count)
}


function betPlaced(){
    winorloss.innerHTML = ""
    chipCount.innerHTML = Number(chipCount.textContent) - betInput.value
    dealCount = 0;
    playCount = 0;
    hitCount = 2;
    betAmount.textContent = betInput.value
    hitButton.style.display = "inline-block"
    standButton.style.display = "inline-block"
    splitButton.style.display = "inline-block"
    doubleDownButton.style.display = "inline-block"
    for(let i=3; i<playerSection.children.length; i++){
        playerSection.children[i].style.display = "none"
    }
    for(let i=3; i<dealerSection.children.length; i++){
        dealerSection.children[i].style.display = "none"
    }

    P1.textContent = possibleCards[Math.floor(Math.random() * possibleCards.length)];
    P2.textContent = possibleCards[Math.floor(Math.random() * possibleCards.length)];
    DS.textContent = possibleCards[Math.floor(Math.random() * possibleCards.length)];
    DC.textContent = possibleCards[Math.floor(Math.random() * possibleCards.length)];

    console.log("this is the dealers cover card: " + dealerCoveredCard.children[1].children[0].textContent)
    DC.style.display = "none"

    playCount += cardCount(P1)
    playCount += cardCount(P2)
    dealCount += cardCount(DS)
    dealerCurCount.textContent = dealCount;
    playerCurCount.textContent = playCount;
}

function hit(){
    let hitCardParent = document.createElement("div")
    let hitCardTitle = document.createElement("div")
    let hitCardBody = document.createElement("div")
    let hitCardCardValue = document.createElement("h1")

    let cardVal = possibleCards[Math.floor(Math.random() * possibleCards.length)]
    hitCount++
    hitCardTitle.textContent = "PlayerCard " + hitCount;
    hitCardCardValue.textContent = cardVal;

    hitCardParent.className = "card text-white bg-secondary mb-3 p-2"
    hitCardParent.style = "max-width: 18rem; margin: 10px;"
    hitCardTitle.className = "card-header"
    hitCardBody.className = "card-body"
    hitCardTitle.className = "card-title"


    hitCardParent.append(hitCardTitle)
    hitCardParent.append(hitCardBody)
    hitCardBody.append(hitCardCardValue)
    playerSection.append(hitCardParent)

    playCount += cardCount(hitCardCardValue)
    playerCurCount.textContent = playCount;
    hasBusted(playCount)
}

function dealHit(){
    let dealHitCardParent = document.createElement("div")
    let dealHitCardTitle = document.createElement("div")
    let dealHitCardBody = document.createElement("div")
    let dealHitCardCardValue = document.createElement("h1")

    let cardVal = possibleCards[Math.floor(Math.random() * possibleCards.length)]
    dealHitCount++
    dealHitCardTitle.textContent = "DealerCard " + dealHitCount;
    dealHitCardCardValue.textContent = cardVal;

    dealHitCardParent.className = "card text-white bg-secondary mb-3 p-2"
    dealHitCardParent.style = "max-width: 18rem; margin: 10px;"
    dealHitCardTitle.className = "card-header"
    dealHitCardBody.className = "card-body"
    dealHitCardTitle.className = "card-title"


    dealHitCardParent.append(dealHitCardTitle)
    dealHitCardParent.append(dealHitCardBody)
    dealHitCardBody.append(dealHitCardCardValue)
    dealerSection.append(dealHitCardParent)

    dealCount += cardCount(dealHitCardCardValue)
    dealerCurCount.textContent = dealCount;
    hasBusted(dealCount)
}

function stand(){
    dealCount +=cardCount(DC)
    DC.style.display = "block"
    dealerCurCount.textContent = dealCount;
    while(dealCount < 17){
        dealHit()
    }
    if(dealCount < 21 && playCount < 21){
        endGame()
    }
    
}


standButton.addEventListener("click", stand)
hitButton.addEventListener("click", hit)
submitButton.addEventListener("click", betPlaced)