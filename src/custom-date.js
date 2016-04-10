import {customElement} from 'aurelia-framework';
import moment          from 'moment';
import is              from 'moment/locale/is';

@customElement('custom-date')
export class CustomDate {
  constructor() {
    this.updateDate();
    setInterval(() => this.updateDate(), 1000);
  }

  updateDate() {
    this.date = moment().format('dddd[inn], Do MMMM');
    this.time = moment().format('HH:mm');
  }
}
