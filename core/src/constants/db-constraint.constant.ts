import { ApiErrorInterface } from '@clash/common';
import { ConstantValue } from '../core/types';
import { API_ERROR } from './api-error.constant';

export const DB_CONSTRAINTS: ConstantValue<any, ConstantValue<any, ApiErrorInterface<any>>> = {
  GAME: {
    UQ_98adf6da0caaf10ea09443aacfa: API_ERROR.GAME.UNIQUE.NAME
  },
  SEASON: {
    UQ_b83f11544da2dc1ba7e29ce6e12: API_ERROR.SEASON.UNIQUE.SEASON,
    CHK_0de217e352ec01ae75d1ba5614: API_ERROR.SEASON.CHECK.DATE_RANGE_ORDER
  }
};

export const DB_CONSTRAINT_ERRORS: ConstantValue<any, ApiErrorInterface<any>> = {
  ...DB_CONSTRAINTS.GAME,
  ...DB_CONSTRAINTS.SEASON,
  ...DB_CONSTRAINTS.USER
};
