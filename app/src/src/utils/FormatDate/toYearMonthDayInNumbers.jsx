// takes in Date and returns the date in YYYY-MM-DD format (ex: 1960-01-01)
const toYearMonthDayInNumbers = ({ selectedValue }) => {
  const YYYYMMDD = selectedValue.toLocaleDateString('en-CA', {
    timezone: 'EST',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const check = YYYYMMDD.indexOf('/');
  // on android, it returns with / instead of - in format of MM/DD/YY instead of YYYY-MM-DD
  if (check == -1) return YYYYMMDD;
  const dateArr = YYYYMMDD.split('/');
  const androidYYYYMMDD =
    '20' + dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
  return androidYYYYMMDD;
};
export default toYearMonthDayInNumbers;
