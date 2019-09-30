export interface ApiErrorInterface<T> {
  key?: string;
  desc: string;
  type?: T;
  fields?: string[];
}
