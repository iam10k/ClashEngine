export interface JwtPayloadInterface {
  id: number;

  roles?: number;

  flags?: number;

  iat: number;

  exp: number;

  iss: string;
}
