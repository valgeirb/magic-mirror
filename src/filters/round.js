/*
  A value converter that rounds up a value with the
  desired amount of decimals.
*/
export class RoundValueConverter {
  toView(value, decimals) {
    return value && Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}
