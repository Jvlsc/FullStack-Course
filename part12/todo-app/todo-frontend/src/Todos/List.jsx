import PropTypes from 'prop-types'

export const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        {todo.text} 
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}

const TodoList = ({ todos, deleteTodo, completeTodo }) => (
  <>
    {todos.map(todo => (
      <>
        <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        <hr />
      </>
    ))}
  </>
)

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

export default TodoList
