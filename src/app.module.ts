import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VideoModule } from './modules/api/video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
