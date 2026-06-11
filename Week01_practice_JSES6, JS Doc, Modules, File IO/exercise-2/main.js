import Duration from "./Duration.js";

const d1 = new Duration(100);
const d2 = new Duration(189);

const d3 = Duration.fromMinutesAndSeconds(2, 30);

const sum_d2_d1 = d2.plus(d1);
const minus_d2_d1 = d2.minus(d1);

console.log ("d1 :",d1.toString());
console.log ("d2 :",d2.toString());

console.log(d3.toString());
console.log(sum_d2_d1.toString());
console.log(minus_d2_d1.toString());