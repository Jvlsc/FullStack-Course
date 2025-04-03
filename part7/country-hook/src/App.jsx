// Import React Hooks:
import { useState } from 'react'

// Import Custom Hooks:
import useField from './hooks/useField'
import useCountry from './hooks/useCountry'

// Import Components:
import Country from './components/Country'

// App Component:
const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

// Export the App Component:
export default App