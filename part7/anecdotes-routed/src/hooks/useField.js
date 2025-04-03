// Import useState Hook:
import { useState } from 'react'

// Custom Hook - useField:
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

// Export Custom Hook - useField:
export default useField