// Import React Redux Tools:
import { useDispatch, useSelector } from 'react-redux'

// Import Reducers Functions:
import { setFilter } from '../reducers/filterReducer'

// Filter Component:
const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

// Export Filter Component:
export default Filter