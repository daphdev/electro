import dayjs from 'dayjs';

type DateFormat = 'HH:mm:ss DD/MM/YYYY' | 'DD/MM/YYYY' | 'DD/MM/YY';

class DateUtils {
  static now = () => dayjs().toISOString();

  static isoDateToString = (isoDate: string, format: DateFormat = 'HH:mm:ss DD/MM/YYYY') => {
    const date = dayjs(isoDate);
    return date.isValid() ? date.format(format).toString() : isoDate;
  };

  static toIso = (date: Date) => dayjs(date).toISOString();

  static today = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };
}

export default DateUtils;
