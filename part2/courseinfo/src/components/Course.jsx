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

export default Course