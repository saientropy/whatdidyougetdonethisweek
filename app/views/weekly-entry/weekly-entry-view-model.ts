import { Observable } from '@nativescript/core';
import { SpeechService } from '../../services/speech.service';
import { MediaService } from '../../services/media.service';
import { StorageService } from '../../services/storage.service';
import { LocationService } from '../../services/location.service';
import { WeeklyEntry } from '../../models/entry.model';

export class WeeklyEntryViewModel extends Observable {
  private speechService: SpeechService;
  private _entryText: string = '';
  private _mediaItems: Array<{ url: string }> = [];
  private _isSaving: boolean = false;

  constructor() {
    super();
    this.speechService = new SpeechService();
  }

  get entryText(): string {
    return this._entryText;
  }

  set entryText(value: string) {
    if (this._entryText !== value) {
      this._entryText = value;
      this.notifyPropertyChange('entryText', value);
    }
  }

  get mediaItems(): Array<{ url: string }> {
    return this._mediaItems;
  }

  get currentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  get isSaving(): boolean {
    return this._isSaving;
  }

  async onRecord() {
    try {
      const transcription = await this.speechService.startListening();
      this.entryText += (this.entryText ? ' ' : '') + transcription;
    } catch (error) {
      console.error('Recording failed:', error);
      alert({
        title: "Recording Failed",
        message: "Unable to record audio. Please try again.",
        okButtonText: "OK"
      });
    }
  }

  async onTakePhoto() {
    try {
      const imageUrl = await MediaService.takePicture();
      this._mediaItems.push({ url: imageUrl });
      this.notifyPropertyChange('mediaItems', this._mediaItems);
    } catch (error) {
      console.error('Taking photo failed:', error);
      alert({
        title: "Camera Error",
        message: "Unable to take photo. Please try again.",
        okButtonText: "OK"
      });
    }
  }

  async onRecordVideo() {
    try {
      const videoUrl = await MediaService.recordVideo();
      this._mediaItems.push({ url: videoUrl });
      this.notifyPropertyChange('mediaItems', this._mediaItems);
    } catch (error) {
      console.error('Recording video failed:', error);
      alert({
        title: "Video Error",
        message: "Unable to record video. Please try again.",
        okButtonText: "OK"
      });
    }
  }

  async onSave() {
    if (this._isSaving) return;
    
    try {
      this._isSaving = true;
      this.notifyPropertyChange('isSaving', true);

      const location = await LocationService.getCurrentLocation();
      
      const entry: WeeklyEntry = {
        id: Date.now().toString(),
        date: new Date(),
        text: this.entryText,
        mediaUrls: this._mediaItems.map(item => item.url),
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      };

      await StorageService.saveEntry(entry);
      
      // Reset form after successful save
      this._entryText = '';
      this._mediaItems = [];
      this.notifyPropertyChange('entryText', '');
      this.notifyPropertyChange('mediaItems', []);
      
      alert({
        title: "Success",
        message: "Your weekly reflection has been saved!",
        okButtonText: "OK"
      });
    } catch (error) {
      console.error('Saving entry failed:', error);
      alert({
        title: "Save Failed",
        message: "Unable to save your entry. Please try again.",
        okButtonText: "OK"
      });
    } finally {
      this._isSaving = false;
      this.notifyPropertyChange('isSaving', false);
    }
  }
}