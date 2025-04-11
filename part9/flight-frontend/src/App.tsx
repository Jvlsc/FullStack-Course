// Import React Hooks:
import { useState, useEffect } from 'react';

// Import Services:
import { getAllEntries } from './services/diaryService';

// Import Components:
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';

// Import Types:
import { DiaryEntry } from './types/diary';

// App Component:
function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  const addEntry = (newEntry: DiaryEntry) => {
    setEntries(entries => entries.concat(newEntry));
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Flight Information</h1>
      <DiaryForm addEntry={addEntry} />
      <br />
      <DiaryList entries={entries} />
    </div>
  )
}

// Export the App Component:
export default App
