// Import Types:
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from '../types/diary'
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
  const date = useField<string>('date');
  const weather = useField<Weather>('radio');
  const visibility= useField<Visibility>('radio');
  const comment = useField<string>('text');

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
        {Object.values(Weather).map((item) => (
          <span key={item}>
            <input 
              {...weather}
              name="weather" 
              checked={weather.value === item}
              value={item} 
            /> 
            <label htmlFor={item}>{item}</label>
          </span>
        ))}
      </div>
      <div>
        <label htmlFor="visibility">Visibility </label>
        {Object.values(Visibility).map((item) => (
          <span key={item}>
            <input 
              {...visibility}
              name="visibility" 
              value={item} 
              checked={visibility.value === item}
            />
            <label htmlFor={item}>{item}</label>
          </span>
        ))}
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
