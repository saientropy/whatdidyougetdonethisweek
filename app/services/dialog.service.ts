import { alert, confirm } from '@nativescript/core/ui/dialogs';

export class DialogService {
  static async showError(title: string, message: string): Promise<void> {
    return alert({
      title,
      message,
      okButtonText: 'OK'
    });
  }

  static async showConfirm(title: string, message: string): Promise<boolean> {
    return confirm({
      title,
      message,
      okButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }
}