import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from '../../../database/repositories/profile.repository';
import { ProfileEntity } from '../../../database/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  public async getUserData(id: number): Promise<ProfileEntity> {
    const data = await this.profileRepository.findOne(id);

    console.log(data);

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }
}
