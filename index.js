const cardObjectDefinitions = [
    {id:1, imagePath:'/images/card-KingHearts.png'   },
    {id:2, imagePath:'/images/card-JackClubs.png'    },
    {id:3, imagePath:'/images/card-QueenDiamonds.png'},
    {id:4, imagePath:'/images/card-AceSpades.png'    }
]
const cardBackImgPath = '/images/card-back-blue.png';
const cardContainerEl = document.querySelector('.card-container');
const playGameButtonEl = document.getElementById('playGame');

function loadGame() {
    dealCards();

    playGameButtonEl.addEventListener('click', () => {
        startGame();
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
}

function initializeNewRound() {

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

}
 
function createEl(elType, listAttributes = {}) {
    const el = document.createElement(elType);
    for (const atrName in listAttributes) {
        el.setAttribute(atrName, listAttributes[atrName]);
    }
    return el;
}

function addCardToGridCell(cardEl) {
    cardContainerEl.children[cardEl.id - 1].insertElements(cardEl);
}

HTMLElement.prototype.insertElements = function(...elements) {
    elements.forEach(el=>{
        this.appendChild(el);
    })
}

loadGame();