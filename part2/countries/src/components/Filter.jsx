// Filter Component:
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Find Countries: <input value={filter.text} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter