import dayjs from 'dayjs';

class DateUtils {
  static nowIso = () => dayjs().toISOString();
  static isoDateToString = (isoDate: string) => {
    const date = dayjs(isoDate);
    return date.isValid() ? date.format('HH:mm:ss DD/MM/YYYY').toString() : isoDate;
  };
}

export default DateUtils;
