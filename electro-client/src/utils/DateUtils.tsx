import dayjs from 'dayjs';

export const isoDateToString = (isoDate: string) => dayjs(isoDate).format('HH:mm:ss DD/MM/YYYY').toString();
