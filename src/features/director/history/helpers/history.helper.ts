export const convertMonthInput = (value: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    month: 'long',
  }).format(value);
};

export const convertYearInput = (value: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
  }).format(value);
};
