import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types/diary";

const baseUrl = '/api/diaries'

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

export const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const createEntry = async (object: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object)
    return response.data
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw error.response?.data
    } else {
      console.error(error);
      throw error
    }
  }
}