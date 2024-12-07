let numbers = [1, 2, 3];

function arrayValue2Object(arrayNumbers) {
  return arrayNumbers.map((number) => ({ val: number }));
}

export default arrayValue2Object(numbers);
