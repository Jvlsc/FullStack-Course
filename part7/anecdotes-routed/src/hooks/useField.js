// Import useState Hook:
import { useState } from 'react'

// Custom Hook - useField:
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Export Custom Hook - useField:
export default useField