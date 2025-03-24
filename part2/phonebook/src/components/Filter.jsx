// Filter Component:
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter Shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter