export default class MiscUtils {
  static pick<T>(o: T, arr: string[]) {
    const result = {};

    Object.entries(o).forEach(([k, v]) => {
      if (arr.includes(k)) {
        Object.assign(result, { [k]: v });
      }
    });

    return result;
  }
}
