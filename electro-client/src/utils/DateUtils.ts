import dayjs from 'dayjs';

class DateUtils {
  static now = () => dayjs().toISOString();

  static isoDateToString = (isoDate: string) => {
    const date = dayjs(isoDate);
    return date.isValid() ? date.format('HH:mm:ss DD/MM/YYYY').toString() : isoDate;
  };

  static toIso = (date: Date) => dayjs(date).toISOString();
}

export default DateUtils;
