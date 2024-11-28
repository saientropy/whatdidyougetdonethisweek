import { Camera } from '@nativescript/camera';
import { MediaCapture } from '@nativescript/media-capture';

export class MediaService {
  static async takePicture(): Promise<string> {
    const image = await Camera.takePicture();
    return image.android || image.ios;
  }

  static async recordVideo(): Promise<string> {
    const capture = new MediaCapture();
    const options = {
      duration: 0,
      saveToGallery: true,
      height: 1280,
      width: 720
    };
    
    const video = await capture.captureVideo(options);
    return video.android || video.ios;
  }
}