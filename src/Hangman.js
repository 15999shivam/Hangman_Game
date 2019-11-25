import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      wrongGuesses: 0,
      endGame: false,
      isWinner: false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(
      st => ({ guessed: st.guessed.add(ltr) }),
      () => {
        let arr = this.state.answer.split("").filter(ltr => {
          return this.state.guessed.has(ltr) ? 0 : 1;
        });
        this.setState(st => ({
          nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
          wrongGuesses: st.wrongGuesses + (st.answer.includes(ltr) ? 0 : 1),
          endGame: st.wrongGuesses + 1 === this.props.guesses ? true : false,
          isWinner: arr.length === 0 ? true : false
        }));
      }
    );
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={idx}
      >
        {ltr}
      </button>
    ));
  }
  restartGame() {
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      wrongGuesses: 0,
      endGame: false,
      isWinner: false
    }));
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={this.state.nWrong}
        />
        {
          <b>
            <p>Wrong Guesses: {this.state.wrongGuesses}</p>
          </b>
        }
        <p className='Hangman-word'>
          {this.state.endGame || this.state.isWinner
            ? this.state.answer
            : this.guessedWord()}
        </p>
        {this.state.endGame || this.state.isWinner ? (
          this.state.endGame ? (
            <h2>Game Over</h2>
          ) : (
            <h2>Winner</h2>
          )
        ) : (
          <p className='Hangman-btns'>{this.generateButtons()}</p>
        )}
        {(this.state.endGame || this.state.isWinner) && (
          <button onClick={this.restartGame}>Restart Game</button>
        )}
      </div>
    );
  }
}

export default Hangman;
