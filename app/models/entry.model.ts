export interface WeeklyEntry {
  id: string;
  date: Date;
  text: string;
  audioUrl?: string;
  mediaUrls: string[];
}