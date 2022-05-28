export default class MessageUtils {
  static max = (subject: string, value: number) => `${subject} có ít nhất ${value} ký tự`;
  static min = (subject: string, value: number) => `${subject} chỉ có nhiều nhất ${value} ký tự`;
}
