import React, { Component } from "react"
import styles from "./Quote.module.css"

const API_URL =
  "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"

class Quote extends Component {
  state = {
    quotes: [],
    quote: "",
    author: "",
    idxs: [],
  }

  fetchQuotes = async () => {
    await fetch(API_URL)
      .then((q) => q.json())
      .then((q) => this.setState({ quotes: q }))
      .catch((e) => console.log(e))
  }

  async componentDidMount() {
    await this.fetchQuotes()
    this.randomQuote(this.state.quotes)
  }

  randomQuote = (quotes) => {
    let randomIdx = Math.round(Math.random() * quotes.length) // range 0 - 102

    this.setState((prevState) => {
      return {
        quote: quotes[randomIdx].quote,
        author: quotes[randomIdx].author,
        idxs: [...prevState.idxs, randomIdx], // All quotes indexes
      }
    })
  }

  deleteLastQuouteIdx = (arr) => arr.pop()

  previousQoute = (quotes, idex) => {
    if (idex.length <= 1) {
      alert("U dont saw any other quotes🤔")
      return
    }
    this.deleteLastQuouteIdx(idex)

    let lastQuote = quotes.filter(
      (ele, idx) => idx === idex[idex.length - 1] // find last quota by index
    )
    this.setState({ quote: lastQuote[0].quote, idex: idex })
  }

  render() {
    const { quotes, quote, author, idxs } = this.state

    return (
      <div className={styles.container}>
        <div>
          <p className={styles.quote}>"{quote}"</p>
          <p className={styles.author}>-{author}</p>
        </div>
        <div className={styles.wrapper}>
          <button
            className={styles.btn}
            onClick={() => {
              this.previousQoute(quotes, idxs)
            }}
          >
            ⬅️ Previous Quote ⬅️
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              this.randomQuote(quotes)
            }}
          >
            📖 Random Quote 📖
          </button>
        </div>
      </div>
    )
  }
}

export default Quote
