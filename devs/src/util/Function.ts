import jalaali from 'jalaali-js'

function toPersianNum(num: string | number): string {
  const numbers: { [key: string]: string } = {
    '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
    '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
  };
  return num.toString().split('').map(char => numbers[char] || char).join('');
}

function putComma(num: string | number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،");
}

function dateReverse(s: string) {
  try {
    return s.split('-').join('/');
  } catch (e) {
    return e;
  }
}

function turnTimeToInteger(time: string) {
  const [hours, minutes] = time.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
}

function getFirstWeekday(date: Date) {
  const persianDate = date.toLocaleDateString('en-us-u-ca-persian')
  let [persianMonth, _, persianYear] = persianDate.split('/').map(number => parseInt(number));
  let gregorianDate = jalaali.toGregorian(persianYear, persianMonth, 1);
  console.log();
  return (new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd).getDay() + 1)%7;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let s = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  console.log(s)
  return s;
}

const turnToDate = (s: string, persian=true) => {
  const [year, month, day] = s.split('-').map(number => parseInt(number));
  return persian ? new Date(year, month - 1, day).toLocaleDateString('fa-IR') : new Date(year, month - 1, day);
}

export { toPersianNum, putComma, dateReverse, turnTimeToInteger, getFirstWeekday, formatDate, turnToDate };