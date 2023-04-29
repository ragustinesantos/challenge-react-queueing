import React from "react";
import Hello from "../components/hello";

function App() {

  const [input, setInput] = React.useState(0)
  const [quantity, setQuantity] = React.useState(0)
  const [counters, setCounters] = React.useState([
    {counter: "Counter 1", queue: [1,7,4]},
    {counter: "Counter 2", queue: [3]},
    {counter: "Counter 3", queue: [5]},
    {counter: "Counter 4", queue: [7]},
    {counter: "Counter 5", queue: [9]}
  ])
  const [sumCounters, setSumCounters] = React.useState([])
  const [nextCounter, setNextCounter] = React.useState("")
  console.log(sumCounters)

  React.useEffect(() => {
    // Everytime counters change...

    // Create a new array of objects with the counter and the sum of the queue for that specific counter
    setSumCounters(counters.map(counter => {
      return {counter: counter.counter, quantity: sumQueue(counter.queue)}
    }))

    // Determine the next counter with the lowest quantity of items
    getNextCounter(sumCounters)

  }, [counters])

  // Function tot get the sum of items in the queue for the counter
  function sumQueue(counterQueue) {
    let sum = 0
    for(let i = 0; i < counterQueue.length; i++) {
      sum = sum + counterQueue[i];
    }
    return sum
  }

  // Function to set the next counter the new checkout should be pushed to
  function getNextCounter(array) {

    // Create an array of just the quantities of each counter
    const quantities = array.map(quantity => {
      return quantity.quantity
    })

    // Determine the lowest quantity among all of them
    const minimum = Math.min.apply(Math, quantities)

    // Determine the counter this quantity matches with and get its counter name
    let counter = "";
    for(let i = 0; i < array.length; i++) {
      if (array[i].quantity == minimum) {
        counter = array[i].counter
      }
    }

    // Set the counter as the next counter an item can be pushed to
    setNextCounter(counter)

  }

  // Function that continuously sets whatever value is in the input box as input
  function handleInput(event) {

    const {value} = event.target
    setInput(value)

  }

  // Function that sets the input as quantity
  function checkout() {

    setQuantity(input)

  }

  return (
    <main>
      <div>
        <div className="app--inputArea">
          <input
            type="number"
            placeholder="items"
            name="quantity"
            className="app--coInput"
            onChange={handleInput}
            value={input}
          />
          <button 
            className="app--coBtn"
            onClick={checkout}
          >Checkout</button>
        </div>
      </div>
    </main>
  )

}

export default App;