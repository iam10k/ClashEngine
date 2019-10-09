import { UserCreate } from '@clash/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public getUserDetailByDiscord(discordId: string) {
    return null;
  }

  public addUser(discordId: string, userCreate: UserCreate) {
    return null;
  }
}
