import R from 'ramda';
import startOfWeek from 'date-fns/start_of_week';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';

const fields = [
  'hits',
  'unique',
  'registrations',
  'demoRegistrations',
  'conversion',
  'deposit',
  'ftd',
  'deals',
  'profit'
];

export const getData = () => {
  const result = [{}, []];
  const initialDate = startOfWeek(new Date());

  for (let i = 0; i < 7; i++) {
    const stringDate = R.compose(date => format(date, 'YYYY-MM-DD'), date => addDays(date, i))(
      initialDate
    );

    result[0][stringDate] = [{}, []];

    result[0][stringDate][0].date = stringDate;
    result[0][stringDate][0].expand = false;
    result[0][stringDate][1].push('date');

    fields.forEach(field => {
      result[0][stringDate][0][field] = Math.floor(Math.random() * 100);
      result[0][stringDate][1].push(field);
    });

    result[1].push(stringDate);
  }

  return result;
};
export const throttle = (func, ms, { ...rest }) => {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = rest;
      savedThis = this;
      return;
    }

    func.apply(this, rest);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};
