export function valuesToJS(validate) {
  return values => validate(values.toJS());
}

export function parseNumber(n) {
  return parseInt(n, 10);
}
