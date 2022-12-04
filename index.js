const wordsInput = document.querySelector('.words')
const translationsInput = document.querySelector('.translations')
const sortButton = document.querySelector('.sort-button')
const cardButton = document.querySelector('.card-button')

const alertError = document.querySelector('.alert')

const cards = {
    words: [],
    translations: []
}

function init(){
    try{
        addSortEvent(sortButton)
        addCardEvent(cardButton)
    }catch(error){
        alert('Bla')   
    }
}

function addSortEvent(button){
    button.addEventListener('click', () => prepareSortedWords(wordsInput, translationsInput))
}

function addCardEvent(button){
    button.addEventListener('click', () => showTranslation(cardButton))
}

function showTranslation(cardButton){
    const { translation, word } = cardButton.dataset
    
    if(translation === "" || word === ""){
        showError("Palavra sem tradução ou não existe.")
    }

    if(cardButton.innerText === translation){
        cardButton.innerText = word
    } else{
        cardButton.innerText = translation
    }

} 

function prepareSortedWords(wordsInput, translationsInput){

    const { textWords, textTranslations } = readInput(wordsInput, translationsInput)

    if(textWords === "" || textTranslations === ""){
        showError('Preencha os campos vazios.')
    }

    const { words, translations } = validateInput(textWords, textTranslations)
    
    if(words.length !== translations.length){
        showError('Quantidade de palavras em inglês diferente da quantidade de traduções.')
    }
    
    setCards(words, translations)
    sortCard()
    hideError()
}

function readInput(wordsInput, translationsInput){
    const { value: textWords } = wordsInput
    const { value: textTranslations } = translationsInput
    return {
        textWords, textTranslations
    }
}

function validateInput(textWords, textTranslations){
    const splitedWords = splitTextsWhenCommon(textWords)
    const splitedTranslations = splitTextsWhenCommon(textTranslations)
    const words = cleanPrepositionTo(splitedWords)
    const translations = cleanPrepositionTo(splitedTranslations)

    return {
        words,
        translations
    }
}

function cleanPrepositionTo(array){
    return array.filter(value => value !== "" && value !== "to")
}

function splitTextsWhenCommon(text) { 
    return text.split(',')
}

function setCards(words, translations){
    cards.words = words
    cards.translations = translations
}

function sortCard(){
    const min = Math.ceil(1)
    const max = Math.floor(cards.words.length)
    
    const number = Math.floor(Math.random() * (max - min + 1) + min) - 1

    cardButton.innerHTML = cards.words[number]
    cardButton.dataset.translation = cards.translations[number]
    cardButton.dataset.word = cards.words[number]
}

function showError(message){
    alertError.innerText = message 
    alertError.classList.remove('hide')
    throw new Error(message)
}

function hideError(){
    alertError.classList.add('hide')
}

init()
