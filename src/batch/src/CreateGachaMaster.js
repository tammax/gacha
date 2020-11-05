const fs = require("fs");
const _ = require("lodash");
// const file01 = "./data/Qita.dat";
// const file02 = "./data/Manual.dat";

const master = "../master/Gacha.csv";

fs.readFileSync(master, "utf8")

// (async () => {
//   try {
//     const data = importFile(file01, file02);
//     exportFile(data);
//   } catch (e) {
//     console.log(e);
//     return;
//   }
// })();

// function importFile(file01, file02) {
//   let data = new String();
//   data = _.uniqBy([
//     ...fs
//       .readFileSync(file01, "utf8")
//       .split("\n")
//       .filter((val) => val !== ""),
//     ...fs
//       .readFileSync(file02, "utf8")
//       .split("\n")
//       .filter((val) => val !== ""),
//   ]);
//   return data;
// }

// function exportFile(data) {
//   data = data.map((val) => {
//     return {
//       text: val,
//     };
//   });
//   fs.writeFileSync(
//     "../src/assets/autocompleteItems.json",
//     JSON.stringify(data)
//   );
// }
