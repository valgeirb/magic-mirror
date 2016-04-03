import moment from 'moment';

/*
  A value converter that returns an epoch formatted
  date with the provided format.
*/
export class EpochValueConverter {
  toView(value, format) {
    return value && moment.unix(value).format(format);
  }
}
