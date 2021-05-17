import YYYYMMDD from '../FormatDate/YYYYMMDD';
// takes in Date and returns the date in Month Day Year format (ex: January 1 1960)
const MonthDayYear = ({ date }) => {
  let yyyymmdd = date;
  // check if date is in Date format or is already in YYYY-MM-DD format (birthday saves in YYYY-MM-DD format)
  const check = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(check)) yyyymmdd = YYYYMMDD({ selectedValue: date });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const sectioned = yyyymmdd.split(/\D/);
  const MonthDayYear =
    sectioned[2] + ' ' + months[sectioned[1] - 1] + ' ' + sectioned[0];
  return MonthDayYear;
};
export default MonthDayYear;
