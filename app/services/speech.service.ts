import { SpeechRecognition } from '@nativescript/speech-recognition';

export class SpeechService {
  private speechRecognition: SpeechRecognition;

  constructor() {
    this.speechRecognition = new SpeechRecognition();
  }

  async startListening(): Promise<string> {
    const options = {
      locale: "en-US",
      onResult: (transcription: string) => {
        return transcription;
      },
      onError: (error: string) => {
        console.error('Speech recognition error:', error);
      }
    };

    const available = await this.speechRecognition.available();
    if (available) {
      return this.speechRecognition.startListening(options);
    }
    throw new Error('Speech recognition not available');
  }
}