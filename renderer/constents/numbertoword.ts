// function numberToWords(num: number) {
//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//   ];
//   const teens = [
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];
//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];
//   const thousands = ["", "Thousand", "Million", "Billion"];

//   if (num === 0) return "Zero";

//   function helper(n) {
//     let word = "";
//     if (n < 10) word = ones[n];
//     else if (n < 20) word = teens[n - 10];
//     else if (n < 100)
//       word =
//         tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
//     else
//       word =
//         ones[Math.floor(n / 100)] +
//         " hundred" +
//         (n % 100 !== 0 ? " " + helper(n % 100) : "");
//     return word;
//   }

//   let result = "";
//   let i = 0;
//   while (num > 0) {
//     if (num % 1000 !== 0) {
//       result =
//         helper(num % 1000) +
//         (thousands[i] ? " " + thousands[i] : "") +
//         (result ? " " + result : "");
//     }
//     num = Math.floor(num / 1000);
//     i++;
//   }
//   return result.trim();
// }

function numberToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const units = [
    { value: 10000000, name: "Crore" },
    { value: 100000, name: "Lakh" },
    { value: 1000, name: "Thousand" },
    { value: 100, name: "Hundred" },
  ];

  if (num === 0) return "Zero";

  function getWords(n) {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    return ""; // handled in main loop
  }

  let result = "";
  for (const unit of units) {
    const unitValue = Math.floor(num / unit.value);
    if (unitValue > 0) {
      result += getWords(unitValue) + " " + unit.name + " ";
      num %= unit.value;
    }
  }

  if (num > 0) result += getWords(num);
  return result.trim();
}

export default numberToWords;
