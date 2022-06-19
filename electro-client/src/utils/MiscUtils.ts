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
    return JSON.stringify(first) === JSON.stringify(second);
  }
}

export default MiscUtils;
