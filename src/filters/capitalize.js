/*
  Capitalizes the first letter of a value.
 */
export class CapitalizeValueConverter {
  toView(value) {
    return value && value.charAt(0).toUpperCase() + value.slice(1);
  }
}
