export function ifObjectIsEmpty(object) {
  var isEmpty = false;
  if (JSON.stringify(object) == JSON.stringify({})) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }
  return !isEmpty;
}
