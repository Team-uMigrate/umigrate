// takes in Date and returns the date in YYYY-MM-DD format (ex: 1960-01-01)
const toYearMonthDayInNumbers = ({ selectedValue }) => {
  const YYYYMMDD = selectedValue.toLocaleDateString('en-CA', {
    timezone: 'EST',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return YYYYMMDD;
};
export default toYearMonthDayInNumbers;
