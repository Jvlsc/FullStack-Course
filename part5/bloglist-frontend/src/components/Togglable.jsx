// Importing necessary modules:
import { useState, forwardRef, useImperativeHandle } from 'react'

// Togglable Component:
const Togglable = forwardRef((props, refs) => {
  // State Variables:
  const [visible, setVisible] = useState(false)

  // Hide/Show Visibility:
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Toggle Visibility:
  const toggleVisibility = () => setVisible(!visible)

  // Use Imperative Handle:
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  // Render:
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

// Display Name:
Togglable.displayName = 'Togglable'

// Exporting the Togglable component:
export default Togglable