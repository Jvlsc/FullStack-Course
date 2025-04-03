// Import React Hooks:
import { useState, useEffect } from 'react'

// Import Services:
import countryService from '../services/country'

// Custom Hook - useCountry:
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      countryService.getCountry(name)
        .then(data => {
          setCountry({
            found: true,
            data: {
              name: data.name.common,
              capital: data.capital ? data.capital[0] : 'N/A',
              population: data.population,
              flag: data.flags.png
            }
          })
        })
        .catch(() => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}

// Export the useCountry Custom Hook:
export default useCountry