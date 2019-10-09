import { UserDetailEntity } from './user-detail.entity';
import { UserEntity } from './user.entity';
import { UsernameHistoryEntity } from './username-history.entity';

export const DB_ENTITIES = [UserDetailEntity, UserEntity, UsernameHistoryEntity];

export * from './user.entity';
export * from './user-detail.entity';
export * from './username-history.entity';
