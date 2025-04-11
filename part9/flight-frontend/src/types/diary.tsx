interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment: string;
}

type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type { DiaryEntry, NewDiaryEntry };

