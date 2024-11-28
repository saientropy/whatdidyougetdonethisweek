import { Geolocation } from '@nativescript/geolocation';

export class LocationService {
  static async getCurrentLocation() {
    const authorized = await Geolocation.enableLocationRequest();
    if (!authorized) {
      throw new Error('Location permission denied');
    }

    return Geolocation.getCurrentLocation({
      desiredAccuracy: 3,
      maximumAge: 5000,
      timeout: 10000
    });
  }
}