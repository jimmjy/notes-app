const now = new Date();

const timeStamp = now.getTime();

const myDate = new Date(timeStamp);
console.log(myDate.getFullYear())
// console.log(`Year: ${now.getFullYear()}`);
// console.log(`Month: ${now.getMonth()}`);
// console.log(`Day of the month: ${now.getDate()}`);
// console.log(`Hours: ${now.getHours()}`);
// console.log(`Minutes: ${now.getSeconds()}`);

const firstDate = new Date('February 2 1982 6:35:06');
const secondDate = new Date('November 25 1996 15:03:20');

console.log(firstDate.getTime(), secondDate.getTime())

firstDate.getTime() < secondDate.getTime() ? console.log(firstDate.toString()) : console.log(secondDate.toString());

