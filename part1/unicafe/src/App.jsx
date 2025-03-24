import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}:</h1>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Stats = ({ good, neutral, bad, text }) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <p>{text.good}: {good}</p>
      <p>{text.neutral}: {neutral}</p>
      <p>{text.bad}: {bad}</p>
      <p>{text.all}: {total}</p>
      <p>{text.average}: {average.toFixed(2)}</p>
      <p>{text.positive}: {positive.toFixed(2)}%</p>
    </div>
  )
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
    },
    stats: {
      good: 'Good',
      neutral: 'Neutral',
      bad: 'Bad',
      all: 'All',
      average: 'Average',
      positive: 'Positive'
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
        <Stats good={good} neutral={neutral} bad={bad} text={data.stats} />
      </div>
    </>
  )
}

export default App