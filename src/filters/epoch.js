import moment from 'moment';

/**
  A value converter that returns an epoch formatted
  date with the provided format.

  Example: ${ variable | epoch: 'ddd' }
**/
export class EpochValueConverter {
  toView(value, format) {
    return value && moment.unix(value).format(format);
  }
}
