import React from "react";
import Hello from "../components/hello";
import Counter from "../components/counter";
import Queue from "../components/queue";
import "./App.css";

function App() {

  const [input, setInput] = React.useState(0)
  const [counters, setCounters] = React.useState([
    {counter: "Counter 1", queue: []},
    {counter: "Counter 2", queue: []},
    {counter: "Counter 3", queue: []},
    {counter: "Counter 4", queue: []},
    {counter: "Counter 5", queue: []}
  ])
  const [sumCounters, setSumCounters] = React.useState([])
  const [nextCounter, setNextCounter] = React.useState("")
  console.log(counters)
  console.log(sumCounters)
  console.log(nextCounter)

  // Whenever counters recieves a new cart of items, update the sumCounters array of item quantity
  React.useEffect(() => {

    const update = counters.map(counter => {
      return {counter: counter.counter, quantity: sumQueue(counter.queue)}
    })

    setSumCounters(update)

  }, [counters])

  // Whenever the sum of items per counter updates, determine the next counter with the lowest quantity of items
  React.useEffect(() => {

    getNextCounter(sumCounters)

  }, [sumCounters])

  // Reduce the quantity of items of the first cart per counter every 0.5 seconds
  React.useEffect(() => {

    const reduceItems = [...counters]

    const interval = setInterval(() => {

      for (let i = 0; i < reduceItems.length; i++) {
        if (reduceItems[i].queue.length != 0) {
          if (reduceItems[i].queue[0] == 0) {
            reduceItems[i].queue = reduceItems[i].queue.slice(1)
          } else {
            reduceItems[i].queue[0] = reduceItems[i].queue[0] - 1
          }
        }
      }

      setCounters(reduceItems)
    }, 1000)

    return () => {
      clearInterval(interval)
    }

  }, [counters])

  // Function to get the sum of items in the queue for the counter
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
    // Set the counter as the next counter an item can be pushed to
    let counter = "";
    for(let i = 0; i < array.length; i++) {
      if (array[i].quantity == minimum) {
        counter = array[i].counter
        setNextCounter(counter)
        return
      }
    }

  }

  // Function that continuously sets whatever value is in the input box as input
  function handleInput(event) {

    const {value} = event.target
    setInput(value)

  }

  // Function that sets the input as quantity
  function checkout() {

    const tempCounters = [...counters]

    for (let i = 0; i < counters.length; i++) {
      if (tempCounters[i].counter == nextCounter) {
        tempCounters[i].queue.push(parseInt(input))
        setCounters(tempCounters)
        return
      }
    }

  }

  // Render a Counter component for each counter in counters state
  const renderCounter = counters.map(counter => 
    <Counter 
      counter={counter.counter}
      cart={counter.queue}
  />)

  // Render the current queue for each counter
  const renderQueue = counters.map(counter => {

    if (counter.queue > 0) {
      return <Queue
        cart={counter.queue}
      />
    }

  })

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
        <div className="app--counterContainer">
          {renderCounter}
        </div>
      </div>
    </main>
  )

}

export default App;