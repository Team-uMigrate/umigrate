// Takes in a Date object and returns an EST date string to send to the API
// Format in YYYY-MM-DDThh:mm:ss.uuuuuuZ (ex: 1960-01-01T12:00:00.000000Z)
const toYearMonthDayTimeInNumbers = ({ date }) => {
  let dateString = date.toLocaleDateString('en-CA', {
    timezone: 'EST',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  let timeString = date.toLocaleTimeString('en-CA', {
    timezone: 'EST',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  let fullDate = dateString + 'T' + timeString + 'Z';
  return fullDate;
};
export default toYearMonthDayTimeInNumbers;
