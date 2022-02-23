import "../src/App.css"
import Main from "./components/Main";
import React from "react";
// import { ReactDOM } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid"
// import Confetti from "react-Confetti"

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {

    // console.log("dice changed")

    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You have won")
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    // console.log(newDice)
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {

      return die.id === id ? { ...die, isHeld: !die.isHeld } :
        die
    }))
  }


  // console.log(allNewDice())

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (


    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice"
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>


  );
}

export default App;