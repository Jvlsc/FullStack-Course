// Import PropTypes:
import PropTypes from 'prop-types'

// Country Component:
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        <br />
        Country not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

// Country Component - PropTypes:
Country.propTypes = {
  country: PropTypes.object
}

// Export the Country Component:
export default Country