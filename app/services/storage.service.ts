import { knownFolders } from '@nativescript/core';

export class StorageService {
  private static readonly ENTRIES_KEY = 'weekly_entries';
  private static readonly documentsFolder = knownFolders.documents();

  static async saveEntry(entry: WeeklyEntry): Promise<void> {
    const entries = await this.getEntries();
    entries.push(entry);
    
    const entriesFile = this.documentsFolder.getFile(`${this.ENTRIES_KEY}.json`);
    await entriesFile.writeText(JSON.stringify(entries));
  }

  static async getEntries(): Promise<WeeklyEntry[]> {
    try {
      const entriesFile = this.documentsFolder.getFile(`${this.ENTRIES_KEY}.json`);
      const content = await entriesFile.readText();
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  static async saveMedia(mediaData: any, type: string): Promise<string> {
    const fileName = `media_${Date.now()}.${type}`;
    const mediaFile = this.documentsFolder.getFile(fileName);
    await mediaFile.write(mediaData);
    return mediaFile.path;
  }
}