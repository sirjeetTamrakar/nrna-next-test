import moment from 'moment';

export const changeDateFormat = (date, format = 'DD-MMM-YYYY') => {
  return moment(date).format(format);
};

export const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 }
];

const year = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const year = [...Array(5).keys()].map((index) => ({
    label: currentYear - index,
    value: currentYear - index
  }));
  return year;
};

export const yearList = year();

export const getYearOnly = (inputDate) => {
  const date = new Date(inputDate);
  const currentYear = date.getFullYear();
  return currentYear;
};

export const getCurrentDate = () => {
  const date = new Date();
  const formattedDate = changeDateFormat(date);
  return formattedDate;
};

export const getCurrentYear = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return currentYear;
};

export const getCurrentMonth = () => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  return currentMonth;
};

export const monthNames = [
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
  'December'
];

export const dateDetail = (date) => {
  const startOfMonth = moment(date).clone().startOf('month');
  const endOfMonth = moment(date).clone().endOf('month');
  const difference = endOfMonth.diff(startOfMonth, 'days');
  const weekDay = moment(startOfMonth).isoWeekday();
  const month = monthNames[moment(date).clone().month()] || '';
  return {
    startOfMonth: startOfMonth,
    endOfMonth: endOfMonth,
    difference: difference,
    weekDay: weekDay,
    monthName: month
  };
};

export const checkEqualDate = (startDate, endDate) => {
  return moment(changeDateFormat(startDate)).isSame(changeDateFormat(endDate));
};
