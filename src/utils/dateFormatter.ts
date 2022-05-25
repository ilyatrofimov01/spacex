export const toLocalDateFormatter = (date: string) => {
  return (new Date(date).toLocaleDateString("eu"));
};

export const convertDateFormat = (date: string) => {
  // converted date to YYYY-DD-MM from query to back-end
  const [year, month, day] = date.split("-");
  return [year, day, month].join("-");
};