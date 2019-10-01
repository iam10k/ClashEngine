import { UserCore, UserDetail, ValidationQuery } from '@clash/common';
import { Body, Controller, Get, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { UserFindOptions } from '../dtos/user-find-options.dto';
import { UserPagedResponse } from '../dtos/user-paged-response.dto';
import { UserUpdate } from '../dtos/user-update.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiUseTags('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserPagedResponse })
  getGames(@ValidationQuery() findOptions: UserFindOptions): Promise<UserPagedResponse> {
    return this.userService.findUsers(findOptions);
  }

  @Get('/me')
  @ApiOkResponse({ type: UserDetail })
  getMe(): Promise<UserDetail> {
    // return this.userService.getUserById();
    return null;
  }

  @Get('/:userId')
  @ApiOkResponse({ type: UserCore })
  getUser(@Param('userId', new ParseIntPipe()) userId: number): Promise<UserCore> {
    return this.userService.getUserById(userId);
  }

  @Put('/me')
  @ApiOkResponse({ type: UserDetail })
  updateMe(@Req() req, @Body() userUpdate: UserUpdate): Promise<UserDetail> {
    return this.userService.updateUser(req.user.id, userUpdate);
  }

  @Put('/:userId')
  @ApiOkResponse({ type: UserCore })
  updateUser(@Param('userId', new ParseIntPipe()) userId: number, @Body() userUpdate: UserUpdate): Promise<UserCore> {
    return this.userService.updateUser(userId, userUpdate);
  }
}
