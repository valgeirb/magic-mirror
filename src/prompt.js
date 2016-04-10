import {DialogController} from 'aurelia-dialog';
import {inject}           from 'aurelia-framework';

@inject(DialogController)
export class Prompt {
  constructor(controller) {
    this.controller = controller;
    this.answer = null;

    controller.settings.lock = false;
  }
  activate(error) {
    this.error = error;
  }
}
