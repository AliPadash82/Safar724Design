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
  let [persianMonth, persianDay, persianYear] = persianDate.split('/').map(number => parseInt(number));
  let gregorianDate = jalaali.toGregorian(persianYear, persianMonth, 1);
  console.log();
  return (new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd).getDay() + 1)%7;
}


export { toPersianNum, putComma, dateReverse, turnTimeToInteger, getFirstWeekday };