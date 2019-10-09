export enum UserRole {
  DEFAULT = 0,
  ADMIN = 1 << 0,
  SUPPORT = 1 << 4,
  BETA_TESTER = 1 << 8
}
