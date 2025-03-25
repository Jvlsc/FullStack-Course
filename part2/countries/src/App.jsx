import { useState, useEffect } from 'react'

// Import Components:
import Countries from './components/Countries'
import Filter from './components/Filter'
import Notification from './components/Notification'

// Import Services:
import countriesService from './services/countries'

// Import Styles:
import './App.css'


// App Component:
const App = () => {

  // Save Countries and Filter in State:
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    type: 'success',
    message: 'Loading countries data...'
  })

  // Fetch Countries from API on startup:
  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        console.log('Countries Data:', response)
        setCountries(response)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
        setNotification({ type: 'error', message: 'Error fetching countries. Try refreshing the page...' })
      })
  }, [])

  // Handle Filter Change:
  const handleFilterChange = (event) => {
    console.log('Filter:', event.target.value)
    setFilter(event.target.value)
  }

  // Filter Countries (Case Insensitive):
  // (Search by official name or common name)
  let filteredCountries = []
  if (countries !== null) {
    filteredCountries = countries.filter(country => 
      country.name.official.toLowerCase().includes(filter.toLowerCase()) ||
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  }

  // Render App:
  // - Show loading message if countries data is not loaded
  // - Otherwise, show filter and countries
  return (
    <>
      <h1>Countries</h1>
      {countries === null 
        ? (
            <>
              <Notification notification={notification} />
            </>
          )
        : (
            <>
              <Filter filter={filter} handleFilterChange={handleFilterChange} />
              <br />
              <Countries countries={filteredCountries} />
            </>
          )
      }
    </>
  )
}

export default App