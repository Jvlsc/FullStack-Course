import { useState } from 'react'

// Header Component:
const Header = ({ text }) => {
  return <h1>{text}:</h1>
}

// Button Component:
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

// Statistic Line Component:
const StatisticLine = ({ text, value }) => {
  return <p>{text}: {value}</p>
}

// Statistics Component:
const Statistics = ({ good, neutral, bad, text }) => {
  const total = good + neutral + bad
  if (total !== 0) {
    const average = (good - bad) / total
    const positive = (good / total) * 100
    return (
      <div>
        <StatisticLine text={text.good} value={good} />
        <StatisticLine text={text.neutral} value={neutral} />
        <StatisticLine text={text.bad} value={bad} />
        <StatisticLine text={text.all} value={total} />
        <StatisticLine text={text.average} value={average.toFixed(2)} />
        <StatisticLine text={text.positive} value={positive.toFixed(2)} />
      </div>
    )
  } else {
    return <div><p>{text.noFeedback}</p></div>
  }
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
      positive: 'Positive',
      noFeedback: 'No feedback given'
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
        <Statistics good={good} neutral={neutral} bad={bad} text={data.stats} />
      </div>
    </>
  )
}

export default App