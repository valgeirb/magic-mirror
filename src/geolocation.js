import {DialogService} from 'aurelia-dialog';
import {Prompt}        from './prompt';
import {inject}        from 'aurelia-framework';
/**
  Returns the geological position of the device.
**/
@inject(DialogService)
export class Geolocation {
  constructor(dialogService) {
    this.dialogService = dialogService;
    this.coordinates = null;
    this.errors = {
      'PERMISSION_DENIED':'You have rejected access to your location',
      'POSITION_UNAVAILABLE':'Unable to determine your location',
      'TIMEOUT':'Service timeout has been reached'
    }
  }

  getLocation() {
    if (this.coordinates !== null) {
      return this.coordinates;
    }

    let deferred = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(success => resolve(success),
        error => {
          console.log(error);
          switch (error.code) {
            case 1:
              error = this.errors['PERMISSION_DENIED'];
              break;
            case 2:
              error = this.errors['POSITION_UNAVAILABLE'];
              break;
            case 3:
              error = this.errors['TIMEOUT'];
              break;
            default:
              error = 'Location error';
              break;
          }
          this.dialogService.open({
            viewModel: Prompt,
            model: error
          });
          reject(error);
      })
    });

    // Cache the location
    this.coordinates = deferred;
    return deferred;
  }
}
