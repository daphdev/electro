import dayjs from 'dayjs';

export default class DateUtils {
  static nowIso = () => dayjs().toISOString();
  static isoDateToString = (isoDate: string) => dayjs(isoDate).format('HH:mm:ss DD/MM/YYYY').toString();
}
