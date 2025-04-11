// Import React Hooks:
import { useState, useEffect } from 'react';

// Import Services:
import { getAllEntries } from './services/diaryService';

// Import Components:
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import Notification from './components/Notification';

// Import Types:
import { DiaryEntry } from './types/diary';
import { NotificationType } from './types/notification';

// App Component:
function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  const addEntry = (newEntry: DiaryEntry) => {
    setEntries(entries => entries.concat(newEntry));
  };

  const notify = (notification: NotificationType) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Flight Information</h1>
      <Notification notification={notification} />
      <DiaryForm addEntry={addEntry} notify={notify} />
      <br />
      <DiaryList entries={entries} />
    </div>
  )
}

// Export the App Component:
export default App
