import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}:</h1>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Stats = ({ name, value }) => {
  return <p>{name}: {value}</p>
}

const App = () => {
  // Save clicks of each button to its own state:
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // App Strings:
  const data = {
    headers: {
      title: 'Give Feedback',
      stats: 'Statistics'
    },
    buttons: {
      good: 'Good',
      neutral: 'Neutral',
      bad: 'Bad'
    }
  }

  return (
    <>
      <div>
        <Header text={data.headers.title} />
        <Button onClick={() => setGood(good + 1)} text={data.buttons.good} />
        <Button onClick={() => setNeutral(neutral + 1)} text={data.buttons.neutral} />
        <Button onClick={() => setBad(bad + 1)} text={data.buttons.bad} />
      </div>
      <div>
        <Header text={data.headers.stats} />
        <Stats name={data.buttons.good} value={good} />
        <Stats name={data.buttons.neutral} value={neutral} />
        <Stats name={data.buttons.bad} value={bad} />
      </div>
    </>
  )
}

export default App