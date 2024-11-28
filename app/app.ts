import { Application } from '@nativescript/core';
import { NotificationService } from './services/notification.service';
import { DialogService } from './services/dialog.service';

Application.on(Application.launchEvent, async () => {
  const granted = await NotificationService.requestPermission();
  if (granted) {
    NotificationService.scheduleWeeklyReminder();
  } else {
    await DialogService.showError(
      'Notifications Required',
      'This app requires notifications to remind you about your weekly reflections. Please enable notifications in your device settings.'
    );
    if (global.isIOS) {
      Application.exit();
    }
  }
});

Application.run({ moduleName: 'app-root' });