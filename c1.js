const target = 100;
const fs = require("fs");
var tempArray = [];
let b0 = 0,
  b1 = 0,
  b2 = 0,
  val = 0;

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

try {
  var output = JSON.stringify(tempArray);
  fs.writeFileSync("output.json", output);
} catch (err) {
  console.error(err);
}
