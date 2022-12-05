/** UTILS & HELPER FUNCTIONS HERE **/

// helper function to calculate dates
// reference: https://blog.bitsrc.io/calculate-the-difference-between-two-2-dates-e1d76737c05a
const calcDate = (date1, date2) => {
  /*
  * calcDate() : Calculates the difference between two dates
  * @date1 : "First Date in the format MM-DD-YYYY"
  * @date2 : "Second Date in the format MM-DD-YYYY"
  * return : Array
  */

  // new date instance
  const dt_date1 = new Date(date1);
  const dt_date2 = new Date(date2);

  // get the Timestamp
  const date1_time_stamp = dt_date1.getTime();
  const date2_time_stamp = dt_date2.getTime();

  let calc;

  // check which timestamp is greater
  if (date1_time_stamp > date2_time_stamp) {
    calc = new Date(date1_time_stamp - date2_time_stamp);
  } else {
    calc = new Date(date2_time_stamp - date1_time_stamp);
  }
  // retrieve the date, month and year
  const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
  // convert to an array and store
  const calcFormat = calcFormatTmp.split("-");

  // subtract each member of our array from the default date
  // const days_passed = Number(Math.abs(calcFormat[0]) - 1);
  // const months_passed = Number(Math.abs(calcFormat[1]) - 1);
  const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

  // only return years_passed
  return years_passed;
};

// helper function to convert plain text into links
// reference: https://stackoverflow.com/questions/65727356/how-to-parse-string-with-links-into-html-links
const convertLinks = (input) => {
  return input.replace(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g, (x)=>'<a href="'+x+'">'+x+'</a>'); 
};