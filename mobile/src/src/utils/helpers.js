
export default function formatDate(date) {
  const formattedDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return formattedDate.toLocaleDateString(undefined, options);
} 
