import toMonthDayYearInWords from './toMonthDayYearInWords';

// takes in a date value in the form YYYY-MM-DD and returns the month and year in words
const toMonthYear = ({ date }) => {
  const result = toMonthDayYearInWords({ date: date }).split(' ');
  return result[1] + ' ' + result[2];
};
export default toMonthYear;
