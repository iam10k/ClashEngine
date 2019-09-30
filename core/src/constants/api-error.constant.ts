import { ApiErrorInterface } from '@clash/common';
import { DataConstraintType } from '../core/exceptions';
import { ConstantValue } from '../core/types';
import { API_CONST } from './api.constant';

interface ApiErrorConstant {
  LOCK?: ConstantValue<any, ApiErrorInterface<any>>;
  CHECK?: ConstantValue<any, ApiErrorInterface<DataConstraintType>>;
  UNIQUE?: ConstantValue<any, ApiErrorInterface<DataConstraintType>>;
}

export const API_ERROR: { [P in keyof any]?: ApiErrorConstant } = {
  SEASON: {
    LOCK: {
      PAST_SEASON: { key: 'past', desc: 'Past seasons are locked from editing' },
      ACTIVE_SEASON: { key: 'active', desc: 'Active seasons are locked from deletion' }
    },
    CHECK: {
      DATE_RANGE_ORDER: {
        key: 'dateOrder',
        type: DataConstraintType.CHECK,
        desc: 'Start date must be before end date',
        fields: ['startDate', 'endDate']
      },
      DATE_RANGE_OVERLAPS: {
        key: 'dateOverlaps',
        type: DataConstraintType.CHECK,
        desc: 'Date range must not overlap seasons',
        fields: ['startDate', 'endDate']
      }
    },
    UNIQUE: {
      SEASON: {
        key: 'season',
        type: DataConstraintType.UNIQUE,
        desc: 'Season number must be unique',
        fields: ['season']
      }
    }
  },
  GAME: {
    UNIQUE: {
      NAME: { key: 'name', type: DataConstraintType.UNIQUE, desc: 'Game name must be unique', fields: ['name'] }
    }
  },
  USER: {
    UNIQUE: {
      USERNAME: {
        key: 'username',
        type: DataConstraintType.UNIQUE,
        desc: 'Username must be unique',
        fields: ['username']
      }
    },
    LOCK: {
      HISTORY: {
        key: 'username',
        desc: `Username is locked for ${API_CONST.USERNAME.LOCK_PERIOD_DAYS} days`
      }
    }
  }
};
