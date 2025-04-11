// Import DiaryEntry type:
import { DiaryEntry } from "../types/diary";

// Diary Component:
const DiaryList = ({ entries }: { entries: DiaryEntry[] }) => {
  if (entries.length === 0) {
    return <div>No entries yet</div>;
  }

  return (
    <div>
      <h2>Diary Entries:</h2>
      {entries.map(entry => (
        <div key={entry.id} style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: 0 }}>{entry.date}</h3>
          <p style={{ margin: 0 }}>- Weather: {entry.weather}</p>
          <p style={{ margin: 0 }}>- Visibility: {entry.visibility}</p>
          {entry.comment && (
            <p style={{ margin: 0 }}>- Comment: {entry.comment}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// Export the DiaryList Component
export default DiaryList;