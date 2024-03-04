
import { useEffect, useState } from 'react'
import './App.css'
import CardSingle from './components/CardSingle'

const cardJapaneseLanImages = [
  { "src": "./img/hiraganaromanji/hiraganaromanjika.png", matched: false },
  { "src": "./img/hiraganaromanji/hiraganaromanjiko.png", matched: false },
  { "src": "./img/hiraganaromanji/hiraganaromanjira.png", matched: false },
  { "src": "./img/hiraganaromanji/hiraganaromanjine.png", matched: false },
  { "src": "./img/hiraganaromanji/hiraganaromanjiwa.png", matched: false },
  { "src": "./img/hiraganaromanji/hiraganaromanjihi.png", matched: false }
]

const App = () => {
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ choiceOne, setChoiceOne ] = useState(null)
  const [ choiceTwo, setChoiceTwo ] = useState(null)
  const [ disabled, setDisabled ] = useState(false)


  //shuffle cards
  const shuffleCards = () =>
  {
    const shuffledCards = [...cardJapaneseLanImages, ...cardJapaneseLanImages]
      .sort(() => Math.random() - 0.5)
      // random -> can be negative or positive.
      //if negative, items will reamin the same order
      // if positive, it will switch the items around
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => 
  {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo)
    {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src)
      {
        setCards(prevCards => {
          return prevCards.map(card => 
          {
            if (card.src === choiceOne.src)
            {
              return { ...card, matched: true }
            }

            else
            {
              return card
            }
          })
        })
        resetTurn()
      }

      else 
      {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn 
  const resetTurn = () =>
  {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // automatically start a new game
  useEffect(() => 
  {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1> Matching game </h1>
      <button onClick={shuffleCards}> New Game  </button>

      <div className="card-grid">
        {
          cards.map(card => (
            <CardSingle 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
      </div>

      <p> Turns: { turns } </p>

    </div>
  );
}

export default App;
