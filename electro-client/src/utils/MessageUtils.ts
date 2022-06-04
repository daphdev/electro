class MessageUtils {
  static min = (subject: string, value: number) => `${subject} có ít nhất ${value} ký tự`;
  static max = (subject: string, value: number) => `${subject} chỉ có nhiều nhất ${value} ký tự`;
}

export default MessageUtils;
