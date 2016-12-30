export function valuesToJS(validate) {
  return values => validate(values.toJS());
}
