// Import React Bootstrap:
import { Alert } from 'react-bootstrap'

// Import PropTypes:
import PropTypes from 'prop-types'

// Error Message Component:
const ErrorMessage = ({ message }) => {
  return (
    <div className="d-flex justify-content-center my-5">
      <Alert variant="danger" className="w-auto">
        {message}
      </Alert>
    </div>
  )
}

// PropTypes:
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

// Export Error Message Component:
export default ErrorMessage