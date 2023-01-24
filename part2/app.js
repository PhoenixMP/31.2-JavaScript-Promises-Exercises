
let baseURL = 'https://deckofcardsapi.com/api/deck'
let shuffleBaseURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'


//1)

axios
    .get(shuffleBaseURL)
    .then(resp => {
        const deckId = resp.data['deck_id']
        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
    })
    .then(resp => {
        const deckId = resp.data['deck_id']
        const card = resp.data['cards'][0]
        console.log(`${card['value'].toLowerCase()} of ${card['suit'].toLowerCase()}`)
        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    })


//2)
let card1 = null
axios
    .get(shuffleBaseURL)
    .then(resp => {
        const deckId = resp.data['deck_id']
        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
    })
    .then(resp => {
        const deckId = resp.data['deck_id']
        card1 = resp.data['cards'][0]
        return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
    })
    .then(resp => {
        let card2 = resp.data['cards'][0]
        console.log(`${card1.value.toLowerCase()} of ${card1.suit.toLowerCase()}`);
        console.log(`${card2.value.toLowerCase()} of ${card2.suit.toLowerCase()}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    })





//3)
let container = document.getElementById('container');
let button = document.getElementById('card-button');
let deckId = null
let cardCount = 0
getDeck()

button.addEventListener("click", getCard);

function getDeck() {
    axios
        .get(shuffleBaseURL)
        .then(resp => {
            deckId = resp.data['deck_id']
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        })
}

function getCard() {
    axios
        .get(`${baseURL}/${deckId}/draw/?count=1`)
        .then(resp => {

            let card = resp.data['cards'][0]

            addCard(`${card.image}`)
            cardCount += 1
            if (cardCount === 52) {
                button.remove()
            }
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        })
}

function addCard(image) {
    const card = document.createElement('div')
    card.style.display = "inline-block";
    card.style.width = '200px'
    card.style.height = '300px'
    card.style.backgroundImage = `url(${image})`
    card.style.backgroundSize = 'contain'
    card.style.backgroundRepeat = 'no-repeat'
    container.appendChild(card)

}


