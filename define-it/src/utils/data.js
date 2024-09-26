
const URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

function fetchData(word) {
    return fetch(`${URL}/${word}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
}

export default fetchData