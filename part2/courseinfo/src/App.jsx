// Title Component:
const Title = (props) => {
  console.log("Title props:", props)
  return <h1>{props.title}</h1>
}

// Header Component:
const Header = (props) => {
  console.log("Header props:", props)
  return <h2>{props.course.name}</h2>
}

// Part Component:
const Part = (props) => {
  console.log("Part props:", props)
  return <p>· {props.part}: {props.exercises}</p>
}

// Content Component:
const Content = (props) => {
  console.log("Content props:", props)
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

// Total Component:
const Total = (props) => {
  console.log("Total props:", props)
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <h4>Total of: {total} exercises.</h4>
    </div>
  )
}

// Course Component:
const Course = ({ course }) => {
  console.log("Course props:", course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// App Component:
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Title title="Web development curriculum" />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App