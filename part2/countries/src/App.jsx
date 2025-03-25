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
  const [filter, setFilter] = useState({
    text: '',
    strict: false
  })
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
    console.log(`Filter: ${event.target.value} | Strict: ${false}`)
    setFilter({ text: event.target.value, strict: false })
  }

  // Handle Show Country Button Click:
  const handleShowCountry = (officialName) => {
    console.log('Show country:', officialName)
    setFilter({ text: officialName, strict: true })
  }

  // Filter Countries (Case Insensitive):
  // (Search by official name or common name)
  let filteredCountries = []
  if (countries !== null) {
    filteredCountries = countries.filter(country => {
      const searchText = filter.text.toLowerCase()
      const officialName = country.name.official.toLowerCase()
      const commonName = country.name.common.toLowerCase()
      if (filter.strict) {
        // Strict filtering: Official name must match exactly
        return officialName === searchText
      } else {
        // Non-strict filtering: Partial match allowed
        return officialName.includes(searchText) || commonName.includes(searchText)
      }
    })
  }
  console.log('Filtered Countries:', filteredCountries)

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
              <Countries countries={filteredCountries} handleShowCountry={handleShowCountry} />
            </>
          )
      }
    </>
  )
}

export default App