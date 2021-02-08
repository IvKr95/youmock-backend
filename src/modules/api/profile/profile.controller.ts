import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileEntity } from '../../../database/entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<ProfileEntity> {
    return this.profileService.getUserData(id).catch((e: Error) => {
      throw e;
    });
  }
}
