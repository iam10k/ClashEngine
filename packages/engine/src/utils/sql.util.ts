import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export class SqlUtil {
  public static addWhere(
    query: SelectQueryBuilder<any>,
    hasWhere: boolean,
    where: string | Brackets | ((qb: SelectQueryBuilder<any>) => string),
    parameters?: ObjectLiteral,
    isOr: boolean = false
  ): boolean {
    if (hasWhere) {
      if (isOr) {
        query.orWhere(where, parameters);
      } else {
        query.andWhere(where, parameters);
      }
    } else {
      query.where(where, parameters);
      hasWhere = true;
    }
    return hasWhere;
  }
}
