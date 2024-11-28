import { LocalNotifications } from '@nativescript/local-notifications';
import { Application } from '@nativescript/core';

export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    const hasPermission = await LocalNotifications.hasPermission();
    if (!hasPermission) {
      return LocalNotifications.requestPermission();
    }
    return hasPermission;
  }

  static scheduleWeeklyReminder() {
    LocalNotifications.schedule([{
      id: 1,
      title: 'Weekly Reflection',
      body: 'What did you get done this week?',
      scheduled: true,
      interval: 'week',
      at: this.getNextSunday()
    }]);
  }

  private static getNextSunday(): Date {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()));
    nextSunday.setHours(19, 0, 0, 0); // 7 PM
    return nextSunday;
  }
}