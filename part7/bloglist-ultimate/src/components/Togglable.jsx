// Importing necessary modules:
import { useState, forwardRef, useImperativeHandle } from 'react'

// Import PropTypes:
import PropTypes from 'prop-types'

// Togglable Component:
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button data-testid="create-toggle-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button data-testid="create-cancel-button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
})

// Display Name:
Togglable.displayName = 'Togglable'

// Prop Types - Togglable Component:
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

// Exporting the Togglable component:
export default Togglable
