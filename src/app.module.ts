import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { VideoModule } from './modules/api/video/video.module';
import { ProfileModule } from './modules/api/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forRoot(), VideoModule, ProfileModule],
  controllers: [AppController],
})
export class AppModule {}
