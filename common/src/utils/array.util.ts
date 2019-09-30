export class ArrayUtil {
  /**
   * Check if an array is empty, null, or undefined.
   * @param list
   */
  public static isEmpty(list: any[] | null): boolean {
    return !list || list.length === 0;
  }
}
