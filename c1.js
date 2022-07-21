// initialization
const target = 100;
const fs = require("fs");
var tempArray = [];
let b0 = 0,
  b1 = 0,
  b2 = 0,
  val = 0;

// loop for assigning values, up to the assigned target integer
for (var i = 1; i <= target; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    tempArray.push("BIG BANG");
    b0++;
  } else if (i % 3 === 0) {
    tempArray.push("BIG");
    b1++;
  } else if (i % 5 === 0) {
    tempArray.push("BANG");
    b2++;
  } else {
    tempArray.push(i);
    val++;
  }
}

// output data logs
// console.log(tempArray);
// console.log(
//   "\nBIG BANG:\t" +
//     b0 +
//     "\nBIG:\t\t" +
//     b1 +
//     "\nBANG:\t\t" +
//     b2 +
//     "\nINTEGERS:\t" +
//     val,
// );

// write results to output.js
try {
  let result = JSON.stringify(tempArray);
  fs.writeFileSync("output.json", result);
  console.log('"output.js" has been generated, check project folder....');
} catch (err) {
  console.error(err);
}
