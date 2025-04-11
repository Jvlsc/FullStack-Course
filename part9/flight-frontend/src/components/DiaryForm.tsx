// Import Types:
import { DiaryEntry, NewDiaryEntry } from '../types/diary'
import { NotificationType } from '../types/notification';

// Import Custom Hooks:
import useField from '../hooks/useField'

// Import Services:
import { createEntry } from '../services/diaryService'

// Prop Types:
type DiaryFormProps = {
  addEntry: (entry: DiaryEntry) => void;
  notify: (notification: NotificationType) => void;
}

// DiaryForm Component:
const DiaryForm = ({ addEntry, notify }: DiaryFormProps) => {
  const date = useField('text');
  const weather = useField('text');
  const visibility= useField('text');
  const comment = useField('text');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: date.value,
      weather: weather.value,
      visibility: visibility.value,
      comment: comment.value
    }
    createEntry(newEntry)
      .then((data) => {
        addEntry(data);
        notify({ message: 'Entry created successfully', type: 'success' });
        date.onReset();
        weather.onReset();
        visibility.onReset();
        comment.onReset();
      })
      .catch((error) => {
        console.error(error);
        notify({ message: error, type: 'error' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date </label>
        <input {...date} />
      </div>
      <div>
        <label htmlFor="weather">Weather </label>
        <input {...weather} />
      </div>
      <div>
        <label htmlFor="visibility">Visibility </label>
        <input {...visibility} />
      </div>
      <div>
        <label htmlFor="comment">Comment </label>
        <input {...comment} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

// Export DiaryForm Component:
export default DiaryForm;
