import { useState } from "react"
import fetchData from "../utils/data"

function App() {
    const [word, setWord] = useState("")
    const [dictionaryData, setDictionaryData] = useState([])


    function handleChange(event) {
        setWord(event.target.value)
    }

    function handleSubmit() {
        fetchData(word)
            .then(data => {
                setDictionaryData(data)
            })
    }

    return (
        <section className="section is-large">
            <Search onSubmit={handleSubmit} onChange={handleChange}></Search>
            <Data data={dictionaryData}></Data>
        </section>
    )
}

function Search(props) {
    return (
        <div className="columns">
            <div className="column is-7">
                <p className="is-size-1">Define It</p>
                <div className="field has-addons">
                    <div className="control">
                        <input className="input" type="text" placeholder="Search for a word" onChange={props.onChange}></input>
                    </div>
                    <div className="control">
                        <button className="button is-info" onClick={props.onSubmit}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Definitions(props) {

    return (
        <li className="my-2">
            {console.log(props)}
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <p className="title is-4">{props.data.word}</p>
                        <p className="subtitile is-6"><i>{props.data.phonetic}</i></p>
                        <ul>
                            {
                                props.data.meanings.map(
                                    (meaning, index) => <li key={index}>
                                        <p className="has-text-link">{meaning.partOfSpeech}</p>
                                        <ol>
                                            {
                                                meaning.definitions.map(
                                                    (definition, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <p>{definition.definition}</p>
                                                                <p className="is-size-6 has-text-danger"><i>{definition.example}</i></p>
                                                            </li>
                                                        )
                                                    }
                                                )
                                            }
                                        </ol>
                                        <div className="block">
                                            <p className="has-text-weight-bold is-uppercase">synonyms</p>
                                            <span>
                                                {
                                                    meaning.synonyms.map(
                                                        (synonym, index) => {
                                                            return (
                                                                <span key={index} className="tag is-info is-medium mx-1">{synonym}</span>
                                                            )
                                                        }
                                                    )
                                                }
                                            </span>
                                        </div>
                                        <div className="block">
                                            <p className="has-text-weight-bold is-uppercase">antonyms</p>
                                            <span>
                                                {
                                                    meaning.antonyms.map(
                                                        (antonyms, index) => {
                                                            return (
                                                                <span key={index} className="tag is-warning is-light mx-1">{antonyms}</span>
                                                            )
                                                        }
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    )
}

function Data(props) {

    return (
        <div className="box">
            <ul>
                {
                    props.data.map(
                        (data, index) => <Definitions key={index} data={data}></Definitions>
                    )
                }
            </ul>
        </div>
    )
}
export default App