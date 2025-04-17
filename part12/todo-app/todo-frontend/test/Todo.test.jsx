import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Todo } from '../src/Todos/List'

describe('Todo component', () => {
  const mockTodo = {
    text: 'Test todo',
    done: false,
    _id: '123'
  }
  const mockDeleteTodo = vi.fn()
  const mockCompleteTodo = vi.fn()

  beforeEach(() => {
    mockDeleteTodo.mockClear()
    mockCompleteTodo.mockClear()
  })

  test('renders todo text correctly', () => {
    render(
      <Todo 
        todo={mockTodo} 
        deleteTodo={mockDeleteTodo} 
        completeTodo={mockCompleteTodo} 
      />
    )
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  test('shows correct buttons when todo is not done', () => {
    render(
      <Todo 
        todo={mockTodo} 
        deleteTodo={mockDeleteTodo} 
        completeTodo={mockCompleteTodo} 
      />
    )
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  test('shows only delete button when todo is done', () => {
    const doneTodo = { ...mockTodo, done: true }
    render(
      <Todo 
        todo={doneTodo} 
        deleteTodo={mockDeleteTodo} 
        completeTodo={mockCompleteTodo} 
      />
    )
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })

  test('calls deleteTodo when delete button is clicked', () => {
    render(
      <Todo 
        todo={mockTodo} 
        deleteTodo={mockDeleteTodo} 
        completeTodo={mockCompleteTodo} 
      />
    )
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo)
  })

  test('calls completeTodo when set as done button is clicked', () => {
    render(
      <Todo 
        todo={mockTodo} 
        deleteTodo={mockDeleteTodo} 
        completeTodo={mockCompleteTodo} 
      />
    )
    fireEvent.click(screen.getByText('Set as done'))
    expect(mockCompleteTodo).toHaveBeenCalledWith(mockTodo)
  })
}) 