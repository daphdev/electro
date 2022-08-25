export class CollectionWrapper<T> {
  content: T[];
  totalElements: number;

  constructor(content: T[]) {
    this.content = content;
    this.totalElements = content.length;
  }
}
