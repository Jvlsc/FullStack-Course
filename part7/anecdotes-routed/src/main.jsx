// Import React Tools:
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

// Import App Component:
import App from './App'

// Render the App Component:
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)