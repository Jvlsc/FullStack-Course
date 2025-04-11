// Course Part Interface:
interface CoursePart {
  name: string;
  exerciseCount: number;
}

// Content Component:
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <h2>Content:</h2>
      <ul>
        {courseParts.map((part) => (
          <li key={part.name}>
            <strong>{part.name} - </strong> {part.exerciseCount} Exercises.
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export Content Component:
export default Content;

