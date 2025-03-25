// Country Details Component:
const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common} [{country.name.official}]</h2>
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Area: {country.area}</li>
      </ul>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
    </div>
  )
}

// Country Component:
const Country = ({ country, handleShowCountry }) => {
  return (
    <h4>
      · {country.name.common} [{country.name.official}] &nbsp;
      <button onClick={() => handleShowCountry(country.name.official)}>
        Show Details
      </button>
    </h4>
  )
}

// Countries Component:
const Countries = ({ countries, handleShowCountry }) => {
  console.log('Countries:', countries)
  if (countries.length === 0) {
    return (
      <div>
        <h4> {'>>'} No countries found</h4>
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country => 
          <Country key={country.name.official} country={country} handleShowCountry={handleShowCountry} />
        )}
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        <h4> {'>>'} Too many countries, specify another filter</h4>
      </div>
    )
  }
}

export default Countries