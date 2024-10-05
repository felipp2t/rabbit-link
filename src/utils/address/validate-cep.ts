export function validateCEP(numbers: string) {
    if (numbers.includes("-")) numbers = numbers.replace("-", "");
  
    return numbers;
  }