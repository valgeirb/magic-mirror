/**
  Capitalizes the first letter of a value.

  Example: ${ variable | capitalize }
 **/
export class CapitalizeValueConverter {
  toView(value) {
    return value && value.charAt(0).toUpperCase() + value.slice(1);
  }
}
