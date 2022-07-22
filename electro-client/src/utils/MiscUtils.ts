import isEqual from 'lodash.isequal';

class MiscUtils {
  static pick<T>(o: T, arr: string[]) {
    const result = {};

    Object.entries(o).forEach(([k, v]) => {
      if (arr.includes(k)) {
        Object.assign(result, { [k]: v });
      }
    });

    return result;
  }

  static isEquals<T1, T2>(first: T1, second: T2) {
    return isEqual(first, second);
  }

  static convertToSlug = (name: string) => {
    return name.trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/đ/g, 'd')
      .replace(/ /g, '-') + '-' + Math.random().toString(36).substring(2, 7);
  };
}

export default MiscUtils;
