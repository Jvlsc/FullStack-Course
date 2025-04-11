// Import Types:
import { CoursePart } from "../types/CourseParts";

// Helper function for exhaustive type checking:
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Part Component:
const Part = ({ part }: { part: CoursePart }) => {
  const baseInfo = (
    <div>
      <strong>{part.name} - </strong> {part.exerciseCount} exercises
    </div>
  );

  switch (part.kind) {
    case "basic":
      return (
        <>
          {baseInfo}
          <ul>
            <li><em>Description: {part.description}</em></li>
          </ul>
        </>
      );
    case "group":
      return (
        <>
          {baseInfo}
          <ul>
            <li>Project exercises: {part.groupProjectCount}</li>
          </ul>
        </>
      );
    case "background":
      return (
        <>
          {baseInfo}
          <ul>
            <li><em>Description: {part.description}</em></li>
            <li>Background material: {part.backgroundMaterial}</li>
          </ul>
        </>
      );
    default:
      return assertNever(part);
  }
};

// Content Component:
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <h2>Content:</h2>
      <ul>
        {courseParts.map((part) => (
          <li key={part.name} style={{ marginBottom: '1rem' }}>
            <Part part={part} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export Content Component:
export default Content;

