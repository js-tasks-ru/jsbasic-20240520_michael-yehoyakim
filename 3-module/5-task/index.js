function getMinMax(str) {
  const arr = str.split(" ")
    .map(strValue => Number(strValue))
    .filter(value => Boolean(value))
    .sort((a, b) => a - b);

  return {min: arr[0], max: arr[arr.length -1]};
}
