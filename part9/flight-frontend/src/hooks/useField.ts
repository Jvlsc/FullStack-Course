// Import React Hooks:
import { useState } from 'react'

// Custom Hook - useField:
const useField = <T>(type: string) => {
  const [value, setValue] = useState<T>('' as T)

  const onChange = (event: React.SyntheticEvent) => {
    const target = event.target as typeof event.target & { value: string };
    setValue(target.value as T);
  }
  
  const onReset = () => setValue('' as T)

  return { type, value, onChange, onReset }
}

// Export the useField Custom Hook:
export default useField
