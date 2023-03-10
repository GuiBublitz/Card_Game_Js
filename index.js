const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'   },
    {id:2, imagePath:'/images/card-JackClubs.png'    },
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'    }
]
const cardBackImgPath = '/images/card-back-blue.png';
const cardsContainerEl = document.querySelector('.cards-container');
const playGameButtonEl = document.getElementById('playGame');
const collapseGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";
const numCards = cardObjectDefinitions.length;
let cardPositions = [];
let cards = [];

function loadGame() {
    dealCards();
    cards = document.querySelectorAll('.card');
    playGameButtonEl.addEventListener('click', () => {
        startGame();
    })
}

function flipCard(card, flipToBack) {
    const innerCardEl = card.firstChild;
    if (flipToBack && !innerCardEl.classList.contains('flip-it')) {
        innerCardEl.classList.add('flip-it');
    } else if (innerCardEl.classList.contains('flip-it')) {
        innerCardEl.classList.remove('flip-it');
    }
}

function flipCards(flipToBack) {
    cards.forEach((card, index) => {
        setTimeout(()=>{
            flipCard(card, flipToBack);
        }, index * 100);
    })
}

function startGame() {
    initializeNewGame();
    startRound();
}

function initializeNewGame() {

}

function startRound() {
    initializeNewRound();
    collectCards();
    flipCards(true);
}

function initializeNewRound() {

}

function collectCards() {
    transformGridArea(collapseGridAreaTemplate);
    addCardsToGridAreaCell(cardCollectionCellClass)
}

function transformGridArea(areas) {
    cardsContainerEl.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
    const cellPositionEl = document.querySelector(cellPositionClassName);
    cards.forEach((card, index) => {
        cellPositionEl.insertElements(card);
    })
}

function shuffleCards() {
    const id = setInterval(shuffle, 12);
    let shuffleCount = 0;
    function shuffle() {
        randomizeCardPositions();
        if (shuffleCount == 500) {
            clearInterval(id);
        } else {
            shuffleCount++;
        }
    }
}

function randomizeCardPositions() {
    const random1 = Math.floor(Math.random() * numCards) + 1;
    const random2 = Math.floor(Math.random() * numCards) + 1;
    const temp = cardPositions[random1 - 1];
    cardPositions[random1 - 1] = cardPositions[random2 - 1];
    cardPositions[random2 - 1] = temp;
}

function dealCards() {
    cardObjectDefinitions.forEach(cardData => {
        createCard(cardData);
    })
}

function createCard(cardData){

    // Create div elements that make up a card 
    const cardEl = createEl('div', {
        class:'card', 
        id: cardData.id
    });
    const cardInnerEl = createEl('div', {
        class:'card-inner'
    });
    const cardFrontEl = createEl('div', {
        class:'card-front'
    });
    const cardBackEl  = createEl('div', {
        class:'card-back'
    });

    // Create front and back image elements for a card
    const cardFrontImg = createEl('img', {
        class:'card-img',
        src: cardData.imagePath
    });
    const cardBackImg  = createEl('img', {
        class:'card-img',
        src: cardBackImgPath
    });

    // Set respective children into their parents 
    cardFrontEl.insertElements(cardFrontImg); 
    cardBackEl.insertElements(cardBackImg);
    cardInnerEl.insertElements(cardFrontEl, cardBackEl);
    cardEl.insertElements(cardInnerEl);
    
    addCardToGridCell(cardEl);

    initializeCardPositions(cardEl); 

}
function initializeCardPositions(card) {
    cardPositions.push(card.id);
}
 
function createEl(elType, listAttributes = {}) {
    const el = document.createElement(elType);
    for (const atrName in listAttributes) {
        el.setAttribute(atrName, listAttributes[atrName]);
    }
    return el;
}

function addCardToGridCell(cardEl) {
    cardsContainerEl.children[cardEl.id - 1].insertElements(cardEl);
}

HTMLElement.prototype.insertElements = function(...elements) {
    elements.forEach(el=>{
        this.appendChild(el);
    })
}

loadGame();