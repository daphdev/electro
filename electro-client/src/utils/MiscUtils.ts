import isEqual from 'lodash.isequal';

class MiscUtils {
  static pick = <T>(o: T, arr: string[]) => {
    const result = {};

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.entries(o).forEach(([k, v]) => {
      if (arr.includes(k)) {
        Object.assign(result, { [k]: v });
      }
    });

    return result;
  };

  static isEquals = <T1, T2>(first: T1, second: T2) => isEqual(first, second);

  static convertToSlug = (name: string) => name.trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/ /g, '-')
    .concat('-', Math.random().toString(36).substring(2, 7));

  static formatPrice = (price: number): string => new Intl.NumberFormat('vi-VN').format(price);

  static recursiveFlatMap = (arrays: string[][], i = 0, combination: string[] = []): string[][] => {
    if (i === arrays.length) {
      return [combination];
    }
    return arrays[i].flatMap(n => MiscUtils.recursiveFlatMap(arrays, i + 1, [...combination, n]));
  };

  static parserPrice = (value?: string) => (value || '').replace(/(\.)/g, '');

  static formatterPrice = (value?: string) => !Number.isNaN(parseFloat(value || ''))
    ? (value || '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : '';
}

export default MiscUtils;
