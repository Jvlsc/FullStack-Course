// Import React Hooks:
import { useState } from 'react'

// Custom Hook - useField:
const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.target as typeof event.target & { value: string };
    setValue(target.value);
  }
  
  const onReset = () => setValue('')

  return { type, value, onChange, onReset }
}

// Export the useField Custom Hook:
export default useField
