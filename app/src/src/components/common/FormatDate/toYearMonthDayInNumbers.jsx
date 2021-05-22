// takes in Date and returns the date in YYYY-MM-DD format (ex: 1960-01-01)
const toYearMonthDayInNumbers = ({ selectedValue }) => {
  const currYear = selectedValue.getFullYear().toString();
  const currMonth =
    selectedValue.getMonth() < 10
      ? ('0' + (selectedValue.getMonth() + 1)).toString().slice(-2)
      : (selectedValue.getMonth() + 1).toString().slice(-2);
  const currDay =
    selectedValue.getDate() < 10
      ? ('0' + selectedValue.getDate()).toString().slice(-2)
      : selectedValue.getDate().toString().slice(-2);
  const YYYYMMDD = currYear + '-' + currMonth + '-' + currDay;
  return YYYYMMDD;
};
export default toYearMonthDayInNumbers;
